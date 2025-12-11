import { getRelativeLocaleUrl } from "astro:i18n";
import { defaultLocale, type Locale, localeFormats } from "./locales";

// FIXME: make it work independantly of just "fr" locale
export function getLocaleFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split("/");
  if (lang === "fr") {
    return "fr";
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

// FIXME: make it work independantly of just "fr" locale
export function stripLocaleFromPath(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments[0] === "fr") {
    const rest = segments.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }
  return pathname;
}
