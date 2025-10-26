"use client";

import { cubicBezier, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavItemProps {
  link: {
    title: string;
    href: string;
    hidden: boolean;
    target?: string;
  };
  index: number;
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: cubicBezier(0.4, 0.0, 0.2, 1.0),
      delay: i * 0.1,
    },
  }),
};

export function NavItem({ link, index }: NavItemProps) {
  const pathname = usePathname();

  if (link.hidden) {
    return null;
  }

  const isActive = pathname.startsWith(link.href);

  return (
    <motion.div
      animate="visible"
      custom={index + 1}
      initial="hidden"
      key={link.href}
      variants={itemVariants}
      whileHover="hover"
      whileTap="tap"
    >
      <Button
        asChild
        className={cn(
          "transition-transform active:scale-90",
          isActive ? "bg-accent dark:bg-accent/50" : "text-foreground/60"
        )}
        key={link.href}
        variant={"ghost"}
      >
        <Link
          aria-disabled={link.hidden}
          className={"font-medium text-sm transition-colors"}
          href={link.href}
          target={link.target}
        >
          {link.title}
        </Link>
      </Button>
    </motion.div>
  );
}
