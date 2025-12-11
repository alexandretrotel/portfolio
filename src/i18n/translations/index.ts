import { defaultLocale, type Locale } from "../locales";
import { en } from "./en";
import { fr } from "./fr";
import type { Translations } from "./types";
export const translations: Record<Locale, Translations> = {
  en,
  fr,
};

export function getTranslations(locale?: Locale): Translations {
  return translations[locale ?? defaultLocale];
}
