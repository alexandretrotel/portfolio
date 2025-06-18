import type { JSX } from "react";

export type Social = {
  title: string;
  description: string;
  href: string;
  button: string;
  color?: string;
  icon: JSX.Element;
  disabled?: boolean;
};

export type Socials = Social[];
