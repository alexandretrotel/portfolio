export type Position = {
  title: string;
  date: string;
  disabled?: boolean;
};

export type Experience = {
  company: string;
  url?: string;
  image?: string;
  positions: Position[];
  disabled?: boolean;
  readMore?: string;
}[];
