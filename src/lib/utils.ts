import type { CSSProperties } from "react";
import { siteConfig } from "@/data/site";
import type { Ingredient, NutrientValue, Product } from "@/types/product";

type ClassValue = string | false | null | undefined;

/** Join class names, skipping falsy values. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}

/** Absolute URL on the production origin. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, `${siteConfig.url}/`).toString();
}

/** Exposes a product colour to Tailwind as `var(--accent)`. */
export function accentStyle(color: string): CSSProperties {
  return { "--accent": color };
}

/** "175 kcal", "21–23 g", "<1 g". */
export function formatNutrient(value: NutrientValue): string {
  switch (value.kind) {
    case "exact":
      return `${value.value} ${value.unit}`;
    case "range":
      return `${value.min}–${value.max} ${value.unit}`;
    case "lessThan":
      return `<${value.value} ${value.unit}`;
  }
}

/** Number part only, for large display numbers: "175", "21–23", "<1". */
export function formatNutrientAmount(value: NutrientValue): string {
  return formatNutrient(value).replace(` ${value.unit}`, "");
}

/** Upper bound of a nutrient, for proportional bars. */
export function nutrientMax(value: NutrientValue): number {
  return value.kind === "range" ? value.max : value.value;
}

/** Ingredients worth highlighting (excludes water / liquid base). */
export function keyIngredients(product: Product): Ingredient[] {
  return product.ingredients.filter((ingredient) => !ingredient.isBase);
}

/** Zero-padded index: 1 → "01". */
export function pad(index: number): string {
  return String(index).padStart(2, "0");
}
