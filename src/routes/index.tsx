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
    <section className="mx-auto flex h-full w-full max-w-152 flex-col py-1">
      <div className="space-y-3.5 text-[0.9375rem] leading-[1.85] text-muted-foreground">
        <p className="stagger-item">
          I&apos;m the co-founder of{" "}
          <a className={linkClass} href="https://www.radion.app" rel="noreferrer" target="_blank">
            Radion
          </a>
          , where we help prediction market traders by building the ultimate intelligence layer.
        </p>
        <p className="stagger-item [transition-delay:60ms]">
          I also created{" "}
          <a
            className={linkClass}
            href="https://www.zapstudio.dev"
            rel="noreferrer"
            target="_blank"
          >
            Zap Studio
          </a>
          , an open-source initiative for type-safe TypeScript libraries that work across any stack
          with projects like{" "}
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
        <p className="stagger-item [transition-delay:120ms]">
          I also maintain{" "}
          <a
            className={linkClass}
            href="https://github.com/alexandretrotel/todo-tree"
            rel="noreferrer"
            target="_blank"
          >
            todo-tree
          </a>
          ,{" "}
          <a
            className={linkClass}
            href="https://github.com/alexandretrotel/mntn"
            rel="noreferrer"
            target="_blank"
          >
            mntn
          </a>
          , and{" "}
          <a
            className={linkClass}
            href="https://github.com/alexandretrotel/feedyourai"
            rel="noreferrer"
            target="_blank"
          >
            fyai
          </a>{" "}
          under GPL-3.0 which are tools for finding TODO comments, managing dotfiles, and bundling
          files for AI processing respectively.
        </p>
      </div>
    </section>
  );
}
