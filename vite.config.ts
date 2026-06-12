import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    tanstackStart({
      prerender: {
        autoStaticPathsDiscovery: true,
        crawlLinks: true,
        enabled: true,
      },
      sitemap: {
        host: "https://www.alexandretrotel.org",
      },
      srcDirectory: "src",
    }),
    viteReact(),
    nitro({ preset: "vercel" }),
  ],
  resolve: {
    tsconfigPaths: true,
  },
});
