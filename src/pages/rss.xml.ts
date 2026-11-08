import rss from "@astrojs/rss";
import type { APIRoute } from "astro";

import { SITE } from "../data/site";
import { getSortedArticles } from "../lib/articles";

export const GET: APIRoute = async (context) => {
  const articles = await getSortedArticles();
  return await rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site ?? SITE.url,
    trailingSlash: false,
    items: articles.map((article) => ({
      title: article.title,
      description: article.description,
      pubDate: article.date,
      link: `/articles/${article.slug}`,
    })),
  });
};
