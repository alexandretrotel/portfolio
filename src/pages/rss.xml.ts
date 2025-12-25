import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const blogEn = await getCollection("blog/en");

  return rss({
    title: "Alexandre Trotel",
    description:
      "Alexandre Trotel is a tech entrepreneur and full-stack developer.",
    site: context.site ?? new URL("https://www.alexandretrotel.org"),
    items: blogEn.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/blog/${post.id}/`,
    })),
    customData: "<language>en-us</language>",
  });
}
