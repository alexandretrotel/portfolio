export type Position = {
  title: string;
  date: string;
  disabled?: boolean;
  readMore?: string;
};

export type Experience = {
  company: string;
  url?: string;
  image?: string;
  positions: Position[];
  disabled?: boolean;
}[];
