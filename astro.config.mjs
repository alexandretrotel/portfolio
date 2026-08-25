// @ts-check
import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import rehypeExternalLinks from "rehype-external-links";

export default defineConfig({
  site: "https://www.alexandretrotel.org",
  output: "static",
  trailingSlash: "never",
  adapter: cloudflare(),
  markdown: {
    rehypePlugins: [[rehypeExternalLinks, { target: "_blank", rel: ["noreferrer"] }]],
  },
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith(".md") && !page.endsWith("/404.html"),
    }),
  ],
});
