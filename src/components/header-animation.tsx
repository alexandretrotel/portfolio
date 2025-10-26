"use client";

import { cubicBezier, motion } from "motion/react";

type HeaderAnimationProps = {
  children: React.ReactNode;
};

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      // biome-ignore lint/style/noMagicNumbers: It's a bezier curve so it's easier to read with numbers
      ease: cubicBezier(0.4, 0.0, 0.2, 1.0),
    },
  },
};

export function HeaderAnimation({ children }: HeaderAnimationProps) {
  return (
    <motion.header
      animate="visible"
      className="top-0 z-50 h-16 w-full border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60"
      initial="hidden"
      variants={headerVariants}
    >
      {children}
    </motion.header>
  );
}
