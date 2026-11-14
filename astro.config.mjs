// @ts-check
import cloudflare from "@astrojs/cloudflare";
import { rehypeHeadingIds, unified } from "@astrojs/markdown-remark";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";

import { rehypeFocusableHeadings } from "./src/lib/rehype-focusable-headings.ts";

export default defineConfig({
  site: "https://www.alexandretrotel.org",
  output: "static",
  trailingSlash: "never",
  adapter: cloudflare(),
  markdown: {
    processor: unified({
      rehypePlugins: [
        [rehypeExternalLinks, { rel: ["noreferrer"] }],
        rehypeHeadingIds,
        rehypeFocusableHeadings,
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
      ],
    }),
  },
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith("/404.html"),
    }),
  ],
});
