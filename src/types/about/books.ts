export type Book = {
  title: string;
  author: string;
  description: string;
  disabled?: boolean;
  url?: string;
  tags: Tags;
};

export type Books = Book[];

export type Tag =
  | "Business"
  | "Finance"
  | "Health"
  | "Investing"
  | "Personal Development"
  | "Real Estate"
  | "Social";

export type Tags = Tag[];
