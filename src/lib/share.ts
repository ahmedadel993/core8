import { routes } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import type { Product, ProductImage } from "@/types/product";

export type ShareTargetId = "whatsapp" | "facebook" | "x" | "telegram" | "linkedin" | "email";

export interface ShareTarget {
  id: ShareTargetId;
  label: string;
  href: string;
}

interface ShareInput {
  url: string;
  title: string;
  text: string;
}

/** Builds share-intent URLs for each supported network. Pure and framework-free. */
export function getShareTargets({ url, title, text }: ShareInput): ShareTarget[] {
  const u = encodeURIComponent(url);
  const message = encodeURIComponent(`${text} ${url}`);
  const t = encodeURIComponent(text);

  return [
    { id: "whatsapp", label: "WhatsApp", href: `https://wa.me/?text=${message}` },
    { id: "facebook", label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { id: "x", label: "X", href: `https://x.com/intent/post?text=${t}&url=${u}` },
    { id: "telegram", label: "Telegram", href: `https://t.me/share/url?url=${u}&text=${t}` },
    { id: "linkedin", label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    {
      id: "email",
      label: "Email",
      href: `mailto:?subject=${encodeURIComponent(title)}&body=${message}`,
    },
  ];
}

export interface SharePreview {
  eyebrow?: string;
  name: string;
  subtitle: string;
  color: string;
  /** One bottle for a product, several for the lineup. */
  images: ProductImage[];
}

export interface ShareConfig {
  path: string;
  title: string;
  text: string;
  preview: SharePreview;
}

export function getProductShare(product: Product): ShareConfig {
  return {
    path: routes.product(product.slug),
    title: `${product.name} | ${siteConfig.name}`,
    text: `${product.name} by ${siteConfig.name}: ${product.tagline.toLowerCase()}. Natural, fresh and built around your goal.`,
    preview: {
      eyebrow: `${product.code} · ${product.goal.label}`,
      name: product.name,
      subtitle: product.tagline,
      color: product.color,
      images: [product.image],
    },
  };
}

export function getLineupShare(products: Product[]): ShareConfig {
  return {
    path: routes.home,
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    text: `${siteConfig.name}: five natural functional drinks, one for every goal.`,
    preview: {
      eyebrow: siteConfig.tagline,
      name: siteConfig.name,
      subtitle: "Five natural drinks. Five goals.",
      color: "#8BCF00",
      images: products.map((product) => product.image),
    },
  };
}
