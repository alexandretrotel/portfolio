import type { APIRoute } from "astro";

import { getCollection, type CollectionEntry } from "astro:content";

import { formatDate } from "./format";

type WritingCollection = "essays" | "notes";

export const markdownTwinRoutes = (collection: WritingCollection) => {
  const getStaticPaths = async () => {
    const entries = await getCollection(collection);
    return entries.map((entry) => ({
      params: { slug: entry.id },
      props: { entry },
    }));
  };

  const GET: APIRoute<{ entry: CollectionEntry<WritingCollection> }> = async ({ props }) => {
    const { entry } = props;
    const { title, date, updated } = entry.data;
    const body = `# ${title}\n\n_${formatDate(date, updated)}_\n\n${entry.body}`;
    return new Response(body, {
      headers: { "Content-Type": "text/markdown; charset=utf-8" },
    });
  };

  return { getStaticPaths, GET };
};
