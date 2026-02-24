export type Category =
  | "personal"
  | "startup"
  | "open_source"
  | "social"
  | "creative"
  | "finance"
  | "health";

export type Status = "not_started" | "in_progress" | "success" | "failed";

export interface Goal {
  category: Category;
  notes?: string;
  progressPercent?: number;
  status: Status;
  subItems?: string[];
  title: string;
}

export interface YearGroup {
  items: Goal[];
  year: number | "future";
}
