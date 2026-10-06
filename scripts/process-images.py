"""
CORE8 image pipeline.

Turns the raw product photography in `assets-source/` into web-ready assets in
`public/images/`:

- Product bottles: removes the white studio background (keeping soft shadows as
  transparent darkness), trims, and exports a transparent WebP.
- Logo: converts the dark-background logo into a transparent WebP.
- Open Graph images (1200x630 JPG) for the site and for every product.
- App icons (src/app/icon.png, src/app/apple-icon.png).

Re-run after replacing any source photo:

    python3 scripts/process-images.py

Requires Pillow + numpy.
"""

from __future__ import annotations

from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets-source"
OUT = ROOT / "public" / "images"
APP = ROOT / "src" / "app"

PRODUCTS = {
    "lean-kiwi": ("Lean Kiwi", "#8BCF00", "Refresh your day"),
    "berry-lean": ("Berry Lean", "#E83B91", "Lean with protein"),
    "power-max": ("Power Max", "#FF8A00", "Fuel your performance"),
    "focus-max": ("Focus Max", "#008CFF", "Sharpen your focus"),
    "muscle-max": ("Muscle Max", "#F21D3B", "Build your strength"),
}

GREEN = "#8BCF00"


def hex_rgb(value: str) -> tuple[int, int, int]:
    value = value.lstrip("#")
    return tuple(int(value[i : i + 2], 16) for i in (0, 2, 4))  # type: ignore[return-value]


def font(size: int, bold: bool = True) -> ImageFont.FreeTypeFont:
    candidates = [
        "/usr/share/fonts/opentype/inter/Inter-Black.otf" if bold else "/usr/share/fonts/opentype/inter/Inter-Regular.otf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    ]
    for path in candidates:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def remove_white_background(img: Image.Image) -> Image.Image:
    """Flood-fill the light, neutral background from the borders and convert
    only that region to alpha (GIMP-style colour-to-alpha against white)."""
    rgb = np.asarray(img.convert("RGB")).astype(np.float32)
    lo = rgb.min(axis=2)
    hi = rgb.max(axis=2)

    # Candidate background: light and nearly colourless (includes soft shadows).
    candidate = (lo >= 150) & ((hi - lo) <= 28)

    mask = Image.fromarray((candidate * 255).astype(np.uint8), "L").copy()
    h, w = candidate.shape
    border = [(x, 0) for x in range(w)] + [(x, h - 1) for x in range(w)]
    border += [(0, y) for y in range(h)] + [(w - 1, y) for y in range(h)]
    for seed in border:
        if mask.getpixel(seed) == 255:
            ImageDraw.floodfill(mask, seed, 128, thresh=0)

    background = np.asarray(mask) == 128
    # Grow by one pixel so anti-aliased edges are softened as well.
    grown = np.asarray(
        Image.fromarray((background * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(3))
    ) > 0

    # Colour-to-alpha against white.
    alpha_bg = (255.0 - lo) / 255.0
    alpha_bg = np.clip((alpha_bg - 0.03) / 0.97, 0, 1)
    alpha = np.where(grown, alpha_bg, 1.0)
    alpha = np.where(background, np.minimum(alpha, alpha_bg), alpha)

    safe = np.maximum(alpha, 1e-4)[..., None]
    color = (rgb - 255.0 * (1 - alpha[..., None])) / safe
    color = np.clip(color, 0, 255)

    rgba = np.dstack([color, alpha * 255]).astype(np.uint8)
    out = Image.fromarray(rgba, "RGBA")
    bbox = out.getchannel("A").point(lambda a: 255 if a > 10 else 0).getbbox()
    if bbox:
        pad = 4
        bbox = (
            max(bbox[0] - pad, 0),
            max(bbox[1] - pad, 0),
            min(bbox[2] + pad, out.width),
            min(bbox[3] + pad, out.height),
        )
        out = out.crop(bbox)
    return out


def remove_frame_lines(img: Image.Image, margin: int = 16) -> Image.Image:
    """Some sources carry thin grey frame lines near the edges. Any row/column
    within `margin` px of an edge that is mostly non-white gets painted white."""
    rgb = np.asarray(img.convert("RGB")).copy()
    h, w, _ = rgb.shape
    dark = rgb.min(axis=2) < 235
    for x in list(range(margin)) + list(range(w - margin, w)):
        if dark[:, x].sum() > h * 0.5:
            rgb[:, max(x - 1, 0) : x + 2] = 255
    for y in list(range(margin)) + list(range(h - margin, h)):
        if dark[y, :].sum() > w * 0.5:
            rgb[max(y - 1, 0) : y + 2, :] = 255
    return Image.fromarray(rgb, "RGB")


def clean_muscle_max(img: Image.Image) -> Image.Image:
    """The Muscle Max source has an "M1" label in the top-left corner."""
    img = img.convert("RGB").copy()
    ImageDraw.Draw(img).rectangle((0, 0, 110, 80), fill="white")
    return img


def process_logo() -> Image.Image:
    src = Image.open(SRC / "logo" / "core8-logo.jpeg").convert("RGB")
    rgb = np.asarray(src).astype(np.float32)
    hi = rgb.max(axis=2)
    alpha = np.clip((hi - 45) / (200 - 45), 0, 1)
    color = np.clip(rgb / np.maximum(alpha, 1e-4)[..., None], 0, 255)
    rgba = np.dstack([color, alpha * 255]).astype(np.uint8)
    out = Image.fromarray(rgba, "RGBA")
    bbox = out.getchannel("A").point(lambda a: 255 if a > 20 else 0).getbbox()
    return out.crop(bbox) if bbox else out


def radial_glow(size: tuple[int, int], center: tuple[int, int], radius: int, color: str, strength: float) -> Image.Image:
    w, h = size
    yy, xx = np.mgrid[0:h, 0:w]
    d = np.sqrt((xx - center[0]) ** 2 + (yy - center[1]) ** 2) / radius
    a = np.clip(1 - d, 0, 1) ** 2 * strength
    r, g, b = hex_rgb(color)
    arr = np.dstack([np.full_like(a, r), np.full_like(a, g), np.full_like(a, b), a * 255]).astype(np.uint8)
    return Image.fromarray(arr, "RGBA")


def og_image(bottle: Image.Image | None, title: str, subtitle: str, color: str, logo: Image.Image) -> Image.Image:
    W, H = 1200, 630
    canvas = Image.new("RGBA", (W, H), (0, 0, 0, 255))
    canvas.alpha_composite(radial_glow((W, H), (860, 330), 520, color, 0.45))

    lw = 300
    lg = logo.resize((lw, int(logo.height * lw / logo.width)), Image.LANCZOS)
    canvas.alpha_composite(lg, (72, 72))

    draw = ImageDraw.Draw(canvas)
    draw.text((72, 300), title.upper(), font=font(84), fill="white")
    draw.text((76, 410), subtitle.upper(), font=font(30), fill=hex_rgb(color))
    draw.text((76, 540), "Natural functional drinks", font=font(24, bold=False), fill=(160, 160, 160))

    if bottle is not None:
        bh = 560
        b = bottle.resize((int(bottle.width * bh / bottle.height), bh), Image.LANCZOS)
        canvas.alpha_composite(b, (W - b.width - 70, (H - bh) // 2 + 10))
    return canvas.convert("RGB")


def main() -> None:
    logo = process_logo()
    (OUT / "logo").mkdir(parents=True, exist_ok=True)
    logo.save(OUT / "logo" / "core8-logo.webp", "WEBP", quality=92, method=6)
    print(f"logo: {logo.size}")

    bottles: dict[str, Image.Image] = {}
    for slug, (name, color, tagline) in PRODUCTS.items():
        src = remove_frame_lines(Image.open(SRC / "products" / f"{slug}.png"))
        if slug == "muscle-max":
            src = clean_muscle_max(src)
        bottle = remove_white_background(src)
        bottles[slug] = bottle
        folder = OUT / "products" / slug
        folder.mkdir(parents=True, exist_ok=True)
        bottle.save(folder / f"{slug}.webp", "WEBP", quality=88, method=6)
        og_image(bottle, name, tagline, color, logo).save(folder / f"{slug}-og.jpg", "JPEG", quality=86, optimize=True)
        print(f"{slug}: {bottle.size}")

    # Default site OG: the five bottles in a row.
    W, H = 1200, 630
    canvas = Image.new("RGBA", (W, H), (0, 0, 0, 255))
    canvas.alpha_composite(radial_glow((W, H), (600, 420), 620, GREEN, 0.35))
    lw = 420
    lg = logo.resize((lw, int(logo.height * lw / logo.width)), Image.LANCZOS)
    canvas.alpha_composite(lg, ((W - lw) // 2, 40))
    bh = 380
    resized = [b.resize((int(b.width * bh / b.height), bh), Image.LANCZOS) for b in bottles.values()]
    step = 200
    x0 = (W - step * 4) // 2
    for i, b in enumerate(resized):
        canvas.alpha_composite(b, (x0 + i * step - b.width // 2, H - bh - 30))
    (OUT / "og").mkdir(parents=True, exist_ok=True)
    canvas.convert("RGB").save(OUT / "og" / "core8-og.jpg", "JPEG", quality=86, optimize=True)

    # App icon: the logo "8" on black.
    for name, size in (("icon.png", 512), ("apple-icon.png", 180)):
        icon = Image.new("RGBA", (size, size), (0, 0, 0, 255))
        icon.alpha_composite(radial_glow((size, size), (size // 2, size // 2), size // 2, GREEN, 0.35))
        d = ImageDraw.Draw(icon)
        f = font(int(size * 0.72))
        bbox = d.textbbox((0, 0), "8", font=f)
        tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
        d.text(((size - tw) / 2 - bbox[0], (size - th) / 2 - bbox[1]), "8", font=f, fill=hex_rgb(GREEN))
        icon.convert("RGB").save(APP / name, "PNG", optimize=True)


if __name__ == "__main__":
    main()
