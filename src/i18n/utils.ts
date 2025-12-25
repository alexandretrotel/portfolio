import { getRelativeLocaleUrl } from "astro:i18n";
import { defaultLocale, type Locale, localeFormats, locales } from "./locales";

export function getLocaleFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split("/");
  if (locales.includes(lang as Locale)) {
    return lang as Locale;
  }
  return defaultLocale;
}

export function getLocalizedPath(locale: Locale, path: string): string {
  return getRelativeLocaleUrl(locale, path);
}

export function formatDate(date: Date, locale: Locale): string {
  return date.toLocaleDateString(localeFormats[locale], {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatNumber(num: number, locale: Locale): string {
  return new Intl.NumberFormat(localeFormats[locale]).format(num);
}

export function stripLocaleFromPath(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (locales.includes(segments[0] as Locale)) {
    const rest = segments.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }
  return pathname;
}

export function getBlogEntry(locale: Locale): `blog/${Locale}` {
  return `blog/${locale}` as const;
}

// Get locale from route params (handles undefined for default locale)
export function getLocaleFromParams(localeParam: string | undefined): Locale {
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
}

// Generate static paths for locale pages (excludes default locale from [locale] routes)
export function getLocaleStaticPaths() {
  return locales
    .filter((l) => l !== defaultLocale)
    .map((l) => ({ params: { locale: l } }));
}
