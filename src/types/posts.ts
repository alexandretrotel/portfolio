export type Post = {
  slug: string;
  title: string;
  description: string;
  date: Date;
  views?: number;
  formattedViews?: string;
  formattedDate?: string;
  showDate?: boolean;
};

export type Posts = Post[];
