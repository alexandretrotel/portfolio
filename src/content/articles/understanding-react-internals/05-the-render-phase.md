---
title: The render phase
---

## What triggers a render

A render never starts by itself. Something has to ask for it. In practice, there are five triggers:

- **A state update:** you call `setState`, or `dispatch` from `useReducer`.
- **A parent re-renders:** when a component renders, all its children render too.
- **A context value changes:** every component reading that context with `useContext` or `use` renders again.
- **An external store changes:** a store you subscribed to with `useSyncExternalStore` tells React its value is different.
- **A Suspense retry:** a promise that suspended resolves, and React tries again.

The second one is where most people get it wrong, me included for a long time. A component doesn't re-render because its props changed. It re-renders because its parent re-rendered, even if the props are exactly the same.

```jsx
function Parent() {
  const [count, setCount] = useState(0);
  return (
    <>
      <button onClick={() => setCount(count + 1)}>{count}</button>
      <Child /> {/* no props at all, still re-renders on every click */}
    </>
  );
}
```

So when does React skip work? In a few cases:

- **Same state:** if you set the state to the value it already has, React compares them with `Object.is` and bails out early. The source even calls it the "fast path".
- **Same props object:** when a fiber gets the exact same props object as last time, and nothing else changed, React skips it. The check in `beginWork` is literally `oldProps !== newProps`, a comparison by reference, not by content.
- **`memo`:** wraps a component so React compares each prop with `Object.is`, instead of the whole props object.

The second case explains a trick you may have seen. Pass components as `children`, and they don't re-render when the wrapper's state changes:

```jsx
function Wrapper({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <div onClick={() => setOpen(!open)}>
      {children} {/* same elements as last time, React skips them */}
    </div>
  );
}
```

`children` were created by the component above `Wrapper`, which didn't re-render. So they are the same objects, and React skips them.

Context follows the same logic. When a provider renders with a new `value`, React compares it with the previous one using `Object.is`. A new object, even with the same content, is a new value. That's why `value={{ user }}` re-renders every consumer each time the provider renders.

Note that the [React Compiler](https://react.dev/learn/react-compiler) now automates a lot of this. It adds the memoization for you at build time. But knowing why it's needed is what lets you understand what the compiler does.

Last thing: calling `setState` doesn't render right away. React stores the update in a queue on the fiber, and schedules one render for all the updates made in the same event. This is called batching. Three `setState` calls in a click handler give you one render, not three.

## Fibers

We've talked about fibers since chapter I. It's time to define them.

A fiber is a plain JavaScript object. React creates one for each element in your tree: each component, each `<div>`, each piece of text. Here are its most important fields, straight from `FiberNode` in `ReactFiber.js`:

```js
{
  tag,           // what kind of fiber: function component, DOM element, text...
  type,          // the component function, or "div"
  key,           // the key you gave it
  stateNode,     // the real DOM node, for DOM elements

  return,        // the parent fiber
  child,         // the first child
  sibling,       // the next sibling

  pendingProps,  // the new props for this render
  memoizedProps, // the props from the last render
  memoizedState, // for function components: the hooks, as a linked list

  lanes,         // pending work on this fiber
  childLanes,    // pending work somewhere below
  flags,         // what the commit phase will have to do

  alternate,     // the other version of this fiber
}
```

Two things are worth noticing.

First, `memoizedState`. Your hooks are stored there, as a linked list, in the order you called them. The first `useState` is the first item, the second is the next, and so on. That's why hooks can't be called in a condition or a loop: React finds each hook by its position in the list. Skip one, and every hook after it reads the wrong state.

Second, there's no array of children. A fiber points to its first `child`, which points to its `sibling`, and every fiber points back to its parent with `return`. The tree is a linked list.

Why? Because a linked list can be walked with a simple loop, one fiber at a time. And a loop can stop at any fiber and continue later. A recursive function can't, it has to go all the way down and back up in one go. This is the whole reason fibers exist.

Finally, `alternate`. React keeps two trees at the same time:

- **`current`:** the tree that's on the screen right now.
- **`workInProgress`:** the tree React is building for the next render.

Each fiber points to its twin with `alternate`. React builds the new tree in the background, and when it's done, it swaps the two. This is called double buffering, the same trick video games use to avoid showing a half-drawn frame.

## The work loop

So how does React walk this tree? With a loop calling `performUnitOfWork` on one fiber at a time. Each fiber goes through two steps:

- **`beginWork`, on the way down:** React calls your component, or reads the element's props, and compares the children it gets with the previous ones. It returns the first child, and the loop moves there.
- **`completeWork`, on the way up:** once a fiber has no more children to visit, React prepares its DOM node in memory, and bubbles its `flags` up to the parent. Then it moves to the sibling, or back to the parent.

For this tree:

```jsx
<App>
  <Header />
  <List>
    <Item />
    <Item />
  </List>
</App>
```

The walk looks like this:

```
begin    App
begin      Header
complete   Header      no child, go to sibling
begin      List
begin        Item
complete     Item      go to sibling
begin        Item
complete     Item      no sibling, go back up
complete   List
complete App           done
```

Each line is one unit of work. Between any two lines, React can stop.

The comparison happening in `beginWork` is called reconciliation, and that's where `react-reconciler` gets its name. It follows simple rules:

- **Same type at the same position:** React keeps the fiber and updates its props. The DOM node and the state are preserved.
- **Different type:** React throws away the old fiber and everything below it, state included, and creates new ones. Going from `<div>` to `<section>` resets the whole subtree.
- **In a list:** React matches children by `key`. Without keys, it matches them by position, so inserting an item at the top makes every item look changed. That's why `key={index}` gives you weird bugs when the list is reordered.

Remember, nothing touches the screen here. The DOM nodes prepared in `completeWork` are not inserted yet, and the changes are only written down as `flags`. Applying them is the commit phase's job.

So what do flags look like? Like lanes, they're bits, defined in `ReactFiberFlags.js`:

```js
export const NoFlags = /*       */ 0b0000000000000000000000000000000;
export const Placement = /*     */ 0b0000000000000000000000000000010; // insert this node
export const Update = /*        */ 0b0000000000000000000000000000100; // update its props or text
export const ChildDeletion = /* */ 0b0000000000000000000000000010000; // remove some children
export const Ref = /*           */ 0b0000000000000000000001000000000; // attach or detach a ref
export const Passive = /*       */ 0b0000000000000000000100000000000; // run a useEffect
```

Take our `<List>` from above. Say a click adds a third item and changes the text of the first one. After the render phase, the fibers carry these flags:

```js
item1Text.flags = Update; // the text fiber inside the first Item: new text
Item3.flags = Placement; // a new Item: its nodes must be inserted
```

A fiber can have several flags at once. An item that changed and has a `useEffect` gets `Update | Passive`.

And remember `completeWork` bubbling flags up? Each parent merges its children's flags into its `subtreeFlags`:

```js
subtreeFlags |= child.subtreeFlags;
subtreeFlags |= child.flags;
```

So `List.subtreeFlags` contains `Update | Placement`, and so does `App.subtreeFlags`. The `Header` has none. During the commit, React will check `subtreeFlags` and skip the whole `Header` branch, because there's nothing to do in it.

## Lanes

Now, priorities. Not every update is equally urgent. A key press must show up now, while filtering a list of 10,000 items can wait a few milliseconds.

React represents priorities with lanes. A lane is a single bit in a 31-bit number:

```js
export const SyncLane = /*            */ 0b0000000000000000000000000000010;
export const InputContinuousLane = /* */ 0b0000000000000000000000000001000;
export const DefaultLane = /*         */ 0b0000000000000000000000000100000;
// ...14 transition lanes, 4 retry lanes...
export const IdleLane = /*            */ 0b0010000000000000000000000000000;
export const OffscreenLane = /*       */ 0b0100000000000000000000000000000;
```

The further right the bit, the more urgent the lane. Here are the main ones:

- **`SyncLane`:** discrete events, like a `click`, a `keydown` or a `submit`.
- **`InputContinuousLane`:** continuous events, like `mousemove` or `scroll`.
- **`DefaultLane`:** updates outside of any event, like after a `fetch` or in a `setTimeout`.
- **Transition lanes:** updates wrapped in `startTransition`.
- **Retry lanes:** Suspense boundaries trying again after a promise resolves.
- **`IdleLane` and `OffscreenLane`:** work nobody is waiting for, like hidden content.

How does React know which lane to use? From the event that's running. `react-dom` maps each DOM event to a priority, and these priorities are literally lanes:

```js
export const DiscreteEventPriority = SyncLane;
export const ContinuousEventPriority = InputContinuousLane;
export const DefaultEventPriority = DefaultLane;
```

So a `setState` in an `onClick` gets `SyncLane`. The same `setState` inside `startTransition` gets a transition lane.

Why bits? Because a set of lanes is just a number, and bit operations are extremely cheap. Merging two sets is `a | b`. Checking if a set contains a lane is `(set & lane) !== 0`. And finding the most urgent lane in a set is one line:

```js
export function getHighestPriorityLane(lanes) {
  return lanes & -lanes;
}
```

That trick keeps only the rightmost bit, which is the most urgent lane. Each fiber has its `lanes`, and its `childLanes` for the work below it. So React can skip a whole branch of the tree with one check, if nothing in it matches the lanes being rendered.

## Concurrency and the scheduler

Here's the key point of this chapter. The render phase can be interrupted, but not always. It depends on the lanes.

React has two versions of the work loop. The synchronous one:

```js
function workLoopSync() {
  while (workInProgress !== null) {
    performUnitOfWork(workInProgress);
  }
}
```

And the concurrent one:

```js
function workLoopConcurrentByScheduler() {
  while (workInProgress !== null && !shouldYield()) {
    performUnitOfWork(workInProgress);
  }
}
```

The only difference is `shouldYield()`. In the concurrent loop, React asks the scheduler after every fiber: "should I give control back to the browser?" The scheduler says yes after 5ms (`frameYieldMs`). React stops, the browser handles clicks, runs animations, and paints. Then the scheduler resumes the work with `MessageChannel`, exactly where it stopped.

That's how React keeps the page responsive during a big render. The work is cut into 5ms slices, with the browser free in between. This is concurrent rendering.

But which loop runs? The source decides it in one line:

```js
const shouldTimeSlice =
  !forceSync &&
  !includesBlockingLane(lanes) &&
  !includesExpiredLane(root, lanes);
```

The "blocking" lanes are `SyncLane`, `InputContinuousLane` and `DefaultLane`. So:

- **A click renders synchronously.** It doesn't yield and it can't be interrupted. The user wants a response now, and pausing would only delay it.
- **A transition renders concurrently.** It yields every 5ms, and it can be interrupted.

So the urgent updates are not the ones being interrupted. They're the ones doing the interrupting.

And what if a transition keeps getting interrupted, forever? It would never show up. To avoid that, every lane has an expiration time: 250ms for sync and input lanes, 5 seconds for transitions. Once a lane expires, `includesExpiredLane` becomes true, and React renders it synchronously, no matter what. This prevents starvation.

## Interruptions

Let's see an interruption in action. A search input filtering a huge list:

```jsx
function Search() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");

  function onChange(event) {
    setQuery(event.target.value); // SyncLane, urgent
    startTransition(() => {
      setFilter(event.target.value); // transition lane, can wait
    });
  }

  return (
    <>
      <input value={query} onChange={onChange} />
      <HugeList filter={filter} />
    </>
  );
}
```

The user types "r", then "re" quickly. Here's what happens:

1. The "r" key press updates `query` with `SyncLane`. React renders it right away, synchronously, and the input shows "r".
2. The transition for `filter = "r"` starts, in the concurrent loop. React walks `HugeList`, 5ms at a time.
3. The user types "e". The browser handles the event between two slices, and a new `SyncLane` update arrives.
4. React sees more urgent work. The lanes to render are not the same anymore, so it calls `prepareFreshStack` and throws away the unfinished `workInProgress` tree.
5. It renders the "re" key press synchronously.
6. Then it starts the transition again, this time with `filter = "re"`. The "r" result is never shown, nobody needs it anymore.

The input never lags, because the list never blocks it.

`useDeferredValue` does the same for a value instead of an update:

```jsx
const deferredFilter = useDeferredValue(query);
return <HugeList filter={deferredFilter} />;
```

React first renders with the old value, then renders again in the background, on a lower priority lane, with the new one.

Now you see why chapter I said components must be pure. In step 4, React called your components for "r", then threw the result away. If those calls had side effects, like sending an analytics event or mutating a variable, they would have happened for a render that never reached the screen.

## Suspense during render

One last thing can stop a render: a component that isn't ready.

When a component calls `use(promise)` and the promise is still pending, `use` throws a special value, `SuspenseException`. It's not a real error. It's React's way to stop rendering that component immediately.

React catches it, goes up the tree to the nearest `<Suspense>` boundary, and renders its fallback instead. Then it attaches a listener to the promise. When it resolves, React schedules a render on a retry lane, and this time `use` returns the value.

```jsx
function Reviews({ reviewsPromise }) {
  const reviews = use(reviewsPromise); // throws while pending
  return <ReviewList reviews={reviews} />;
}
```

It's the same idea as Fizz on the server in chapter II. A boundary that isn't ready shows its fallback, and the content takes its place when the data arrives. Same model, different engine.
