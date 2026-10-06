import { AlertCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { content } from "@/data/content";
import { formatNutrient } from "@/lib/utils";
import type { NutritionKey, Product } from "@/types/product";

const rows: { key: NutritionKey; label: string }[] = [
  { key: "calories", label: "Energy" },
  { key: "protein", label: "Protein" },
  { key: "carbohydrates", label: "Carbohydrates" },
  { key: "fiber", label: "Fibre" },
  { key: "fat", label: "Fat" },
  { key: "caffeine", label: "Caffeine" },
];

export function ProductNutrition({ product }: { product: Product }) {
  const { nutrition } = product;

  return (
    <section id="nutrition" aria-labelledby="nutrition-title" className="border-t border-white/10 bg-core8-dark py-20 sm:py-28">
      <Container size="wide" className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            id="nutrition-title"
            eyebrow="Nutrition"
            title="Nutrition facts"
            intro={`Approximate values per ${nutrition.servingSize} bottle. Natural ingredients vary slightly from batch to batch.`}
          />
          {product.advisory ? (
            <p className="mt-8 flex gap-3 rounded-2xl border border-accent/40 p-5 text-sm leading-relaxed text-core8-muted">
              <AlertCircle aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent" />
              {product.advisory}
            </p>
          ) : null}
          <div className="mt-8">
            <h3 className="text-xs font-semibold tracking-[0.3em] text-core8-gray uppercase">Allergens</h3>
            <p className="mt-3 text-base text-core8-muted">
              {product.allergens.length > 0 ? `Contains: ${product.allergens.join(", ")}.` : "No common allergens among the listed ingredients."}
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-white/15 bg-black p-6 sm:p-8">
          <table className="w-full border-collapse">
            <caption className="text-start">
              <span className="block font-display text-3xl font-black uppercase [font-stretch:80%]">{product.name}</span>
              <span className="mt-1 block text-sm text-core8-gray">Per {nutrition.servingSize} (approx.)</span>
            </caption>
            <tbody>
              {rows.map(({ key, label }) => {
                const value = nutrition[key];
                if (!value) return null;
                return (
                  <tr key={key} className="border-b border-white/10 first:border-t-4 first:border-t-white last:border-b-0">
                    <th scope="row" className="py-4 text-start text-base font-semibold">
                      {label}
                    </th>
                    <td className="py-4 text-end font-display text-xl font-bold">{formatNutrient(value)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="mt-6 text-xs leading-relaxed text-core8-gray">{content.disclaimer}</p>
        </div>
      </Container>
    </section>
  );
}
