---
title: The commit phase
---

## Why the commit is synchronous

At the end of the render phase, React has a finished `workInProgress` tree. Every change is written down as flags, but nothing has touched the screen yet.

The commit phase applies those changes. And unlike rendering, it never stops in the middle.

Why? Because the render phase works on a draft. Nobody sees it, so React can pause it, restart it or throw it away. The commit works on the real DOM. Every change is visible as soon as the browser paints.

Imagine React could pause in the middle of a commit. The browser would paint a page where the new item is inserted, but the counter above it still shows the old number. Half an update. This is exactly what React wants to avoid.

So the commit runs in one go, from start to finish, in a single JavaScript task. In [the render phase](/articles/understanding-react-internals/the-render-phase), only some lanes were synchronous. Here, everything is.

The good news is that it's usually fast. All the expensive work, calling your components and comparing trees, was done during render. The commit only applies a list of small, precise changes.

## The commit steps, in order

`commitRoot` in `ReactFiberWorkLoop.js` runs the commit in a few steps. Each one walks the tree, but only where `subtreeFlags` says there's something to do.

### 1. Before mutation

React reads the DOM before changing it. This is where class components get `getSnapshotBeforeUpdate`, for example to save the scroll position of a chat before new messages are inserted.

Nothing is written yet. It's the last chance to see the old DOM.

### 2. Mutation

Now React changes the DOM. Inserting, updating and removing nodes, following the flags. A few other things happen in this step too:

- **`useInsertionEffect`** runs, right before the DOM changes. We'll see why it exists below.
- **Old refs are detached.** A `ref` pointing to a node that is about to change or disappear is set back to `null`.
- **Cleanups of `useLayoutEffect`** run for the components that changed or are removed.

### 3. The swap

Then comes one line, at the end of `flushMutationEffects`:

```js
root.current = finishedWork;
```

This is the double buffering swap from the render phase. The `workInProgress` tree becomes the `current` tree. The old `current` becomes the `alternate`, and React will reuse it as the draft for the next render.

### 4. Layout

The DOM is up to date, so React can now run code that needs it:

- **New refs are attached.** Your `ref.current` now points to the real node.
- **`useLayoutEffect`** runs, along with `componentDidMount` and `componentDidUpdate` for class components.

The browser hasn't painted yet. We're still in the same JavaScript task.

### 5. Passive effects

Finally, the `useEffect` callbacks. First the cleanups from the previous render, then the new effects. In the source, `commitPassiveUnmountEffects` then `commitPassiveMountEffects`.

But when they run depends on what caused the render. We'll come back to this, because it's not what most people think.

## The DOM APIs React calls

Remember the host config from [chapter I](/articles/understanding-react-internals/what-react-is)? This is where it's used. The reconciler doesn't touch the DOM itself, it calls functions from `ReactFiberConfigDOM.js`. And those functions are thin wrappers around DOM APIs you can use yourself.

Here's how flags turn into DOM calls:

- **`Placement`:** `appendChild` or `insertBefore`, which call `parent.appendChild(node)` and `parent.insertBefore(node, before)`.
- **`ChildDeletion`:** `removeChild`, which calls `parent.removeChild(node)`.
- **`Update` on an element:** `commitUpdate`, which sets attributes, styles and properties, like `node.setAttribute("class", ...)` or `node.style.color = ...`.
- **`Update` on a text:** `commitTextUpdate`, which sets `textNode.nodeValue`.

Let's take back our `<List>` from the render phase. A click added a third item and changed the text of the first one. The flags were:

```js
item1Text.flags = Update; // new text
Item3.flags = Placement; // new Item to insert
```

During the mutation step, React walks down from the root. `Header` has no `subtreeFlags`, so its whole branch is skipped. In `List`, it finds the two flags and makes exactly two DOM calls:

```js
item1TextNode.nodeValue = "Blue shoes (2)"; // commitTextUpdate
listNode.appendChild(item3Node); // appendChild
```

That's it. Two lines. React doesn't rebuild the list or touch the second item. It doesn't even create `item3Node` here: that node was already built in memory by `completeWork` during render, with its children inside. The commit only plugs it into the page.

This is what people mean when they talk about the "virtual DOM". It was never about being faster than the DOM. It's about computing the smallest list of DOM calls, then making them all at once.

## How the browser turns the DOM into pixels

Now, the browser side. Changing the DOM doesn't change the screen. Not right away.

### The event loop

A browser tab runs your JavaScript on a single thread, the main thread. It works through a loop:

1. **Run one task.** A click handler, a `setTimeout` callback, a script, a `MessageChannel` message.
2. **Run all the microtasks.** Promise callbacks, `queueMicrotask`. Every one of them, until the queue is empty.
3. **Render, if it's time.** Usually once per screen refresh, around every 16ms on a 60Hz screen.
4. Go back to step 1.

The important part is step 3. The browser can only render between tasks. While JavaScript is running, the screen is frozen.

### The rendering steps

When the browser decides to render, it goes through a pipeline:

1. **`requestAnimationFrame` callbacks:** your last chance to change things before this frame.
2. **Style:** compute the CSS of each element.
3. **Layout:** compute the size and position of each element.
4. **Paint:** draw the pixels of each layer, text, colors, borders, images.
5. **Composite:** stack the layers together and send the result to the screen.

So when React calls `appendChild`, the node is added to the DOM tree in memory. Nothing more. The style, layout and paint happen later, when the browser reaches step 3 of the event loop.

That's why a synchronous commit is invisible to the user. React makes all its DOM changes in one task. The browser can't render in between. So every change shows up in the same frame, and the user never sees half an update.

### Forced layout

There's one exception. If your code reads a layout value right after changing the DOM, the browser can't wait anymore:

```js
node.style.width = "300px";
const height = node.offsetHeight; // the browser must compute layout now
```

To give you the correct `offsetHeight`, the browser runs style and layout immediately, in the middle of your JavaScript. This is called a forced synchronous layout. Done once, it's fine. Done in a loop, alternating writes and reads, it's called layout thrashing, and it can kill performance.

Keep it in mind, because it's exactly what `useLayoutEffect` is often used for.

## `useLayoutEffect` against `useEffect`

Now we can understand the difference between the two effects for real.

### `useLayoutEffect` runs before paint

It runs in the layout step of the commit, in the same task as the DOM changes. The browser hasn't painted yet.

So it's the place to measure the DOM and fix things before the user sees them. A tooltip is the classic example:

```jsx
function Tooltip({ targetRect, children }) {
  const ref = useRef(null);
  const [top, setTop] = useState(0);

  useLayoutEffect(() => {
    const { height } = ref.current.getBoundingClientRect(); // forced layout
    setTop(targetRect.top - height); // place it above the target
  }, [targetRect]);

  return (
    <div ref={ref} style={{ position: "absolute", top }}>
      {children}
    </div>
  );
}
```

With `useEffect`, the browser could paint the tooltip at `top: 0` first, then move it. The user would see it jump. With `useLayoutEffect`, React measures, updates the state, and renders again synchronously, all before the first paint. The user only sees the final position.

The price: everything in a layout effect delays the paint. Use it only when you need to read the layout, or when a flicker would be visible.

### `useEffect` runs before or after paint

Here's the part most people get wrong. They say `useEffect` always runs after the browser paints. The source says otherwise.

In `ReactFiberWorkLoop.js`, there's this comment:

> If the passive effects are the result of a discrete render, flush them synchronously at the end of the current task so that the result is immediately observable. Otherwise, we assume that they are not order-dependent and do not need to be observed by external systems, so we can wait until after paint.

So it depends on the lane:

- **After a discrete event,** like a click or a key press (`SyncLane`): effects run at the end of the same task, before the browser paints.
- **After anything else,** like a transition, a `fetch` or a `setTimeout`: effects are scheduled with the scheduler, in a new task. The browser paints first.

Why? Imagine a click that opens a modal, and an effect that focuses its input. If the effect ran after paint, the user could type a letter in the frame between the two, and lose it. Running effects right away makes the result of a click immediately consistent.

In practice, the rule doesn't change much for you. `useEffect` is for side effects that don't need to block the screen: fetching, subscribing, logging, syncing with something outside React. Just don't count on the browser having painted when it runs.

### `useInsertionEffect` is for libraries

There's a third effect, and you'll probably never use it directly. `useInsertionEffect` runs during the mutation step, before React changes the DOM, and before any layout effect.

It exists for CSS-in-JS libraries. They need to insert `<style>` tags before any layout effect reads the layout. Otherwise, the browser would compute layout with missing styles, then compute it again once the styles arrive.

## A full timeline

Let's put everything together, from a click to the pixels.

### A click

```jsx
<button onClick={() => setCount(count + 1)}>{count}</button>
```

1. **The browser runs a task:** the click event. React's root listener catches it, finds the fiber, and calls your `onClick`.
2. **`setCount` is called.** The update gets `SyncLane`, and React schedules a render in a microtask.
3. **The event handler ends.** The microtasks run, so React renders synchronously with `workLoopSync`.
4. **Commit, before mutation:** React reads what it needs from the old DOM.
5. **Commit, mutation:** `textNode.nodeValue = "1"`.
6. **The swap:** `root.current = finishedWork`.
7. **Commit, layout:** refs are attached and `useLayoutEffect` runs.
8. **Passive effects:** because the render came from a click, `useEffect` runs now, still in the same task.
9. **The task ends.** The browser renders: style, layout, paint, composite.
10. **The user sees "1".**

Steps 1 to 8 are all JavaScript, in one task. The screen updates once, at step 9.

### A transition

```jsx
startTransition(() => setFilter("shoes"));
```

1. **`setFilter` is called** with a transition lane. React asks the scheduler for a task.
2. **Render, in slices.** `workLoopConcurrentByScheduler` renders for about 5ms, yields, and continues in a new task through `MessageChannel`. The browser can paint and handle clicks between slices.
3. **Commit,** in one task, synchronously: before mutation, mutation, swap, layout.
4. **The task ends, the browser paints.** The user sees the filtered list.
5. **Passive effects** run later, in a task scheduled by the scheduler.

Same commit, different timing around it. The render was cut into pieces, the commit never is.
