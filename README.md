# CORE8 — Fuel Your Best

Static marketing site for CORE8 natural functional drinks. Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, GSAP + ScrollTrigger.

## Commands

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build   # static export to ./out
```

Set `NEXT_PUBLIC_SITE_URL` (see `.env.example`) before a production build. It drives canonical URLs, Open Graph, the sitemap and JSON-LD.

## Architecture

- `src/data/products.ts`: the single source of truth for all five products (EN + AR copy, ingredients per 500 ml, nutrition, allergens, SEO).
- `src/data/content.ts`: centralised marketing copy, ready for an Arabic dictionary.
- `src/app/products/<slug>/page.tsx`: picks a product and renders the shared `ProductPage` template.
- `src/lib/`: `seo.ts` (metadata), `jsonld.ts` (Organization, WebSite, Product, BreadcrumbList, FAQPage, ItemList), `share.ts`, `faq.ts`, `ingredients.ts`.
- Scrollytelling (`src/components/scrollytelling/`): all markup is server-rendered. `ScrollProductStory` is the only client component and `useProductScroll` drives it via `data-story-*` attributes:
  - desktop: a scrubbed GSAP timeline on a CSS-sticky stage, snapping to chapters
  - mobile/tablet: stacked panels with light reveals (nothing pinned)
  - `prefers-reduced-motion`: crossfades only
- Share (`src/components/share/`): `ShareButton` opens a native `<dialog>` with a product preview, WhatsApp/Facebook/X/Telegram/LinkedIn/Email links, copy link, and the device share sheet where supported. Build its props with `getProductShare(product)` or `getLineupShare(products)`.

## Images

The raw photography lives in `assets-source/`. `scripts/process-images.py` (Pillow + numpy) removes the white studio background and writes transparent WebP bottles, 1200×630 OG images and app icons to `public/images/` and `src/app/`.

```bash
python3 scripts/process-images.py
```

To replace a product photo, swap the file in `assets-source/products/`, re-run the script, and update `image.width/height` in `src/data/products.ts`. Higher-resolution sources (≥ 1000 px tall) will look sharper on large and retina screens.
