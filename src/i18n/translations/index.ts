import { defaultLocale } from "@/i18n/locales";
import type { Locale } from "@/i18n/locales";

import { en } from "./en";
import { fr } from "./fr";
import type { Translations } from "./types";
export const translations: Record<Locale, Translations> = {
  en,
  fr,
};

export const getTranslations = (locale?: Locale): Translations =>
  translations[locale ?? defaultLocale];
