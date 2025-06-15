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
		featured: true,
		icon: `${iconBasePath}/logo.png`,
	},
	{
		slug: "trotelcoin",
		title: "TrotelCoin",
		description:
			"A blockchain education web application inspired by Duolingo with a token system.",
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
		preview: {
			asset: `${videoBasePath}/stockquest.mp4`,
			type: "video",
		},
		icon: `${iconBasePath}/stockquest.png`,
	},
	{
		slug: "zap-ts",
		title: "Zap.ts",
		description: "The boilerplate to build application as fast as a zap.",
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
		preview: {
			asset: `${videoBasePath}/zap-ts.mp4`,
			type: "video",
		},
		icon: `${iconBasePath}/zap-ts.png`,
	},
	{
		slug: "feed-your-ai",
		title: "Feed Your AI",
		description:
			"A tool to combine text files for AI processing with filtering options.",
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
		preview: {
			asset: `${videoBasePath}/shadow.mp4`,
			type: "video",
		},
	},
];
