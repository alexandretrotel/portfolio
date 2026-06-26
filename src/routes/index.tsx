import { createFileRoute } from "@tanstack/react-router";

import { SITE } from "~/lib/site";

const linkClass =
  "font-medium text-foreground decoration-border/80 decoration-[0.06em] underline underline-offset-[0.18em] hover:decoration-foreground active:opacity-70";

const Home = () => (
  <section className="mx-auto flex h-full w-full max-w-152 flex-col pt-[15vh]">
    <div className="space-y-3.5 text-[0.9375rem] leading-[1.85] text-muted-foreground">
      <p>
        I co-founded{" "}
        <a
          className={linkClass}
          href="https://www.radion.app"
          rel="noreferrer"
          target="_blank"
        >
          Radion
        </a>{" "}
        to build the intelligence layer for prediction markets — research tools
        and signal tracking for traders who take the space seriously.
      </p>
      <p>
        I also started{" "}
        <a
          className={linkClass}
          href="https://www.zapstudio.dev"
          rel="noreferrer"
          target="_blank"
        >
          Zap Studio
        </a>{" "}
        to build the TypeScript utilities I kept reaching for but couldn&apos;t
        find — type-safe, runtime-agnostic, dependency-light:{" "}
        <a
          className={linkClass}
          href="https://www.zapstudio.dev/packages/validation"
          rel="noreferrer"
          target="_blank"
        >
          validation
        </a>
        ,{" "}
        <a
          className={linkClass}
          href="https://www.zapstudio.dev/packages/fetch"
          rel="noreferrer"
          target="_blank"
        >
          fetch
        </a>
        ,{" "}
        <a
          className={linkClass}
          href="https://www.zapstudio.dev/packages/permit"
          rel="noreferrer"
          target="_blank"
        >
          permit
        </a>
        ,{" "}
        <a
          className={linkClass}
          href="https://www.zapstudio.dev/packages/retry"
          rel="noreferrer"
          target="_blank"
        >
          retry
        </a>
        , and{" "}
        <a
          className={linkClass}
          href="https://www.zapstudio.dev/packages/webhooks"
          rel="noreferrer"
          target="_blank"
        >
          webhooks
        </a>
        .
      </p>
      <p>
        Outside of that, I maintain a few open-source tools for my own workflow:{" "}
        <a
          className={linkClass}
          href="https://github.com/alexandretrotel/todo-tree"
          rel="noreferrer"
          target="_blank"
        >
          todo-tree
        </a>{" "}
        for surfacing TODO comments,{" "}
        <a
          className={linkClass}
          href="https://github.com/alexandretrotel/mntn"
          rel="noreferrer"
          target="_blank"
        >
          mntn
        </a>{" "}
        for dotfile management, and{" "}
        <a
          className={linkClass}
          href="https://github.com/alexandretrotel/feedyourai"
          rel="noreferrer"
          target="_blank"
        >
          fyai
        </a>{" "}
        for packaging files into LLM context.
      </p>
    </div>
  </section>
);

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    links: [{ href: SITE.baseUrl, rel: "canonical" }],
    meta: [
      { title: SITE.title },
      { content: SITE.description, name: "description" },
      { content: SITE.baseUrl, property: "og:url" },
      { content: SITE.title, property: "og:title" },
      { content: SITE.description, property: "og:description" },
      { content: SITE.title, name: "twitter:title" },
      { content: SITE.description, name: "twitter:description" },
    ],
  }),
});
