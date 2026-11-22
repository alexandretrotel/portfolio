---
title: Locks
---

MVCC lets readers and writers work without waiting for each other. But not everything can be solved with versions. Two transactions can't both update the same row. Nobody should read a table while another session drops it. And dozens of processes change the same shared memory at the same time.

For all of that, Postgres uses locks. Not one kind, but several, from a few CPU instructions to locks that last a whole transaction.

## Kinds of locks

- Spinlocks protect tiny pieces of shared memory for a few instructions. A process that wants one just retries in a loop until it's free.
- Lightweight locks, or LWLocks, protect bigger structures in shared memory, like a partition of the buffer mapping table or the WAL buffers. They can be shared or exclusive, and a process that waits sleeps instead of spinning.
- Heavyweight locks protect things you name in SQL, like tables. They have many modes, last until the end of the transaction, and detect deadlocks. They're the ones you see in `pg_locks`.
- Row locks protect single rows. They're not in memory at all, but in the row itself.
- Predicate locks track what serializable transactions read, to detect conflicts. They never block anyone.
- Advisory locks are heavyweight locks on numbers you pick, for your application to use.

The first two are internal, and you mostly see them as wait events in `pg_stat_activity`, like `LWLock: BufferMapping`. The rest are the ones your queries take, and the ones that make them wait.

## Table locks

Every statement locks the tables it uses, and keeps the lock until the transaction ends. There are eight modes, from weakest to strongest, and the main point is which ones conflict with each other.

- `ACCESS SHARE` for `SELECT`.
- `ROW SHARE` for `SELECT ... FOR UPDATE`.
- `ROW EXCLUSIVE` for `INSERT`, `UPDATE`, `DELETE`, and `MERGE`.
- `SHARE UPDATE EXCLUSIVE` for `VACUUM`, `ANALYZE`, and `CREATE INDEX CONCURRENTLY`.
- `SHARE` for `CREATE INDEX`.
- `SHARE ROW EXCLUSIVE` for creating triggers and some constraints.
- `EXCLUSIVE` for `REFRESH MATERIALIZED VIEW CONCURRENTLY`.
- `ACCESS EXCLUSIVE` for `DROP`, `TRUNCATE`, `VACUUM FULL`, and most `ALTER TABLE`.

The first three don't conflict with each other, so reads and writes on the same table run side by side. `CREATE INDEX` takes `SHARE`, which conflicts with `ROW EXCLUSIVE`, so writes wait until the index is built. That's what `CONCURRENTLY` avoids. And `ACCESS EXCLUSIVE` conflicts with everything, even a plain `SELECT`.

## The lock queue

A lock that can't be granted waits in a queue. And a new request has to wait if it conflicts with a lock that's held or with one that's already waiting in the queue.

That second part is what takes down production during migrations.

<div data-demo="lock-queue"></div>

The `ALTER TABLE` itself would take a few milliseconds. But while it waits behind one slow query, every query on that table waits behind it, and the connection pool fills up in seconds.

The fix is to give up quickly and retry.

```sql
SET lock_timeout = '2s';
ALTER TABLE users ADD COLUMN bio text;
```

If the lock isn't granted within 2 seconds, the `ALTER TABLE` fails instead of blocking everyone. You run it again a bit later.

## Fast path

Almost every query takes a weak lock on a few tables. Putting all of them in one shared lock table, protected by LWLocks, would make every backend fight over it.

So for weak locks on tables that nobody holds a strong lock on, a backend writes the lock into its own slots, in its own part of shared memory. That's the fast path. In Postgres 19, a backend has 128 of these slots by default, in groups of 16, sized from `max_locks_per_transaction`, which is now 128. A query on a partitioned table with hundreds of partitions can run out of slots and fall back to the shared table.

When someone asks for a strong lock, they first move the fast path locks on that table into the shared table, so the conflict can be seen.

## Row locks

A table can have billions of rows, and a transaction can update millions of them. Keeping a lock in memory for each one would never fit.

So Postgres writes the row lock into the row itself. When a transaction updates or deletes a row, it puts its transaction ID in the row's `xmax`. That's the lock. Another transaction that wants to change the same row sees an `xmax` from a transaction that's still running, and waits.

It doesn't wait on the row. Every transaction holds an exclusive lock on its own transaction ID until it ends, and the waiter asks for that lock. When the first transaction commits or rolls back, it releases it, and the waiter wakes up.

You can also lock rows without changing them.

- `FOR UPDATE` blocks any other change or lock on the row.
- `FOR NO KEY UPDATE`, what a normal `UPDATE` takes, still lets others lock the key.
- `FOR SHARE` blocks changes but lets others share it.
- `FOR KEY SHARE`, what foreign key checks take, only blocks deleting the row or changing its key.

When several transactions hold a lock on the same row at once, like two foreign key checks, one `xmax` isn't enough. Postgres stores a multixact ID there instead, which points to the list of lockers in `pg_multixact`.

## Deadlocks

Two transactions can end up waiting for each other.

```
A: UPDATE accounts SET balance = 0 WHERE id = 1;
B: UPDATE accounts SET balance = 0 WHERE id = 2;
A: UPDATE accounts SET balance = 0 WHERE id = 2;  -- waits for B
B: UPDATE accounts SET balance = 0 WHERE id = 1;  -- waits for A
```

Neither can ever finish. Postgres doesn't check for this on every wait, which would be expensive. A process that has waited for 1 second, the `deadlock_timeout`, wakes up and walks the graph of who waits for whom. If it finds a cycle, it aborts its own transaction.

```
ERROR:  deadlock detected
DETAIL:  Process 4821 waits for ShareLock on transaction 813; blocked by process 4822.
Process 4822 waits for ShareLock on transaction 812; blocked by process 4821.
```

The `ShareLock on transaction` is the lock on the transaction ID from the row locks section. The usual fix is to always lock rows in the same order, here by `id`.

## Seeing them

`pg_locks` lists every heavyweight lock, held or waiting. Most of the time, the simpler question is who blocks whom.

```sql
SELECT pid, pg_blocking_pids(pid), wait_event_type, query
FROM pg_stat_activity
WHERE wait_event_type = 'Lock';
```

If one PID shows up in every list, that's the query to look at. Often it's not a running one, but a session sitting idle in a transaction, still holding its locks.
