---
title: Understanding React internals
description: How React works underneath, from the scheduler and lanes to server serialization and hydration, based on years of using React and reading its source code.
date: 2026-10-29
---

Most people learn React through hooks. `useState`, `useEffect`, `useMemo`, and a list of rules to follow without really knowing why.

Hooks are only the surface of React, the part you touch. Forget about them for now.

Underneath, React is a scheduler. It decides what to render and when, splits the work into small pieces, and pauses when something more important comes in.

This article covers that part: async React, lanes, how React serializes components between the server and the client, and hydration.

Some of it is hard to understand, so I'll explain everything as simply as I can.

And it's okay not to understand it all at once. I didn't either. Read it, come back later, and read it again.

It sums up what I've learned over the last few years, using React every day and reading the source code of the [React repository](https://github.com/react/react).

If at any point you need to look at the source code, I really, REALLY encourage you to do it. It's the best way to understand how React works. Everything else, including this article, is someone's interpretation of it.

After reading this, you'll know when to use each hook, and more importantly, why. Or, as [@infinterenders](https://x.com/infinterenders) would say, you'll become elite.

Reading the source changed the way I use React, especially how I think about the server and the client, and how React works with the browser.
