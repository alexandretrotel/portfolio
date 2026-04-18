import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  adapter: vercel(),
  integrations: [sitemap({})],
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
