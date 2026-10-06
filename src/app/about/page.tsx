import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { ChooseYourGoal } from "@/components/sections/ChooseYourGoal";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { WhyCore8 } from "@/components/sections/WhyCore8";
import { Eyebrow } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { content } from "@/data/content";
import { routes } from "@/data/navigation";
import { products } from "@/data/products";
import { siteConfig } from "@/data/site";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Our Story",
  description:
    "The story behind CORE8: five natural functional drinks, each built around a single goal. Fresh ingredients, balanced nutrition and nothing artificial.",
  path: routes.about,
  keywords: ["about CORE8", "Egyptian functional drinks", "natural beverage brand"],
});

const breadcrumbs = [
  { name: "Home", path: routes.home },
  { name: "Our Story", path: routes.about },
];

export default function AboutPage() {
  const { about } = content;

  return (
    <>
      <section aria-labelledby="about-title" className="relative isolate overflow-hidden pt-(--nav-height)">
        <div
          aria-hidden="true"
          className="absolute top-1/3 right-0 -z-10 size-[50rem] max-w-[200vw] translate-x-1/3 rounded-full bg-[radial-gradient(circle,rgb(139_207_0/0.14),transparent_62%)]"
        />
        <Container size="wide" className="pt-12 pb-20 sm:pt-16 sm:pb-28">
          <Breadcrumbs items={breadcrumbs} />
          <Eyebrow className="mt-10">{about.eyebrow}</Eyebrow>
          <h1
            id="about-title"
            className="mt-5 max-w-5xl font-display text-[clamp(3rem,10vw,8rem)] leading-[0.85] font-black uppercase [font-stretch:80%]"
          >
            {about.title}
          </h1>

          <div className="mt-16 grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <div>
              <p className="font-display text-2xl leading-snug font-semibold text-white sm:text-3xl">{about.lead}</p>
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-6 text-lg leading-relaxed text-core8-muted">
                  {paragraph}
                </p>
              ))}
              <p className="mt-10 text-sm font-semibold tracking-[0.3em] text-core8-green uppercase">{about.statement}</p>
              <p lang="ar" dir="rtl" className="mt-3 w-fit text-core8-gray">
                {siteConfig.taglineAr}
              </p>
            </div>

            <ul className="flex items-end justify-center -space-x-8 self-center sm:-space-x-6" aria-label="The CORE8 range">
              {products.map((product, index) => (
                <li key={product.slug} className={index % 2 === 1 ? "z-10 -translate-y-6" : ""}>
                  <Image
                    src={product.image.src}
                    alt={product.image.alt}
                    width={product.image.width}
                    height={product.image.height}
                    sizes="20vw"
                    className="h-40 w-auto sm:h-60 lg:h-64"
                  />
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
      <WhyCore8 />
      <ChooseYourGoal products={products} />
      <FinalCTA products={products} />
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
    </>
  );
}
