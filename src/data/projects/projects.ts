import { Projects } from "@/types/projects/projects";

const basePath = "/projects";
// const imageBasePath = "/projects/images";
const iconBasePath = "/projects/icons";
const videoBasePath = "/projects/videos";

export const projects: Projects = [
  {
    slug: "portfolio",
    title: "Portfolio",
    description:
      "My personal portfolio featuring my experiences, projects, and skills.",
    date: new Date("2024-12-12"),
    url: `${basePath}/portfolio`,
    links: [
      {
        title: "Portfolio",
        url: "/",
      },
      {
        title: "GitHub",
        url: "https://github.com/trotelalexandre/alexandretrotel",
      },
    ],
    preview: {
      asset: `${videoBasePath}/portfolio.mp4`,
      type: "video",
    },
    tags: ["Frontend", "Design"],
    languages: ["TypeScript", "React", "Next.js", "Tailwind CSS"],
    status: "WIP",
    featured: true,
    icon: `${iconBasePath}/logo.png`,
  },
  {
    slug: "trotelcoin",
    title: "TrotelCoin",
    description:
      "A blockchain education web application inspired by Duolingo with a token system.",
    date: new Date("2023-07-13"),
    url: `${basePath}/trotelcoin`,
    links: [
      {
        title: "Website",
        url: "https://www.trotelcoin.com",
      },
      {
        title: "Application",
        url: "https://app.trotelcoin.com",
      },
      {
        title: "Documentation",
        url: "https://docs.trotelcoin.com",
      },
      {
        title: "GitHub",
        url: "https://github.com/TrotelCoin",
      },
    ],
    tags: [
      "Frontend",
      "Backend",
      "Fullstack",
      "Design",
      "Marketing",
      "Business",
      "API",
    ],
    languages: [
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Solidity",
      "Wagmi",
    ],
    status: "Completed",
    dateCompleted: new Date("2024-07-05"),
    icon: `${iconBasePath}/trotelcoin.jpeg`,
    preview: {
      asset: `${videoBasePath}/trotelcoin.mp4`,
      type: "video",
    },
  },
  {
    slug: "mindify",
    title: "Mindify",
    description:
      "A mobile application to help users learn new concepts through summarization of resources.",
    date: new Date("2024-09-08"),
    url: `${basePath}/mindify`,
    links: [
      {
        title: "Website",
        url: "https://www.mindify.fr",
      },
      { title: "GitHub", url: "https://github.com/mindify-fr" },
    ],
    tags: [
      "Mobile",
      "Design",
      "Frontend",
      "Backend",
      "Fullstack",
      "Business",
      "AI",
      "API",
    ],
    languages: ["TypeScript", "React Native", "Tailwind CSS", "Expo", "NestJS"],
    status: "Abandoned",
    icon: `${iconBasePath}/mindify.jpeg`,
    preview: {
      asset: `${videoBasePath}/mindify.mp4`,
      type: "video",
    },
  },
  {
    slug: "agroparistech-service-etudes",
    title: "AgroParisTech Service Études",
    description:
      "A website to showcase the services of AgroParisTech Service Études.",
    date: new Date("2024-04-20"),
    languages: ["React"],
    url: `${basePath}/agroparistech-service-etudes`,
    links: [
      {
        title: "Website",
        url: "https://agroparistech-service-etudes.fr",
      },
    ],
    tags: ["Frontend", "Design", "Business"],
    status: "Completed",
    dateCompleted: new Date("2024-06-14"),
    preview: {
      asset: `${videoBasePath}/agroparistech-service-etudes.mp4`,
      type: "video",
    },
  },
  {
    slug: "progressly",
    title: "Progressly",
    description: "A full-featured budget tracker and personal growth app.",
    date: new Date("2024-11-03"),
    url: `${basePath}/progressly`,
    links: [
      { title: "Application", url: "https://progressly-prod.vercel.app" },
      { title: "GitHub", url: "https://github.com/trotelalexandre/progressly" },
    ],
    tags: ["Frontend", "Backend", "Fullstack", "Design", "Business", "API"],
    languages: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Drizzle"],
    status: "Paused",
    preview: {
      asset: `${videoBasePath}/progressly.mp4`,
      type: "video",
    },
  },
  {
    slug: "check-node-packages",
    title: "Check Node Packages (cnp)",
    description:
      "A utility tool written in Rust to check unused node packages.",
    date: new Date("2024-12-03"),
    url: `${basePath}/cnp`,
    links: [{ title: "Github", url: "https://github.com/trotelalexandre/cnp" }],
    tags: ["CLI", "Tooling"],
    languages: ["Rust", "Cargo"],
    status: "WIP",
    preview: {
      asset: `${videoBasePath}/cnp.mp4`,
      type: "video",
    },
  },
  {
    slug: "aurora",
    title: "Aurora",
    description:
      "Our web agency's website to showcase our services and make it easy for clients to contact us.",
    date: new Date("2024-04-26"),
    url: `${basePath}/aurora`,
    links: [
      {
        title: "Website",
        url: "https://aurora-com.vercel.app",
      },
      {
        title: "GitHub",
        url: "https://github.com/auroraagence",
      },
    ],
    tags: ["Frontend", "Design", "Business"],
    languages: ["TypeScript", "React", "Next.js", "Tailwind CSS"],
    status: "Paused",
    icon: `${iconBasePath}/aurora.jpeg`,
    preview: {
      asset: `${videoBasePath}/aurora.mp4`,
      type: "video",
    },
  },
  {
    slug: "siborg-ads-telegram-bot",
    title: "SiBorg Ads Telegram Bot",
    description:
      "A Telegram bot to help users create SiBorg Ads for their Telegram channels.",
    date: new Date("2024-09-25"),
    url: `${basePath}/siborg-ads-telegram-bot`,
    links: [
      {
        title: "Telegram",
        url: "https://t.me/SiBorgAdsBot",
      },
      {
        title: "GitHub",
        url: "https://github.com/siborg-ads",
      },
    ],
    tags: ["API", "Backend"],
    languages: ["TypeScript", "grammY"],
    status: "Completed",
    dateCompleted: new Date("2024-10-12"),
    icon: `${iconBasePath}/siborg.jpeg`,
    preview: {
      asset: `${videoBasePath}/siborg-ads-telegram-bot.mp4`,
      type: "video",
    },
  },
  {
    slug: "clean-that-system",
    title: "Clean That System",
    description:
      "A CLI tool to clean your system by deleting unnecessary files.",
    date: new Date("2025-01-06"),
    url: `${basePath}/clean-that-system`,
    links: [
      {
        title: "GitHub",
        url: "https://github.com/trotelalexandre/clean-that-system",
      },
      {
        title: "npm",
        url: "https://www.npmjs.com/package/clean-that-system",
      },
    ],
    tags: ["CLI", "Tooling"],
    languages: ["TypeScript"],
    status: "WIP",
    preview: {
      asset: `${videoBasePath}/clean-that-system.mp4`,
      type: "video",
    },
  },
  {
    slug: "proto",
    title: "Proto",
    description:
      "A blockchain written in Go to learn how blockchains work under the hood. I'm also making an explorer using Vite to visualize the blocks.",
    date: new Date("2025-01-21"),
    url: `${basePath}/proto`,
    links: [
      {
        title: "GitHub",
        url: "https://github.com/trotelalexandre/proto",
      },
    ],
    tags: ["Backend", "Blockchain", "Frontend", "Fullstack"],
    languages: ["Go", "TypeScript", "React", "Vite"],
    status: "WIP",
  },
  {
    slug: "stocklab",
    title: "StockLab",
    description:
      "A web application to help users backtest their trading strategies easily.",
    date: new Date("2025-01-25"),
    url: `${basePath}/stocklab`,
    links: [
      {
        title: "Website",
        url: "https://stocklab.vercel.app",
      },
      {
        title: "GitHub",
        url: "https://github.com/trotelalexandre/stocklab",
      },
    ],
    tags: ["Frontend", "Design", "Business", "API"],
    languages: ["TypeScript", "React", "Next.js", "Tailwind CSS"],
    status: "WIP",
  },
  {
    slug: "cli-adventure",
    title: "CLI Adventure",
    description:
      "A CLI game to play a text-based adventure game in your terminal enriched with AI.",
    date: new Date("2025-02-08"),
    url: `${basePath}/cli-adventure`,
    links: [
      {
        title: "GitHub",
        url: "https://github.com/trotelalexandre/cli-adventure",
      },
    ],
    tags: ["CLI", "AI"],
    languages: ["TypeScript", "Drizzle"],
    status: "WIP",
    preview: {
      asset: `${videoBasePath}/cli-adventure.mp4`,
      type: "video",
    },
  },
  {
    slug: "refine-my-prompt",
    title: "Refine My Prompt",
    description:
      "A web application to help users create beautiful prompts before sending them to AI models.",
    date: new Date("2025-02-15"),
    url: `${basePath}/refine-my-prompt`,
    links: [
      {
        title: "Website",
        url: "https://refine-my-prompt.vercel.app",
      },
      {
        title: "GitHub",
        url: "https://github.com/trotelalexandre/refine-my-prompt",
      },
    ],
    tags: ["Frontend", "Design", "AI", "Fullstack", "Backend"],
    languages: ["TypeScript", "React", "Next.js", "Tailwind CSS"],
    status: "WIP",
    preview: {
      asset: `${videoBasePath}/refine-my-prompt.mp4`,
      type: "video",
    },
  },
];
