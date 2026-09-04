import type { APIRoute } from "astro";

import { getCollection } from "astro:content";

import { SITE, PROJECTS } from "../data/site";

export const GET: APIRoute = async () => {
  const essays = await getCollection("essays");

  const projectItems = PROJECTS.map((p) => `- [${p.name}](${p.url}) ${p.blurb}`).join("\n");
  const essayItems = essays.map((e) => `- [${e.data.title}](/essays/${e.id}.html)`).join("\n");

  const body = `# ${SITE.name}

Founded [${SITE.founder.name}](${SITE.founder.url}) to ship the type-safe, framework-agnostic and composable TypeScript libraries the web is still missing.

Making open-source tools that developers use daily:

${projectItems}

Read some of my essays below:

${essayItems}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
