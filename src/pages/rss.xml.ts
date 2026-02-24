import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import type { BlogCollection } from "@/content.config";
import { SITE_CONFIG } from "@/shared/config/site";

export const GET = async (context: APIContext) => {
  const blogPosts: CollectionEntry<BlogCollection>[] =
    await getCollection("blog");

  return rss({
    customData: "<language>en-us</language>",
    description: SITE_CONFIG.description,
    items: blogPosts.map((post) => ({
      description: post.data.description,
      link: `/blog/${post.id}/`,
      pubDate: post.data.date,
      title: post.data.title,
    })),
    site: context.site ?? new URL(SITE_CONFIG.baseUrl),
    title: SITE_CONFIG.title,
  });
};
