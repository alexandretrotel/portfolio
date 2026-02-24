import type { Category, YearGroup } from "@/core/primitives/schemas/goals";

export const categoryLabels: Record<Category, string> = {
  personal: "Personal",
  startup: "Startup",
  open_source: "Open Source",
  social: "Social",
  creative: "Creative",
  finance: "Finance",
  health: "Health",
};

export const categoryOrder: Category[] = [
  "personal",
  "startup",
  "open_source",
  "social",
  "creative",
  "finance",
  "health",
];

export const roadmap: YearGroup[] = [
  {
    year: "future",
    items: [
      {
        title: "Do a TEDx talk",
        category: "personal",
        status: "not_started",
      },
      {
        title: "Reach a net worth of $100M",
        category: "finance",
        status: "not_started",
      },
      {
        title: "Accumulate 10+ $BTC",
        category: "finance",
        status: "not_started",
      },
      {
        title: "Run a marathon",
        category: "health",
        status: "not_started",
      },
      {
        title: "Write a book",
        category: "personal",
        status: "not_started",
      },
    ],
  },
  {
    year: 2026,
    items: [
      {
        title: 'Participate to my first "real" hackathon',
        category: "startup",
        status: "not_started",
      },
      {
        title: "Talk to 100 strangers",
        category: "social",
        status: "in_progress",
      },
      {
        title: "Launch a startup with $10k MRR",
        category: "startup",
        status: "in_progress",
      },
      {
        title: "Kill myself with 6h/week of sport",
        category: "health",
        status: "in_progress",
      },
      {
        title: "Reach 1k+ stars on Zap Studio's monorepo",
        category: "open_source",
        status: "in_progress",
        progressPercent: 15,
      },
      {
        title: "Preserve 19y/o biological age",
        category: "health",
        status: "in_progress",
      },
      {
        title: "Spend 3x weeks with my gf",
        category: "social",
        status: "not_started",
      },
      {
        title: "Spend 2x weeks with my friends",
        category: "social",
        status: "not_started",
      },
      {
        title: "Start a YouTube channel (1 video/week)",
        category: "creative",
        status: "not_started",
        notes:
          "let's try to focus on qualitative content this time; i've published too much just for the sake of growing on instagram, tiktok, etc...",
      },
      {
        title: "Write 10 essays",
        category: "personal",
        status: "not_started",
      },
      {
        title: "Produce 5x songs",
        category: "creative",
        status: "not_started",
        notes: "just for fun, i haven't made music for so long",
      },
      {
        title: "Learn to dance in a course with other people",
        category: "social",
        status: "not_started",
        notes:
          "i'm so afraid to do that, i feel it would take me out of my comfort zone so muchhhh",
      },
      {
        title: "Lock in 3 months with my co-founders",
        category: "startup",
        status: "not_started",
      },
      {
        title: "Graduate from 2 universities (Georgia Tech x ENSEEIHT)",
        category: "personal",
        status: "in_progress",
      },
      {
        title: "Apply and go to YC",
        category: "startup",
        status: "not_started",
      },
      {
        title: "Write my goals",
        category: "personal",
        status: "success",
      },
      {
        title: 'Do 10 "solo" date',
        category: "personal",
        status: "not_started",
      },
      {
        title: "Write my values",
        category: "personal",
        status: "not_started",
        notes: "should have no more than 5",
      },
    ],
  },
  {
    year: 2025,
    items: [
      {
        title: "Max out my PEA",
        category: "finance",
        status: "success",
      },
      {
        title: "Do 100 push-ups/day",
        category: "health",
        status: "success",
      },
      {
        title: "Reach 10k on Instagram",
        category: "personal",
        status: "failed",
        progressPercent: 17,
      },
      {
        title: "Reach 1k on X",
        category: "personal",
        status: "failed",
        progressPercent: 35,
      },
      {
        title: "Reach 10k on TikTok",
        category: "personal",
        status: "failed",
        progressPercent: 18,
      },
      {
        title: "Read 10+ books",
        category: "personal",
        status: "success",
        notes:
          "i aced it, never read that much, can't even say the number of books i've read",
      },
    ],
  },
];
