import { createFileRoute } from "@tanstack/react-router";

import { SITE } from "~/lib/site";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(`User-agent: *\nAllow: /\n\nSitemap: ${SITE.baseUrl}/sitemap.xml`, {
          headers: { "Content-Type": "text/plain" },
        }),
    },
  },
});
