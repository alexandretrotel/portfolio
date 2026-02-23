import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

import type { BlogCollection } from "@/content.config";

export const GET = async (context: APIContext) => {
  const blogPosts: CollectionEntry<BlogCollection>[] =
    await getCollection("blog");

  return rss({
    customData: "<language>en-us</language>",
    description: "atrtde is a tech entrepreneur and full-stack developer.",
    items: blogPosts.map((post) => ({
      description: post.data.description,
      link: `/blog/${post.id}/`,
      pubDate: post.data.date,
      title: post.data.title,
    })),
    site: context.site ?? new URL("https://www.alexandretrotel.org"),
    title: "atrtde",
  });
};
