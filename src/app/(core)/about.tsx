"use client";
import "client-only";

import { motion } from "motion/react";

interface AboutProps {
  delay: number;
}

export default function About({ delay }: AboutProps) {
  return (
    <motion.div
      className="flex flex-col"
      layoutId="about"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <h1 className="text-lg font-semibold">About</h1>
      <p className="text-sm text-muted-foreground">
        I am passionate about exploring and experimenting with{" "}
        <strong>entrepreneurship</strong> and <strong>new technologies</strong>,
        especially those that can be used to create innovative solutions for{" "}
        <strong>real-world problems</strong>. I love working on projects that
        challenge me to <strong>learn and grow</strong>.
      </p>
    </motion.div>
  );
}
