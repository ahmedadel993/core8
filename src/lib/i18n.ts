import type { Direction, Locale } from "@/types/site";

/**
 * Minimal locale helpers. The site is English-first today; future `/en` and
 * `/ar` route segments can pass their locale through these helpers without a
 * heavy i18n dependency.
 */
export const locales: Locale[] = ["en", "ar"];
export const defaultLocale: Locale = "en";

export function getDirection(locale: Locale): Direction {
  return locale === "ar" ? "rtl" : "ltr";
}

/** Picks `field` or `fieldAr` from a record that carries both. */
export function localized<T extends Record<K | `${K}Ar`, string>, K extends string>(
  record: T,
  field: K,
  locale: Locale,
): string {
  return locale === "ar" ? record[`${field}Ar`] : record[field];
}
