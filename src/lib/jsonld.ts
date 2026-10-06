import { routes } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import type { Product } from "@/types/product";
import type { FaqItem } from "@/types/site";
import { absoluteUrl, formatNutrient } from "@/lib/utils";

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

export interface JsonLdNode {
  "@context"?: "https://schema.org";
  "@type": string;
  [key: string]: JsonValue | undefined;
}

const organizationId = absoluteUrl("/#organization");
const websiteId = absoluteUrl("/#website");

export function organizationJsonLd(): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: siteConfig.name,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/images/logo/core8-logo.webp"),
    slogan: siteConfig.tagline,
    description: siteConfig.description,
    sameAs: siteConfig.social.map((social) => social.href),
  };
}

export function websiteJsonLd(): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: siteConfig.name,
    url: absoluteUrl("/"),
    description: siteConfig.description,
    inLanguage: siteConfig.locale,
    publisher: { "@id": organizationId },
  };
}

export function productJsonLd(product: Product): JsonLdNode {
  const { nutrition } = product;
  const nutritionFacts: [string, string][] = [
    ["Serving size", nutrition.servingSize],
    ["Calories", formatNutrient(nutrition.calories)],
    ["Protein", formatNutrient(nutrition.protein)],
    ["Carbohydrates", formatNutrient(nutrition.carbohydrates)],
    ["Fiber", formatNutrient(nutrition.fiber)],
    ["Fat", formatNutrient(nutrition.fat)],
  ];
  if (nutrition.caffeine) nutritionFacts.push(["Caffeine", formatNutrient(nutrition.caffeine)]);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": absoluteUrl(`${routes.product(product.slug)}#product`),
    name: `${siteConfig.name} ${product.name}`,
    alternateName: product.nameAr,
    sku: product.code,
    description: product.description,
    image: [absoluteUrl(product.image.src), absoluteUrl(product.ogImage)],
    url: absoluteUrl(routes.product(product.slug)),
    category: "Natural functional beverage",
    brand: { "@type": "Brand", name: siteConfig.name },
    manufacturer: { "@id": organizationId },
    // schema.org Product has no `nutrition` property; PropertyValue is the valid way to expose it.
    additionalProperty: [
      { "@type": "PropertyValue", name: "Goal", value: product.goal.label },
      { "@type": "PropertyValue", name: "Ingredients", value: product.ingredients.map((i) => i.name).join(", ") },
      ...nutritionFacts.map(([name, value]) => ({ "@type": "PropertyValue", name, value })),
    ],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Only use for FAQs that are rendered visibly on the same page. */
export function faqJsonLd(faqs: FaqItem[]): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function productListJsonLd(products: Product[]): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${siteConfig.name} drinks`,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(routes.product(product.slug)),
      name: product.name,
    })),
  };
}
