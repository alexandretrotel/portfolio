import { HeadContent, Outlet, Scripts, createRootRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { Header } from "~/components/Header";
import { SITE } from "~/lib/site";

import globalsCss from "~/styles/app.css?url";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Alexandre Trotel",
  url: SITE.baseUrl,
  sameAs: [SITE.github],
  jobTitle: "Founder & Developer",
  description: SITE.description,
};

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: SITE.title },
      { name: "description", content: SITE.description },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_US" },
      { property: "og:site_name", content: "Alexandre Trotel" },
      { property: "og:title", content: SITE.title },
      { property: "og:description", content: SITE.description },
      { property: "og:image", content: SITE.ogImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE.title },
      { name: "twitter:description", content: SITE.description },
      { name: "twitter:image", content: SITE.ogImage },
    ],
    links: [
      { rel: "stylesheet", href: globalsCss },
      { rel: "icon", type: "image/png", href: "/logo.png" },
      { rel: "sitemap", type: "application/xml", href: "/sitemap.xml" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(personSchema),
      },
    ],
  }),
  shellComponent: RootDocument,
  component: () => <Outlet />,
});

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="antialiased">
        <div className="min-h-screen bg-background px-6">
          <Header />
          <main className="mx-auto min-h-[calc(100vh-8rem)] max-w-152 pb-12 md:pb-18">
            {children}
          </main>
        </div>
        <Scripts />
      </body>
    </html>
  );
}
