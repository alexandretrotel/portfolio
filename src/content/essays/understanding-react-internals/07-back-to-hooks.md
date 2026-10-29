---
title: Back to hooks
---

## Hooks are slots in a fiber

At the start of this essay, I told you to forget about hooks. Now that you know what happens underneath, we can come back to them. And you'll see, they become much easier to understand.

Remember the fiber's `memoizedState` field from [the render phase](/essays/understanding-react-internals/the-render-phase)? For a function component, it holds the hooks. Each hook is a small object, straight from `ReactFiberHooks.js`:

```js
{
  memoizedState, // the value this hook keeps: the state, the ref, the memoized result...
  baseState,     // used to replay updates of different priorities
  baseQueue,
  queue,         // the pending updates, for useState and useReducer
  next,          // the next hook
}
```

They're chained with `next`, in the order you call them. So for this component:

```jsx
function Profile() {
  const [name, setName] = useState("");
  const inputRef = useRef(null);
  const upper = useMemo(() => name.toUpperCase(), [name]);
  // ...
}
```

The fiber stores a list of three slots:

```
fiber.memoizedState → useState slot → useRef slot → useMemo slot → null
```

On each render, React walks this list as you call your hooks. The first call reads the first slot, the second call reads the second, and so on. There are no names, only positions.

This is the real reason behind the rules of hooks. Call a hook inside an `if`, and on the render where the condition is false, every hook after it reads the wrong slot. Your `useRef` would get the `useMemo` value. React can't detect it in production, it just reads what's at that position.

Every hook in this part is just a different way to use one of these slots.

## State: `useState` and `useReducer`

### `useState` is a reducer

`useState` is `useReducer` with a reducer written for you. In the source, its reducer is called `basicStateReducer`:

```js
function basicStateReducer(state, action) {
  return typeof action === "function" ? action(state) : action;
}
```

That's it. If you pass a function, it's called with the current state. Otherwise, the value replaces the state.

### Updates go into a queue

When you call `setCount`, React doesn't change the state right away. It creates an update object with a lane, the one we saw in the render phase, and adds it to the hook's `queue`. Then it schedules a render.

During that render, React processes the queue in order, through the reducer, to compute the new state.

This explains the classic bug:

```jsx
function onClick() {
  setCount(count + 1);
  setCount(count + 1);
  setCount(count + 1);
}
```

You'd expect `count + 3`. You get `count + 1`. Why? `count` is a constant from the render that created this function. If it was `0`, the queue contains three updates saying "set to 1". The reducer applies them in order, and the result is `1`.

Now with a function:

```jsx
function onClick() {
  setCount((c) => c + 1);
  setCount((c) => c + 1);
  setCount((c) => c + 1);
}
```

The queue contains three functions. The reducer calls each one with the result of the previous one: `0 → 1 → 2 → 3`.

So the rule is simple. When the new state depends on the previous one, pass a function. `count` is a snapshot of a past render, `c` is the real current value.

And remember the bailout: if the new state is the same as the current one, compared with `Object.is`, React skips the render entirely.

### When to choose `useReducer`

Since they're the same thing underneath, it's only a question of readability:

- **`useState`:** for independent values. A boolean, a string, a number.
- **`useReducer`:** when several values change together, or when the next state depends on the previous one in many different ways. The logic lives in one pure function, outside the component, easy to test.

A good sign you need `useReducer`: an event handler calling three `setState` in a row to keep them in sync.

## Refs: `useRef`

Here's the whole implementation of `useRef` on the first render:

```js
function mountRef(initialValue) {
  const hook = mountWorkInProgressHook();
  const ref = { current: initialValue };
  hook.memoizedState = ref;
  return ref;
}
```

A plain object, stored in a slot. On the next renders, React returns the same object. That's all.

So changing `ref.current` is just changing a property of an object. No update in a queue, no lane, no render. React doesn't even know it happened.

This tells you exactly when to use it:

- **Values that don't affect the screen:** a timer id, the previous value of a prop, a flag like "has this already been sent".
- **DOM nodes:** pass the ref to an element, and React fills `ref.current` with the DOM node during the layout step of [the commit](/essays/understanding-react-internals/the-commit-phase), and empties it when the node is removed.

And when not to:

- **Values shown on screen:** if it's displayed, it must be state. Otherwise changing it won't update anything.
- **Reading or writing it during render:** rendering must be pure, and a render can be thrown away, as we saw with interruptions. Use refs in event handlers and effects.

`useState` against `useRef` comes down to one question: should a change update the screen?

## Memoization: `useMemo`, `useCallback`, `memo`

### What they really do

Most people think memoization is about avoiding expensive calculations. Sometimes it is. But most of the time, its real job is something else: keeping the same reference between renders.

Remember how React skips work in the render phase. Same props object, `memo` comparing each prop with `Object.is`, context values compared with `Object.is`. Everything is compared by reference.

And every render creates new objects and functions:

```jsx
function Page() {
  const filters = { color: "blue" }; // a new object on every render
  const onSelect = (id) => select(id); // a new function on every render
  return <ProductList filters={filters} onSelect={onSelect} />;
}
```

Even if `ProductList` is wrapped in `memo`, it re-renders every time. `filters` and `onSelect` are new references, so `Object.is` says they changed.

`useMemo` and `useCallback` keep the same reference until a dependency changes:

```jsx
const filters = useMemo(() => ({ color: "blue" }), []);
const onSelect = useCallback((id) => select(id), []);
```

### How dependencies are compared

For both hooks, React stores the value and the dependencies in the slot. On the next render, it compares each dependency with the previous one, in `areHookInputsEqual`:

```js
for (let i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
  if (is(nextDeps[i], prevDeps[i])) {
    continue;
  }
  return false;
}
return true;
```

One by one, with `Object.is`. If they're all the same, React returns the stored value. Otherwise, it computes a new one.

So an object in the dependencies, created during render, breaks the memoization. It's new every time.

And `useCallback`? Look at what it stores:

```js
hook.memoizedState = [callback, nextDeps];
```

The function itself. `useCallback(fn, deps)` is exactly `useMemo(() => fn, deps)`.

### When it's worth it

Memoizing has a cost too: a slot, a comparison of dependencies on every render, and more code to read. So use it when the reference actually matters:

- **The value goes to a component wrapped in `memo`.** Without a stable reference, `memo` is useless.
- **The value is in the dependencies of an effect or another hook.** Otherwise the effect runs on every render.
- **The value is a context provider's `value`.** Otherwise every consumer renders each time the provider does.
- **The calculation is really expensive.** Filtering 10,000 items, not adding two numbers.

Outside of these cases, it's noise.

And with the [React Compiler](https://react.dev/learn/react-compiler), you'll write most of this less and less. It analyzes your components at build time and adds the memoization for you.

Personally, I don't use the Babel plugin the React docs recommend. I use [`oxc-transform-react`](https://oxc.rs/docs/guide/usage/transformer/react-compiler.html) from [Oxc](https://oxc.rs), with `@vitejs/plugin-react`. It runs a Rust port of the same compiler, and it's [more than 10 times faster](https://oxc.rs/blog/2026-08-18-react-compiler-support) than Babel. It's still marked experimental, but the [VoidZero](https://voidzero.dev) team always makes great tools.

## Effects: `useEffect`, `useLayoutEffect`, `useInsertionEffect`, `useEffectEvent`

### What effects are for

Effects are for one thing: synchronizing your component with something outside React. A network connection, a subscription, a timer, a third-party library, the document title.

That's why they run in the commit, after the DOM is updated, and never on the server. The outside world only matters once something is really on the screen.

Here's when each one runs, as we saw in [the commit phase](/essays/understanding-react-internals/the-commit-phase):

- **`useInsertionEffect`:** during the mutation step, before the DOM changes. For CSS-in-JS libraries only.
- **`useLayoutEffect`:** during the layout step, before paint. To measure the DOM and fix things without flicker.
- **`useEffect`:** at the end, before paint after a click, after paint otherwise. For everything else.

Default to `useEffect`. Reach for `useLayoutEffect` only when you see a flicker.

### When you don't need an effect

Many effects shouldn't exist. Two cases come up all the time.

**Values you can compute during render.** If something can be calculated from props or state, calculate it:

```jsx
// Bad: an extra render, and one frame with the wrong value
const [fullName, setFullName] = useState("");
useEffect(() => {
  setFullName(first + " " + last);
}, [first, last]);

// Good: computed during render
const fullName = first + " " + last;
```

With the effect, React renders with the old `fullName`, commits, runs the effect, then renders again. Twice the work, for a value it could have computed the first time.

**Logic that belongs to an event.** If something happens because the user did something, it goes in the event handler:

```jsx
// Bad: runs when `submitted` changes, for any reason
useEffect(() => {
  if (submitted) sendAnalytics("form_submitted");
}, [submitted]);

// Good: runs because the user clicked
function onSubmit() {
  setSubmitted(true);
  sendAnalytics("form_submitted");
}
```

The question to ask: is this code running because the component is on the screen, or because the user did something? The first is an effect, the second is an event.

### Cleanups and `StrictMode`

An effect can return a cleanup function. React calls it before running the effect again, and when the component is removed:

```jsx
useEffect(() => {
  const connection = createConnection(roomId);
  connection.connect();
  return () => connection.disconnect();
}, [roomId]);
```

In development, `StrictMode` mounts every component twice: mount, unmount, mount again. It's not a bug. It's React checking that your cleanup really undoes what the effect did. If your app breaks because of it, it would break too when a user navigates back and forth.

### `useEffectEvent`

Sometimes an effect needs the latest value of a prop, but shouldn't re-run when it changes:

```jsx
function ChatRoom({ roomId, theme }) {
  useEffect(() => {
    const connection = createConnection(roomId);
    connection.on("connected", () => showNotification("Connected!", theme));
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, theme]); // changing the theme reconnects the chat
}
```

Switching to dark mode would disconnect and reconnect the chat. `useEffectEvent` fixes it:

```jsx
function ChatRoom({ roomId, theme }) {
  const onConnected = useEffectEvent(() => {
    showNotification("Connected!", theme); // always reads the latest theme
  });

  useEffect(() => {
    const connection = createConnection(roomId);
    connection.on("connected", () => onConnected());
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // only the room reconnects the chat
}
```

The function returned by `useEffectEvent` always sees the latest props, and it doesn't go in the dependencies. Under the hood, it's close to a ref that React updates on every commit.

And React protects you from misusing it. Call it during render, and you get: "A function wrapped in useEffectEvent can't be called during rendering."

## Context: `useContext` and `use(Context)`

Context lets a component read a value without passing it through every level of props. Both `useContext(MyContext)` and `use(MyContext)` read it. The difference: `use` can be called inside an `if`, because it doesn't use a slot in the hook list.

The important part is how it re-renders, which we saw in the render phase. When a provider renders, React compares its new `value` with the previous one using `Object.is`. If it changed, every component reading that context renders again, even if `memo` wraps it.

Two practical rules follow:

**Memoize the value.** An object written inline is new on every render:

```jsx
// Every consumer renders each time App renders
<UserContext value={{ user, logout }}>

// Consumers render only when user or logout changes
const value = useMemo(() => ({ user, logout }), [user, logout]);
<UserContext value={value}>
```

**Split contexts that change at different speeds.** If the theme changes once a month and the cursor position sixty times per second, don't put them in the same context. Every component reading the theme would render sixty times per second.

Context is great for values read in many places that rarely change: the user, the theme, the language. For values that change all the time, a store with `useSyncExternalStore` lets each component subscribe only to what it needs.

## Concurrency: `useTransition`, `startTransition`, `useDeferredValue`

These hooks are lanes, exposed to you.

By default, an update in an event gets an urgent lane and renders synchronously. `startTransition` gives it a transition lane instead. As we saw in the render phase, that render is concurrent: it yields every 5ms, and it's thrown away when something more urgent arrives.

`useTransition` adds one thing, a pending flag:

```jsx
function Tabs() {
  const [tab, setTab] = useState("home");
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <button onClick={() => startTransition(() => setTab("posts"))}>
        Posts {isPending && "..."}
      </button>
      <TabContent tab={tab} />
    </>
  );
}
```

While the transition renders, `isPending` is `true`, and the old tab stays on screen. The user can still click another tab, which interrupts the first one.

`useDeferredValue` does the same thing, for a value you don't control:

```jsx
function Search({ query }) {
  const deferredQuery = useDeferredValue(query);
  return <HugeList filter={deferredQuery} />;
}
```

Use them when an update makes an expensive render, and something urgent must stay responsive: typing in an input, switching tabs, navigating. Don't use them for the urgent update itself. The input's own value must stay a normal update, or typing would lag.

## Async and forms: `use`, `useActionState`, `useFormStatus`, `useOptimistic`

### `use(promise)`

`use` reads the value of a promise during render:

```jsx
function Reviews({ reviewsPromise }) {
  const reviews = use(reviewsPromise);
  return <ReviewList reviews={reviews} />;
}
```

As we saw in the render phase, if the promise is pending, `use` throws `SuspenseException`, React shows the nearest Suspense fallback, and renders again on a retry lane when it resolves.

One rule: the promise must come from outside the render, like a Server Component passing it as a prop, or a cache. A promise created during render is a new promise every time, so React would suspend forever.

### `useActionState` and `useFormStatus`

Remember progressive enhancement from [hydration](/essays/understanding-react-internals/hydration)? A form with an action works before React loads. These hooks add the good UX on top, once it's hydrated.

`useActionState` wraps an action and keeps its result as state:

```jsx
function Newsletter() {
  const [state, formAction, isPending] = useActionState(subscribe, null);

  return (
    <form action={formAction}>
      <input name="email" />
      <button disabled={isPending}>Subscribe</button>
      {state?.error && <p>{state.error}</p>}
    </form>
  );
}
```

`useFormStatus` reads the status of the parent form, from any component inside it. Perfect for a reusable submit button:

```jsx
function SubmitButton() {
  const { pending } = useFormStatus();
  return <button disabled={pending}>{pending ? "Sending..." : "Send"}</button>;
}
```

Actions run in transitions. That's why there's a pending state, and why the rest of the page stays responsive while the form submits.

### `useOptimistic`

`useOptimistic` shows the result before the server confirms it:

```jsx
function Likes({ count, like }) {
  const [optimisticCount, addOptimistic] = useOptimistic(
    count,
    (current, delta) => current + delta
  );

  async function onClick() {
    addOptimistic(1); // the screen shows +1 right away
    await like(); // the server confirms
  }

  return (
    <button onClick={() => startTransition(onClick)}>{optimisticCount}</button>
  );
}
```

While the transition runs, React shows the optimistic value. When it ends, React drops it and shows the real `count`. If the server failed, the count goes back by itself.

It must be called inside a transition or an action. Otherwise React warns you: "An optimistic state update occurred outside a transition or action."

## Hydration-safe hooks: `useId` and `useSyncExternalStore`

We met these two in [the hydration part](/essays/understanding-react-internals/hydration), with the mismatches. A quick recap:

- **`useId`:** generates an id that's the same on the server and the client, because it's built from the component's position in the tree. Use it for `htmlFor`, `aria-describedby`, anything that links two elements. Never `Math.random()`.
- **`useSyncExternalStore`:** subscribes to a store outside React, like a state library, `localStorage` or `navigator.onLine`. Its `getServerSnapshot` argument gives the value to use on the server and during hydration, so the first render matches.

Both exist because the server and the browser must agree on the first render.

## A cheat sheet

Here's everything above, as questions. Pick the first one that matches.

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
- **Does it need an id, or read a browser value on the first render?** `useId`, `useSyncExternalStore`.

If a hook doesn't fit any of these questions, you probably don't need it.

## The end, for now

At the beginning, I told you React is not about hooks. I hope you see why now.

Hooks are the surface. Underneath, there are two server renderers streaming HTML and payloads, a hydration walk claiming DOM nodes one by one, a scheduler cutting work into 5ms slices, lanes deciding what's urgent, fibers that can stop and restart, and a commit that changes the DOM in one go before the browser paints.

Each hook is just a handle on one of those pieces. Once you see the pieces, you stop memorizing rules. You know why they exist.

If you take only one thing from this essay, take this: go read [the source code](https://github.com/react/react). Start with `packages/react-reconciler/src/ReactFiberWorkLoop.js`, and follow the functions. It's long, but it's well commented, and it's the only place where the truth is.

And if something is still unclear, give this essay to your agent or LLM and ask it questions. Or even better, give it the React source code. You'll get much more accurate answers.

As I said in the introduction, this is the first of a series. Next, we'll dig into Postgres. And like React, it's not what most people think it is.

Postgres is not just tables with rows, columns and ACID transactions. It's a query planner and optimizer deciding how to run your SQL. It's data stored in 8 KB pages on disk. It's a write-ahead log, the WAL, that makes crash recovery, replication and backups possible. And it's MVCC, the mechanism that lets many people read and write at the same time, with isolation levels that each give you different guarantees.

Postgres is great, and you can do a lot with it. But it's not always the best database for every use case. And to use it well, you need to understand all these pieces.

See you there.
