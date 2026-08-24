import type { APIRoute } from "astro";

import { getCollection, type CollectionEntry, type CollectionKey } from "astro:content";

import { formatDate } from "./format";

export const markdownTwinRoutes = <C extends CollectionKey>(collection: C) => {
  const getStaticPaths = async () => {
    const entries = await getCollection(collection);
    return entries.map((entry) => ({
      params: { slug: entry.id },
      props: { entry },
    }));
  };

  const GET: APIRoute = async ({ props }) => {
    // SAFETY: props is always the { entry } object this file's own
    // getStaticPaths returned above, for this same collection.
    const entry = props.entry as CollectionEntry<C>;
    // SAFETY: both collections this helper is used for share the same
    // `writing` schema in src/content.config.ts, so entry.data always has
    // these fields regardless of which collection C resolves to.
    const { title, date, updated } = entry.data as { title: string; date: Date; updated: boolean };
    const body = `# ${title}\n\n_${formatDate(date, updated)}_\n\n${entry.body}`;
    return new Response(body, {
      headers: { "Content-Type": "text/markdown; charset=utf-8" },
    });
  };

  return { getStaticPaths, GET };
};
