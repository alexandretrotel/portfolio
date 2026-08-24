import type { CollectionEntry } from "astro:content";

import { SITE, SKILLS_REPO_URL } from "../data/site";

const entryUrl = (collection: "essays" | "notes", id: string, ext: "html" | "md") => {
  return `${SITE.url}/${collection}/${id}.${ext}`;
};

const listItem = (entry: CollectionEntry<"essays" | "notes">, collection: "essays" | "notes") => {
  const html = entryUrl(collection, entry.id, "html");
  const md = entryUrl(collection, entry.id, "md");
  return `- [${entry.data.title}](${html}) ([markdown](${md})): ${entry.data.llmsSummary}`;
};

export const essaysDirectoryTxt = (entries: CollectionEntry<"essays">[]) => {
  const items = entries.map((e) => listItem(e, "essays")).join("\n");
  return `# Essays — ${SITE.name}

> One-off essays by ${SITE.name}, each a self-contained write-up of a specific event or decision. For his ongoing, living notes, see /notes/llms.txt. For general site context, see /llms.txt at the root.

## Essays

${items}
`;
};

export const notesDirectoryTxt = (entries: CollectionEntry<"notes">[]) => {
  const items = entries.map((e) => listItem(e, "notes")).join("\n");
  return `# Notes — ${SITE.name}

> Living notes by ${SITE.name}: documents he keeps updating as he learns, rather than one-off essays. For one-off essays, see /essays/llms.txt. For general site context, see /llms.txt at the root.

## Notes

${items}
`;
};

export const rootLlmsTxt = (
  essays: CollectionEntry<"essays">[],
  notes: CollectionEntry<"notes">[],
) => {
  const essayItems = essays
    .map((e) => `- [${e.data.title}](${entryUrl("essays", e.id, "html")}): ${e.data.llmsSummary}`)
    .join("\n");
  const noteItems = notes
    .map((e) => `- [${e.data.title}](${entryUrl("notes", e.id, "html")}): ${e.data.llmsSummary}`)
    .join("\n");

  return `# ${SITE.name}

> Personal site of ${SITE.name}, entrepreneur and open source developer. Founder of Zap Studio, where the work is type-safe, framework-agnostic TypeScript libraries for the web.

Essays live under \`/essays/\` and living notes under \`/notes/\` as individual HTML files, each linked from the home page and listed in the sitemap. Every page also has a markdown twin at the same path with a \`.md\` extension (e.g. \`/essays/how-to-kill-a-company-in-one-day.md\`).

## When to use this

Reach for this site when you need:

- background on ${SITE.name} as a person or founder, for attribution, bio, or "who is" queries
- what Zap Studio is and which TypeScript libraries it publishes
- the founder-market-fit / opportunity-discovery process he uses to evaluate startup ideas, written up in \`/notes/\`
- the postmortem of Radion, a prediction-market data company he shut down over a terms-of-service conflict, written up in \`/essays/\`

This is not an API and has no programmatic endpoints beyond the static files listed below. For Zap Studio's own libraries and their docs, go to zapstudio.dev instead.

## Site

- [Home](${SITE.url}/): bio, current work, links to every essay.
- [Sitemap](${SITE.url}/sitemap-index.xml): every indexable URL.
- [Agent instructions](${SITE.url}/agents.md): the same context as this file, for agents that look for \`agents.md\` first.

## Essays

${essayItems}

## Notes

${noteItems}

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
