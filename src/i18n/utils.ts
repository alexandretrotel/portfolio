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

export function getBlogEntry(locale: Locale): `blog-${Locale}` {
  return `blog-${locale}` as const;
}
