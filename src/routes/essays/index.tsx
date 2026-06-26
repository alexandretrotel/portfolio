import { Link, createFileRoute } from "@tanstack/react-router";

import { essays } from "~/lib/essays";
import { SITE } from "~/lib/site";

const linkClass =
  "font-medium text-link decoration-link/40 decoration-[0.06em] underline underline-offset-[0.18em] hover:decoration-link active:opacity-70";

const Essays = () => (
  <section className="mx-auto flex h-full w-full max-w-152 flex-col pt-[15vh]">
    <div className="space-y-3.5 text-base leading-relaxed text-foreground">
      <p>
        I had difficulty to crystallize my thought; and writing helped me at
        this. Thus, here are some essays I've written.
      </p>
      <ul className="list-disc pl-5">
        {essays.map((essay) => (
          <li key={essay.slug}>
            <Link
              className={linkClass}
              params={{ slug: essay.slug }}
              to="/essays/$slug"
            >
              {essay.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export const Route = createFileRoute("/essays/")({
  component: Essays,
  head: () => ({
    links: [{ href: `${SITE.baseUrl}/essays`, rel: "canonical" }],
    meta: [
      { title: `Essays | ${SITE.title}` },
      { content: "Essays by Alexandre Trotel.", name: "description" },
    ],
  }),
});
