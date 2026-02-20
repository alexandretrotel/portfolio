import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";

export const GET = async (context: APIContext) => {
  const blogEn = await getCollection("blog/en");

  return rss({
    customData: "<language>en-us</language>",
    description:
      "Alexandre Trotel is a tech entrepreneur and full-stack developer.",
    items: blogEn.map((post: (typeof blogEn)[number]) => ({
      description: post.data.description,
      link: `/blog/${post.id}/`,
      pubDate: post.data.date,
      title: post.data.title,
    })),
    site: context.site ?? new URL("https://www.alexandretrotel.org"),
    title: "Alexandre Trotel",
  });
};
