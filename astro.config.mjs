// @ts-check
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import rehypeExternalLinks from "rehype-external-links";

export default defineConfig({
  site: "https://www.alexandretrotel.org",
  output: "static",
  trailingSlash: "never",
  markdown: {
    rehypePlugins: [[rehypeExternalLinks, { target: "_blank", rel: ["noreferrer"] }]],
  },
  build: {
    format: "file",
  },
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith(".md") && !page.endsWith("/404.html"),
      serialize(item) {
        const url = new URL(item.url);
        if (url.pathname !== "/" && !url.pathname.includes(".")) {
          url.pathname += ".html";
          item.url = url.toString();
        }
        return item;
      },
    }),
  ],
});
