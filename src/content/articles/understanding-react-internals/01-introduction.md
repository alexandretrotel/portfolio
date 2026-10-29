---
title: Understanding React internals
description: A deep dive into how React really works, from the scheduler and lanes to server serialization and hydration. Built from years of using React and reading its source code.
date: 2026-10-29
---

Most people learn React through hooks. `useState`, `useEffect`, `useMemo`, and a list of rules to follow without really knowing why.

But here's the thing, React is not about hooks. Hooks are only the surface, the part you touch. So forget about them for now.

Underneath, React is a scheduler. It decides what to render, when to render it, and what can wait. It talks to the browser, splits work into small pieces, and pauses when something more important comes in.

This article is a deep dive into that part. We'll go through async React, lanes, how React serializes components over the network between the server and the client, hydration, and all the things that usually stay hidden.

I won't lie to you, some of it is hard to understand. So I'll take the time to explain everything as simply as I can.

And it's okay not to understand it all at once. I didn't either. Read it, come back later, and read it again.

Basically, this is the summary of what I've learned over these last years, using React every day and reading the source code of the [React repository](https://github.com/react/react).

If at any point you need to look at the source code, I really, REALLY encourage you to do it. It's the only and best way to understand how React works. Everything else, including this article, is someone's interpretation of it.

After reading this, you should understand React well enough to master it. You'll know when to use each hook, and more importantly, why. Or, as [@infinterenders](https://x.com/infinterenders) would say, you'll become elite.

For me, it changed the way I use React. Especially the mental models between the server and the client, and how React interacts with the browser.

So, let's get started.
