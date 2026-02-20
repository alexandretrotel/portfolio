import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

export type BlogCollection = "blog/en" | "blog/fr";

const BlogSchema = z.object({
  date: z.coerce.date(),
  description: z.string(),
  published: z.boolean().default(true),
  title: z.string(),
});

const blogEn = defineCollection({
  loader: glob({ base: "./src/content/blog/en", pattern: "**/*.md" }),
  schema: BlogSchema,
});

const blogFr = defineCollection({
  loader: glob({ base: "./src/content/blog/fr", pattern: "**/*.md" }),
  schema: BlogSchema,
});

export const collections = {
  "blog/en": blogEn,
  "blog/fr": blogFr,
};
