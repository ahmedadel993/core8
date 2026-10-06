import type { NavItem } from "@/types/site";
import type { ProductSlug } from "@/types/product";

/** All internal paths end with "/" to match `trailingSlash: true`. */
export const routes = {
  home: "/",
  products: "/products/",
  about: "/about/",
  contact: "/contact/",
  whyCore8: "/#why-core8",
  chooseGoal: "/#choose-your-goal",
  product: (slug: ProductSlug) => `/products/${slug}/`,
} as const;

export const mainNavigation: NavItem[] = [
  { label: "Products", href: routes.products },
  { label: "Why CORE8", href: routes.whyCore8 },
  { label: "Our Story", href: routes.about },
  { label: "Contact", href: routes.contact },
];

export const primaryCta: NavItem = { label: "Find Your CORE8", href: routes.chooseGoal };
