# portfolio

A site this small does not need a framework.

- Nothing to build, install or upgrade: the source is what ships.
- Hosts anywhere that serves files: any [CDN](https://en.wikipedia.org/wiki/Content_delivery_network), any [static](https://en.wikipedia.org/wiki/Static_web_page) host, a USB stick.
- No dependencies, no lockfile, no [supply chain](https://en.wikipedia.org/wiki/Supply_chain_attack) to audit.
- A few kilobytes of HTML and CSS, a couple over the wire once [brotli](https://en.wikipedia.org/wiki/Brotli) has had its way with them, zero JavaScript. Nothing to parse, nothing to [hydrate](https://en.wikipedia.org/wiki/Hydration_(web_development)).
- Fewer bytes over the wire and less CPU per visit means less energy burned.

Frameworks I love, like Astro and TanStack Start, are built on top of exactly this.
Writing it by hand is the fastest way to understand what they do for you, and why.

## Preview

```sh
npx wrangler dev
```

We need to use a server for development since the [`file://`](https://en.wikipedia.org/wiki/File_URI_scheme) protocol breaks absolute asset paths.

Use `wrangler dev` rather than a generic static server. It applies the same routing as
production, so `.html` URLs behave locally the way they will once deployed. Most static
servers strip the extension and would hide that difference.

The site lives in `public/`, which is the only thing Wrangler serves or uploads.
Everything else in the repo stays out of the deploy by construction rather than by an
exclusion list. It also keeps Wrangler's own `.wrangler/` state outside the directory it
watches, which would otherwise make it reload itself forever.

## Adding an essay

1. `cp essays/_template.html essays/my-slug.html`
2. Fill in title, description, date and [canonical](https://en.wikipedia.org/wiki/Canonical_link_element) URL.
3. Write the body inside `<article>`, after its `<header>`.
4. Add a `<li>` to `index.html` and a `<url>` to `sitemap.xml`.

Code blocks are unhighlighted by design since [syntax highlighting](https://en.wikipedia.org/wiki/Syntax_highlighting) with `shiki` for instance would need a build step.
