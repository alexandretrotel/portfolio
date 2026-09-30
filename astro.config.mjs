// @ts-check
import cloudflare from "@astrojs/cloudflare";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";

export default defineConfig({
  site: "https://www.alexandretrotel.org",
  output: "static",
  trailingSlash: "never",
  adapter: cloudflare(),
  markdown: {
    rehypePlugins: [
      [rehypeExternalLinks, { target: "_blank", rel: ["noreferrer"] }],
      rehypeHeadingIds,
      [rehypeAutolinkHeadings, { behavior: "wrap" }],
    ],
  },
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith(".md") && !page.endsWith("/404.html"),
    }),
  ],
});
