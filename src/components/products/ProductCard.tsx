import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ShareButton } from "@/components/share/ShareButton";
import { routes } from "@/data/navigation";
import { getProductShare } from "@/lib/share";
import { accentStyle, formatNutrient } from "@/lib/utils";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  headingLevel?: "h2" | "h3";
}

/**
 * The whole card is clickable via a stretched link on the title; the share
 * button sits above it so the two interactive elements never nest.
 */
export function ProductCard({ product, headingLevel: Heading = "h3" }: ProductCardProps) {
  return (
    <article
      style={accentStyle(product.color)}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-core8-dark transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-accent/60 motion-reduce:hover:translate-y-0"
    >
      <div className="relative flex aspect-[4/5] items-end justify-center overflow-hidden bg-black pt-8">
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-1/2 size-[85%] -translate-x-1/2 translate-y-1/3 rounded-full bg-accent opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-45"
        />
        <span
          aria-hidden="true"
          className="absolute start-5 top-5 font-display text-6xl font-black text-white/5 [font-stretch:125%]"
        >
          {product.code}
        </span>
        <Image
          src={product.image.src}
          alt={product.image.alt}
          width={product.image.width}
          height={product.image.height}
          sizes="(min-width: 1280px) 220px, (min-width: 640px) 40vw, 70vw"
          className="relative h-[86%] w-auto object-contain drop-shadow-[0_30px_30px_rgba(0,0,0,0.6)] transition-transform duration-700 group-hover:scale-105 motion-reduce:group-hover:scale-100"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-[0.65rem] font-semibold tracking-[0.25em] text-accent uppercase">
          {product.code} · {product.goal.short}
        </p>
        <Heading className="mt-2 font-display text-2xl font-extrabold uppercase [font-stretch:85%]">
          <Link
            href={routes.product(product.slug)}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-3xl focus-visible:after:outline-2 focus-visible:after:outline-accent"
          >
            {product.name}
          </Link>
        </Heading>
        <p lang="ar" dir="rtl" className="mt-1 w-fit text-sm text-core8-gray">
          {product.nameAr}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-core8-muted">{product.tagline}</p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          <p className="text-sm">
            <span className="font-display text-lg font-bold">{formatNutrient(product.nutrition.calories)}</span>
            <span className="text-core8-gray"> · {formatNutrient(product.nutrition.protein)} protein</span>
          </p>
          <div className="relative z-10 flex items-center gap-2">
            <ShareButton variant="icon" {...getProductShare(product)} />
            <span
              aria-hidden="true"
              className="inline-flex size-10 items-center justify-center rounded-full bg-white/5 text-white transition-colors group-hover:bg-accent group-hover:text-black"
            >
              <ArrowUpRight className="size-4" />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
