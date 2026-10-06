import type { Metadata } from "next";
import { routes } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import type { Product } from "@/types/product";

interface PageMetadataInput {
  /** Page title without the brand suffix (the root layout template adds it). */
  title?: string;
  description: string;
  path: string;
  image?: { url: string; alt: string };
  keywords?: string[];
  noIndex?: boolean;
}

/**
 * Builds consistent per-page metadata: canonical, Open Graph, Twitter, robots.
 * URLs are relative and resolved against `metadataBase` from the root layout.
 */
export function buildMetadata({
  title,
  description,
  path,
  image = { url: siteConfig.ogImage, alt: `${siteConfig.name} — ${siteConfig.tagline}` },
  keywords = [],
  noIndex = false,
}: PageMetadataInput): Metadata {
  const fullTitle = title ? `${title} | ${siteConfig.name} Natural Functional Drinks` : siteConfig.title;
  const ogImage = { url: image.url, width: 1200, height: 630, alt: image.alt };

  return {
    // `absolute` bypasses the layout template; we build the full title ourselves.
    title: { absolute: fullTitle },
    description,
    keywords: [...new Set([...keywords, ...siteConfig.keywords])],
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: "en_US",
      url: path,
      title: fullTitle,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
        },
  };
}

export function buildProductMetadata(product: Product): Metadata {
  return buildMetadata({
    title: product.seo.title,
    description: product.seo.description,
    path: routes.product(product.slug),
    keywords: [product.name, ...product.seo.keywords],
    image: { url: product.ogImage, alt: product.image.alt },
  });
}
