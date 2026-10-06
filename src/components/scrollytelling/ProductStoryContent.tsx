import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { ProductStoryStep } from "@/components/scrollytelling/ProductStoryStep";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { content } from "@/data/content";
import { routes } from "@/data/navigation";
import type { Product } from "@/types/product";

/** All five chapters plus the closing "lineup" moment. */
export function ProductStoryContent({ products }: { products: Product[] }) {
  const { story } = content;

  return (
    <>
      {products.map((product, index) => (
        <ProductStoryStep key={product.slug} product={product} index={index} total={products.length} />
      ))}

      {/* Desktop finale overlay; bottles arrange themselves underneath. */}
      <div
        data-story-finale
        className="invisible absolute inset-x-0 top-0 hidden flex-col items-center px-6 pt-[calc(var(--nav-height)+4vh)] text-center opacity-0 lg:flex"
      >
        <p className="text-xs font-semibold tracking-[0.35em] text-core8-green uppercase">{content.hero.tagline}</p>
        <p className="mt-3 font-display text-[min(6.5vw,11vh)] leading-[0.9] font-black uppercase [font-stretch:80%]">
          {story.finaleTitle}
        </p>
        <p className="mt-3 max-w-lg text-core8-muted">{story.finaleText}</p>
        <ButtonLink href={routes.chooseGoal} className="pointer-events-auto mt-5" icon={<ArrowDown aria-hidden="true" className="size-4" />}>
          {story.finaleCta}
        </ButtonLink>
      </div>

      {/* Mobile finale: a static lineup, nothing pinned. */}
      <div data-story-finale-mobile className="relative overflow-hidden border-t border-white/10 py-20 text-center lg:hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-1/2 size-[34rem] max-w-[180vw] -translate-x-1/2 translate-y-1/3 rounded-full bg-[radial-gradient(circle,rgb(139_207_0/0.22),transparent_65%)]"
        />
        <Container className="relative">
          <p className="font-display text-5xl leading-[0.9] font-black uppercase [font-stretch:80%] sm:text-6xl">{story.finaleTitle}</p>
          <p className="mx-auto mt-4 max-w-md text-core8-muted">{story.finaleText}</p>
          <ul className="mx-auto mt-10 flex max-w-xl items-end justify-center -space-x-5 sm:-space-x-3" aria-label="The CORE8 range">
            {products.map((product, index) => (
              <li key={product.slug} data-story-lineup-item className={index === 2 ? "z-10" : index === 1 || index === 3 ? "z-[5]" : ""}>
                <Image
                  src={product.image.src}
                  alt={product.image.alt}
                  width={product.image.width}
                  height={product.image.height}
                  sizes="25vw"
                  className={index === 2 ? "h-44 w-auto sm:h-56" : "h-36 w-auto sm:h-48"}
                />
              </li>
            ))}
          </ul>
          <ButtonLink href={routes.chooseGoal} size="lg" className="mt-10" icon={<ArrowDown aria-hidden="true" className="size-4" />}>
            {story.finaleCta}
          </ButtonLink>
        </Container>
      </div>
    </>
  );
}
