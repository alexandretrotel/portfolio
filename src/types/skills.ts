export type Category =
  | "Languages"
  | "Frameworks"
  | "Tools"
  | "Databases"
  | "Business"
  | "AI"
  | "Blockchain"
  | "Design"
  | "Music Production"
  | "Others";

export type Skill = {
  skill: string;
  url?: string;
};

export type Skills = Skill[];

export type SkillsGroup = {
  category: Category;
  skills: Skill[];
};

export type SkillsGroups = SkillsGroup[];
