"use client";

import { ArrowRight } from "lucide-react";
import { cubicBezier, motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.2,
        ease: cubicBezier(0.4, 0, 0.2, 1),
      },
    },
  };

  const paragraphVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: cubicBezier(0.4, 0, 0.2, 1),
        delay: i * 0.2,
      },
    }),
  };

  return (
    <motion.div
      animate="visible"
      className="flex h-full flex-col gap-16"
      initial="hidden"
      variants={containerVariants}
    >
      <div className="flex w-full max-w-xl flex-col gap-6 font-light text-muted-foreground">
        <motion.p
          custom={0}
          initial="hidden"
          variants={paragraphVariants}
          viewport={{ once: true, amount: 0.3 }}
          whileInView="visible"
        >
          I&apos;m{" "}
          <span className="font-medium text-foreground">Alexandre Trotel</span>,
          a tech entrepreneur and full stack developer with interests in web
          development, machine learning, and open source.
        </motion.p>

        <motion.p
          custom={1}
          initial="hidden"
          variants={paragraphVariants}
          viewport={{ once: true, amount: 0.3 }}
          whileInView="visible"
        >
          Currently working as a{" "}
          <span className="italic">Consultant-Développeur®</span> at{" "}
          <Link
            className="font-medium text-primary hover:underline"
            href="https://www.allohouston.fr"
            target="_blank"
          >
            <span className="italic">ALLO</span>
            <span className="font-semibold">HOUSTON</span>
          </Link>
          , where I help clients build high-quality web applications tailored to
          their needs.
        </motion.p>

        <motion.p
          custom={2}
          initial="hidden"
          variants={paragraphVariants}
          viewport={{ once: true, amount: 0.3 }}
          whileInView="visible"
        >
          I&apos;m also the author of{" "}
          <Link
            className="font-medium text-primary hover:underline"
            href="https://zap-ts.alexandretrotel.org"
            target="_blank"
          >
            Zap.ts ⚡️
          </Link>{" "}
          – a Next.js boilerplate that helps <span className="italic">you</span>{" "}
          building applications as fast as a zap !
        </motion.p>

        <motion.div
          custom={3}
          initial="hidden"
          variants={paragraphVariants}
          viewport={{ once: true, amount: 0.3 }}
          whileInView="visible"
        >
          <Button
            asChild
            className="active:scale-95 active:bg-accent"
            variant="ghost"
          >
            <Link
              className="flex items-center gap-2 font-medium text-primary text-sm"
              href="/blog/the-story-of-my-life"
            >
              <ArrowRight size={16} />
              Read my story
            </Link>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
