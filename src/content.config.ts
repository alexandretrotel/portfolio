import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

export type BlogCollection = "blog";

const BlogSchema = z.object({
  date: z.coerce.date(),
  description: z.string(),
  published: z.boolean().default(true),
  title: z.string(),
});

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.md" }),
  schema: BlogSchema,
});

export const collections = {
  blog,
};
