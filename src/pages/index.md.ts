import type { APIRoute } from "astro";

import { getCollection } from "astro:content";

import { SITE, FOOTER_LINKS } from "../data/site";

export const GET: APIRoute = async () => {
  const essays = (await getCollection("essays")).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );

  const essayItems = essays.map((e) => `- [${e.data.title}](/essays/${e.id}.html)`).join("\n");
  const links = FOOTER_LINKS.map((l) => `[${l.name}](${l.url})`).join(" · ");

  const body = `# ${SITE.name}

I'm Alexandre, a founder and engineer. I start companies and write the software behind them.

## Work

Today, I run [${SITE.founder.name}](${SITE.founder.url}), where I build type-safe TypeScript libraries that work in any framework and any runtime: 16 packages, zero dependencies, 7,000+ downloads a month.

Alongside it, I co-founded [Radion](https://x.com/radion_app), a real-time data platform for prediction markets, as CTO. We ingested 8 billion Polymarket events in under two days and served them at 70ms p95.

Before Radion, I was a full stack engineer at [ALLOHOUSTON](https://www.allohouston.fr/), first as an intern, then as a freelancer. I synced our database with a client's CRM state, built OCR document processing, and prepared the stack for AI code review.

Earlier, I co-founded Mindify as CTO and shipped a web and mobile app with 1,000+ downloads. Around the same time, I interned at [SiBorg](https://www.siborg.io/) as a full stack engineer and won The Graph Prize at the Coinbase Onchain Summer hackathon.

It all started with [TrotelCoin](https://coinmarketcap.com/currencies/trotelcoin-v2/), my first company: a Web3 project with 10+ Solidity contracts and 200+ app users. In parallel, I was vice president of N7 Consulting, where I led a team of 26 and generated €100K in revenue.

## Projects

From Zap Studio, [@zap-studio/permit](https://www.zapstudio.dev/docs/permit) supports ABAC and RBAC out of the box and keeps permission policies in one place, with full type safety.

On the side, I maintain developer tools: [todo-tree](https://github.com/alexandretrotel/todo-tree) finds every TODO comment in a codebase, [dotfiles-manager](https://github.com/alexandretrotel/dotfiles-manager) keeps dotfiles consistent across machines with profiles, and [feedyourai](https://github.com/alexandretrotel/feedyourai) packs a codebase into one file for LLM context.

## Writing

${essayItems}

${links}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
