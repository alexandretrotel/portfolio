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
  | "Other"
  | "Blockchain";

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
  | "grammY"
  | "Vite"
  | "Go"
  | "Ethers.js"
  | "Flask";

export type Languages = Language[];

export type Status = "WIP" | "Completed" | "Paused" | "Abandoned";

export type PreviewType = "image" | "video";

export type Preview = {
  asset: string;
  type: PreviewType;
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  date: Date;
  dateCompleted?: Date;
  url?: string;
  links?: Links;
  languages?: Languages;
  preview?: Preview;
  featured?: boolean;
  tags?: Tags;
  status: Status;
  icon?: string;
  disabled?: boolean;
};

export type Projects = Project[];
