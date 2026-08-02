# portfolio

A site this small does not need a framework.

- Hosts anywhere that serves files: any [CDN](https://en.wikipedia.org/wiki/Content_delivery_network), any [static](https://en.wikipedia.org/wiki/Static_web_page) host, a USB stick.
- No build step. `public/` is the site, byte for byte: the edited file is the shipped file.
- No runtime dependencies, no [supply chain](https://en.wikipedia.org/wiki/Supply_chain_attack) to audit.
- A few kilobytes of HTML and CSS, a couple over the wire once [brotli](https://en.wikipedia.org/wiki/Brotli) has had its way with them, zero JavaScript. Nothing to parse, nothing to [hydrate](<https://en.wikipedia.org/wiki/Hydration_(web_development)>).
- Fewer bytes over the wire and less CPU per visit means less energy burned.

## Commands

```sh
pnpm run dev      # wrangler dev
pnpm run deploy   # wrangler deploy
pnpm run check    # format check, then lint public/
```

## Caching

`_headers` leans on [`stale-while-revalidate`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control#stale-while-revalidate) rather than content-hashed filenames. A stale copy paints instantly while the browser refetches in the background, so assets keep their plain names and nothing has to rewrite references at build time.

- Everything defaults to `max-age=0, stale-while-revalidate=86400`. Markup changes go out on the next visit, and no visit waits on the network.
- `styles.css` and the logos get `max-age=3600, stale-while-revalidate=604800`. They change rarely and are cheap to serve stale.

## Adding an essay

1. `cp public/essays/_template.html public/essays/my-slug.html`
2. Fill in title, description, date and [canonical](https://en.wikipedia.org/wiki/Canonical_link_element) URL.
3. Write the body inside `<article>`, after its `<header>`.
4. Add a `<li>` to `public/index.html` and a `<url>` to `public/sitemap.xml`.

Code blocks are unhighlighted by design since [syntax highlighting](https://en.wikipedia.org/wiki/Syntax_highlighting) with `shiki` for instance would ship a payload larger than the essays.
