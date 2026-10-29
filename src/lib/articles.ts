import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";

export interface Article {
  slug: string;
  title: string;
  description: string;
  date: Date;
  updated: boolean;
  parts: CollectionEntry<"articles">[];
}

export const getSortedArticles = async (): Promise<Article[]> => {
  const all = await getCollection("articles");
  const entries = all.toSorted((a, b) => a.id.localeCompare(b.id));
  const groups = Map.groupBy(entries, (entry) => entry.id.split("/")[0] ?? "");

  const articles = [...groups].map(([slug, parts]) => {
    const { title, description, date, updated } = parts[0]?.data ?? {};
    if (
      title === undefined ||
      description === undefined ||
      date === undefined
    ) {
      throw new Error(
        `Article "${slug}" needs title, description and date on its first part`
      );
    }
    return { slug, title, description, date, updated: updated ?? false, parts };
  });

  return articles.toSorted((a, b) => b.date.getTime() - a.date.getTime());
};

export const getPartSlug = (article: Article, index: number) => {
  const file = article.parts[index]?.id.split("/")[1] ?? "";
  return index === 0
    ? article.slug
    : `${article.slug}/${file.replace(/^\d+-/u, "")}`;
};

export const getPartTitle = (article: Article, index: number) =>
  index === 0 ? "Introduction" : (article.parts[index]?.data.title ?? "");
