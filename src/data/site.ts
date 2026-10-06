import type { SiteConfig } from "@/types/site";

/**
 * Set NEXT_PUBLIC_SITE_URL to the production origin (e.g. https://www.core8drinks.com)
 * before building — it drives canonical URLs, Open Graph, sitemap and JSON-LD.
 */
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://core8.example.com").replace(/\/+$/, "");

export const siteConfig: SiteConfig = {
  name: "CORE8",
  url: siteUrl,
  locale: "en",
  tagline: "Fuel Your Best",
  taglineAr: "طبيعي • طازج • متوازن • للأداء الأمثل",
  title: "CORE8 | Natural Functional Drinks — Fuel Your Best",
  description:
    "CORE8 makes natural functional drinks built around your goal: lean, protein, energy, focus and muscle. Fresh ingredients, balanced nutrition and no artificial colours or flavours.",
  keywords: [
    "CORE8",
    "natural drinks",
    "functional drinks",
    "functional beverages Egypt",
    "natural energy drink",
    "protein smoothie",
    "focus drink",
    "performance drinks",
    "healthy drinks",
  ],
  ogImage: "/images/og/core8-og.jpg",
  social: [
    {
      platform: "instagram",
      label: "Instagram",
      handle: "@core8.drinks",
      href: "https://www.instagram.com/core8.drinks/",
    },
  ],
};

export const instagram = siteConfig.social[0];
