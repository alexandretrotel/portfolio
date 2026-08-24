---
title: How to discover startup opportunities
description: "My process for finding a startup worth building: understand myself as a founder first, then hunt for real, evidenced problems instead of generating ideas."
llmsSummary: "his process for finding a startup worth building, from founder profiling through evidenced problem search to opportunity scoring. Packaged as an agent skill at https://github.com/alexandretrotel/skills."
date: 2026-08-16
updated: true
---

I don't start from an idea. I've tried that before, and it leads to the same trap every time: falling in love with a solution before confirming anyone has the problem. So I built myself a process to follow with extreme discipline instead of brainstorming ideas. This note is a summary of that process, mostly so I stay honest with myself and follow it the next time I'm looking for what to build.

It complements [my founder's framework](/notes/a-founders-framework.html). This note focuses on the discovery part; how to find the opportunity in the first place.

I packaged this whole process as a skill, so you can run it interactively with any agent: it's in my [skills repository](https://github.com/alexandretrotel/skills).

## Founder first, ideas second

Before researching any market, I try to understand myself as a founder: technical capabilities, professional experience, domain expertise, personal interests, what energizes me, my values, my constraints, who I can already reach, my unfair advantages, and what I explicitly refuse to build.

I encourage you to write all of this down as what I call the "Founder DNA" profile with rough scores for technical capability, domain expertise, distribution access, sales ability, execution ability, motivation, and capital efficiency, each with the evidence behind it.

A large market is not automatically a good opportunity for me. I'd rather take a smaller market where I have real domain knowledge, an existing network, or a distribution advantage than a bigger one where I'm a stranger. Distribution especially: a €500M TAM I can't reach is worse than a €50M market where I can get 1,000 people on the phone (which isn't my case anyway).

## Problems before ideas

Once I know myself (and this may take years btw), I go looking for problems, not ideas. Concretely, that means searching for complaints, repetitive manual work, expensive workarounds, people asking for recommendations, people saying "I wish...", "why doesn't...", "this takes me hours...", spreadsheets used as software, and job postings that quietly reveal expensive repetitive work. I look across Reddit, Hacker News, forums, Stack Overflow, GitHub issues, G2 and Capterra reviews (especially the 1 to 3 star ones), app store reviews, and industry publications.

Most of this search work can now be automated with AI agents, given enough prep (well-scoped prompts, source lists, filters for what counts as a real signal).

Every interesting signal gets logged as a Problem Signal, with:

- the exact problem and who has it
- the source and a link
- the pain, frequency, and current workaround
- money already being spent on it, if any
- how strong the evidence actually is: low, medium, or high

I never treat an enthusiastic comment or an upvote as proof anyone would pay. I keep **proven spending**, **inferred spending**, and **unknown** strictly separate.

Individual signals then get clustered into broader problem categories, counting distinct sources and customer types, not reposts of the same complaint.

## From problem to opportunity

For every promising cluster, I go through the same sequence:

1. **ICP.** Specific, not "small businesses": industry, size, revenue, geography, job titles, current tools, trigger event, budget, buying authority.
2. **Competitors.** Existing solutions aren't a bad sign, they can prove demand. The real question is why the problem hasn't already been solved well: bad UX, too expensive, wrong ICP, legacy software, poor localization, poor distribution.
3. **Founder-market fit.** Scored across domain expertise, technical fit, passion, distribution, credibility, access, and learning advantage.
4. **Opportunity score.** Weighted across problem severity, frequency, willingness to pay, market size and growth, founder fit, distribution advantage, MVP feasibility, and capital efficiency, next to a risk score and an evidence confidence score.
5. **Market sizing.** Bottom-up, never invented: potential customers × realistic price gives the TAM, then I narrow it to a SAM I can actually reach, then to a SOM built on realistic penetration assumptions. Every number carries a source, an assumption, and a confidence level.

## Challenge before deciding

The highest score doesn't automatically win. Before I let myself get attached to an opportunity, I make myself answer:

- Is this a problem people actually pay to solve?
- Can I reach the customers?
- Can I build an MVP cheaply?
- Is the market big enough?
- Is the competition beatable, and is there a wedge?
- Why now, and why me?
- Why wouldn't an incumbent just copy it?
- Can I get the first 10 customers without paid ads?

If any answer is weak, I make it explicit instead of trying to hide it. Be honest with yourself.

## Why this beats plain brainstorming by a mile

I've lived what happens without this discipline: building a product before finding users, mistaking engagement for pain, falling for a market that sounded big on a slide. [My founder's framework](/notes/a-founders-framework.html) is the list of mistakes I refuse to repeat once a company exists. This process comes before that: it's how I make sure the opportunity itself, not just the execution, deserves the years I'd spend on it. A real business takes years to grow, so the bet has to be right before I start, not fixed halfway through.
