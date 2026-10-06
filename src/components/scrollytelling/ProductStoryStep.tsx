import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { content } from "@/data/content";
import { routes } from "@/data/navigation";
import { accentStyle, cn, formatNutrient, formatNutrientAmount, keyIngredients, pad } from "@/lib/utils";
import type { Product } from "@/types/product";

interface ProductStoryStepProps {
  product: Product;
  index: number;
  total: number;
}

const macroKeys = [
  ["protein", "Protein"],
  ["carbohydrates", "Carbs"],
  ["fiber", "Fibre"],
  ["fat", "Fat"],
] as const;

/**
 * One product chapter. Mobile: a full panel in normal flow (with its own
 * bottle). Desktop: an absolutely-stacked layer on the sticky stage, with the
 * shared bottle from `ProductBottleAnimation` in the centre column.
 */
export function ProductStoryStep({ product, index, total }: ProductStoryStepProps) {
  const { story } = content;
  const titleId = `story-${product.slug}`;

  return (
    <article
      data-story-step
      aria-labelledby={titleId}
      style={accentStyle(product.color)}
      className={cn(
        "relative overflow-hidden border-t border-white/10 py-16 sm:py-20 lg:absolute lg:inset-0 lg:flex lg:items-center lg:overflow-visible lg:border-0 lg:py-0",
        index > 0 && "lg:invisible lg:opacity-0",
      )}
    >
      {/* Mobile-only colour wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-40 left-1/2 size-[36rem] max-w-[180vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent)_26%,transparent),transparent_65%)] lg:hidden"
      />

      <Container
        size="wide"
        className="relative grid gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)_minmax(0,1fr)] lg:grid-rows-[auto_auto] lg:gap-x-10 lg:gap-y-5 lg:pt-(--nav-height) lg:pb-16"
      >
        {/* Title */}
        <header className="lg:col-start-1 lg:row-start-1 lg:self-end">
          <p data-story-reveal className="flex items-center gap-3 text-xs font-semibold tracking-[0.3em] text-accent uppercase">
            <span className="whitespace-nowrap">
              {pad(index + 1)} / {pad(total)}
            </span>
            <span aria-hidden="true" className="h-px w-8 bg-current" />
            <span className="whitespace-nowrap">
              {product.code}
              <span className="lg:max-xl:hidden"> · {product.goal.label}</span>
            </span>
          </p>
          <h3
            id={titleId}
            data-story-reveal
            className="mt-4 font-display text-[clamp(3.25rem,14vw,5rem)] leading-[0.85] font-black uppercase [font-stretch:75%] lg:text-[min(6.4vw,11vh)]"
          >
            {product.name}
          </h3>
          <p data-story-reveal className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1 lg:mt-3">
            <span className="text-lg font-semibold tracking-[0.18em] text-white uppercase lg:text-xl">{product.tagline}</span>
            <span lang="ar" dir="rtl" className="text-base text-core8-gray">
              {product.nameAr}
            </span>
          </p>
        </header>

        {/* Mobile bottle (desktop uses the shared animated layer) */}
        <div className="flex justify-center lg:hidden">
          <div data-story-mobile-bottle className="h-[min(56svh,26rem)]">
            <Image
              src={product.image.src}
              alt={product.image.alt}
              width={product.image.width}
              height={product.image.height}
              sizes="70vw"
              className="h-full w-auto object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.8)]"
            />
          </div>
        </div>

        {/* Ingredients + calories */}
        <div className="lg:col-start-1 lg:row-start-2 lg:self-start">
          <p data-story-reveal className="text-[0.65rem] font-semibold tracking-[0.3em] text-core8-gray uppercase">
            {story.ingredientsLabel}
          </p>
          <ul data-story-reveal className="mt-3 flex flex-wrap gap-2">
            {keyIngredients(product).map((ingredient) => (
              <li key={ingredient.name} className="rounded-full border border-white/15 px-3 py-1.5 text-sm text-core8-muted lg:max-xl:px-2.5 lg:max-xl:py-1 lg:max-xl:text-xs">
                {ingredient.name}
              </li>
            ))}
          </ul>
          <p data-story-reveal className="mt-6 flex items-baseline gap-3 lg:mt-5">
            <span className="font-display text-6xl leading-none font-black text-accent [font-stretch:75%] lg:text-[min(5vw,9vh)]">
              {formatNutrientAmount(product.nutrition.calories)}
            </span>
            <span className="text-sm text-core8-gray">
              kcal <span className="block">{story.perServing}</span>
            </span>
          </p>
        </div>

        {/* Benefits + macros */}
        <div className="lg:col-start-3 lg:row-span-2 lg:row-start-1 lg:self-center">
          <p data-story-reveal className="text-[0.65rem] font-semibold tracking-[0.3em] text-core8-gray uppercase">
            {story.benefitsLabel}
          </p>
          <ul className="mt-4 space-y-3">
            {product.benefits.map((benefit) => (
              <li key={benefit.text} data-story-reveal className="flex gap-3 text-base leading-snug text-white xl:text-lg">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent text-black">
                  <Check aria-hidden="true" className="size-3.5" strokeWidth={3} />
                </span>
                {benefit.text}
              </li>
            ))}
          </ul>

          <dl data-story-reveal className="mt-8 grid grid-cols-4 border-y border-white/10 lg:mt-6">
            {macroKeys.map(([key, label]) => (
              <div key={key} className="border-e border-white/10 py-4 pe-2 ps-3 first:ps-0 last:border-e-0">
                <dt className="text-[0.6rem] font-semibold tracking-[0.2em] text-core8-gray uppercase">{label}</dt>
                <dd className="mt-1 font-display text-base font-bold whitespace-nowrap sm:text-lg">
                  {formatNutrient(product.nutrition[key])}
                </dd>
              </div>
            ))}
          </dl>

          <Link
            data-story-reveal
            href={routes.product(product.slug)}
            className="group/link mt-8 inline-flex lg:mt-6 items-center gap-3 text-sm font-semibold tracking-[0.18em] uppercase"
          >
            <span className="border-b border-accent pb-1 transition-colors group-hover/link:text-accent">
              {story.discover} {product.name}
            </span>
            <ArrowRight aria-hidden="true" className="size-4 text-accent transition-transform group-hover/link:translate-x-1 rtl:rotate-180" />
          </Link>
        </div>
      </Container>
    </article>
  );
}
