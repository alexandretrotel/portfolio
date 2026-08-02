# portfolio

A site this small does not need a framework.

- Nothing to build, install or upgrade: the source is what ships.
- Hosts anywhere that serves files: any [CDN](https://en.wikipedia.org/wiki/Content_delivery_network), any [static](https://en.wikipedia.org/wiki/Static_web_page) host, a USB stick.
- No dependencies, no lockfile, no [supply chain](https://en.wikipedia.org/wiki/Supply_chain_attack) to audit.
- A few kilobytes of HTML and CSS, a couple over the wire once [brotli](https://en.wikipedia.org/wiki/Brotli) has had its way with them, zero JavaScript. Nothing to parse, nothing to [hydrate](<https://en.wikipedia.org/wiki/Hydration_(web_development)>).
- Fewer bytes over the wire and less CPU per visit means less energy burned.

## Preview

```sh
npx wrangler dev
```

## Adding an essay

1. `cp essays/_template.html essays/my-slug.html`
2. Fill in title, description, date and [canonical](https://en.wikipedia.org/wiki/Canonical_link_element) URL.
3. Write the body inside `<article>`, after its `<header>`.
4. Add a `<li>` to `index.html` and a `<url>` to `sitemap.xml`.

Code blocks are unhighlighted by design since [syntax highlighting](https://en.wikipedia.org/wiki/Syntax_highlighting) with `shiki` for instance would need a build step.
