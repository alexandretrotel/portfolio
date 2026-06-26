import { createFileRoute } from "@tanstack/react-router";

import { SITE } from "~/lib/site";

const linkClass =
  "font-medium text-link decoration-link/40 decoration-[0.06em] underline underline-offset-[0.18em] hover:decoration-link active:opacity-70";

const Home = () => (
  <section className="mx-auto flex h-full w-full max-w-152 flex-col pt-[15vh]">
    <div className="space-y-3.5 text-base leading-relaxed text-foreground">
      <p>
        Co-founded{" "}
        <a
          className={linkClass}
          href="https://www.radion.app"
          rel="noreferrer"
          target="_blank"
        >
          Radion
        </a>{" "}
        to help prediction market traders copy the best traders.
      </p>
      <p>
        Started{" "}
        <a
          className={linkClass}
          href="https://www.zapstudio.dev"
          rel="noreferrer"
          target="_blank"
        >
          Zap Studio
        </a>{" "}
        building type-safe, runtime-agnostic and lightweight libraries.
      </p>
      <p>Making open-source tools that developers use daily:</p>
      <ul className="list-disc pl-5">
        <li>
          <a
            className={linkClass}
            href="https://github.com/alexandretrotel/todo-tree"
            rel="noreferrer"
            target="_blank"
          >
            todo-tree
          </a>{" "}
          for surfacing TODO comments
        </li>
        <li>
          <a
            className={linkClass}
            href="https://github.com/alexandretrotel/mntn"
            rel="noreferrer"
            target="_blank"
          >
            mntn
          </a>{" "}
          for dotfile management
        </li>
        <li>
          <a
            className={linkClass}
            href="https://github.com/alexandretrotel/feedyourai"
            rel="noreferrer"
            target="_blank"
          >
            fyai
          </a>{" "}
          for packaging files into LLM context
        </li>
      </ul>
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
