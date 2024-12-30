import SocialCard from "@/app/(core)/contact/social-card";
import {
  RiGithubFill,
  RiInstagramFill,
  RiLinkedinFill,
  RiSendPlaneFill,
  RiTwitterXFill,
  RiYoutubeFill,
} from "@remixicon/react";

const socials = [
  {
    title: "LinkedIn",
    description: "See my achievements and experiences",
    href: "https://www.linkedin.com/in/trotelalexandre",
    button: "Connect with me",
    color: "bg-blue-100 dark:bg-blue-900",
    icon: <RiLinkedinFill size={20} />,
  },
  {
    title: "GitHub",
    description: "I code (sometimes) too much",
    href: "https://www.github.com/trotelalexandre",
    button: "Contribute to my projects",
    color: "bg-emerald-100 dark:bg-emerald-900",
    icon: <RiGithubFill size={20} />,
  },
  {
    title: "YouTube",
    description: "I share my songs there",
    href: "https://www.youtube.com/@trotelalexandre",
    button: "Listen to my songs",
    color: "bg-red-100 dark:bg-red-900",
    icon: <RiYoutubeFill size={20} />,
  },
  {
    title: "X",
    description: "I'm not really active there",
    href: "https://x.com/trotelalexandre",
    button: "Follow me there anyway",
    color: "bg-yellow-100 dark:bg-yellow-900",
    icon: <RiTwitterXFill size={20} />,
  },
  {
    title: "Instagram",
    description: "I try to share a bit of my knowledge",
    href: "https://www.instagram.com/trotelalexandre",
    button: "Learn new things",
    color: "bg-pink-100 dark:bg-pink-900",
    icon: <RiInstagramFill size={20} />,
  },
  {
    title: "Get in touch",
    description: "The old way to contact me",
    href: "mailto:trotelalexandre@proton.me",
    button: "Send me an email",
    icon: <RiSendPlaneFill size={20} />,
  },
];

export default async function Contact() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col max-w-sm">
        <h1 className="text-lg font-bold">Contact me</h1>
        <p className="text-muted-foreground text-sm">
          I always asked myself how to send all my social media links at once,
          so I decided to make my own page.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {socials.map((social, index) => (
          <SocialCard key={index} {...social} />
        ))}
      </div>
    </div>
  );
}
