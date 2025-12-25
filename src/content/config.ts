import { defineCollection } from "astro:content";
import { z } from "astro/zod";

export type BlogCollection = "blog/en" | "blog/fr";

const BlogSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.date(),
  published: z.boolean().default(true),
});

const blog = defineCollection({
  type: "content",
  schema: BlogSchema,
});

export const collections = {
  "blog/en": blog,
  "blog/fr": blog,
};
