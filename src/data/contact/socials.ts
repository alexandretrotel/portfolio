import { Socials } from "@/types/contact/socials";
import {
  RiGithubFill,
  RiLinkedinFill,
  RiSendPlaneFill,
} from "@remixicon/react";
import React from "react";

export const socials: Socials = [
  {
    title: "LinkedIn",
    description: "Let's network together",
    href: "https://www.linkedin.com/in/alexandretrotel",
    button: "Connect with me",
    color: "bg-blue-100 dark:bg-blue-900",
    icon: React.createElement(RiLinkedinFill, { size: 20 }),
  },
  {
    title: "GitHub",
    description: "I code (sometimes) too much",
    href: "https://www.github.com/alexandretrotel",
    button: "Contribute to my projects",
    color: "bg-emerald-100 dark:bg-emerald-900",
    icon: React.createElement(RiGithubFill, { size: 20 }),
  },
  {
    title: "Get in touch",
    description: "The old way to contact me",
    href: "mailto:trotelalexandre@proton.me",
    button: "Send me an email",
    color: "bg-gray-100 dark:bg-gray-900", // Added a default color
    icon: React.createElement(RiSendPlaneFill, { size: 20 }),
  },
];
