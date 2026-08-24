---
title: How to kill a company in one day?
description: Radion indexed 8 billion Polymarket events on Polygon in two days. Forty-three days later we shut it down. What public onchain data really costs, and why the right to read is not the right to sell.
socialDescription: Radion indexed 8 billion Polymarket events on Polygon in two days. Forty-three days later we shut it down. What public onchain data really costs.
llmsSummary: why Radion, a prediction-market data indexer that read 8 billion onchain events off Polygon, shut down 43 days after launch over a terms-of-service conflict, plus the technical decisions (Rust, Timescale, HyperSync, reorg handling) behind the pipeline it built.
date: 2026-08-01
---

We indexed 8 billion onchain events from more than 19 smart contracts on [Polygon](https://polygon.technology). Indexing all of them took us only days instead of weeks and building the whole pipeline took us 43 days.

And finally, we decided to kill the company. But why?

Nothing broke. There was no outage. And we lost no data along the way. To be honest, it was rather the contrary. The infrastructure was working pretty well. We were reading hundreds of events per second into billions of rows, and multiple companies were waiting to test our product. But, as I said, we stopped. Why?

To explain all of this, I wanted to explain our whole journey around prediction markets.

## What we believed

Radion started in March as a different product. For 3 months we worked on smart money: find the best traders, show our users who they are, and what they believe. It was an interesting idea, but nobody wanted it enough.

But we kept noticing the same thing. The interesting problem was one level down. Every question about a trader or a market was in reality a question involving onchain data. And every time we looked for that data, it was missing, slow, or wrong.

So, we completely changed the initial idea and built the thing we kept needing.

Here is the belief behind that choice. [Polymarket](https://polymarket.com) runs on Polygon. Every trade, every result, every transfer is written on the blockchain. There is no API key. No company limits our requests. Nobody can take our access away, because there is no access to take.

I still think this is true. After all, this is the real promise of the blockchain. But wait, it seems I was partially wrong.

## Public does not mean easy to get

The [blockchain](https://en.wikipedia.org/wiki/Blockchain) is not a database. To get data from the blockchain, we need to connect to a node through the [JSON-RPC](https://www.jsonrpc.org/specification) protocol. The node will answer to our requests with hard limits. For example, the call you use for history is `eth_getLogs`.

You give it a block range, a contract address, and topic filters. Providers cap that range, often at a few thousand blocks, and cap how many logs come back. So you paginate. You cannot ask for every trade by 1 wallet over 4 months. That query does not exist.

I decided I didn't want to spend weeks fighting rate limits so I used [HyperSync](https://docs.envio.dev/docs/HyperSync/overview). It is around 1,000 to 2,000 times faster than a normal RPC node. Reading and decoding all 8 billion events took us days instead of weeks.

That is the main point. A whole industry exists because the normal way to reach public data does not work at scale.

## Public does not mean easy to read

An event log is not a row in a table. It is a contract address, up to 4 topics, and a `data` blob.

Topic 0 is the [Keccak-256](https://en.wikipedia.org/wiki/Hash_function) hash of the event signature, so `Trade(address,address,uint256,uint256)` becomes 32 bytes. Parameters marked `indexed` go into topics 1 to 3, where a node can filter them without decoding anything. Everything else is ABI-encoded into `data`, padded into 32-byte words, in declaration order.

So you need the [ABI](https://docs.soliditylang.org/en/latest/abi-spec.html), the file that declares the type of every parameter. Without it, a log is a hash and a stream of 32-byte words. With it, the same log is a trade with a maker, a taker, a price and a size. The bytes did not change. You brought the meaning.

19 contracts means 19 sets of event schemas, and they do not agree with each other. We put every binding in one `decode` crate: a typed struct per event, plus one shared decoder. After that, the rest of the system could pretend the chain had always spoken in Rust types.

The chain does not store meaning. It stores bytes, plus a promise about which contract wrote them. You supply the meaning, and supplying it is most of the work.

## Public does not mean final

Polygon makes a new block every 1.5 to 2 seconds. We waited for 64 blocks before we sent anything forward:

```
INDEXER_CONFIRMATIONS   = 64    // blocks to wait before emitting
INDEXER_MAX_REORG_DEPTH = 256   // deepest rewind we handle

safe_tip = tip - INDEXER_CONFIRMATIONS
```

64 blocks at 2 seconds is 128 seconds. At 1.5 seconds it is 96. So we were always about 2 minutes behind the front of the chain, on purpose.

Speed was our whole product. Users wanted the freshest data. Every one of those 128 seconds was a cost. That number was not a default, it was an intentional choice.

We were afraid of one thing: a reorg. A chain is allowed to change its mind. Blocks you already saved can be replaced by different blocks. If you wrote trades from the old blocks into a database, you are now serving a history that never happened.

Detecting one is simpler than it sounds, and I think it is beautiful. HyperSync returns a rollback guard with every response. It carries the tip block number and its hash, the first block number of the window, and the parent hash of that first block. We store the tip number and tip hash in Postgres.

On the next poll we compare. We declare a fork only when both things are true. The new window starts exactly at `saved_tip + 1`, and its `first_parent_hash` no longer equals the `tip_hash` we saved. The first condition proves the 2 windows are adjacent. The second proves the link between them broke. Everything else is normal growth, including gaps, the first response, and any block already final.

When a fork is declared, the producer rewinds to `saved_tip - INDEXER_MAX_REORG_DEPTH`, clamped to the first block we ever scanned. It clears the stored guard, emits a `ReorgSignal` carrying that fork block, and lowers its dedup floor so the corrected blocks get published again. Every consumer then deletes its rows above the fork block. 9 tables carry that method: trades, positions, balances, wallets, resolutions, market lifecycle, resolution lifecycle, order events, token mappings. Rewinding too far is safe. Rewinding too little is not.

It never happened. Not once in production.

I do not think it was wasted. You pay for being correct before you know you would need it. It is the same as buying an insurance for a house that does not burn.

## We did the work early

The stack under all this was [Rust](https://www.rust-lang.org) and [Redpanda](https://www.redpanda.com). We chose Redpanda over [Kafka](https://kafka.apache.org) for simple reasons. It has less weight. Its CLI, `rpk`, made me faster. [Seastar](https://seastar.io) underneath is quick. And because every broker runs [Raft](https://raft.github.io), one machine is already a valid cluster. That last point mattered more than it should. I could run the whole pipeline on one small [Railway](https://railway.com) service and test it for free.

The producer decodes inline and writes [Protobuf](https://protobuf.dev) messages. Blocks and reorg signals go on the same topic, on purpose. A consumer then sees them in order, and it cannot apply a block that a later signal has already cancelled. Ordering is the guarantee we needed, so we paid for it with a single partition instead of trying to fix it later in the consumer.

The storage idea was simple: stop computing things when someone asks. Our `analytics_buckets` table is a Timescale hypertable. One row is one time bucket for one scope, a market or a wallet. Every metric appears twice, once as a `delta_` column and once as a `cum_` column: volume, shares, trade counts, unique traders, fees, buy size distribution. The consumer writes both as the data lands. When a question arrives, the answer is already in a column.

On top of that we used [Timescale continuous aggregates](https://docs.tigerdata.com/use-timescale/latest/continuous-aggregates/) for `candles_1m`, `candles_1h` and `candles_1d`. Here is the detail I would keep if I could keep only one. We dropped the default policies with `remove_continuous_aggregate_policy` and wrote our own procedure. It reads `max(ts)` from the trades table, calls that the frontier, and refreshes only up to `frontier - 1 hour`. It runs every 15 minutes.

## Storing billions of rows so they can be read

This is the part I would tell a younger version of myself first, because it is the part that decides whether the product feels fast or feels broken. Storage is not a place you put rows. It is a set of physical choices, and Postgres will make them for you badly if you do not make them yourself.

Start with the hypertable. A [hypertable](https://docs.tigerdata.com/use-timescale/latest/hypertables/) is not a special storage engine. It is a parent table with many child tables underneath, one per time range, called chunks. Timescale routes an insert to the right chunk and the planner throws away the chunks a query cannot touch. That last part is the whole point. A query for one day of trades never opens the other 4 months, because those chunks are excluded before a single page is read.

Which makes chunk size a real decision. Ours started at 7 days everywhere. That was wrong for the hot tables. We later moved `onchain_trades` and `onchain_balances` to 1 day and `onchain_positions` to 2 days. Too large and every insert dirties a huge index and exclusion stops helping. Too small and the planner walks thousands of chunks to answer one question. It is a tuning knob shaped like a schema decision, which is why people miss it.

Then compression, which is where Timescale stops looking like Postgres. Compressing a chunk rewrites it from rows into columns. Each column becomes an array, batched about a thousand rows at a time, and each array is encoded by type. That is why the `segmentby` choice matters more than the compression itself. We used `compress_segmentby = 'condition_id'` on trades and positions. Rows for the same market land in the same compressed batch, so a filter on that market reads a handful of batches instead of decompressing the chunk. Pick the wrong segment key and you have built a table that is smaller and slower.

There is a cost you have to accept. A compressed chunk is close to immutable. So we did not compress on a fixed age. We wrote a procedure that reads the frontier per table, then compresses only chunks older than `frontier - 7 days`. We didn't want a background job decide what is settled based on wall clock time, because during a backfill the wall clock is lying to you. The data is 4 months old and the clock says now.

Continuous aggregates deserve the same suspicion. A cagg is a materialized view plus an invalidation log: writes to the source table record which time ranges went stale, and a refresh recomputes only those ranges. We chained them. `candles_1m` reads `onchain_trades`, `candles_1h` reads `candles_1m`, and `candles_1d` reads `candles_1h`. A daily candle over 4 months never touches a trade row. Each level also keeps `materialized_only = false`, so a query near the frontier gets the materialized part unioned with a live read of the recent tail allowing the user to see fresh data.

Retention closes the loop. We keep 90 days of 1-minute candles and 2 years of hourly ones, dropped with `drop_chunks` against the frontier again. Dropping a chunk is a `DROP TABLE`. It is instant and it leaves nothing behind, unlike a `DELETE`, which writes as much as it removes and hands you the bloat as a gift.

None of this is exotic. It is knowing what the database does physically when you write a row, and refusing to let a default choose it for you.

## It worked

By the end of July it ran. Hundreds of events per second. Billions of rows. An HTTP and WebSocket API in Rust on [Axum](https://github.com/tokio-rs/axum), with per-key egress metering. An [MCP](https://modelcontextprotocol.io) server, so an AI assistant could query the whole index directly.

We had sold nothing. I want that written down, because it changes how the rest of this reads. No revenue. No signed contract. No customer to lose. What we had were some companies who said they would move to our infrastructure as soon as we were faster than the others.

But something happened.

## The blockchain is not as free as I thought

Here is the sentence I wish I had 4 months ago. The chain let me read the data. The terms said I was not allowed to be the kind of company that reads it.

We did not find the terms ourselves. Our competitors did. Polymarket and ICE contacted them directly. We heard about it second hand, from people we were competing with. I have never seen that message, and I will not pretend I have.

The terms had been active since 17 July. We had spent 12 days building inside a rule we did not know about.

From the [Polymarket terms of service](https://polymarket.com/tos), section 4, "Your Responsibilities, Representations & Prohibited Conduct", effective 17 July 2026. You agree not to:

> Access or use any data, content, or information contained on our Site, any Interface or Features directly or through an API, or any other means, including on-chain, whether in raw, derived, aggregated, or anonymized form (the "Data") if you are (i) a non-retail, professional entity that engages in capital markets activities (e.g., brokerage, market making, proprietary trading, index calculation, or ETF issuance) [...] (each, a "Capital Market Client"), or (ii) a market data distributor, in each case unless otherwise agreed to in writing by us;

And right after it:

> Sell, resell, sublicense, redistribute, or otherwise commercially exploit the Data to any Capital Market Client or market data distributor, unless otherwise agreed to in writing by us;

Two words carry the whole clause: **including on-chain**. Whoever wrote that saw my argument coming and closed it before I could make it. And **raw, derived, aggregated, or anonymized** closes every other shape the product could take. We were never going to resell their database. We were going to read Polygon and compute our own numbers. The clause names that and forbids it.

Now look at what the first clause really limits. It does not describe an action you may not do. It describes a company you may not be. A market data distributor may not access the data. That was exactly what we were.

Do these terms apply to a company that never used Polymarket's site or API, and read Polygon directly instead? That is a real question, and I will not answer it. I am not a lawyer, and Radion was 3 people with no revenue. The question was never whether we would win in the end. It was that finding out would cost more than the company was worth.

That was a few days before I'm writing this essay. The second signal was 9 months old. We had read it at the time and missed what it meant.

On 7 October 2025, ICE announced an investment of up to $2 billion in Polymarket, at a value of about $8 billion before the money. From [their press release](https://ir.theice.com/press/news-details/2025/ICE-Announces-Strategic-Investment-in-Polymarket/default.aspx):

> ICE will become a global distributor of Polymarket's event-driven data, providing customers with sentiment indicators on topics of market relevance.

Read both documents next to each other. Both rules end with the same 6 words: **unless otherwise agreed to in writing by us**. The terms do not ban selling Polymarket data. They turn it into a right you must buy. And 9 months earlier, someone had bought it.

I am not saying the terms were written for that deal. I have no proof, and neither does anyone outside those two companies. What I am saying is smaller and worse. If you are a 6-week-old data company reading both documents on the same afternoon, the question changes. It is no longer whether you can win. It is whether there is anything left to win.

The third signal is the weakest, and I will say so, because it is an opinion and not a fact. Prediction markets feel like they are slowing down. That is my read from talking to multiple people in this space, including our biggest competitor. Builders we knew were moving to other things. Nobody told me the market was still growing fast. Of course, alone, this would have changed nothing since this is only a feeling.

## One day to kill the company

I am not Shannon, but I guess he could say something similar. One signal is noise. Two is bad luck. Three pointing the same way is information.

We learned on Wednesday. We killed it on Thursday.

43 days to build it. One day to end it. I am prouder of the second number, and it took me a while to understand why.

Here is the thing. We waited before trusting the chain and we waited one day between the first signal and the decision. The skill is the same. Know how long to wait before you believe something. Then do not wait any longer than that.

We built for 43 days, and I would build it again. We stopped in one, and I would stop again. By the end, I had learned things no first job out of school would have taught me.

## Appendix: the checklist

For the aspiring founder who wants the same result without the inconvenience of 43 days of work. Follow every step. Skipping one may accidentally leave you with a business.

1. Pick a market where the data is public. Say the word "permissionless" out loud.
2. Choose the hardest possible technical problem, because if it were easy someone would already have done it. Do not ask why nobody has done it.
3. Spend a week on reorg handling for an event that will never occur. Call it insurance. Nobody can prove you wrong, which is the best kind of correct.
4. Index 8 billion events. Watch the row counter climb.
5. Ship an API, a WebSocket, per-key egress metering, and an MCP server. Build the billing path before the customers.
6. Collect verbal interest from real companies. Write down zero contracts. Interpret this as traction.
7. Never read the terms of service. They are long, they are boring, and they are about the website, which you are not using.
8. Ignore the $2 billion strategic investment announced 9 months ago by the company whose entire job is distributing market data. Press releases are marketing.
9. Consider fighting it. Count your revenue. Count your lawyers. Note that both numbers are the same number.

Total cost: 43 days, 3 people, and 8 billion events nobody will ever query.
