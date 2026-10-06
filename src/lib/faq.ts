import type { Product } from "@/types/product";
import type { FaqItem } from "@/types/site";
import { formatNutrient, keyIngredients } from "@/lib/utils";

/** Product-page FAQs, generated from product data so they never drift. */
export function getProductFaqs(product: Product): FaqItem[] {
  const { nutrition } = product;
  const ingredientList = keyIngredients(product)
    .map((ingredient) => ingredient.name.toLowerCase())
    .join(", ");

  const faqs: FaqItem[] = [
    {
      question: `What is in ${product.name}?`,
      answer: `${product.name} is made with ${ingredientList}, topped up to 500 ml. Nothing artificial: no added colours or flavours.`,
    },
    {
      question: `How many calories and how much protein are in ${product.name}?`,
      answer: `A 500 ml bottle of ${product.name} contains approximately ${formatNutrient(nutrition.calories)}, ${formatNutrient(nutrition.protein)} protein, ${formatNutrient(nutrition.carbohydrates)} carbohydrates, ${formatNutrient(nutrition.fiber)} fibre and ${formatNutrient(nutrition.fat)} fat.`,
    },
    {
      question: `When is the best time to drink ${product.name}?`,
      answer: product.howToEnjoy.join(" "),
    },
    {
      question: `Does ${product.name} contain caffeine?`,
      answer: nutrition.caffeine
        ? `Yes. ${product.name} contains approximately ${formatNutrient(nutrition.caffeine)} of natural caffeine per 500 ml.`
        : `No. ${product.name} is caffeine-free.`,
    },
    {
      question: `Does ${product.name} contain allergens?`,
      answer:
        product.allergens.length > 0
          ? `Yes. ${product.name} contains: ${product.allergens.join(", ")}.`
          : `${product.name} contains no common allergens among its listed ingredients.`,
    },
  ];

  return faqs;
}
