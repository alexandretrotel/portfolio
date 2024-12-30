"use client";
import "client-only";

import { motion } from "motion/react";

interface AnimationProps {
  children: React.ReactNode;
  delay?: number;
  up?: boolean;
  className?: string;
}

export default function Animation({
  children,
  delay = 0,
  up,
  className,
}: AnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: up ? 20 : -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
