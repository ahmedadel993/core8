import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { content } from "@/data/content";
import { routes } from "@/data/navigation";
import { accentStyle, formatNutrient, nutrientMax } from "@/lib/utils";
import type { NutritionKey, Product } from "@/types/product";

const columns: { key: NutritionKey; label: string }[] = [
  { key: "protein", label: "Protein" },
  { key: "carbohydrates", label: "Carbs" },
  { key: "fiber", label: "Fibre" },
  { key: "fat", label: "Fat" },
  { key: "caffeine", label: "Caffeine" },
];

/** Side-by-side nutrition table with a proportional calorie bar. */
export function Nutrition({ products }: { products: Product[] }) {
  const { nutrition } = content;
  const maxCalories = Math.max(...products.map((product) => nutrientMax(product.nutrition.calories)));
  // Static width steps keep the bar CSS-only (no inline widths).
  const barWidth = (calories: number) => {
    const ratio = calories / maxCalories;
    if (ratio > 0.9) return "w-full";
    if (ratio > 0.68) return "w-3/4";
    if (ratio > 0.55) return "w-3/5";
    if (ratio > 0.4) return "w-2/5";
    return "w-1/4";
  };

  return (
    <section aria-labelledby="nutrition-title" className="py-24 sm:py-32">
      <Container size="wide">
        <SectionHeading id="nutrition-title" eyebrow={nutrition.eyebrow} title={nutrition.title} intro={nutrition.intro} />

        <div className="mt-14 overflow-x-auto rounded-3xl border border-white/10" tabIndex={0} aria-labelledby="nutrition-caption">
          <table className="w-full min-w-[44rem] border-collapse text-start text-sm">
            <caption id="nutrition-caption" className="sr-only">
              {nutrition.caption}
            </caption>
            <thead>
              <tr className="border-b border-white/10 text-[0.65rem] tracking-[0.2em] text-core8-gray uppercase">
                <th scope="col" className="sticky start-0 bg-black px-5 py-4 text-start font-semibold sm:px-6">
                  Drink
                </th>
                <th scope="col" className="px-4 py-4 text-start font-semibold">
                  Calories
                </th>
                {columns.map((column) => (
                  <th key={column.key} scope="col" className="px-4 py-4 text-start font-semibold">
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.slug} style={accentStyle(product.color)} className="border-b border-white/10 last:border-0 hover:bg-white/[0.03]">
                  <th scope="row" className="sticky start-0 bg-black px-5 py-5 text-start font-normal sm:px-6">
                    <Link href={routes.product(product.slug)} className="group flex items-center gap-3">
                      <span aria-hidden="true" className="size-2.5 rounded-full bg-accent" />
                      <span>
                        <span className="block font-display text-base font-bold uppercase group-hover:text-accent">{product.name}</span>
                        <span className="text-xs text-core8-gray">{product.goal.label}</span>
                      </span>
                    </Link>
                  </th>
                  <td className="px-4 py-5">
                    <span className="font-display text-lg font-bold">{formatNutrient(product.nutrition.calories)}</span>
                    <span aria-hidden="true" className="mt-2 block h-1 w-28 rounded-full bg-white/10">
                      <span className={`block h-full rounded-full bg-accent ${barWidth(nutrientMax(product.nutrition.calories))}`} />
                    </span>
                  </td>
                  {columns.map((column) => {
                    const value = product.nutrition[column.key];
                    return (
                      <td key={column.key} className="px-4 py-5 whitespace-nowrap text-core8-muted">
                        {value ? formatNutrient(value) : <span className="text-core8-gray">None</span>}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 grid gap-2 text-xs leading-relaxed text-core8-gray sm:text-sm">
          <p>{nutrition.caffeineNote}</p>
          <p>{content.disclaimer}</p>
        </div>
      </Container>
    </section>
  );
}
