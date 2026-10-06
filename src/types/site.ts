export type Locale = "en" | "ar";

export type Direction = "ltr" | "rtl";

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: "instagram";
  label: string;
  handle: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  /** Absolute production origin, no trailing slash. */
  url: string;
  locale: Locale;
  tagline: string;
  taglineAr: string;
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  social: SocialLink[];
  /** Optional public email. Rendered on the contact page only when set. */
  email?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Principle {
  icon: "leaf" | "sparkles" | "droplet" | "zap" | "dumbbell";
  title: string;
  description: string;
}
