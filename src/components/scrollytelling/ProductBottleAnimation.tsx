import Image from "next/image";
import { accentStyle, cn } from "@/lib/utils";
import type { Product } from "@/types/product";

/**
 * Desktop visual layer of the story: colour glows, giant goal words, the
 * rotating ring and the five stacked bottles. Rendered on the server; the
 * motion comes from `useProductScroll` via the `data-story-*` hooks.
 * Before hydration only the first product is visible.
 */
export function ProductBottleAnimation({ products }: { products: Product[] }) {
  return (
    <div className="pointer-events-none absolute inset-0 hidden lg:block">
      {products.map((product, index) => (
        <div
          key={`glow-${product.slug}`}
          data-story-glow
          aria-hidden="true"
          style={accentStyle(product.color)}
          className={cn(
            "absolute top-1/2 left-1/2 size-[min(70vw,64rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent)_30%,transparent),transparent_62%)]",
            index > 0 && "invisible opacity-0",
          )}
        />
      ))}

      {products.map((product, index) => (
        // Centred with flexbox, not `translate`: GSAP animates xPercent on these.
        <div key={`word-${product.slug}`} aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
          <p
            data-story-word
            className={cn(
              "text-outline shrink-0 font-display text-[min(24vw,42vh)] leading-none font-black whitespace-nowrap uppercase select-none [font-stretch:125%]",
              index > 0 && "invisible opacity-0",
            )}
          >
            {product.goal.short}
          </p>
        </div>
      ))}

      <div
        data-story-ring
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 size-[min(60vh,40rem,42vw)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/15"
      >
        <span className="absolute top-0 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/60" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        {products.map((product, index) => (
          <div
            key={product.slug}
            data-story-bottle
            className={cn("absolute h-[min(62vh,36rem,40vw)] will-change-transform", index > 0 && "invisible opacity-0")}
          >
            <Image
              src={product.image.src}
              alt={product.image.alt}
              width={product.image.width}
              height={product.image.height}
              sizes="380px"
              className="h-full w-auto object-contain drop-shadow-[0_40px_50px_rgba(0,0,0,0.8)]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
