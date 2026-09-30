import type { APIRoute } from "astro";

import { getCollection } from "astro:content";

import { SITE, FOOTER_LINKS } from "../data/site";

export const GET: APIRoute = async () => {
  const essays = (await getCollection("essays")).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );

  const essayItems = essays.map((e) => `- [${e.data.title}](/essays/${e.id})`).join("\n");
  const links = FOOTER_LINKS.map((l) => `[${l.name}](${l.url})`).join(" · ");

  const body = `# ${SITE.name}

I'm Alexandre, a founder and full-stack engineer.

## Work

During my free time, I work on [${SITE.openSource.name}](${SITE.openSource.url}), an open-source project where I build type-safe and composable TypeScript libraries that work on any runtime. I made 16 packages with zero dependencies and 7,000+ downloads per month. This mainly comes from my experience fighting with JavaScript and legacy code.

At the same time, I co-founded [Radion](https://x.com/radion_app) as CTO. We built a real-time and historical data platform for prediction markets to help traders make better decisions. We ingested 8 billion Polymarket events in under two days and served them at 70ms p95 on a Rust multi-threaded API. We shut it down after a terms-of-service conflict.

Before Radion, I was a full-stack engineer intern and freelancer at [ALLOHOUSTON](https://www.allohouston.fr/). There, I wrote a conflict resolution algorithm that kept our database in sync with a client's CRM without losing local state. I also built an end-to-end OCR pipeline to scan and process information from critical documents to score their validity against public and private databases.

Before all of that, during my studies, I co-founded Mindify as CTO. It was a startup focused on empowering individuals by helping them discover new topics and change their day-to-day life. I built and shipped a web and mobile app with 1,000+ downloads.

Around the same time, I interned at [SiBorg](https://www.siborg.io/) as a full-stack engineer and won [The Graph Prize](https://devfolio.co/projects/siborg-ads-6138) at the Coinbase Onchain Summer hackathon.

It all started with my first startup [TrotelCoin](https://coinmarketcap.com/currencies/trotelcoin-v2/), a web3 project to help students and non-technical users learn about blockchain and cryptocurrencies. I developed more than 10 Solidity contracts and reached more than 200 users.

In parallel, I was vice president of [N7 Consulting](https://www.n7consulting.fr/), where I led a team of 26 and generated €100K in revenue. I was mainly doing strategy, operations, sales, management and optimizing processes.

## Projects

I also maintain developer tools, mostly written in Rust:

- [todo-tree](https://github.com/alexandretrotel/todo-tree) finds every TODO comment in a codebase.
- [dotfiles-manager](https://github.com/alexandretrotel/dotfiles-manager) keeps dotfiles consistent across machines with profiles.
- [feedyourai](https://github.com/alexandretrotel/feedyourai) packs a codebase into one file for LLM context.

## Outside work

I'm interested in ML/AI, web3 and open-source software. I also write essays about software engineering and startups.

In my free time, I like to read books on topics such as science, economy, psychology and philosophy. I also run 20-30 km per week and do street workouts.

I play the piano and make EDM music on FL Studio. I also started playing curated video games to avoid wasting time on addictive, poorly designed games.

I also create social media content to vulgarize what I learn and get better at explaining complex topics. I have more than 10k followers on [Instagram](https://www.instagram.com/alexandretrotel).

## Writing

${essayItems}

PS: I don't use AI to write, and the views here are my own.

${links}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
