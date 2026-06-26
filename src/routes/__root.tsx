import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import { Header } from "~/components/header";
import { SITE } from "~/lib/site";

import globalsCss from "~/styles/app.css?url";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  description: SITE.description,
  jobTitle: "Entrepreneur & Developer",
  name: "Alexandre Trotel",
  sameAs: [SITE.github, SITE.twitter],
  url: SITE.baseUrl,
};

const RootDocument = ({ children }: { children: ReactNode }) => (
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

export const Route = createRootRoute({
  component: () => <Outlet />,
  head: () => ({
    links: [
      { href: globalsCss, rel: "stylesheet" },
      { href: "/logo.png", rel: "icon", type: "image/png" },
      { href: "/sitemap.xml", rel: "sitemap", type: "application/xml" },
    ],
    meta: [
      { charSet: "utf-8" },
      { content: "width=device-width, initial-scale=1", name: "viewport" },
      { title: SITE.title },
      { content: SITE.description, name: "description" },
      { content: "website", property: "og:type" },
      { content: "en_US", property: "og:locale" },
      { content: "Alexandre Trotel", property: "og:site_name" },
      { content: SITE.title, property: "og:title" },
      { content: SITE.description, property: "og:description" },
      { content: SITE.ogImage, property: "og:image" },
      { content: "summary_large_image", name: "twitter:card" },
      { content: "@alexandretrotel", name: "twitter:creator" },
      { content: SITE.title, name: "twitter:title" },
      { content: SITE.description, name: "twitter:description" },
      { content: SITE.ogImage, name: "twitter:image" },
    ],
    scripts: [
      {
        children: JSON.stringify(personSchema),
        type: "application/ld+json",
      },
    ],
  }),
  shellComponent: RootDocument,
});
