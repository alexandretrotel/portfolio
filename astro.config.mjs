import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

import { defaultLocale, locales } from "./src/i18n/locales";
import { remarkReadingTime } from "./src/lib/remark-reading-time";

export default defineConfig({
  adapter: vercel(),
  i18n: {
    defaultLocale,
    locales,
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    svelte(),
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en",
          fr: "fr",
        },
      },
    }),
  ],
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
