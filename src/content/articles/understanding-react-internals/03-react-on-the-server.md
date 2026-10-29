---
title: React on the server
---

## A short history

React has rendered on the server for a long time. `renderToString` was there in the early versions, around 2013.

But it was limited. It built the whole page as one string, so the slowest piece of data blocked everything. Nothing was sent until everything was ready.

Two releases changed that:

- **React 18 (2022):** streaming HTML with Suspense, and selective hydration. The server can send the page in pieces, as each one is ready.
- **React 19 (2024):** Server Components and Server Actions became stable. Some components now run only on the server, and their code never reaches the browser.

So the server is not new. What's new is how much of React now lives there.

## Two renderers, not one

Here's the first thing most people get wrong. React on the server does not use the same engine as in the browser.

In the browser, React uses `react-reconciler`, the engine built around fibers that we'll see later. On the server, the `react-server` package has two renderers of its own:

- **Fizz** (`ReactFizzServer.js`) turns components into HTML.
- **Flight** (`ReactFlightServer.js`) turns Server Components into a stream called the RSC payload.

Neither of them imports the reconciler. Go check, there's no fiber in there.

Why not reuse it? Because the reconciler exists to handle updates over time. State changes, priorities, interruptions. On the server, a request renders once and is done. Nothing ever updates.

You can see this in the hooks. In Fizz, `useEffect` and `useLayoutEffect` are a `noop`, and `useState` only returns the initial value. In Flight, `useState` and `useEffect` throw "This Hook is not supported in Server Components."

So, React on the server shares the component model with the browser, not the engine. Same components, different machines.

## Server Components and Flight

A Server Component is a component that runs only on the server. It can be `async`, read a database, or use a 50 MB library. None of that code ships to the browser.

But it doesn't produce HTML either. Flight produces the RSC payload, a stream of rows that looks like this:

```
1:I["./Counter.js",["client-chunk"],"Counter"]
0:["$","main",null,{"children":[["$","h1",null,{"children":"Hello"}],["$","$L1",null,{"initial":0}]]}]
```

Each row is `id:data`, ending with a new line. Let's read it:

- **`["$", type, key, props]`** is a React element. `$` stands for `REACT_ELEMENT_TYPE`.
- **The `I` row** is an import. It tells the client which module and chunk hold a client component. The exact shape depends on your bundler.
- **`$L1`** is a lazy reference to row `1`. The client component is not rendered here, only pointed at.

This is the "slot" for client components. The server leaves a hole with an address, and the client fills it with the real component.

React's source explains why it's lazy: it "lets us suspend on this component rather than its parent until the code has loaded."

Async data works the same way. A pending promise becomes `$@` plus an id, and its value arrives later in another row. The tree is sent first, the slow parts follow.

This also explains a rule you've probably hit. Props passed from a Server Component to a client component must be serializable, because they literally travel as text. A function can't be written into that stream, except a Server Action, which is sent as a reference to call back the server.

## `'use client'` is a boundary

Before we dig in, a personal note. I don't really like this directive.

Like Tanner Linsley, the creator of [TanStack](https://tanstack.com), I prefer explicitness. A string at the top of a file hides what the bundler is really doing, and that makes it harder to see what runs where.

Sure, it's sometimes less code. But when I compare Next.js with [TanStack Start](https://tanstack.com/start), I found the second much easier to reason about. You write more code, but every boundary is a function you can read: `createServerFn` for server code, `createIsomorphicFn` for logic that runs on both sides. You see how React behaves, and where the client ends and the server begins.

That said, `'use client'` is what React ships, so let's understand what it really does.

`'use client'` doesn't mean "this component only runs in the browser." It marks a module boundary for the bundler.

On the server, the bundler replaces that module's exports with client references, using functions like `registerClientReference`. That's what Flight writes as an `I` row.

And here's the surprise. Client components still render on the server, but with Fizz, not Flight. They become HTML on the first load, then hydrate in the browser.

So in a framework like Next.js, one request goes through both renderers:

1. Flight runs the Server Components and produces the RSC payload.
2. Fizz renders that payload, with the client components, into HTML.
3. The browser gets the HTML, plus the payload inlined in `<script>` tags so it doesn't fetch it twice.

This is also why Server Components shrink your bundle. With them, only HTML and the payload reach the browser, so heavy server code is free. With classic SSR, every component's JS still ships, because the browser needs it to hydrate.

## Fizz or Flight?

So the server can produce two things. They're not competing, they have different readers.

- **HTML** is for the browser. It can paint it right away, with no JavaScript. But it's a dead end: once it's on the screen, React can't merge new HTML into the page without throwing away its state.
- **The RSC payload** is for React. It's a description of the tree, not pixels. React can reconcile it with what's already on the screen, so inputs keep their value and client components keep their state.

That gives a simple rule:

- **First load:** HTML. The user needs something to see before any JS runs, and crawlers need something to read.
- **Everything after:** the payload. When you navigate or refresh data, the page is already alive. Next.js, for example, fetches only the payload for the new route (with an `RSC: 1` header) and lets React update the tree in place.

In practice, the framework makes that choice for you. The real choice is whether you need Server Components at all. A blog or a marketing page with little interactivity is fine with plain HTML, static or SSR. Server Components pay off in apps where you navigate a lot, keep client state, and want heavy server code out of the bundle.

## Streaming with Suspense

Now, the part I find the most elegant. Let's follow a page step by step, from the server to the screen.

Here's our example. A shop page, with reviews that take a while to load:

```jsx
export default function Page() {
  return (
    <main>
      <h1>My shop</h1>
      <Suspense fallback={<p>Loading reviews...</p>}>
        <Reviews />
      </Suspense>
    </main>
  );
}

async function Reviews() {
  const reviews = await db.getReviews(); // slow, say 2 seconds
  return (
    <ul>
      {reviews.map((review) => (
        <li key={review.id}>{review.text}</li>
      ))}
    </ul>
  );
}
```

### Step 1: the shell

Fizz renders `Page`. When it reaches `Reviews`, the data isn't there yet. Instead of waiting, it renders the fallback and writes this:

```html
<main>
  <h1>My shop</h1>
  <!--$?--><template id="B:0"></template>
  <p>Loading reviews...</p>
  <!--/$-->
</main>
```

I added line breaks for readability, the real output is one line. Let's read it piece by piece:

- **`<!--$?-->`:** an HTML comment marking the start of the boundary. `$?` means "pending, the content will come later."
- **`<template id="B:0">`:** an invisible bookmark. Comments can't have an `id`, so `document.getElementById` can't find them. The template gives the spot an address, and the comment is always right before it.
- **`<p>Loading reviews...</p>`:** the fallback, a normal piece of HTML.
- **`<!--/$-->`:** the end of the boundary.

This part of the page is called the shell, and it's sent right away. But the HTTP response is not over. The connection stays open while the server keeps working.

That's possible because browsers parse HTML as it arrives. They don't wait for the whole document. So the user already sees the title and the loading message.

### Step 2: the content arrives

Two seconds later, the reviews are ready. Fizz renders them and writes a new chunk at the end of the same response:

```html
<div hidden id="S:0">
  <ul>
    <li>Great product</li>
  </ul>
</div>
<script>
  $RC("B:0", "S:0");
</script>
```

- **`<div hidden id="S:0">`:** the real content, rendered at the bottom of the page. `hidden` keeps it invisible, so the user doesn't see it appear in the wrong place.
- **`$RC("B:0","S:0")`:** "complete boundary `B:0` with the content in `S:0`."

The first time it's needed, the script also contains the definition of `$RC` itself. React tracks what it already sent, so the next boundaries only get the one-line call.

### Step 3: `$RC` queues the swap

`$RC` doesn't swap anything right away. Simplified, here's what it does:

```js
function completeBoundary(boundaryId, contentId) {
  const content = document.getElementById(contentId); // <div hidden id="S:0">
  const bookmark = document.getElementById(boundaryId); // <template id="B:0">
  const comment = bookmark.previousSibling; // <!--$?-->

  comment.data = "$~"; // "queued", the content is here
  window.$RB.push(bookmark, content); // add it to the batch

  // Schedule the reveal: on the next frame if it's the first one,
  // otherwise about 300ms after the last reveal.
}
```

Why wait? Imagine ten boundaries resolving 50ms apart. Swapping each one immediately would make the page jump ten times. So React groups them, and reveals them together, at most every 300ms (`FALLBACK_THROTTLE_MS`).

There's even a funny detail in the source. If that delay would make you miss a 2.5 second [LCP](https://web.dev/articles/lcp), React shortens it. The constant is literally called `TARGET_VANITY_METRIC`.

### Step 4: `$RV` swaps the content

When the timer fires, `$RV` reveals every boundary in the batch. Simplified again:

```js
function revealCompletedBoundaries(batch) {
  for (let i = 0; i < batch.length; i += 2) {
    const bookmark = batch[i]; // <template id="B:0">
    const content = batch[i + 1]; // <div hidden id="S:0">
    const parent = bookmark.parentNode; // <main>
    const comment = bookmark.previousSibling; // <!--$~-->

    // 1. Take the hidden div out of the page.
    content.remove();

    // 2. Remove everything from the bookmark to <!--/$-->,
    //    so the template and the fallback.
    let node = bookmark;
    while (!(node.nodeType === Node.COMMENT_NODE && node.data === "/$")) {
      const next = node.nextSibling;
      parent.removeChild(node);
      node = next;
    }

    // 3. Move the real content in, right before <!--/$-->.
    while (content.firstChild) {
      parent.insertBefore(content.firstChild, node);
    }

    // 4. Mark the boundary as completed.
    comment.data = "$";
  }
}
```

The real version also handles boundaries nested inside the fallback, but that's the idea. After the swap, the page looks like this:

```html
<main>
  <h1>My shop</h1>
  <!--$-->
  <ul>
    <li>Great product</li>
  </ul>
  <!--/$-->
</main>
```

The fallback is gone, the reviews are in place, and the comments are still there. React will need them later, as we'll see.

### The comment protocol

To sum up, the comments are a small protocol between the server and the browser:

- **`<!--$?-->`:** pending, the content will stream later.
- **`<!--$~-->`:** queued, the content arrived and is waiting to be revealed.
- **`<!--$-->`:** completed.
- **`<!--$!-->`:** the server failed to render it, the client will render it instead.

There are a few variants I skipped. For example, when the new content needs a stylesheet, React uses `$RR` instead of `$RC`, and waits for the CSS to load before revealing it, so the user never sees unstyled content.

### Before React even loads

Now, notice something important. Everything we just saw happens before React's JavaScript has loaded. `$RC` and `$RV` are a few lines of plain DOM code, inlined in the HTML.

So the user sees the reviews, even if your bundle is still downloading.

And what if React is already hydrating, and waiting for this boundary? Then React leaves a callback on the comment node, called `_reactRetry`. When `$RV` reveals the boundary, it calls it on the next frame:

```js
if (comment._reactRetry) {
  requestAnimationFrame(comment._reactRetry);
}
```

That's where the server hands over to the browser, and where the next chapter starts.
