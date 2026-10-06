import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/layout/Breadcrumbs";
import { ShareButton } from "@/components/share/ShareButton";
import { InstagramIcon } from "@/components/ui/BrandIcons";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink, ExternalButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { instagram } from "@/data/site";
import { getProductShare } from "@/lib/share";
import { formatNutrient, formatNutrientAmount } from "@/lib/utils";
import type { Product } from "@/types/product";

interface ProductHeroProps {
  product: Product;
  breadcrumbs: BreadcrumbItem[];
}

export function ProductHero({ product, breadcrumbs }: ProductHeroProps) {
  const { nutrition } = product;
  const stats = [
    { label: "Calories", value: formatNutrient(nutrition.calories) },
    { label: "Protein", value: formatNutrient(nutrition.protein) },
    { label: "Serving", value: nutrition.servingSize },
  ];

  return (
    <section aria-labelledby="product-title" className="relative isolate overflow-hidden pt-(--nav-height)">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 size-[64rem] max-w-[200vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent)_22%,transparent),transparent_62%)] lg:left-[72%]" />
        <p className="text-outline absolute -bottom-[0.2em] left-1/2 -translate-x-1/2 font-display text-[30vw] leading-none font-black whitespace-nowrap uppercase select-none [font-stretch:125%]">
          {product.goal.short}
        </p>
      </div>

      <Container size="wide" className="grid items-center gap-10 py-10 lg:min-h-[calc(100svh-var(--nav-height))] lg:grid-cols-[1.1fr_0.9fr] lg:py-14">
        <div>
          <Breadcrumbs items={breadcrumbs} />
          <div className="mt-8 flex flex-wrap gap-2">
            <Badge tone="accent">{product.code}</Badge>
            <Badge>{product.goal.label}</Badge>
          </div>
          <h1 id="product-title" className="mt-6 font-display text-[clamp(3.5rem,13vw,8.5rem)] leading-[0.85] font-black uppercase [font-stretch:75%]">
            {product.name}
          </h1>
          <p className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="text-lg font-semibold tracking-[0.2em] text-accent uppercase sm:text-xl">{product.tagline}</span>
            <span lang="ar" dir="rtl" className="text-lg text-core8-muted">
              {product.nameAr} · {product.taglineAr}
            </span>
          </p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-core8-muted sm:text-lg">{product.description}</p>
          <p lang="ar" dir="rtl" className="mt-3 w-fit max-w-xl text-base leading-loose text-core8-gray">
            {product.descriptionAr}
          </p>

          <dl className="mt-8 grid max-w-lg grid-cols-3 border-y border-white/10">
            {stats.map((stat) => (
              <div key={stat.label} className="border-e border-white/10 py-4 ps-4 first:ps-0 last:border-e-0">
                <dt className="text-[0.6rem] font-semibold tracking-[0.2em] text-core8-gray uppercase">{stat.label}</dt>
                <dd className="mt-1 font-display text-lg font-bold sm:text-xl">{stat.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <ExternalButton href={instagram.href} variant="accent" size="lg" icon={<InstagramIcon className="size-4" />}>
              Order on Instagram
            </ExternalButton>
            <ButtonLink href="#nutrition" variant="secondary" size="lg" icon={<ArrowDown aria-hidden="true" className="size-4" />}>
              Nutrition
            </ButtonLink>
            <ShareButton {...getProductShare(product)} className="h-13 px-7 text-xs" />
          </div>
        </div>

        <div className="relative mx-auto flex aspect-[4/5] w-full max-w-md items-center justify-center lg:max-w-lg">
          <div aria-hidden="true" className="absolute inset-[8%] rounded-full border border-white/10" />
          <div aria-hidden="true" className="absolute inset-[18%] rounded-full border border-dashed border-accent/40 motion-safe:animate-spin-slow" />
          <span
            aria-hidden="true"
            className="absolute end-0 top-6 font-display text-7xl font-black text-white/5 [font-stretch:125%] sm:text-8xl"
          >
            {formatNutrientAmount(nutrition.calories)}
          </span>
          <Image
            src={product.image.src}
            alt={product.image.alt}
            width={product.image.width}
            height={product.image.height}
            priority
            sizes="(min-width: 1024px) 400px, 70vw"
            className="relative h-[88%] w-auto object-contain drop-shadow-[0_40px_50px_rgba(0,0,0,0.75)] motion-safe:animate-float"
          />
        </div>
      </Container>
    </section>
  );
}
