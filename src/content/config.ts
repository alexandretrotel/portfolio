import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const BlogSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.date(),
  published: z.boolean().default(true),
});

const englishBlog = defineCollection({
  type: "content",
  schema: BlogSchema,
});

const frenchBlog = defineCollection({
  type: "content",
  schema: BlogSchema,
});

export const collections = {
  "blog-en": englishBlog,
  "blog-fr": frenchBlog,
};
