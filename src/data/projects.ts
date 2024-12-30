import { Projects } from "@/types/projects";

const basePath = "/projects";
const imageBasePath = "/projects/images";
const iconBasePath = "/projects/icons";
const videoBasePath = "/projects/videos";

export const projects: Projects = [
  {
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
    status: "In Progress",
    featured: true,
    icon: `${iconBasePath}/logo.png`,
  },
  {
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
    featured: true,
    icon: `${iconBasePath}/trotelcoin.jpeg`,
    preview: {
      asset: `${videoBasePath}/trotelcoin.mp4`,
      type: "video",
    },
  },
  {
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
    status: "In Progress",
    featured: true,
    icon: `${iconBasePath}/mindify.jpeg`,
    preview: {
      asset: `${videoBasePath}/mindify.mp4`,
      type: "video",
    },
  },
  {
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
  },
  {
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
    status: "In Progress",
    preview: {
      asset: `${videoBasePath}/progressly.mp4`,
      type: "video",
    },
  },
  {
    title: "Check Node Packages (cnp)",
    description:
      "A utility tool written in Rust to check unused node packages.",
    date: new Date("2023-12-03"),
    url: `${basePath}/cnp`,
    links: [{ title: "Github", url: "https://github.com/trotelalexandre/cnp" }],
    tags: ["CLI", "Tooling"],
    languages: ["Rust", "Cargo"],
    status: "In Progress",
  },
  {
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
    status: "In Progress",
    icon: `${iconBasePath}/aurora.jpeg`,
  },
  {
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
  },
];
