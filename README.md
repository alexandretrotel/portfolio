# portfolio

A small [Astro](https://astro.build) site deployed to Cloudflare Workers static assets. The resume PDFs are generated at build time with [takumi-pdf](https://www.npmjs.com/package/takumi-pdf).

## Commands

```sh
mise install       # installs node, pnpm and hk from mise.toml
pnpm install
hk install --mise  # one-time, installs the hk pre-commit hook (hk comes from mise.toml)

pnpm run dev           # local dev server
pnpm run build         # build to dist/
pnpm run preview       # serve the built site locally
pnpm run deploy        # build and deploy with wrangler

pnpm run typecheck     # astro check + tsc
pnpm run check         # lint and format check (ultracite)
pnpm run fix           # lint and format, applying fixes
```
