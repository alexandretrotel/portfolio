# portfolio

A small [Astro](https://astro.build) site. Static output, zero client-side JavaScript, deployed to Cloudflare Workers static assets. The resume PDFs are generated at build time with [takumi-pdf](https://www.npmjs.com/package/takumi-pdf).

## Commands

```sh
corepack enable    # one-time, lets corepack manage pnpm
pnpm install       # also installs the lefthook pre-commit hook

pnpm run dev           # local dev server
pnpm run build         # build to dist/
pnpm run preview       # serve the built site locally
pnpm run deploy        # build and deploy with wrangler

pnpm run typecheck     # astro check + tsc
pnpm run check         # lint and format check (ultracite)
pnpm run fix           # lint and format, applying fixes
```
