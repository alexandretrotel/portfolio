import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

export type BlogCollection = "blog/en" | "blog/fr";

const BlogSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  published: z.boolean().default(true),
});

const blogEn = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog/en" }),
  schema: BlogSchema,
});

const blogFr = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog/fr" }),
  schema: BlogSchema,
});

export const collections = {
  "blog/en": blogEn,
  "blog/fr": blogFr,
};
