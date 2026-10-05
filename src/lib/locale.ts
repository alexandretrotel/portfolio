import { RESUME_LOCALES, type ResumeLocale } from "../data/resume";

export const LOCALE_COOKIE = "locale";
export const BASE_LOCALE: ResumeLocale = "en";

const matchLocale = (tag: string): ResumeLocale | undefined => {
  const normalized = tag.trim().toLowerCase();
  const dash = normalized.indexOf("-");
  const language = dash === -1 ? normalized : normalized.slice(0, dash);
  return RESUME_LOCALES.find((locale) => locale === language);
};

export const detectLocale = (
  cookie: string | undefined,
  languages: readonly string[],
): ResumeLocale =>
  (cookie && matchLocale(cookie)) ||
  languages.map(matchLocale).find((locale) => locale !== undefined) ||
  BASE_LOCALE;

export const parseAcceptLanguage = (header: string | null): string[] =>
  (header ?? "")
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return { tag, weight: q ? Number(q.trim().slice(2)) : 1 };
    })
    .filter(({ tag, weight }) => tag && tag !== "*" && weight > 0)
    .toSorted((a, b) => b.weight - a.weight)
    .map(({ tag }) => tag);
