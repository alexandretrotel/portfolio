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
      <h1 className="text-lg font-semibold">About Me</h1>
      <p className="text-sm text-muted-foreground">
        You can get to know me <strong>more personally</strong> on this page.
        I&apos;ll showcase <strong>my investments</strong>,{" "}
        <strong>books I&apos;ve read</strong>, <strong>my culture</strong>, and{" "}
        <strong>my hobbies</strong>. I truly believe that{" "}
        <strong>actions speak louder than words</strong> so that&apos;s why
        I&apos;ve created this page.
      </p>
    </motion.div>
  );
}
