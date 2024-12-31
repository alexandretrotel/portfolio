export type Status = "WIP" | "Finished" | "Paused" | "Dropped";

export type Link = {
  platform: string;
  url: string;
  icon: React.ReactNode;
};

export type Links = Link[];

export type Asset = {
  type: string;
  url: string;
  version: string;
};

export type Assets = Asset[];

export type Author = "Alexandre Trotel";

export type Authors = Author[];

export type Style =
  | "Future House"
  | "Progressive House"
  | "Big Room"
  | "EDM"
  | "Trance"
  | "Happy Hardcore"
  | "Chill House"
  | "Future Bass"
  | "Piano"
  | "Dubstep"
  | "Electro Pop"
  | "Brazilian Bass"
  | "Melbourne Bounce"
  | "Moombahton"
  | "Trap"
  | "Future Rave"
  | "House"
  | "Bass House"
  | "Tropical House";

export type Styles = Style[];

export type RecordLabel = "Self-Released";

export type RecordLabelItem = {
  name: string;
  url: string;
};

export type RecordLabels = RecordLabelItem[];

export type Song = {
  slug: string;
  title: string;
  description: string;
  authors: Authors;
  status: Status;
  featured?: boolean;
  links?: Links;
  cover?: string;
  assets?: Assets;
  styles: Styles;
  date: Date;
  labels?: RecordLabels;
};

export type Songs = Song[];
