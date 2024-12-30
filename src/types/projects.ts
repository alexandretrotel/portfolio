import { Skills } from "./skills";

export type Tag =
  | "Frontend"
  | "Backend"
  | "Fullstack"
  | "Mobile"
  | "Design"
  | "Music"
  | "Business"
  | "Marketing"
  | "Product"
  | "AI"
  | "CLI"
  | "API"
  | "Tooling"
  | "Other";

export type Tags = Tag[];

export type Link = {
  title: string;
  url: string;
};

export type Links = Link[];

export type Language =
  | "TypeScript"
  | "Python"
  | "Java"
  | "C++"
  | "C"
  | "Rust"
  | "Ada"
  | "React"
  | "Next.js"
  | "Tailwind CSS"
  | "Solidity"
  | "Wagmi"
  | "Expo"
  | "React Native"
  | "NestJS"
  | "Cargo"
  | "Drizzle"
  | "grammY";

export type Languages = Language[];

export type Status = "In Progress" | "Completed";

export type Project = {
  title: string;
  description: string;
  date: Date;
  dateCompleted?: Date;
  url?: string;
  links?: Links;
  languages?: Languages;
  image?: string;
  skills?: Skills;
  featured?: boolean;
  tags?: Tags;
  status: Status;
  icon?: string;
  disabled?: boolean;
};

export type Projects = Project[];
