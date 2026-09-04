import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

const writing = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  updated: z.boolean().default(false),
});

const essays = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/essays" }),
  schema: writing,
});

export const collections = { essays };

export type WritingData = z.infer<typeof writing>;
