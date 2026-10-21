// @ts-check
import cloudflare from "@astrojs/cloudflare";
import { rehypeHeadingIds, unified } from "@astrojs/markdown-remark";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";

export default defineConfig({
  site: "https://www.alexandretrotel.org",
  output: "static",
  trailingSlash: "never",
  adapter: cloudflare(),
  redirects: {
    "/resume": "/resume/en.pdf",
  },
  markdown: {
    processor: unified({
      rehypePlugins: [
        [rehypeExternalLinks, { rel: ["noreferrer"] }],
        rehypeHeadingIds,
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
      ],
    }),
  },
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith(".md") && !page.endsWith("/404.html"),
    }),
  ],
});
