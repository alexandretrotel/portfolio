---
title: Processes
---

Postgres doesn't use threads. Every piece of work runs in its own operating system process, and all of them start from the same parent, the postmaster.

There are two families: one process per client, and the processes that keep the server running in the background.

## One process per client

The postmaster listens on the socket. When a client connects, it forks a new process and hands it the connection. That process is a client backend.

The backend speaks the [wire protocol](/articles/understanding-postgres-internals/wire-protocol) with the client until it disconnects, and runs every query the client sends on its own.

That's simple and safe. If one backend crashes, it doesn't take the memory of the others with it. But a process is not free. Each one has its own memory, and starting one takes time. That's why Postgres allows only 100 connections by default, and why poolers like PgBouncer exist: they keep a few backends open and share them between many clients.

## Background processes

You can see every process running on your server with this query:

```sql
SELECT pid, backend_type FROM pg_stat_activity;
```

They fall into a few groups. Most of them get their own part later, so here is just what they're for. The ones marked "on demand" only run when a feature needs them.

### Writing data to disk

The background writer writes modified pages from memory to disk ahead of time, and the io workers read and write data files for the backends.

### WAL

The walwriter flushes the WAL to disk. The checkpointer regularly writes all modified pages to disk, so recovery after a crash has less WAL to replay. The archiver (on demand) copies WAL files to a backup location, and the walsummarizer (on demand) tracks changed pages for incremental backups.

### Cleaning up

The autovacuum launcher starts autovacuum workers (on demand) to remove old row versions that no transaction can see anymore.

### Replication

The startup process (on demand) replays the WAL after a crash or on a standby. A walsender (on demand) streams the WAL to another server, and a walreceiver (on demand) receives it on the standby.

### Running queries

Parallel workers (on demand) split one query across several processes.

That's a lot of processes. To me, this is the most interesting part of Postgres. It's where I understood it wasn't just a database, and how complex it really is: many components, each doing something very different.

## The ones without a part

A few processes don't fit in any later part, so let's look at them here.

The logical replication launcher always runs, even if you never use logical replication. Logical replication sends changes as rows, not as raw WAL, so one server can subscribe to some tables of another. When you create a subscription, the launcher starts a worker that receives those changes and applies them.

The slotsync worker (on demand) runs on a standby. A replication slot is how a primary remembers how far a subscriber has read. The worker copies these slots from the primary, so if the standby becomes the new primary after a failover, subscribers can carry on where they stopped.

The syslogger (on demand, with `logging_collector`) collects everything the processes write to their error output and saves it into log files, rotating them by time or size. Without it, logs go wherever the server's output goes, often your terminal or the system journal.

Background workers are the generic version of all this. Postgres uses them for parallel queries and logical replication, and extensions can register their own. That's how `pg_cron` runs scheduled jobs inside the database, in a process that lives next to the others and has access to the same shared memory.

The backends do the work your queries ask for. The other processes deal with what that work leaves behind: dirty pages to write, a WAL to flush and ship, old row versions to clean up. That way the backends spend their time on the queries, and the client gets its answer sooner.
