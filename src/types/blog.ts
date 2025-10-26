export type PostBase = {
  slug: string;
  title: string;
  description: string;
  date: Date;
  views?: number;
  formattedViews?: string;
  formattedDate?: string;
  showDate?: boolean;
};

export type Post = PostBase;

export type BlogPost = PostBase & {
  content: string;
};
