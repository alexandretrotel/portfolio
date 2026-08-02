# portfolio

A site this small does not need a framework.

- Hosts anywhere that serves files: any [CDN](https://en.wikipedia.org/wiki/Content_delivery_network), any [static](https://en.wikipedia.org/wiki/Static_web_page) host, a USB stick.
- No runtime dependencies, no [supply chain](https://en.wikipedia.org/wiki/Supply_chain_attack) to audit. The build is one file of Node standard library.
- A few kilobytes of HTML and CSS, a couple over the wire once [brotli](https://en.wikipedia.org/wiki/Brotli) has had its way with them, zero JavaScript. Nothing to parse, nothing to [hydrate](<https://en.wikipedia.org/wiki/Hydration_(web_development)>).
- One request to first paint: the stylesheet is inlined, so nothing blocks the render.
- Fewer bytes over the wire and less CPU per visit means less energy burned.run 

## Commands

```sh
pnpm run build    # src/ -> dist/
pnpm run dev      # build, then wrangler dev
pnpm run deploy   # build, then wrangler deploy
pnpm run check    # format check, then lint src/
```

## What the build does

`build.js` walks `src/` and writes `dist/`:

- Images ship under a content-hashed name, `logo.<hash>.png`, so `_headers` can serve them with a one-year `immutable` [cache](https://en.wikipedia.org/wiki/Web_cache) lifetime. Change the file, get a new name, no stale copies.
- `styles.css` is inlined into a `<style>` tag in every page and never emitted as a file. A separate stylesheet is a [render-blocking](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Critical_rendering_path) request on the critical path, and at this size it costs more in round trips than it saves in caching.
- Every reference to a hashed asset is rewritten across `.html`, `.css`, `.xml`, `.txt` and `.json`, including the `og:image` and `twitter:image` URLs.
- Everything else is copied through untouched.

Adding an image type to the hashed set is one entry in `HASHED` in `build.js`.

`.html` is served `max-age=0, must-revalidate`, so markup changes go out immediately.

## Adding an essay

1. `cp src/essays/_template.html src/essays/my-slug.html`
2. Fill in title, description, date and [canonical](https://en.wikipedia.org/wiki/Canonical_link_element) URL.
3. Write the body inside `<article>`, after its `<header>`.
4. Add a `<li>` to `src/index.html` and a `<url>` to `src/sitemap.xml`.

Reference assets by their source name, `/styles.css` and `/logo.png`. The build hashes them.

Code blocks are unhighlighted by design since [syntax highlighting](https://en.wikipedia.org/wiki/Syntax_highlighting) with `shiki` for instance would ship a payload larger than the essays.
