"use client";
import "client-only";

import { motion } from "motion/react";

interface SongItemAnimationProps {
  children: React.ReactNode;
  delay?: number;
}

export default function SongItemAnimation({
  children,
  delay = 0,
}: SongItemAnimationProps) {
  return (
    <motion.div
      className="relative h-full w-full"
      animate={{
        filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "loop",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
