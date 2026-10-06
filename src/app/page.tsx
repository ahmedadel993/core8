import type { Metadata } from "next";
import { Hero } from "@/components/hero/Hero";
import { ProductStory } from "@/components/scrollytelling/ProductStory";
import { JsonLd } from "@/components/seo/JsonLd";
import { ChooseYourGoal } from "@/components/sections/ChooseYourGoal";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Ingredients } from "@/components/sections/Ingredients";
import { Nutrition } from "@/components/sections/Nutrition";
import { ProductOverview } from "@/components/sections/ProductOverview";
import { WhyCore8 } from "@/components/sections/WhyCore8";
import { content, generalFaqs } from "@/data/content";
import { products } from "@/data/products";
import { siteConfig } from "@/data/site";
import { faqJsonLd, productListJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  description: siteConfig.description,
  path: "/",
});

export default function HomePage() {
  const [heroProduct] = products;

  return (
    <>
      <Hero product={heroProduct} />
      <ProductStory products={products} />
      <ChooseYourGoal products={products} />
      <WhyCore8 />
      <Ingredients products={products} />
      <ProductOverview products={products} />
      <Nutrition products={products} />
      <FAQ eyebrow={content.faq.eyebrow} title={content.faq.title} faqs={generalFaqs} />
      <FinalCTA products={products} />
      <JsonLd data={[productListJsonLd(products), faqJsonLd(generalFaqs)]} />
    </>
  );
}
