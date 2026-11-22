---
title: Understanding Postgres internals
description: How Postgres works underneath, from how it stores data on disk to processes, concurrency, and architecture, explained as I learned it.
date: 2026-11-22
---

When I first discovered Postgres, it was just a database to me.

And my idea of a database was simple. A place to store data in rows and columns. Maybe relational, which to me meant that tables could point to each other. That was it.

Later, I learned about indexes and how they make queries faster. Then isolation levels, concurrent transactions, and everything else Postgres gives you on top of a lighter database like SQLite.

Every time I learned something new, I found out there was more underneath. Postgres turned out to be a lot more than what I imagined at first.

I want to take you with me on that journey.

Postgres is a whole machine. It manages its own files on disk, starts and coordinates operating system processes, and lets many clients read and write the same data at the same time without stepping on each other.

So understanding how it works will teach you a lot more than Postgres itself. You'll learn about data storage, OS processes, concurrency, and how to architect a system that has to stay correct under all of it.
