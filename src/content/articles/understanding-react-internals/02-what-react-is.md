---
title: What React is
---

## JSX is just function calls

JSX is not JavaScript. Browsers can't read it. It was created by Facebook alongside React, and TypeScript added support for it later with `.tsx` files.

So before your code runs, a compiler like TypeScript, Babel, esbuild or SWC rewrites it. React itself never sees JSX.

When you write this:

```jsx
<h1 className="title">Hello</h1>
```

The compiler turns it into a function call from `react/jsx-runtime`:

```js
jsx("h1", { className: "title", children: "Hello" });
```

Fragments are no exception. `<>...</>` becomes `jsx(Fragment, { children })`, where `Fragment` is just `Symbol.for("react.fragment")`.

Wait, what's a `Symbol`? It's a primitive type of JavaScript, like a string or a number, but with one special property: every symbol is unique.

```js
Symbol("a") === Symbol("a"); // false, two different symbols
```

Think of it as a name tag that nobody can copy. Two strings with the same text are equal, two symbols never are.

`Symbol.for("react.fragment")` is a variant. It looks the name up in a global registry shared by the whole page, and returns the same symbol every time:

```js
Symbol.for("a") === Symbol.for("a"); // true
```

React uses it so that two copies of React loaded on the same page, by two different bundles for example, still recognize each other's fragments and elements.

Symbols have another property that will matter soon: they can't be written in JSON. `JSON.stringify` simply drops them.

There are a few variants of this primitive:

- **`jsx`:** one child or none.
- **`jsxs`:** several static children, written side by side in the JSX.
- **`jsxDEV`:** the development version, with extra checks and warnings.
- **`createElement`:** the old one. Before React 17, every JSX tag became `React.createElement(...)`, which is why you had to import `React` in every file.

Whatever you write, it always ends up as one of these calls.

## Components return descriptions

Each of these calls returns a plain object, a React element:

```js
{
  $$typeof: Symbol.for("react.transitional.element"),
  type: "h1",
  key: null,
  props: { className: "title", children: "Hello" },
}
```

That's it. A component is just a function that returns a description of what the UI should look like.

Even the `$$typeof` field has a reason. Remember, a symbol can't be written in JSON, so if someone injects JSON into your app, it can't pretend to be a React element.

## The `react` package is almost empty

Here's something that surprised me the first time I read the source. Open `useState` in the `react` package, and this is what you find:

```js
export function useState(initialState) {
  const dispatcher = resolveDispatcher();
  return dispatcher.useState(initialState);
}
```

It doesn't do anything itself. No state, no memory, nothing. It asks for a "dispatcher" and forwards the call to it.

A dispatcher is just an object holding the real code of every hook. Something like `{ useState, useEffect, useMemo, ... }`. The one in use is stored in a shared variable, `ReactSharedInternals.H`.

But `ReactSharedInternals.H` starts empty. The renderer, the part of React that actually runs your components, fills it with the real hooks before your component runs. In the browser, that's `react-dom`. We'll look at it in the next section.

Right before calling your component, the renderer swaps in the right dispatcher. Right after, it swaps it out. Simplified, it looks like this:

```js
ReactSharedInternals.H = HooksDispatcherOnMount; // real hooks
const children = Component(props); // your component calls useState here
ReactSharedInternals.H = ContextOnlyDispatcher; // hooks that throw
```

There's even a different dispatcher depending on the moment. `HooksDispatcherOnMount` is used the first time a component renders, to create its state. `HooksDispatcherOnUpdate` is used on the next renders, to read the state that already exists. The server renderers install their own, as we'll see in [chapter II](/articles/understanding-react-internals/react-on-the-server).

This simple trick explains two things:

- **Why hooks only work inside components.** Outside of a render, the dispatcher in place is `ContextOnlyDispatcher`, whose `useState` throws the famous "Invalid hook call" error. Call a hook in an event handler or a `setTimeout`, and you hit it.
- **Why the same component can run in different engines.** Your component never talks to the browser or the server. It only talks to the dispatcher, and whoever is rendering decides what `useState` means.

Think of the `react` package as a phone line. You dial `useState`, but the person answering on the other end depends on who's rendering you.

## The reconciler and its renderers

The other end is mostly `react-reconciler`. It's the engine that calls your components, compares the new description with the previous one, and figures out what changed.

But the reconciler doesn't know anything about the DOM. It asks a "host config" to do the actual work, with functions like `createInstance`, `appendChild`, `commitUpdate` and `removeChild`. For the browser, they live in `ReactFiberConfigDOM.js`.

So `react-dom` is the reconciler plus a host config for the DOM. React Native is the same reconciler with a host config for native views.

Think of the reconciler as the brain, and the host config as the hands. The brain decides what should change, the hands touch the screen.

## A map of the packages

Here are the packages we'll dig into, and where they show up in this article:

- **`react`:** elements and the hook entry points. Almost no logic, as we just saw.
- **`react-server`:** Fizz and Flight, the two server renderers ([chapter II](/articles/understanding-react-internals/react-on-the-server)).
- **`react-client`:** reads the Flight payload in the browser (chapters II and III).
- **`react-dom`:** `hydrateRoot` and the HTML side of the server (chapters II and III).
- **`react-reconciler`:** fibers, lanes, rendering and committing (chapters IV and V).
- **`scheduler`:** decides when work runs, and when to give control back to the browser (chapter IV).

If you open the repository, start there. Everything else is tests, tooling, and bindings for specific bundlers.

## Two phases

Last thing before we dive in. Every update in the browser goes through two phases:

1. **Render:** React calls your components and computes what changed. Nothing touches the screen yet, so this work can be paused, restarted, or thrown away.
2. **Commit:** React applies the changes to the DOM. This part is synchronous and can't be interrupted.

This is why your components must be pure. React may call them several times before anything is committed, and `StrictMode` even calls them twice on purpose to catch you.

Keep these two phases in mind. The rest of this article is basically a long explanation of them, starting from the server.
