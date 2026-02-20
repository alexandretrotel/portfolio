import { getRelativeLocaleUrl } from "astro:i18n";

import { defaultLocale, localeFormats, locales } from "./locales";
import type { Locale } from "./locales";

export const getLocaleFromUrl = (url: URL): Locale => {
  const [, lang] = url.pathname.split("/");
  if (locales.includes(lang as Locale)) {
    return lang as Locale;
  }
  return defaultLocale;
};

export const getLocalizedPath = (locale: Locale, path: string): string =>
  getRelativeLocaleUrl(locale, path);

export const formatDate = (date: Date, locale: Locale): string =>
  date.toLocaleDateString(localeFormats[locale], {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export const formatNumber = (num: number, locale: Locale): string =>
  new Intl.NumberFormat(localeFormats[locale]).format(num);

export const stripLocaleFromPath = (pathname: string): string => {
  const segments = pathname.split("/").filter(Boolean);
  if (locales.includes(segments[0] as Locale)) {
    const rest = segments.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }
  return pathname;
};

export const getBlogEntry = (locale: Locale): `blog/${Locale}` =>
  `blog/${locale}` as const;

// Get locale from route params (handles undefined for default locale)
export const getLocaleFromParams = (
  localeParam: string | undefined
): Locale => {
  // Return defaultLocale when missing or empty
  if (!localeParam) {
    return defaultLocale;
  }

  // Normalize input (trim whitespace) and perform a case-insensitive lookup
  const normalized = localeParam.trim();
  if (normalized === "") {
    return defaultLocale;
  }

  const match = locales.find(
    (l) => l.toLowerCase() === normalized.toLowerCase()
  );
  return match ?? defaultLocale;
};

// Generate static paths for locale pages (excludes default locale from [locale] routes)
export const getLocaleStaticPaths = () =>
  locales
    .filter((l) => l !== defaultLocale)
    .map((l) => ({ params: { locale: l } }));
