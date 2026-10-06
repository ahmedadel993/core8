import type { MetadataRoute } from "next";
import { routes } from "@/data/navigation";
import { products } from "@/data/products";
import { absoluteUrl } from "@/lib/utils";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages: MetadataRoute.Sitemap = [
    { url: absoluteUrl(routes.home), lastModified, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl(routes.products), lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl(routes.about), lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl(routes.contact), lastModified, changeFrequency: "monthly", priority: 0.5 },
  ];

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: absoluteUrl(routes.product(product.slug)),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
    images: [absoluteUrl(product.image.src)],
  }));

  return [...pages, ...productPages];
}
