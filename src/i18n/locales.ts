export const locales = ["en", "fr"] as const;
export const defaultLocale = "en" as const;

export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: "English",
  fr: "Français",
};

export const localeFormats: Record<Locale, string> = {
  en: "en-US",
  fr: "fr-FR",
};
