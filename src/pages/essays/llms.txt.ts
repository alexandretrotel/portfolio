import type { APIRoute } from "astro";

import { getCollection } from "astro:content";

import { essaysDirectoryTxt } from "../../lib/llms";

export const GET: APIRoute = async () => {
  const entries = await getCollection("essays");
  return new Response(essaysDirectoryTxt(entries), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
