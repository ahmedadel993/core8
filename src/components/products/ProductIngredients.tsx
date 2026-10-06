import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Product } from "@/types/product";

export function ProductIngredients({ product }: { product: Product }) {
  return (
    <section aria-labelledby="ingredients-title" className="py-20 sm:py-28">
      <Container size="wide" className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <SectionHeading
          id="ingredients-title"
          eyebrow="Ingredients"
          title="What's inside"
          intro={`Everything in a 500 ml bottle of ${product.name}. Whole ingredients, measured and blended. Nothing artificial.`}
          className="lg:sticky lg:top-32 lg:self-start"
        />
        <ul className="border-t border-white/10">
          {product.ingredients.map((ingredient) => (
            <li key={ingredient.name} className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 border-b border-white/10 py-5">
              <span className="font-display text-2xl font-extrabold uppercase [font-stretch:85%] sm:text-3xl">{ingredient.name}</span>
              <span className="font-display text-lg font-bold text-accent sm:text-xl">{ingredient.amount}</span>
              <span lang="ar" dir="rtl" className="text-start text-sm text-core8-gray">
                {ingredient.nameAr}
              </span>
              <span lang="ar" dir="rtl" className="text-end text-xs text-core8-gray">
                {ingredient.amountAr}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
