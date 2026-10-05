export const JSON_LD_CONTEXT = "https://schema.org";

export const SITE = {
  url: "https://www.alexandretrotel.org",
  name: "Alexandre Trotel",
  title: "Alexandre Trotel | Founder & Engineer",
  description:
    "Alexandre Trotel, founder and engineer. Maintainer of Zap Studio, an open-source TypeScript project, previously co-founder and CTO of Radion and Mindify.",
  twitter: "@alexandretrotel",
  jobTitle: "Founder & Engineer",
  sameAs: [
    "https://github.com/alexandretrotel",
    "https://www.linkedin.com/in/alexandretrotel",
    "https://x.com/alexandretrotel",
    "https://www.instagram.com/alexandretrotel",
  ],
  openSource: {
    name: "Zap Studio",
    url: "https://www.zapstudio.dev",
  },
} as const;

export const FOOTER_LINKS = [
  { name: "GitHub", url: "https://github.com/alexandretrotel" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/alexandretrotel" },
  { name: "X", url: "https://x.com/alexandretrotel" },
  { name: "Instagram", url: "https://www.instagram.com/alexandretrotel" },
] as const;

export const RESUME_URL = "/resume";

export const RESUME_LINKS = {
  en: { name: "Resume", url: "/resume/en.pdf" },
  fr: { name: "CV", url: "/resume/fr.pdf" },
} as const;

export const SKILLS_REPO_URL = "https://github.com/alexandretrotel/skills";
