export const RESUME_LOCALES = ["en", "fr"] as const;

export type ResumeLocale = (typeof RESUME_LOCALES)[number];

type Localized = Record<ResumeLocale, string>;

type Period = { start: string; end: string | null };

export const RESUME_LABELS = {
  en: {
    summary: "Summary",
    experience: "Experience",
    education: "Education",
    skills: "Skills",
    projects: "Projects",
    leadership: "Leadership",
    languages: "Languages",
    interests: "Interests",
    present: "Present",
    colon: ":",
    stars: "stars",
  },
  fr: {
    summary: "Profil",
    experience: "Expérience",
    education: "Formation",
    skills: "Compétences",
    projects: "Projets",
    leadership: "Associatif",
    languages: "Langues",
    interests: "Centres d'intérêt",
    present: "Aujourd'hui",
    colon: "\u00a0:",
    stars: "étoiles",
  },
} as const satisfies Record<ResumeLocale, Record<string, string>>;

export const RESUME = {
  name: "Alexandre Trotel",
  headline: { en: "Junior Full-Stack Engineer", fr: "Ingénieur Full-Stack Junior" },
  status: { en: "Open to roles", fr: "Ouvert aux opportunités" },
  location: {
    en: "Paris, France, open to relocation",
    fr: "Paris, France, mobile",
  },
  contact: [
    { label: "trotelalexandre@proton.me", url: "mailto:trotelalexandre@proton.me" },
    { label: "alexandretrotel.org", url: "https://www.alexandretrotel.org" },
    { label: "github.com/alexandretrotel", url: "https://github.com/alexandretrotel" },
    {
      label: "linkedin.com/in/alexandretrotel",
      url: "https://www.linkedin.com/in/alexandretrotel",
    },
  ],
  summary: {
    en: "Full-stack engineer with a Rust and TypeScript focus. Built high-throughput data pipelines, low-latency APIs and open-source libraries used by thousands of developers. Two-time CTO, comfortable owning systems end to end.",
    fr: "Ingénieur full-stack spécialisé en Rust et TypeScript. J'ai conçu des pipelines de données à haut débit, des API à faible latence et des bibliothèques open source utilisées par des milliers de développeurs. Deux fois CTO, habitué à gérer un système de A à Z.",
  },
  experience: [
    {
      company: "Radion",
      role: { en: "Co-founder & CTO", fr: "Co-fondateur & CTO" },
      period: { start: "2026-03", end: "2026-08" },
      highlights: [
        {
          en: "Built a real-time and historical data platform for Polymarket prediction markets in a Rust monorepo of 9 services, including an Axum API, an MCP server and the ingestion pipelines",
          fr: "Conception d'une plateforme de données temps réel et historiques pour les marchés prédictifs Polymarket, dans un monorepo Rust de 9 services dont une API Axum, un serveur MCP et les pipelines d'ingestion",
        },
        {
          en: "Designed a reorg-safe pipeline from self-hosted Polygon nodes through Redpanda (Protobuf) into TimescaleDB, processing 1,000+ events/s",
          fr: "Architecture d'un pipeline résistant aux réorganisations de chaîne, des nœuds Polygon auto-hébergés vers TimescaleDB via Redpanda (Protobuf), traitant plus de 1 000 événements/s",
        },
        {
          en: "Ingested 8B+ on-chain events in under 2 days and stored 400+ GB compressed",
          fr: "Ingestion de plus de 8 milliards d'événements on-chain en moins de 2 jours, soit plus de 400 Go compressés",
        },
        {
          en: "Served REST and WebSocket data at 70ms p95, among the fastest in the market",
          fr: "Données servies en REST et WebSocket à 70 ms au p95, parmi les plus rapides du marché",
        },
        {
          en: "Shipped official SDKs in TypeScript, Rust and Python, plus usage-based billing with Stripe",
          fr: "Publication des SDK officiels TypeScript, Rust et Python, et facturation à l'usage avec Stripe",
        },
        {
          en: "Managed an intern and ran technical interviews; top 10% of YC applicants, Alliance interview stage",
          fr: "Encadrement d'un stagiaire et entretiens techniques ; top 10 % des candidats YC, entretien chez Alliance",
        },
      ],
    },
    {
      company: "Zap Studio",
      role: { en: "Founder, open source", fr: "Fondateur, open source" },
      period: { start: "2025-07", end: null },
      highlights: [
        {
          en: "Built 16 type-safe, framework-agnostic TypeScript packages (fetch, validation, store, permissions, webhooks, WebMCP) with zero runtime dependencies",
          fr: "Développement de 16 packages TypeScript typés et indépendants de tout framework (fetch, validation, store, permissions, webhooks, WebMCP), sans aucune dépendance",
        },
        {
          en: "Reached 7,000+ monthly downloads and 170+ GitHub stars, with the whole ecosystem at 164 KB gzipped",
          fr: "Plus de 7 000 téléchargements mensuels et 170 étoiles GitHub, pour un écosystème complet de 164 Ko compressé",
        },
      ],
    },
    {
      company: "ALLOHOUSTON",
      role: {
        en: "Full-Stack Engineer, intern then freelance",
        fr: "Ingénieur Full-Stack, stage puis freelance",
      },
      period: { start: "2025-05", end: "2025-12" },
      highlights: [
        {
          en: "Wrote a conflict resolution algorithm for incremental CRM sync that preserves local state",
          fr: "Algorithme de résolution de conflits pour une synchronisation CRM incrémentale qui préserve l'état local",
        },
        {
          en: "Built an end-to-end OCR pipeline with Mistral OCR that extracts document data and scores validity against public and private databases",
          fr: "Pipeline OCR de bout en bout avec Mistral OCR : extraction des données de documents et score de validité croisé avec des bases publiques et privées",
        },
        {
          en: "Improved type safety across the stack and prepared it for AI-powered code review",
          fr: "Renforcement du typage sur toute la stack et préparation à la revue de code assistée par IA",
        },
      ],
    },
    {
      company: "Mindify",
      role: { en: "Co-founder & CTO", fr: "Co-fondateur & CTO" },
      period: { start: "2024-07", end: "2024-12" },
      highlights: [
        {
          en: "Shipped a Next.js web app and an Expo mobile app on the App Store and Google Play: 1,000+ downloads, 300+ beta users",
          fr: "Lancement d'une app web Next.js et mobile Expo (App Store, Google Play) : 1 000+ téléchargements, 300 bêta-testeurs",
        },
        {
          en: "Built the NestJS backend with Supabase and OpenAI-powered features",
          fr: "Développement du backend NestJS avec Supabase et des fonctionnalités basées sur OpenAI",
        },
      ],
    },
    {
      company: "SiBorg",
      role: { en: "Full-Stack Engineer Intern", fr: "Stagiaire Ingénieur Full-Stack" },
      period: { start: "2024-06", end: "2024-09" },
      highlights: [
        {
          en: "Led the Next.js and GraphQL frontend of an NFT advertising platform; won The Graph Prize at Coinbase Onchain Summer",
          fr: "Responsable du frontend Next.js et GraphQL d'une plateforme publicitaire NFT ; prix The Graph au Coinbase Onchain Summer",
        },
      ],
    },
    {
      company: "TrotelCoin",
      role: { en: "Founder", fr: "Fondateur" },
      period: { start: "2023-07", end: "2024-07" },
      highlights: [
        {
          en: "Deployed 10+ Solidity smart contracts and a web app used by 200+ users; reached 342 holders",
          fr: "Déploiement de plus de 10 smart contracts Solidity et d'une app web utilisée par plus de 200 personnes ; 342 détenteurs",
        },
      ],
    },
  ],
  education: [
    {
      school: "Georgia Institute of Technology",
      degree: {
        en: "MS Electrical and Computer Engineering (double degree)",
        fr: "MS Electrical and Computer Engineering (double diplôme)",
      },
      period: { start: "2025-01", end: "2026-05" },
      details: {
        en: "Machine Learning, ML for Trading, Network Security",
        fr: "Machine Learning, ML pour le trading, sécurité des réseaux",
      },
    },
    {
      school: "ENSEEIHT",
      degree: { en: "MS Computer Science", fr: "Diplôme d'ingénieur en informatique" },
      period: { start: "2022-09", end: "2025-07" },
      details: {
        en: "Networks, Distributed Systems, Cloud and Big Data",
        fr: "Réseaux, systèmes distribués, cloud et big data",
      },
    },
    {
      school: "Lycée Chateaubriand",
      degree: { en: "CPGE PCSI, PSI*", fr: "CPGE PCSI, PSI*" },
      period: { start: "2020-09", end: "2022-07" },
    },
  ],
  skills: [
    {
      category: { en: "Languages", fr: "Langages" },
      items: ["TypeScript", "Rust", "Python", "SQL", "Solidity"],
    },
    {
      category: { en: "Backend & data", fr: "Backend & données" },
      items: [
        "Axum",
        "Tokio",
        "NestJS",
        "PostgreSQL",
        "TimescaleDB",
        "Redpanda",
        "Protobuf",
        "GraphQL",
      ],
    },
    {
      category: { en: "Frontend", fr: "Frontend" },
      items: ["React", "Next.js", "TanStack Start", "React Native", "Expo", "Tailwind CSS"],
    },
    {
      category: { en: "Infra & AI", fr: "Infra & IA" },
      items: ["Docker", "Railway", "GitHub Actions", "MCP", "LLM APIs"],
    },
  ],
  projects: [
    {
      name: "todo-tree",
      url: "https://github.com/alexandretrotel/todo-tree",
      description: {
        en: "Rust CLI to find TODO comments",
        fr: "CLI Rust pour trouver les commentaires TODO",
      },
      stars: 56,
    },
    {
      name: "dotfiles-manager",
      url: "https://github.com/alexandretrotel/dotfiles-manager",
      description: {
        en: "Rust CLI to sync dotfiles with profiles",
        fr: "CLI Rust pour synchroniser ses dotfiles par profil",
      },
      stars: 33,
    },
    {
      name: "feedyourai",
      url: "https://github.com/alexandretrotel/feedyourai",
      description: {
        en: "Rust CLI to pack a codebase for LLMs",
        fr: "CLI Rust pour condenser une codebase pour les LLM",
      },
      stars: 4,
    },
  ],
  leadership: {
    organization: "N7 Consulting",
    kind: { en: "ENSEEIHT's Junior-Entreprise", fr: "Junior-Entreprise de l'ENSEEIHT" },
    role: { en: "Vice President", fr: "Vice-président" },
    period: { start: "2023-03", end: "2024-03" },
    description: {
      en: "Led a team of 26 and generated €100K in revenue",
      fr: "Direction d'une équipe de 26 personnes, 100 K€ de CA",
    },
  },
  languages: [
    { en: "French (native)", fr: "Français (langue maternelle)" },
    { en: "English (fluent, C1)", fr: "Anglais (courant, C1)" },
  ],
  interests: {
    en: "Running (20-30 km/week), piano and EDM production, science content creator (10k+ Instagram followers)",
    fr: "Course à pied (20-30 km/semaine), piano et production EDM, création de contenu scientifique (10 000+ abonnés Instagram)",
  },
} as const satisfies {
  name: string;
  headline: Localized;
  status: Localized;
  location: Localized;
  contact: readonly { label: string; url: string }[];
  summary: Localized;
  experience: readonly {
    company: string;
    role: Localized;
    period: Period;
    highlights: readonly Localized[];
  }[];
  education: readonly {
    school: string;
    degree: Localized;
    period: Period;
    details?: Localized;
  }[];
  skills: readonly { category: Localized; items: readonly string[] }[];
  projects: readonly { name: string; url: string; description: Localized; stars: number }[];
  leadership: {
    organization: string;
    kind: Localized;
    role: Localized;
    period: Period;
    description: Localized;
  };
  languages: readonly Localized[];
  interests: Localized;
};
