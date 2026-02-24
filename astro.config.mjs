import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

import { remarkReadingTime } from "./src/core/primitives/utils/remark-reading-time";

export default defineConfig({
  adapter: vercel(),
  integrations: [svelte(), sitemap({})],
  markdown: {
    rehypePlugins: [rehypeKatex],
    remarkPlugins: [remarkMath, remarkReadingTime],
  },
  output: "server",
  prefetch: {
    prefetchAll: true,
  },
  site: "https://www.alexandretrotel.org",
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": new URL("src", import.meta.url).pathname,
      },
    },
  },
});
