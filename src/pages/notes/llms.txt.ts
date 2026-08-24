import type { APIRoute } from "astro";

import { getCollection } from "astro:content";

import { notesDirectoryTxt } from "../../lib/llms";

export const GET: APIRoute = async () => {
  const entries = await getCollection("notes");
  return new Response(notesDirectoryTxt(entries), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
