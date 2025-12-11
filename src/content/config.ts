import { defineCollection, z } from "astro:content";

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.date(),
  published: z.boolean().default(true),
});

const englishBlog = defineCollection({
  type: "content",
  schema: blogSchema,
});

const frenchBlog = defineCollection({
  type: "content",
  schema: blogSchema,
});

export const collections = {
  "blog-en": englishBlog,
  "blog-fr": frenchBlog,
};
