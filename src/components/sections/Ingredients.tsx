import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { content } from "@/data/content";
import { getIngredientIndex } from "@/lib/ingredients";
import { accentStyle } from "@/lib/utils";
import type { Product } from "@/types/product";

/** Editorial index of every ingredient in the range, generated from product data. */
export function Ingredients({ products }: { products: Product[] }) {
  const { ingredients } = content;
  const index = getIngredientIndex(products);

  return (
    <section aria-labelledby="ingredients-title" className="relative overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-40 size-[40rem] rounded-full bg-[radial-gradient(circle,rgb(139_207_0/0.1),transparent_65%)]"
      />
      <Container size="wide" className="relative">
        <SectionHeading id="ingredients-title" eyebrow={ingredients.eyebrow} title={ingredients.title} intro={ingredients.intro} />

        {/* Legend: product codes are text, so meaning never relies on colour alone. */}
        <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-3 text-xs tracking-[0.15em] text-core8-gray uppercase" aria-label="Product codes">
          {products.map((product) => (
            <li key={product.slug} style={accentStyle(product.color)} className="flex items-center gap-2">
              <span className="font-bold text-accent">{product.code}</span>
              {product.name}
            </li>
          ))}
        </ul>

        <ul className="mt-10 flex flex-wrap items-baseline gap-x-3 gap-y-4 border-t border-white/10 pt-10 sm:gap-x-5">
          {index.map((entry) => (
            <li key={entry.name} className="group flex items-start gap-1.5">
              <span className="font-display text-[clamp(1.6rem,4.5vw,3.25rem)] leading-none font-extrabold text-white/85 uppercase transition-colors duration-300 [font-stretch:80%] group-hover:text-white">
                {entry.name}
              </span>
              <span className="mt-0.5 flex flex-col gap-0.5">
                <span className="sr-only">
                  {ingredients.foundIn} {entry.products.map((product) => product.name).join(", ")}
                </span>
                {entry.products.map((product) => (
                  <span
                    key={product.slug}
                    aria-hidden="true"
                    style={accentStyle(product.color)}
                    className="text-[0.6rem] leading-none font-bold tracking-wider text-accent"
                  >
                    {product.code}
                  </span>
                ))}
              </span>
              <span aria-hidden="true" className="ms-2 self-center text-white/15 group-last:hidden sm:ms-3">
                /
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
