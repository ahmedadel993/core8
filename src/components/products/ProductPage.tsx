import { ProductBenefits } from "@/components/products/ProductBenefits";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductHero } from "@/components/products/ProductHero";
import { ProductIngredients } from "@/components/products/ProductIngredients";
import { ProductNutrition } from "@/components/products/ProductNutrition";
import { ProductUsage } from "@/components/products/ProductUsage";
import { JsonLd } from "@/components/seo/JsonLd";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { routes } from "@/data/navigation";
import { getRelatedProducts, products } from "@/data/products";
import { getProductFaqs } from "@/lib/faq";
import { breadcrumbJsonLd, faqJsonLd, productJsonLd } from "@/lib/jsonld";
import { accentStyle } from "@/lib/utils";
import type { Product } from "@/types/product";

/**
 * Shared template for every product route. Each `/products/<slug>/page.tsx`
 * only picks its product; all content comes from `data/products.ts`.
 */
export function ProductPage({ product }: { product: Product }) {
  const breadcrumbs = [
    { name: "Home", path: routes.home },
    { name: "Products", path: routes.products },
    { name: product.name, path: routes.product(product.slug) },
  ];
  const faqs = getProductFaqs(product);

  return (
    <article style={accentStyle(product.color)}>
      <ProductHero product={product} breadcrumbs={breadcrumbs} />
      <ProductBenefits product={product} />
      <ProductIngredients product={product} />
      <ProductNutrition product={product} />
      <ProductUsage product={product} />

      <section aria-labelledby="related-title" className="border-t border-white/10 bg-core8-dark py-20 sm:py-28">
        <Container size="wide">
          <SectionHeading id="related-title" eyebrow="Explore the range" title="Different goal?" />
          <ProductGrid products={getRelatedProducts(product.slug)} className="mt-12" />
        </Container>
      </section>

      <FAQ id="product-faq" eyebrow="FAQ" title={`${product.name} questions`} faqs={faqs} />
      <FinalCTA products={products} />

      <JsonLd data={[productJsonLd(product), breadcrumbJsonLd(breadcrumbs), faqJsonLd(faqs)]} />
    </article>
  );
}
