import type { APIRoute } from "astro";

import { getCollection } from "astro:content";

import { rootLlmsTxt } from "../lib/llms";

export const GET: APIRoute = async () => {
  const essays = await getCollection("essays");
  return new Response(rootLlmsTxt(essays), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
