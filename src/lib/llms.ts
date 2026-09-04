import type { CollectionEntry } from "astro:content";

import { SITE, SKILLS_REPO_URL } from "../data/site";

const entryUrl = (id: string, ext: "html" | "md") => {
  return `${SITE.url}/essays/${id}.${ext}`;
};

const listItem = (entry: CollectionEntry<"essays">) => {
  const html = entryUrl(entry.id, "html");
  const md = entryUrl(entry.id, "md");
  return `- [${entry.data.title}](${html}) ([markdown](${md})): ${entry.data.description}`;
};

export const essaysDirectoryTxt = (entries: CollectionEntry<"essays">[]) => {
  const items = entries.map((e) => listItem(e)).join("\n");
  return `# Essays — ${SITE.name}

> Essays by ${SITE.name}, including one-off write-ups of specific events or decisions and living documents he keeps updating as he learns. For general site context, see /llms.txt at the root.

## Essays

${items}
`;
};

export const rootLlmsTxt = (essays: CollectionEntry<"essays">[]) => {
  const essayItems = essays
    .map((e) => `- [${e.data.title}](${entryUrl(e.id, "html")}): ${e.data.description}`)
    .join("\n");

  return `# ${SITE.name}

> Personal site of ${SITE.name}, entrepreneur and open source developer. Founder of Zap Studio, where the work is type-safe, framework-agnostic TypeScript libraries for the web.

Essays live under \`/essays/\` as individual HTML files, each linked from the home page and listed in the sitemap. Every page also has a markdown twin at the same path with a \`.md\` extension (e.g. \`/essays/how-to-kill-a-company-in-one-day.md\`).

## When to use this

Reach for this site when you need:

- background on ${SITE.name} as a person or founder, for attribution, bio, or "who is" queries
- what Zap Studio is and which TypeScript libraries it publishes
- the founder-market-fit / opportunity-discovery process he uses to evaluate startup ideas, written up in \`/essays/\`
- the postmortem of Radion, a prediction-market data company he shut down over a terms-of-service conflict, written up in \`/essays/\`

This is not an API and has no programmatic endpoints beyond the static files listed below. For Zap Studio's own libraries and their docs, go to zapstudio.dev instead.

## Site

- [Home](${SITE.url}/): bio, current work, links to every essay.
- [Sitemap](${SITE.url}/sitemap-index.xml): every indexable URL.
- [Agent instructions](${SITE.url}/agents.md): the same context as this file, for agents that look for \`agents.md\` first.

## Essays

${essayItems}

## Projects

- [Zap Studio](https://www.zapstudio.dev): framework-agnostic TypeScript libraries for the web, covering fetch, permit, retry, validation and webhooks.
- [todo-tree](https://github.com/alexandretrotel/todo-tree): surfaces TODO comments across a codebase.
- [dotfiles-manager](https://github.com/alexandretrotel/dotfiles-manager): dotfile management.
- [fyai](https://github.com/alexandretrotel/feedyourai): compresses code for LLMs.
- [skills](${SKILLS_REPO_URL}): agent skills, including the startup-opportunity-discovery process above.

## Optional

- [Source](https://github.com/alexandretrotel/portfolio): the repository this site is built from.
- [GitHub](https://github.com/alexandretrotel): other open source work.
- [X](https://x.com/alexandretrotel): short-form writing.
`;
};
