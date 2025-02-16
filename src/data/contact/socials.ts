import { Socials } from "@/types/contact/socials";
import {
  RiGithubFill,
  RiInstagramFill,
  RiLinkedinFill,
  RiSendPlaneFill,
  RiTwitterXFill,
  RiYoutubeFill,
} from "@remixicon/react";
import React from "react";

export const socials: Socials = [
  {
    title: "LinkedIn",
    description: "See my achievements and experiences",
    href: "https://www.linkedin.com/in/trotelalexandre",
    button: "Connect with me",
    color: "bg-blue-100 dark:bg-blue-900",
    icon: React.createElement(RiLinkedinFill, { size: 20 }),
  },
  {
    title: "GitHub",
    description: "I code (sometimes) too much",
    href: "https://www.github.com/trotelalexandre",
    button: "Contribute to my projects",
    color: "bg-emerald-100 dark:bg-emerald-900",
    icon: React.createElement(RiGithubFill, { size: 20 }),
  },
  {
    title: "YouTube",
    description: "I share my songs there",
    href: "https://www.youtube.com/@trotelalexandre",
    button: "Listen to my songs",
    color: "bg-red-100 dark:bg-red-900",
    icon: React.createElement(RiYoutubeFill, { size: 20 }),
    disabled: true,
  },
  {
    title: "Twitter/X",
    description: "I'm not really active there",
    href: "https://x.com/trotelalexandre",
    button: "Follow me there anyway",
    color: "bg-yellow-100 dark:bg-yellow-900",
    icon: React.createElement(RiTwitterXFill, { size: 20 }),
    disabled: true,
  },
  {
    title: "Instagram",
    description: "I try to share a bit of my knowledge",
    href: "https://www.instagram.com/trotelalexandre",
    button: "Learn new things",
    color: "bg-pink-100 dark:bg-pink-900",
    icon: React.createElement(RiInstagramFill, { size: 20 }),
    disabled: true,
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
