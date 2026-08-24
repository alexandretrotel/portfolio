# portfolio

A small [Astro](https://astro.build) site. Static output, zero client-side JavaScript, deployed as-is to Cloudflare Workers assets.

- Content lives in [content collections](https://docs.astro.build/en/guides/content-collections/): one Markdown file per essay or note, validated against a shared schema. No hand-copied HTML template, no per-page head boilerplate to keep in sync.
- Every essay/note page, its `.md` twin, the `/essays/llms.txt` and `/notes/llms.txt` indexes, and the root `/llms.txt` / `/agents.md` are generated from that same content at build time. Add a Markdown file, the homepage list, the sitemap, and every AI-discoverability file update themselves.
- Still no client JavaScript shipped to the browser. Astro renders everything to plain HTML at build time.
- Code blocks stay unhighlighted by design (see `astro.config.mjs`, `markdown.syntaxHighlight: false`): [syntax highlighting](https://en.wikipedia.org/wiki/Syntax_highlighting) would ship a payload larger than the essays themselves.

## Stack

- [pnpm](https://pnpm.io) via [Corepack](https://nodejs.org/api/corepack.html) — no global install, the pinned version in `packageManager` is what runs.
- [`@zap-studio/oxlint`](https://www.npmjs.com/package/@zap-studio/oxlint) / [`@zap-studio/oxfmt`](https://www.npmjs.com/package/@zap-studio/oxfmt) — [oxc](https://oxc.rs)-based lint and format presets, configured in `oxlint.config.ts` / `oxfmt.config.ts`.
- [`@astrojs/sitemap`](https://docs.astro.build/en/guides/integrations-guide/sitemap/) generates `sitemap-index.xml` from the actual page list, instead of a hand-maintained `sitemap.xml`.

## Commands

```sh
corepack enable       # one-time, lets corepack manage pnpm
pnpm install

pnpm dev               # local dev server
pnpm build             # build to dist/
pnpm preview            # serve the built dist/ locally

pnpm format            # format
pnpm format:check      # format check
pnpm lint               # lint
pnpm lint:fix           # lint, applying auto-fixes
```

## Caching

`public/_headers` leans on [`stale-while-revalidate`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control#stale-while-revalidate) rather than content-hashed filenames, and is copied through to `dist/` unchanged at build time.

- Everything defaults to `max-age=0, stale-while-revalidate=86400`. Markup changes go out on the next visit, and no visit waits on the network.
- `styles.css` and the logos get `max-age=3600, stale-while-revalidate=604800`. They change rarely and are cheap to serve stale.
- Each essay/note also gets a `Link: <...md>; rel="alternate"` header pointing at its markdown twin. This is the one thing that's still hand-maintained per page — add the matching rule in `public/_headers` when adding an essay or note.

## Adding an essay or note

1. Add a Markdown file under `src/content/essays/` or `src/content/notes/`, named after the slug (e.g. `my-slug.md`).
2. Fill in the frontmatter: `title`, `description`, `llmsSummary`, `date`, and `updated: true` if it's a living note you'll keep revising rather than a one-off essay. See `src/content.config.ts` for the full schema.
3. Write the body as plain Markdown.
4. Add the matching `Link` rule to `public/_headers` (see Caching above).

The page, its `.md` twin, the homepage listing, the sitemap, and every `llms.txt`/`agents.md` entry are generated from that file — nothing else to edit.
