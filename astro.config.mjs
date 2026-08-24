// @ts-check
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import rehypeExternalLinks from "rehype-external-links";

// https://astro.build/config
export default defineConfig({
  site: "https://www.alexandretrotel.org",
  output: "static",
  trailingSlash: "never",
  markdown: {
    // keep straight quotes/hyphens as authored, matching the original
    // hand-written HTML instead of remark's smart-typography conversion
    smartypants: false,
    // code blocks stay unhighlighted by design, see README
    syntaxHighlight: false,
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
