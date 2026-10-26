import type { APIRoute } from "astro";

import { SITE, FOOTER_LINKS, RESUME_LINK } from "../data/site";
import { getSortedEssays } from "../lib/essays";

export const GET: APIRoute = async () => {
  const essays = await getSortedEssays();

  const essayItems = essays
    .map((e) => `- [${e.data.title}](/essays/${e.id})`)
    .join("\n");
  const links = [...FOOTER_LINKS, RESUME_LINK]
    .map((l) => `[${l.name}](${l.url})`)
    .join(" · ");

  const body = `# ${SITE.name}

I'm a founder and full-stack engineer.

## Work

I'm joining [Tengo](https://tengo.cc) in Paris as a backend engineer.

Before that, I co-founded [Radion](https://x.com/radion_app) as CTO, a real-time and historical data platform for prediction markets. We ingested 8 billion Polymarket events in under two days and served them at 70ms p95 from a multi-threaded Rust API.

Before Radion, I was a full-stack engineer, intern then freelancer, at [ALLOHOUSTON](https://www.allohouston.fr/). I wrote a conflict resolution algorithm that kept our database in sync with a client's CRM without losing local state, and built an OCR pipeline that checked critical documents against public and private databases.

During my studies, I co-founded Mindify as CTO, a startup helping people discover new topics and change their daily life. I built and shipped its web and mobile app, with 1,000+ downloads.

Around the same time, I interned at [SiBorg](https://www.siborg.io/) as a full-stack engineer and won [The Graph Prize](https://devfolio.co/projects/siborg-ads-6138) at the Coinbase Onchain Summer hackathon.

It all started with my first startup, [TrotelCoin](https://coinmarketcap.com/currencies/trotelcoin-v2/), a web3 app teaching students and non-technical users about blockchain. I wrote 10+ Solidity smart contracts and reached 200+ users.

In parallel, I was vice president of [N7 Consulting](https://www.n7consulting.fr/). I led a team of 26 and generated €100K in revenue, working on strategy, operations, sales and management.

## Projects

I also maintain developer tools, mostly in Rust:

- [todo-tree](https://github.com/alexandretrotel/todo-tree) finds every TODO comment in a codebase.
- [dotfiles-manager](https://github.com/alexandretrotel/dotfiles-manager) syncs dotfiles across machines with profiles.

## Hobbies

I'm interested in machine learning, LLMs, information retrieval, web3 and open source. I write essays about software engineering and startups.

I read non-fiction, manga and manhwa, and watch anime. I run 20-30 km per week and play badminton.

I play the piano and make EDM on FL Studio.

I share what I learn daily on Instagram, where I have 10k+ followers.

## Writing

${essayItems}

PS: I don't use AI to write, and the views here are my own.

${links}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
