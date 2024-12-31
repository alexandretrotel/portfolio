export type Status = "WIP" | "Finished" | "Paused" | "Dropped";

export type Link = {
  platform: string;
  url: string;
};

export type Links = Link[];

export type Asset = {
  type: string;
  url: string;
  version: number;
};

export type Assets = Asset[];

export type Author = "Alexandre Trotel";

export type Authors = Author[];

export type Style = "Future House" | "Progressive House" | "Big Room" | "EDM";

export type Styles = Style[];

export type Song = {
  slug: string;
  title: string;
  authors: Authors;
  status: Status;
  featured?: boolean;
  links?: Links;
  cover?: string;
  assets?: Assets;
  styles: Styles;
  date: Date;
};

export type Songs = Song[];
