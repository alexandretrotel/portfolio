"use client";
import "client-only";

import { cubicBezier, motion } from "motion/react";

type AnimationProps = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
};

export const Animation = ({
  children,
  delay = 0,
  duration = 0.2,
}: AnimationProps) => {
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        delay,
        // biome-ignore lint/style/noMagicNumbers: It's a bezier curve so it's easier to read with numbers
        ease: cubicBezier(0.25, 0.1, 0.25, 1),
      },
    },
  };

  return (
    <motion.div animate="visible" initial="hidden" variants={fadeInUpVariants}>
      {children}
    </motion.div>
  );
};
