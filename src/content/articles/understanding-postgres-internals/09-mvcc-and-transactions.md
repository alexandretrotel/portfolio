---
title: MVCC and transactions
---

Hundreds of clients read and write the same tables at the same time. One of them is in the middle of a report, another updates the row the report is about to read. Postgres still has to give each of them a result that makes sense.

The simple answer would be locks. Lock the row while someone writes it, and make readers wait. Postgres does something else. It keeps several versions of the same row, and each transaction reads the version that fits it. That's MVCC, multiversion concurrency control. Readers never wait for writers, and writers never wait for readers.

## Transactions

A transaction is a group of statements that succeed or fail together.

```sql
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;
```

If anything fails before `COMMIT`, nothing happened. Without `BEGIN`, every statement is its own transaction.

Each transaction that writes gets a transaction ID, a number from a counter shared by the whole server. Postgres only hands one out at the first write. A transaction that only reads never needs one, which saves a lot of IDs, since most transactions only read.

```sql
BEGIN;
SELECT pg_current_xact_id_if_assigned();  -- null, nothing written yet
INSERT INTO users (name) VALUES ('Ann');
SELECT pg_current_xact_id_if_assigned();  -- 812
COMMIT;
```

## Row versions

Remember the tuple header from the storage part, with its `xmin` and `xmax`. This is what they're for.

- An `INSERT` writes a new version with `xmin` set to its transaction ID.
- A `DELETE` doesn't remove anything. It writes its transaction ID into the `xmax` of the version.
- An `UPDATE` does both. It sets `xmax` on the old version and inserts a new one, and the old version's `ctid` points to the new one.

So after an update, both versions sit in the table. You can see it with the hidden columns.

```sql
SELECT ctid, xmin, xmax, name FROM users WHERE id = 1;
--  ctid  | xmin | xmax | name
-- -------+------+------+------
--  (0,1) |  790 |    0 | Ann

UPDATE users SET name = 'Anna' WHERE id = 1;

SELECT ctid, xmin, xmax, name FROM users WHERE id = 1;
--  ctid  | xmin | xmax | name
-- -------+------+------+------
--  (0,2) |  813 |    0 | Anna
```

The old version `(0,1)` is still on the page, with `xmax` set to 813. Our `SELECT` just doesn't show it anymore, because of its snapshot.

## Snapshots

A snapshot is how a transaction decides which versions it can see. It's three things.

- `xmin`, the oldest transaction still running. Everything before it is finished.
- `xmax`, one past the newest finished transaction. Everything from it onwards counts as not started.
- The list of transactions in between that were still running when the snapshot was taken.

```sql
SELECT pg_current_snapshot();
-- 820:824:820,822
```

This one says that 820 and 822 were still running, and that everything else below 824 was finished.

With that, Postgres checks each version, in `HeapTupleSatisfiesMVCC`. A version is visible if the transaction in its `xmin` committed before the snapshot, and the one in its `xmax`, if any, didn't. Your own changes are visible too. Any change made after the snapshot, or by a transaction still running, or by one that rolled back, is invisible.

Step through an update while another transaction is reading.

<div data-demo="mvcc-versions"></div>

## Did it commit?

The snapshot tells Postgres whether a transaction was finished, but not how it finished. That lives in `pg_xact`, a set of files that keep 2 bits per transaction: in progress, committed, aborted, or a fourth state for subtransactions.

Checking it for every row would be slow, so the first reader to look it up writes the answer back into the row, as hint bits in the tuple header. Every later reader finds it there.

That's also why a plain `SELECT` can dirty pages and cause writes. The first read after a big insert sets hint bits on every row.

## Isolation levels

When the snapshot is taken depends on the isolation level.

- Read committed, the default, takes a new snapshot for every statement. Each statement sees everything committed before it started.
- Repeatable read takes one snapshot at the first statement and keeps it for the whole transaction. It sees the database as it was at that moment, even if it runs for an hour.
- Serializable uses the same snapshot as repeatable read, and also tracks what each transaction read and wrote. If the result couldn't have happened with the transactions running one after the other, it aborts one of them.

Postgres accepts read uncommitted too, but treats it as read committed. You can never see uncommitted data.

The interesting case is two transactions updating the same row. The second one finds the row already updated by a transaction that's still running, so it waits for that transaction to finish. If the first one rolls back, the second goes ahead. If it commits, it depends on the level. In read committed, the second one reads the new version and applies its update to it. In repeatable read and serializable, it fails.

```
ERROR:  could not serialize access due to concurrent update
```

The application is expected to retry the whole transaction.

## Vacuum

The cost of all this is that old versions pile up. Every update and delete leaves a dead version behind, and the table grows.

Vacuum cleans them up. It looks for versions that no snapshot can see anymore, removes them, and records the free space in the free space map, so new rows can reuse it. It also sets the visibility map bits for pages where every row is visible to everyone.

You rarely run it yourself. Autovacuum starts a worker on a table when the number of dead rows passes 50 plus 20% of the table, with a cap of 100 million for huge tables.

Plain vacuum doesn't give space back to the operating system. A table that grew to 10 GB stays 10 GB, with free space inside. `VACUUM FULL` rewrites the table to shrink it, but it locks the table for the whole time.

The thing that breaks vacuum is a long transaction. A transaction that started an hour ago may still need any version that existed an hour ago, so vacuum can't remove any of them, on any table. A session left open in a transaction, idle, can bloat a whole database.

## HOT updates

An update writes a new version, at a new `ctid`. So every index on the table needs a new entry pointing to it, even if the indexed columns didn't change.

Postgres avoids that when it can, with HOT, heap-only tuples. If no indexed column changed and the new version fits on the same page, it doesn't touch the indexes. The index keeps pointing to the old line pointer, and Postgres follows the chain from the old version to the new one inside the page.

When a page gets nearly full, the next read of it prunes these chains, without waiting for vacuum. That's one reason to leave some free space in pages of tables that get a lot of updates, with a lower `fillfactor`.

## Wraparound

Transaction IDs are 32-bit numbers, so there are about 4 billion of them, and a busy server can go through that in a few weeks.

Postgres compares them in a circle. From any ID, the 2 billion before it are in the past and the 2 billion after it are in the future. So a row written long enough ago would suddenly look like it was written in the future, and disappear.

To prevent that, vacuum freezes old rows. It marks them as visible to everyone, so their `xmin` doesn't matter anymore. When a table has rows older than 200 million transactions, autovacuum runs an aggressive vacuum on it, even if nothing else would trigger one. If that keeps failing, often because of a long transaction, Postgres eventually refuses new writes until someone vacuums.

MVCC lets everyone work at the same time without waiting. In return, a background process has to keep cleaning up after them, forever.
