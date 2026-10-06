export const PRODUCT_SLUGS = [
  "lean-kiwi",
  "berry-lean",
  "power-max",
  "focus-max",
  "muscle-max",
] as const;

export type ProductSlug = (typeof PRODUCT_SLUGS)[number];

export type ProductCode = "L1" | "L2" | "P1" | "F1" | "M1";

export type GoalKey = "lean" | "protein" | "energy" | "focus" | "muscle";

/** A hex colour string such as `#8BCF00`. */
export type HexColor = `#${string}`;

export interface ProductGoal {
  key: GoalKey;
  /** Short, uppercase-friendly label: "Lean". */
  short: string;
  shortAr: string;
  /** Full goal description: "Lean / Refresh". */
  label: string;
  labelAr: string;
}

export interface ProductImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface Ingredient {
  name: string;
  nameAr: string;
  /** Quantity per 500 ml serving, e.g. "120 g" or "Up to 500 ml". */
  amount: string;
  amountAr: string;
  /** Liquid bases (water, milk top-up) are hidden from highlight lists. */
  isBase?: boolean;
}

export interface Benefit {
  text: string;
  textAr: string;
}

export type NutrientUnit = "kcal" | "g" | "mg";

/**
 * A nutrient value as printed on the label. Values are approximate, so we
 * support ranges ("21–23 g") and upper bounds ("<1 g").
 */
export type NutrientValue =
  | { kind: "exact"; value: number; unit: NutrientUnit }
  | { kind: "range"; min: number; max: number; unit: NutrientUnit }
  | { kind: "lessThan"; value: number; unit: NutrientUnit };

export interface ProductNutrition {
  servingSize: string;
  calories: NutrientValue;
  protein: NutrientValue;
  carbohydrates: NutrientValue;
  fiber: NutrientValue;
  fat: NutrientValue;
  caffeine?: NutrientValue;
}

export type NutritionKey = Exclude<keyof ProductNutrition, "servingSize">;

export interface Product {
  id: string;
  code: ProductCode;
  slug: ProductSlug;
  name: string;
  nameAr: string;
  /** Scrollytelling headline: "Refresh your day". */
  tagline: string;
  taglineAr: string;
  description: string;
  descriptionAr: string;
  goal: ProductGoal;
  color: HexColor;
  image: ProductImage;
  /** 1200×630 social preview. */
  ogImage: string;
  ingredients: Ingredient[];
  benefits: Benefit[];
  nutrition: ProductNutrition;
  /** Practical serving suggestions shown on the product page. */
  howToEnjoy: string[];
  allergens: string[];
  /** Optional advisory shown next to nutrition (e.g. caffeine). */
  advisory?: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}
