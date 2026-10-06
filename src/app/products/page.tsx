import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ProductGrid } from "@/components/products/ProductGrid";
import { JsonLd } from "@/components/seo/JsonLd";
import { ChooseYourGoal } from "@/components/sections/ChooseYourGoal";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Nutrition } from "@/components/sections/Nutrition";
import { Eyebrow } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { content } from "@/data/content";
import { routes } from "@/data/navigation";
import { products } from "@/data/products";
import { breadcrumbJsonLd, productListJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Products",
  description:
    "Explore the five CORE8 natural functional drinks: Lean Kiwi, Berry Lean, Power Max, Focus Max and Muscle Max. Compare ingredients, protein and calories and find the drink for your goal.",
  path: routes.products,
  keywords: ["CORE8 products", "functional drinks range", "protein drinks", "natural energy drinks"],
});

const breadcrumbs = [
  { name: "Home", path: routes.home },
  { name: "Products", path: routes.products },
];

export default function ProductsPage() {
  const { productsPage } = content;

  return (
    <>
      <section aria-labelledby="products-title" className="relative isolate overflow-hidden pt-(--nav-height)">
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 -z-10 size-[60rem] max-w-[200vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(139_207_0/0.16),transparent_62%)]"
        />
        <Container size="wide" className="pt-12 pb-16 sm:pt-16">
          <Breadcrumbs items={breadcrumbs} />
          <Eyebrow className="mt-10">{productsPage.eyebrow}</Eyebrow>
          <h1
            id="products-title"
            className="mt-5 max-w-5xl font-display text-[clamp(3rem,10vw,8rem)] leading-[0.85] font-black uppercase [font-stretch:80%]"
          >
            {productsPage.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-core8-muted">{productsPage.intro}</p>
          <ProductGrid products={products} headingLevel="h2" className="mt-14" />
        </Container>
      </section>
      <ChooseYourGoal products={products} />
      <Nutrition products={products} />
      <FinalCTA products={products} />
      <JsonLd data={[productListJsonLd(products), breadcrumbJsonLd(breadcrumbs)]} />
    </>
  );
}
