---
title: Storage on disk
---

In the end, your data is just files on disk. Postgres doesn't use a special filesystem or a raw device. It writes regular files in one directory, the data directory, and the operating system does the rest.

## The data directory

When you create a cluster with `initdb`, Postgres fills the data directory with a few folders. The ones that matter here are these.

- `base/` holds one folder per database, and in each one, the files of every table and index.
- `global/` holds the tables shared by every database, like the list of users and roles.
- `pg_wal/` holds the WAL.
- `pg_xact/` records whether each transaction committed or aborted.

The folders and files are named by number, not by name. You can ask Postgres where a table lives.

```sql
SELECT pg_relation_filepath('users');
-- base/16384/16390
```

Here `16384` is the database and `16390` is the file of the `users` table.

## Files and forks

Each table or index starts as one file. When it grows past 1 GB, Postgres starts a second file next to it, `16390.1`, then `16390.2`, and so on. Some filesystems limit how big a file can be, so Postgres keeps every file under that size.

A table also has a few companion files, called forks.

- `16390` is the main fork, with the rows themselves.
- `16390_fsm` is the free space map. It records roughly how much free space each page has, so an `INSERT` can find a page with room without reading the whole table.
- `16390_vm` is the visibility map. It keeps two bits per page, one saying every row on it is visible to everyone, the other saying they're all frozen. Vacuum uses it to skip pages that don't need cleaning, and index-only scans use it to skip reading the table.

## Pages

Every file is cut into pages of 8 KB. A page is the smallest unit Postgres reads or writes. Even to read one row, it loads the whole page.

This is what a page of a table looks like.

```
+--------------------------------------------------+
| header (24 bytes)                                |
+--------------------------------------------------+
| line pointers  [1] [2] [3] [4] -->               |
|                                                  |
|                 free space                       |
|                                                  |
|                 <-- row 4 | row 3 | row 2 | row 1|
+--------------------------------------------------+
```

The header stores a few offsets, a checksum, and the position in the WAL of the last change to this page. Postgres uses that position to make sure the WAL is on disk before the page is.

Right after the header comes an array of line pointers, 4 bytes each, one per row. Each one says where its row starts on the page and how long it is.

The rows themselves are written from the end of the page, going backwards. The line pointers grow from the top, the rows from the bottom, and the page is full when they meet.

That's what the `(0,3)` in the index example from the architecture part meant. It's page 0, line pointer 3. An index points to the line pointer, not to the row itself, so Postgres can move a row inside its page, to make room, without updating any index.

You can see the position of every row with the hidden `ctid` column.

```sql
SELECT ctid, email FROM users;
--  ctid  |    email
-- -------+--------------
--  (0,1) | bob@mail.com
--  (0,3) | ann@mail.com
--  (1,2) | eve@mail.com
```

## Rows

Each row, called a tuple in the source, starts with a header of 23 bytes before your columns.

- `xmin` is the ID of the transaction that inserted the row.
- `xmax` is the ID of the transaction that deleted or updated it, or zero if none did.
- `ctid` points to the row itself, or to its newer version if it was updated.
- A few flags, the number of columns, and a bitmap of which columns are null.

`xmin` and `xmax` are how Postgres decides which rows your transaction can see. We'll get to that in the MVCC part.

After the header come the column values, one after the other, aligned so the CPU can read them quickly. That's why the order of your columns can change the size of a row. A `boolean` between two `bigint`s wastes 7 bytes of padding.

## TOAST

A row has to fit in a page, but a `text` or `jsonb` column can hold much more than 8 KB.

When a row gets bigger than about 2 KB, Postgres first tries to compress its largest values, with lz4 if Postgres was built with it, and pglz otherwise. If the row is still too big, it moves those values out to a separate table, the TOAST table, cut into chunks of about 2 KB. The row keeps a small pointer to them.

So a big value costs nothing when you don't select it. Postgres only reads the TOAST table when a query actually needs that column.

## Indexes

Index files use the same 8 KB pages, with the same header and line pointers. Only the content changes. A B-tree page holds keys and pointers to rows or to other pages, and uses a small area at the end of the page, the special space, to link to its neighbours. We'll see how that's organized in the indexes part.

## An idea

Postgres runs on Linux, macOS, Windows, and the BSDs, on ext4, XFS, ZFS, APFS, NTFS, and more. To work everywhere, it only uses what every filesystem offers: plain files, 1 GB at most, read and written through the operating system's cache.

That portability has a cost. Some of what Postgres does only exists because it can't trust the filesystem. For example, after each checkpoint, it writes the full page to the WAL the first time it changes, in case a crash leaves a page half-written. On a copy-on-write filesystem like ZFS, that can't happen, which is why some people turn `full_page_writes` off there.

So one idea I keep coming back to is to take Postgres and rewrite its storage layer, with agents, for one specific filesystem, the one you actually host it on. Drop what that filesystem already guarantees, use what it does best, and see how much faster it gets.
