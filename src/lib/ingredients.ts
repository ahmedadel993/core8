import type { Product } from "@/types/product";

export interface IngredientIndexEntry {
  name: string;
  nameAr: string;
  products: Pick<Product, "slug" | "code" | "name" | "color">[];
}

// "Frozen Strawberries" and "Pitted Dates" read better as their base ingredient.
const PREPARATION_PREFIX = /^(Pitted|Fine|Frozen|Soaked|Fresh|Ground)\s+/i;

/** Every non-base ingredient across the range, grouped with the products that use it. */
export function getIngredientIndex(products: Product[]): IngredientIndexEntry[] {
  const index = new Map<string, IngredientIndexEntry>();

  for (const product of products) {
    for (const ingredient of product.ingredients) {
      if (ingredient.isBase) continue;
      const name = ingredient.name.replace(PREPARATION_PREFIX, "");
      const entry = index.get(name) ?? { name, nameAr: ingredient.nameAr, products: [] };
      if (!entry.products.some((p) => p.slug === product.slug)) {
        entry.products.push({ slug: product.slug, code: product.code, name: product.name, color: product.color });
      }
      index.set(name, entry);
    }
  }

  return [...index.values()];
}
