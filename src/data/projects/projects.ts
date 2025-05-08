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
        url: "https://github.com/alexandretrotel/portfolio",
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
    status: "Archived",
    icon: `${iconBasePath}/mindify.jpeg`,
    preview: {
      asset: `${videoBasePath}/mindify.mp4`,
      type: "video",
    },
  },
  {
    slug: "stockquest",
    title: "StockQuest",
    description:
      "A gamified application to help users backtest their trading strategies easily.",
    date: new Date("2025-03-06"),
    url: `${basePath}/stockquest`,
    links: [
      {
        title: "Website",
        url: "https://stockq.app",
      },
    ],
    tags: [
      "Frontend",
      "Design",
      "Business",
      "API",
      "Backend",
      "AI",
      "Fullstack",
      "Marketing",
      "Product",
      "Business",
    ],
    languages: [
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Flask",
      "Drizzle",
      "Python",
    ],
    status: "WIP",
    preview: {
      asset: `${videoBasePath}/stockquest.mp4`,
      type: "video",
    },
    icon: `${iconBasePath}/stockquest.png`,
  },
  {
    slug: "slippage-slicer",
    title: "Slippage Slicer",
    description:
      "SlippageSlicer is designed to help you execute trades on Uniswap without significantly impacting the price — especially in liquidity pools with low liquidity.",
    date: new Date("2025-01-04"),
    url: `${basePath}/slippage-slicer`,
    links: [
      {
        title: "GitHub",
        url: "https://github.com/alexandretrotel/slippage-slicer",
      },
    ],
    tags: ["Backend", "Blockchain", "API"],
    languages: ["TypeScript", "Solidity", "Ethers.js"],
    status: "Completed",
    dateCompleted: new Date("2025-01-05"),
    preview: {
      asset: `${videoBasePath}/slippage-slicer.mp4`,
      type: "video",
    },
  },
  {
    slug: "zap-ts",
    title: "Zap.ts",
    description: "The boilerplate to build application as fast as a zap.",
    date: new Date("2025-03-15"),
    url: `${basePath}/zap-ts`,
    links: [
      {
        title: "Documentation",
        url: "https://zap-ts.alexandretrotel.org",
      },
      {
        title: "GitHub",
        url: "https://github.com/alexandretrotel/zap.ts",
      },
    ],
    tags: [
      "Frontend",
      "Backend",
      "Fullstack",
      "Design",
      "API",
      "AI",
      "Tooling",
      "CLI",
    ],
    languages: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Drizzle"],
    status: "WIP",
    dateCompleted: new Date("2025-03-16"),
    preview: {
      asset: `${videoBasePath}/zap-ts.mp4`,
      type: "video",
    },
  },
  {
    slug: "battle-dots",
    title: "Battle Dots",
    description: "A game where you have to shoot the dots of your opponents.",
    date: new Date("2025-03-24"),
    url: `${basePath}/battle-dots`,
    links: [
      {
        title: "Website",
        url: "https://battle-dots.alexandretrotel.org",
      },
      {
        title: "GitHub",
        url: "https://github.com/alexandretrotel/battle-dots",
      },
    ],
    tags: ["Frontend", "Design", "API", "Backend", "Fullstack"],
    languages: [
      "TypeScript",
      "React",
      "Vite",
      "Tailwind CSS",
      "Express",
      "SocketIO",
    ],
    status: "Completed",
    preview: {
      asset: `${videoBasePath}/battle-dots.mp4`,
      type: "video",
    },
  },
  {
    slug: "feed-your-ai",
    title: "Feed Your AI",
    description:
      "A tool to combine text files for AI processing with filtering options.",
    date: new Date("2025-03-30"),
    url: `${basePath}/feed-your-ai`,
    links: [
      {
        title: "GitHub",
        url: "https://github.com/alexandretrotel/feedyourai",
      },
      {
        title: "Crates.io",
        url: "https://crates.io/crates/feedyourai",
      },
    ],
    tags: ["CLI", "Tooling"],
    languages: ["Rust", "Cargo"],
    status: "Completed",
    dateCompleted: new Date("2025-03-30"),
    preview: {
      asset: `${videoBasePath}/feed-your-ai.mp4`,
      type: "video",
    },
  },
  {
    slug: "shadow",
    title: "Shadow",
    description:
      "An E2EE chat application with a focus on privacy and security.",
    date: new Date("2025-04-02"),
    url: `${basePath}/shadow`,
    links: [
      {
        title: "Website",
        url: "https://shadow.alexandretrotel.org",
      },
      {
        title: "GitHub",
        url: "https://github.com/alexandretrotel/shadow",
      },
    ],
    tags: ["Frontend", "Design", "API", "Backend", "Fullstack"],
    languages: [
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Express",
      "SocketIO",
      "Drizzle",
    ],
    status: "Completed",
    dateCompleted: new Date("2025-04-04"),
    preview: {
      asset: `${videoBasePath}/shadow.mp4`,
      type: "video",
    },
  },
  {
    slug: "hbts",
    title: "hbts",
    description:
      "Track your bad habits and improve your life with this simple tool.",
    date: new Date("2025-04-29"),
    url: `${basePath}/hbts`,
    links: [
      {
        title: "Website",
        url: "https://hbts.alexandretrotel.org",
      },
      {
        title: "GitHub",
        url: "https://github.com/alexandretrotel/hbts",
      },
    ],
    tags: ["CLI", "Tooling"],
    languages: ["Drizzle", "TypeScript"],
    status: "Completed",
    dateCompleted: new Date("2025-04-30"),
    preview: {
      asset: `${videoBasePath}/hbts.mp4`,
      type: "video",
    },
  },
];
