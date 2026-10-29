interface Period {
  start: string;
  end: string | null;
}

interface Resume {
  name: string;
  headline: string;
  location: string;
  contact: readonly { label: string; url: string }[];
  summary: string;
  experience: readonly {
    company: string;
    role: string;
    period: Period;
    highlights: readonly string[];
  }[];
  education: readonly {
    school: string;
    degree: string;
    period: Period;
    details?: string;
  }[];
  skills: readonly { category: string; items: readonly string[] }[];
  projects: readonly {
    name: string;
    url: string;
    description: string;
    stars: number;
  }[];
  leadership: {
    organization: string;
    kind: string;
    role: string;
    period: Period;
    description: string;
  };
  languages: readonly string[];
  interests: string;
}

export const RESUME = {
  name: "Alexandre Trotel",
  headline: "Junior Full-Stack Engineer",
  location: "Paris, France, open to relocation",
  contact: [
    {
      label: "trotelalexandre@proton.me",
      url: "mailto:trotelalexandre@proton.me",
    },
    { label: "alexandretrotel.org", url: "https://www.alexandretrotel.org" },
    {
      label: "github.com/alexandretrotel",
      url: "https://github.com/alexandretrotel",
    },
    {
      label: "linkedin.com/in/alexandretrotel",
      url: "https://www.linkedin.com/in/alexandretrotel",
    },
  ],
  summary:
    "Full-stack engineer with a Rust and TypeScript focus. Built high-throughput data pipelines, low-latency APIs and open-source libraries used by thousands of developers. Two-time CTO, comfortable owning systems end to end.",
  experience: [
    {
      company: "Radion",
      role: "Co-founder & CTO",
      period: { start: "2026-03", end: "2026-08" },
      highlights: [
        "Built a real-time and historical data platform for Polymarket prediction markets in a Rust monorepo of 9 services, including an Axum API, an MCP server and the ingestion pipelines",
        "Designed a reorg-safe historical pipeline from HyperSync through Redpanda into TimescaleDB, processing 1,000+ events/s",
        "Ingested 8B+ on-chain events in under 2 days and stored 400+ GB compressed",
        "Served REST and WebSocket data at 70ms p95, streaming live events and mempool from a self-hosted Polygon node",
        "Shipped official SDKs in TypeScript, Rust and Python, plus usage-based billing with Stripe",
        "Managed an intern and ran technical interviews; top 10% of YC applicants, Alliance interview stage",
      ],
    },
    {
      company: "ALLOHOUSTON",
      role: "Full-Stack Engineer, intern then freelance",
      period: { start: "2025-05", end: "2025-12" },
      highlights: [
        "Wrote a conflict resolution algorithm for incremental CRM sync that preserves local state",
        "Built an end-to-end OCR pipeline with Mistral OCR that extracts document data and scores validity against public and private databases",
        "Improved type safety across the stack and prepared it for AI-powered code review",
      ],
    },
    {
      company: "Mindify",
      role: "Co-founder & CTO",
      period: { start: "2024-07", end: "2024-12" },
      highlights: [
        "Shipped a Next.js web app and an Expo mobile app on the App Store and Google Play, reaching 1,000+ downloads and 300+ beta users",
        "Built the NestJS backend with Supabase and OpenAI-powered features",
      ],
    },
    {
      company: "SiBorg",
      role: "Full-Stack Engineer Intern",
      period: { start: "2024-06", end: "2024-09" },
      highlights: [
        "Led the Next.js and GraphQL frontend of an NFT advertising platform; won The Graph Prize at Coinbase Onchain Summer",
      ],
    },
    {
      company: "TrotelCoin",
      role: "Founder",
      period: { start: "2023-07", end: "2024-07" },
      highlights: [
        "Deployed 10+ Solidity smart contracts and a web app used by 200+ users",
      ],
    },
  ],
  education: [
    {
      school: "Georgia Institute of Technology",
      degree: "MS Electrical and Computer Engineering (double degree)",
      period: { start: "2025-01", end: "2026-05" },
      details:
        "Machine Learning, Advanced Computer Architecture, Online Machine Learning, Machine Learning for Trading, Digital Speech Processing, Solar Cells, Computer Network Security",
    },
    {
      school: "ENSEEIHT",
      degree: "MS Computer Science",
      period: { start: "2022-09", end: "2025-07" },
      details:
        "Internet and Graph Theory, Local and Telecom Networks, Functional Programming and Compilers, Concurrent and Distributed Applications, IoT Networks, Cloud Infrastructure and Big Data",
    },
    {
      school: "Lycée Chateaubriand",
      degree: "CPGE PCSI, PSI*",
      period: { start: "2020-09", end: "2022-07" },
    },
  ],
  skills: [
    {
      category: "Languages",
      items: ["TypeScript", "Rust", "Python", "SQL", "Solidity"],
    },
    {
      category: "Backend & data",
      items: [
        "Axum",
        "Tokio",
        "NestJS",
        "PostgreSQL",
        "TimescaleDB",
        "Redpanda",
        "GraphQL",
      ],
    },
    {
      category: "Frontend",
      items: [
        "React",
        "Next.js",
        "TanStack Start",
        "Vite",
        "React Native",
        "Expo",
        "Tailwind CSS",
      ],
    },
    {
      category: "Infra & AI",
      items: [
        "Docker",
        "Vercel",
        "Cloudflare",
        "Railway",
        "GitHub Actions",
        "MCP",
        "Mastra",
        "AI SDK",
        "TanStack AI",
      ],
    },
  ],
  projects: [
    {
      name: "todo-tree",
      url: "https://github.com/alexandretrotel/todo-tree",
      description:
        "Finds TODO comments across a codebase and lists them as a tree",
      stars: 56,
    },
    {
      name: "dotfiles-manager",
      url: "https://github.com/alexandretrotel/dotfiles-manager",
      description: "Syncs dotfiles across machines with profiles",
      stars: 33,
    },
  ],
  leadership: {
    organization: "N7 Consulting",
    kind: "ENSEEIHT's Junior-Entreprise",
    role: "Vice President",
    period: { start: "2023-03", end: "2024-03" },
    description: "Led a team of 26 and generated €100K in revenue",
  },
  languages: ["French (native)", "English (fluent, C1)"],
  interests:
    "Running (20-30 km/week), piano and EDM production, science content creator (10k+ Instagram followers)",
} as const satisfies Resume;
