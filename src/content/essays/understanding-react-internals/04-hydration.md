---
title: Hydration
---

## What a web page is

Let's step back for a second. A web page is made of three things:

- **HTML:** the structure. Titles, paragraphs, buttons, forms.
- **CSS:** the style. Colors, sizes, layout.
- **JavaScript:** the behavior. What happens when you click, type, or scroll.

After chapter II, the first two are already on the screen. The server sent the HTML, the browser loaded the CSS, and the user can read the page.

But nothing reacts yet. Click a button with an `onClick`, and nothing happens. The HTML has no idea that a function was attached to it, because functions can't travel in HTML.

Hydration is the step that brings that JavaScript back. React takes the HTML that's already on the screen and makes it alive.

## What hydration adds

Once a page is hydrated, you get everything we expect from a modern app:

- **Interactivity:** buttons, inputs, menus, anything with an event handler.
- **Client-side navigation:** clicking a link doesn't reload the whole page anymore. The router fetches only what changed and React updates the screen.
- **Pending states:** a form can show a spinner while it's submitting, with hooks like `useFormStatus`, `useActionState` or `useTransition`.

Note that these come after hydration. They're what hydration makes possible, not what hydration is.

And between the moment the HTML shows up and the moment hydration ends, there's a gap. The page looks ready, but it doesn't respond. Some people call it the uncanny valley.

That gap has a cost you should know about. Hydration runs every client component once again, in the browser. So even with super fast HTML, a big client tree means a page that stays frozen for a while. This is one of the main reasons Server Components exist: their code never runs again in the browser.

## Progressive enhancement

But some things can work before hydration. This is called progressive enhancement: the page works with HTML alone, and JavaScript makes it better.

Forms are the best example. Take a form with a Server Action:

```jsx
async function addToCart(formData) {
  "use server";
  await db.cart.add(formData.get("productId"));
}

export function AddToCart({ productId }) {
  return (
    <form action={addToCart}>
      <input type="hidden" name="productId" value={productId} />
      <button>Add to cart</button>
    </form>
  );
}
```

Fizz renders it as a real HTML form, with a hidden field telling the server which action to run:

```html
<form action="" method="POST" enctype="multipart/form-data">
  <input type="hidden" name="$ACTION_ID_abc123" />
  <input type="hidden" name="productId" value="42" />
  <button>Add to cart</button>
</form>
```

I simplified the attributes, but you get the idea. Click the button before React has loaded, and the browser does what browsers have done since the 90s. It submits the form, the server runs the action, and sends back a new page.

Once hydrated, React takes over the same form. No full reload anymore, and you get the pending states.

And here's a detail I love. What if the action is a client function, not a Server Action? A plain function can't work without JavaScript. So Fizz renders the form with this action:

```html
<form
  action="javascript:throw new Error('React form unexpectedly submitted.')"
></form>
```

And it inlines a small script, `listenToFormSubmissionsForReplaying()`, that listens to every submit on the page. If the user submits one of these forms before React has loaded, the script stops it, saves the form data, and pushes it into a queue:

```js
addEventListener("submit", (event) => {
  // simplified
  if (event.target.action !== EXPECTED_FORM_ACTION_URL) return;
  event.preventDefault();
  const formData = new FormData(event.target, event.submitter);
  document.$$reactFormReplay.push(event.target, event.submitter, formData);
});
```

When React hydrates, it replays the queue in order. The user clicked too early, and nothing was lost.

## How hydration works

On the client, hydration starts with one call:

```js
import { hydrateRoot } from "react-dom/client";

hydrateRoot(document.getElementById("root"), <App />);
```

Compare it with `createRoot`, the one you'd use for an app without server rendering. `createRoot` starts from an empty container and creates every DOM node itself. `hydrateRoot` assumes the nodes are already there.

So React renders your app as usual, but instead of creating DOM nodes, it walks the existing DOM in parallel and claims each node. In the reconciler, this is `tryToClaimNextHydratableInstance`:

```
DOM already on the page        What React does
<main>                         creates a fiber for "main", claims the <main>
  <h1>My shop</h1>             creates a fiber for "h1", claims the <h1>
  <button>Add</button>         runs Counter(), then claims the <button>
```

For each node, React checks that it matches what the component just returned. Same tag, same text. If it does, React keeps the node and links it to its fiber. You can even see that link in your browser's console, every hydrated node has a property like `__reactFiber$x7k2p`.

Now, an important point. React hydrates the whole tree under the root, not only your client components.

Server Components are part of the walk too. React claims their HTML like any other node, but it never calls them. Let's take an example:

```jsx
// Server Component
async function ProductPage() {
  const product = await db.getProduct(42);
  return (
    <main>
      <h1>{product.name}</h1>
      <AddToCart productId={42} />
    </main>
  );
}

// Client Component, in a file with 'use client'
function AddToCart({ productId }) {
  const [added, setAdded] = useState(false);
  return <button onClick={() => setAdded(true)}>Add to cart</button>;
}
```

On the server, `ProductPage` ran once. It queried the database and returned elements. Those elements, with the product name already filled in, are what the server sent in the RSC payload:

```
1:I["./AddToCart.js",["client-chunk"],"AddToCart"]
0:["$","main",null,{"children":[["$","h1",null,{"children":"Blue shoes"}],["$","$L1",null,{"productId":42}]]}]
```

In the browser, React hydrates from that payload. Here's what happens to each part:

- **`<main>` and `<h1>`:** React reads them from the payload and claims the matching DOM nodes. It doesn't call `ProductPage`, and it can't anyway: its code is not in the bundle. No database query, no `await`, nothing.
- **`AddToCart`:** the payload only has a reference (`$L1`). So React loads its code and calls `AddToCart({ productId: 42 })` to know what it renders, sets up its state, and claims the `<button>`.

So the server sends the result of Server Components, the finished elements. Only client components run again in the browser.

So in React, the whole page is one tree. Only the client code costs you JavaScript, but React still knows about everything.

## Islands, a different approach

Not every framework works like this. Some use islands.

The idea is simple. The page is static HTML, a sea, and only a few interactive parts, the islands, get JavaScript. Each island hydrates on its own, and the rest of the page never does.

[Astro](https://astro.build) is the best known example. This portfolio is built with it, by the way. Here's what a page looks like:

```astro
---
import Header from "../components/Header.astro";
import Counter from "../components/Counter.jsx";
---

<Header />
<article>A long static article...</article>
<Counter client:visible />
```

Everything renders to HTML on the server. But only `Counter` ships JavaScript, because it has a `client:` directive. Astro wraps it in an `<astro-island>` element, which loads React and hydrates this one component when it becomes visible.

You choose when each island wakes up:

- **`client:load`:** as soon as the page loads.
- **`client:idle`:** when the browser has nothing else to do, using `requestIdleCallback`. React's scheduler doesn't use it, as we saw, but Astro does.
- **`client:visible`:** when the island scrolls into view.

So what's the difference with React?

- **In Astro,** each island is its own small React root. Islands don't share a tree, so they can't share context or state without extra work. But everything outside them costs zero JavaScript and is never hydrated.
- **In React with Server Components,** the page is one big tree. Context, state and navigation flow through everything. But React walks the whole tree during hydration, and every client component runs again.

Neither is better. Islands shine for content sites, like this one. One tree shines for apps where everything talks to everything.

## Events

Back to React. Once a node is claimed, React needs to listen to its events. You'd think it calls `addEventListener` on every button. It doesn't.

Instead, React attaches one listener per event type, once, on the root container. `hydrateRoot` and `createRoot` both call `listenToAllSupportedEvents(container)`. This is called event delegation.

Simplified, here's what happens when you click:

```js
// what you write
<button onClick={() => setCount(count + 1)}>Add</button>;

// what React does, once for the whole app
container.addEventListener("click", (event) => {
  // 1. find the fiber from event.target, thanks to __reactFiber$...
  // 2. walk up the tree and collect every onClick
  // 3. call them, from the deepest to the root
});
```

That's why your `onClick` is not on the DOM node. It lives in the fiber's props, and React calls it itself.

## Selective hydration and event replay

Hydrating a big page takes time. So React doesn't do it in one block.

Each Suspense boundary hydrates on its own. React can hydrate the header, give control back to the browser, then hydrate the sidebar, and so on. A slow boundary doesn't block the rest.

Remember `_reactRetry` from chapter II? This is where it pays off. If React reaches a boundary whose content hasn't streamed yet, it skips it, leaves the retry callback on the comment, and moves on. When `$RV` reveals the content, the callback tells React to come back.

But what about clicks that happen too early? Imagine the user clicks a button in a boundary that isn't hydrated yet. React's root listener still catches the click, because `hydrateRoot` attached it before hydrating anything. Then:

1. React sees that the target is inside a boundary that is still dehydrated.
2. It hydrates that boundary right away, before anything else, with `attemptSynchronousHydration`.
3. It replays the click on the now hydrated button.

The user's intent decides the order. What you touch gets hydrated first.

Continuous events, like `mouseover`, work a bit differently. React queues them with `queueIfContinuousEvent`, and replays them once the boundary is ready.

All of this relies on priorities. A click is more urgent than hydrating a footer nobody looks at. In React, these priorities are called lanes, and they're the subject of the next chapter.

## Hydration mismatches

Hydration only works if the client renders exactly what the server rendered. When it doesn't, you get a hydration mismatch.

React's error message is actually a great list of the usual causes. Straight from the source, a mismatch can happen if a client component used:

- a server/client branch like `if (typeof window !== 'undefined')`
- variable input such as `Date.now()` or `Math.random()`
- date formatting in a user's locale which doesn't match the server
- external changing data without sending a snapshot of it along with the HTML
- invalid HTML tag nesting, like a `<div>` inside a `<p>`

It can also be a browser extension that changed the HTML before React loaded.

So what does React do? It throws away the server HTML up to the nearest Suspense boundary, or the whole root if there's none, and renders that part from scratch on the client. Your page still works, but you lose the benefit of server rendering there, and the user may see a flash.

The fixes depend on the cause:

- **Browser-only values** (`window`, `localStorage`, screen size): read them in `useEffect`, which never runs on the server. The first render matches, then the effect updates the UI.
- **External stores:** use `useSyncExternalStore` and give it a `getServerSnapshot`, so the server and the first client render agree.
- **Ids:** use `useId`. A random id would be different on each side. `useId` builds the id from the component's position in the tree, which is the same on the server and the client.
- **A value that can't match**, like a timestamp: `suppressHydrationWarning` on that element. It's a last resort, and it only works one level deep.
