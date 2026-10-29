import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";

export interface Essay {
  slug: string;
  title: string;
  description: string;
  date: Date;
  updated: boolean;
  parts: CollectionEntry<"essays">[];
}

export const getSortedEssays = async (): Promise<Essay[]> => {
  const all = await getCollection("essays");
  const entries = all.toSorted((a, b) => a.id.localeCompare(b.id));
  const groups = Map.groupBy(entries, (entry) => entry.id.split("/")[0] ?? "");

  const essays = [...groups].map(([slug, parts]) => {
    const { title, description, date, updated } = parts[0]?.data ?? {};
    if (
      title === undefined ||
      description === undefined ||
      date === undefined
    ) {
      throw new Error(
        `Essay "${slug}" needs title, description and date on its first part`
      );
    }
    return { slug, title, description, date, updated: updated ?? false, parts };
  });

  return essays.toSorted((a, b) => b.date.getTime() - a.date.getTime());
};

export const getPartSlug = (essay: Essay, index: number) => {
  const file = essay.parts[index]?.id.split("/")[1] ?? "";
  return index === 0
    ? essay.slug
    : `${essay.slug}/${file.replace(/^\d+-/u, "")}`;
};

export const getPartTitle = (essay: Essay, index: number) =>
  index === 0 ? "Introduction" : (essay.parts[index]?.data.title ?? "");
