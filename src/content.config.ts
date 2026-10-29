import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

const part = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.coerce.date().optional(),
  updated: z.boolean().default(false),
});

const articles = defineCollection({
  loader: glob({ pattern: "*/*.md", base: "./src/content/articles" }),
  schema: part,
});

export const collections = { articles };
