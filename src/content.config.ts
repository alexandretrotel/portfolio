import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

const writing = z.object({
  title: z.string(),
  description: z.string(),
  socialDescription: z.string().optional(),
  llmsSummary: z.string(),
  date: z.coerce.date(),
  updated: z.boolean().default(false),
});

const essays = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/essays" }),
  schema: writing,
});

const notes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/notes" }),
  schema: writing,
});

export const collections = { essays, notes };
