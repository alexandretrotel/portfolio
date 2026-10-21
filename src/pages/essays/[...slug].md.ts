import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

import { formatDate } from "../../lib/format";

export const getStaticPaths = async () => {
  const entries = await getCollection("essays");
  return entries.map((entry) => ({
    params: { slug: entry.id },
    props: { entry },
  }));
};

export const GET: APIRoute<{ entry: CollectionEntry<"essays"> }> = ({
  props,
}) => {
  const { entry } = props;
  const { title, date, updated } = entry.data;
  const body = `# ${title}\n\n_${formatDate(date, updated)}_\n\n${entry.body}`;
  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
