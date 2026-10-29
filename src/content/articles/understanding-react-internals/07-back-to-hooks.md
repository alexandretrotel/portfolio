---
title: Back to hooks
---

## Hooks are slots

At the start of this article, I told you to forget about hooks. Now that you know what happens underneath, they're much easier to understand.

Remember the fiber's `memoizedState` field from [the render phase](/articles/understanding-react-internals/the-render-phase)? For a function component, it holds a list of hook objects, chained with `next`, in the order you call them:

```jsx
function Profile() {
  const [name, setName] = useState("");
  const inputRef = useRef(null);
  const upper = useMemo(() => name.toUpperCase(), [name]);
}
```

```
fiber.memoizedState → useState slot → useRef slot → useMemo slot → null
```

On each render, React walks this list as you call your hooks. There are no names, only positions.

That's the real reason behind the rules of hooks. Call a hook inside an `if`, and when the condition is false, every hook after it reads the wrong slot. Your `useRef` would get the `useMemo` value.

Every hook below is just a different way to use one of these slots.

## State is a queue

`useState` is `useReducer` with a reducer written for you, `basicStateReducer`:

```js
function basicStateReducer(state, action) {
  return typeof action === "function" ? action(state) : action;
}
```

When you call `setCount`, React doesn't change the state right away. It adds an update, with its lane, to the hook's queue, and schedules a render. During that render, it runs the queue through the reducer, in order.

This explains the classic bug:

```jsx
setCount(count + 1);
setCount(count + 1);
setCount(count + 1);
```

You get `count + 1`, not `count + 3`. `count` is a constant from the render that created this function. If it was `0`, the queue holds three updates saying "set to 1".

With a function, the queue holds three functions, each called with the result of the previous one, `0 → 1 → 2 → 3`:

```jsx
setCount((c) => c + 1);
```

So when the new state depends on the previous one, pass a function. And if the new state is the same as the current one, compared with `Object.is`, React skips the render.

Choosing between the two is only about readability. `useState` for independent values. `useReducer` when several values change together, so the logic lives in one pure function, easy to test.

## Refs don't render

Here's the whole `useRef` on the first render:

```js
function mountRef(initialValue) {
  const hook = mountWorkInProgressHook();
  const ref = { current: initialValue };
  hook.memoizedState = ref;
  return ref;
}
```

A plain object in a slot, returned again on every render. Changing `ref.current` adds nothing to a queue and schedules nothing. React doesn't even know it happened.

So use it for values that don't affect the screen, like a timer id, and for DOM nodes, which React attaches during the layout step of [the commit](/articles/understanding-react-internals/the-commit-phase). Don't read or write it during render, since a render can be thrown away.

`useState` against `useRef` comes down to one question: should a change update the screen?

## Stable references

Most people think memoization avoids expensive calculations. Sometimes it does. But its main job is keeping the same reference between renders.

Remember how React skips work: same props object, `memo` comparing each prop with `Object.is`, context values compared with `Object.is`. Everything is compared by reference. And every render creates new objects and functions:

```jsx
function Page() {
  const filters = { color: "blue" }; // new on every render
  const onSelect = (id) => select(id); // new on every render
  return <ProductList filters={filters} onSelect={onSelect} />;
}
```

Even wrapped in `memo`, `ProductList` re-renders every time. `useMemo` and `useCallback` keep the reference until a dependency changes, comparing each one with `Object.is`:

```jsx
const filters = useMemo(() => ({ color: "blue" }), []);
const onSelect = useCallback((id) => select(id), []);
```

`useCallback(fn, deps)` is exactly `useMemo(() => fn, deps)`. In the source, it stores the function itself in the slot.

Context follows the same rule. When a provider renders, React compares its new `value` with `Object.is`, and every consumer renders if it changed, even through `memo`:

```jsx
// Every consumer renders each time App renders
<UserContext value={{ user, logout }}>

// Consumers render only when user or logout changes
const value = useMemo(() => ({ user, logout }), [user, logout]);
<UserContext value={value}>
```

And split contexts that change at different speeds. A theme and a cursor position in the same context means every theme reader renders sixty times per second.

Memoizing has a cost too, so use it when the reference matters: a prop for a `memo` component, a dependency of an effect, a context value, or a really expensive calculation. Outside of these, it's noise.

With the [React Compiler](https://react.dev/learn/react-compiler), you'll write most of this less and less. It analyzes your components at build time and adds the memoization for you.

Personally, I don't use the Babel plugin the React docs recommend. I use [`oxc-transform-react`](https://oxc.rs/docs/guide/usage/transformer/react-compiler.html) from [Oxc](https://oxc.rs), with `@vitejs/plugin-react`. It runs a Rust port of the same compiler, and it's [more than 10 times faster](https://oxc.rs/blog/2026-08-18-react-compiler-support) than Babel. It's still marked experimental, but the [VoidZero](https://voidzero.dev) team always makes great tools.

## Effects sync with the outside

Effects are for one thing: synchronizing your component with something outside React. A connection, a subscription, a timer, a third-party library. That's why they run in the commit, and never on the server.

Many effects shouldn't exist. If a value can be computed from props or state, compute it during render:

```jsx
// Bad: renders twice, with one frame showing the wrong value
const [fullName, setFullName] = useState("");
useEffect(() => setFullName(`${first} ${last}`), [first, last]);

// Good
const fullName = `${first} ${last}`;
```

And if something happens because the user did something, it goes in the event handler. The question to ask: is this code running because the component is on the screen, or because the user clicked?

An effect can return a cleanup. React calls it before running the effect again, and when the component is removed:

```jsx
useEffect(() => {
  const connection = createConnection(roomId);
  connection.connect();
  return () => connection.disconnect();
}, [roomId]);
```

In development, `StrictMode` mounts every component twice on purpose, to check that your cleanup really undoes the effect.

Sometimes an effect needs the latest value of a prop without re-running when it changes. That's `useEffectEvent`:

```jsx
const onConnected = useEffectEvent(() => showNotification("Connected!", theme));

useEffect(() => {
  const connection = createConnection(roomId);
  connection.on("connected", onConnected);
  connection.connect();
  return () => connection.disconnect();
}, [roomId]); // changing the theme doesn't reconnect the chat
```

As for timing, we saw it in the commit phase. Default to `useEffect`, and reach for `useLayoutEffect` only when you need to measure the DOM before paint.

## Priorities you control

`useTransition` and `useDeferredValue` are lanes, exposed to you.

By default, an update in an event gets an urgent lane and renders synchronously. `startTransition` gives it a transition lane instead: the render yields every 5ms, and it's thrown away when something more urgent arrives.

```jsx
const [isPending, startTransition] = useTransition();

<button onClick={() => startTransition(() => setTab("posts"))}>
  Posts {isPending && "..."}
</button>;
```

While it renders, `isPending` is `true` and the old tab stays on screen. `useDeferredValue` does the same for a value you don't control, like a prop:

```jsx
const deferredQuery = useDeferredValue(query);
return <HugeList filter={deferredQuery} />;
```

Use them when an update triggers an expensive render, but never for the urgent update itself. An input's own value must stay a normal update, or typing would lag.

## Async and forms

`use` reads a promise during render. If it's pending, it throws `SuspenseException`, and React shows the nearest Suspense fallback until it resolves:

```jsx
const reviews = use(reviewsPromise);
```

The promise must come from outside the render, like a Server Component prop or a cache. A promise created during render is new every time, so React would suspend forever.

The form hooks build on the progressive enhancement we saw in [hydration](/articles/understanding-react-internals/hydration). The form works before React loads, and these hooks add the good UX once it's hydrated:

- **`useActionState`:** wraps an action, and gives you its result and a pending flag.
- **`useFormStatus`:** reads the parent form's status from any component inside it, perfect for a reusable submit button.
- **`useOptimistic`:** shows the result before the server confirms it, and goes back by itself if it fails.

The first two together, in a newsletter form:

```jsx
function SubmitButton() {
  const { pending } = useFormStatus();
  return <button disabled={pending}>Subscribe</button>;
}

function Newsletter() {
  const [state, formAction] = useActionState(subscribe, null);
  return (
    <form action={formAction}>
      <input name="email" />
      <SubmitButton />
      {state?.error && <p>{state.error}</p>}
    </form>
  );
}
```

And `useOptimistic`, for a counter that updates before the server answers:

```jsx
const [optimisticCount, addOptimistic] = useOptimistic(
  count,
  (c, delta) => c + delta
);
```

All of them rely on actions running in transitions. That's where the pending states come from, and why `addOptimistic` must be called inside a transition or an action.

## A cheat sheet

Pick the first question that matches:

- **Does a change need to update the screen?** Yes, `useState`. No, `useRef`.
- **Do several values change together, with complex logic?** `useReducer`.
- **Can I compute it from props or state?** Compute it during render. No hook.
- **Does a `memo` component, an effect or a context need a stable reference?** `useMemo` for values, `useCallback` for functions.
- **Does it happen because the user did something?** Put it in the event handler. No effect.
- **Does it sync with something outside React?** `useEffect`, with a cleanup.
- **Does it measure the DOM, with a visible flicker otherwise?** `useLayoutEffect`.
- **Does an effect need the latest props without re-running?** `useEffectEvent`.
- **Is the value read in many places, and does it rarely change?** Context, with a memoized value.
- **Does an update make an expensive render?** `useTransition`, or `useDeferredValue` for a value.
- **Do I need data from a promise during render?** `use`, inside a Suspense boundary.
- **Do I need a form's result, its pending state, or an instant update?** `useActionState`, `useFormStatus`, `useOptimistic`.
- **Does it need an id that matches between server and client?** `useId`, never `Math.random()`.
- **Does it read a browser value or an external store on the first render?** `useSyncExternalStore`, with a `getServerSnapshot`.

If a hook doesn't fit any of these questions, you probably don't need it.
