export const JSON_LD_CONTEXT = "https://schema.org";

export const SITE = {
  url: "https://www.alexandretrotel.org",
  name: "Alexandre Trotel",
  title: "Alexandre Trotel | Entrepreneur & Open Source Developer",
  description: "Alexandre Trotel, entrepreneur and open source developer.",
  twitter: "@alexandretrotel",
  jobTitle: "Entrepreneur & Open Source Developer",
  sameAs: [
    "https://github.com/alexandretrotel",
    "https://www.linkedin.com/in/alexandretrotel",
    "https://x.com/alexandretrotel",
    "https://www.zapstudio.dev",
  ],
  founder: {
    name: "Zap Studio",
    url: "https://www.zapstudio.dev",
  },
} as const;

export const PROJECTS = [
  {
    name: "todo-tree",
    url: "https://github.com/alexandretrotel/todo-tree",
    blurb: "for surfacing TODO comments",
  },
  {
    name: "dotfiles-manager",
    url: "https://github.com/alexandretrotel/dotfiles-manager",
    blurb: "for dotfile management",
  },
  {
    name: "feedyourai",
    url: "https://github.com/alexandretrotel/feedyourai",
    blurb: "for LLM code compression",
  },
] as const;

export const OPTIONAL_LINKS = [
  { name: "Source", url: "https://github.com/alexandretrotel/portfolio" },
  { name: "GitHub", url: "https://github.com/alexandretrotel" },
  { name: "X", url: "https://x.com/alexandretrotel" },
] as const;

export const SKILLS_REPO_URL = "https://github.com/alexandretrotel/skills";
