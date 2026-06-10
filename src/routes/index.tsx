import { createFileRoute } from "@tanstack/react-router";

import { SITE } from "~/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: SITE.title },
      { name: "description", content: SITE.description },
      { property: "og:url", content: SITE.baseUrl },
      { property: "og:title", content: SITE.title },
      { property: "og:description", content: SITE.description },
      { name: "twitter:title", content: SITE.title },
      { name: "twitter:description", content: SITE.description },
    ],
  }),
  component: Home,
});

const linkClass =
  "font-medium text-foreground decoration-border/80 decoration-[0.06em] underline underline-offset-[0.18em] transition-colors duration-150 hover:decoration-foreground active:opacity-70";

function Home() {
  return (
    <section className="mx-auto flex h-full w-full max-w-152 flex-col pt-[15vh]">
      <div className="space-y-3.5 text-[0.9375rem] leading-[1.85] text-muted-foreground">
        <p className="stagger-item">
          I co-founded{" "}
          <a className={linkClass} href="https://www.radion.app" rel="noreferrer" target="_blank">
            Radion
          </a>{" "}
          to build the intelligence layer for prediction markets — research tools and signal
          tracking for traders who take the space seriously.
        </p>
        <p className="stagger-item [animation-delay:150ms]">
          I also started{" "}
          <a
            className={linkClass}
            href="https://www.zapstudio.dev"
            rel="noreferrer"
            target="_blank"
          >
            Zap Studio
          </a>{" "}
          to build the TypeScript utilities I kept reaching for but couldn&apos;t find — type-safe,
          runtime-agnostic, dependency-light:{" "}
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
        <p className="stagger-item [animation-delay:300ms]">
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
}
