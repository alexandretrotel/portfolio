export type Investment = {
  asset: string;
  description: string;
  date: string;
  url?: string;
  image?: string;
  disabled?: boolean;
};

export type Investments = Investment[];
