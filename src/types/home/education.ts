export type EducationItem = {
  school: string;
  topic: string;
  date: string;
  url?: string;
  image?: string;
  disabled?: boolean;
};

export type Education = EducationItem[];
