import type { ComponentType } from "react";

export interface EssayFrontmatter {
  title: string;
  date: string;
  description: string;
}

export interface EssayModule {
  default: ComponentType;
  frontmatter: EssayFrontmatter;
}

export type EssayMeta = EssayFrontmatter & { slug: string };

const modules = import.meta.glob<EssayModule>("../essays/*.mdx", {
  eager: true,
});

const toSlug = (path: string) =>
  path
    .split("/")
    .at(-1)
    ?.replace(/\.mdx$/u, "") ?? "";

export const essays: EssayMeta[] = Object.entries(modules)
  .map(([path, mod]) => ({ slug: toSlug(path), ...mod.frontmatter }))
  .toSorted((a, b) => b.date.localeCompare(a.date));

export const getEssay = (slug: string): EssayModule | undefined =>
  Object.entries(modules).find(([path]) => toSlug(path) === slug)?.[1];
