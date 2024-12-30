"use client";
import "client-only";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { rules } from "@/data/about/my-culture";

import { motion } from "motion/react";

interface MyCultureProps {
  delay: number;
}

export default function MyCulture({ delay }: MyCultureProps) {
  return (
    <motion.div
      className="flex flex-col"
      layoutId="about"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex flex-col gap-4">
        <h1 className="text-lg font-semibold text-left">My Culture</h1>
        <Card>
          <CardHeader>
            <CardDescription>
              I describe below a set of values that I hold dear and that I
              believe are essential to a <strong>fulfilling life</strong> and{" "}
              <strong>maximizing my productivity</strong>.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-6">
              {rules
                ?.sort((a, b) => a.id - b.id)
                ?.map((rule) => (
                  <li key={rule?.id} className="flex items-start">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-semibold mr-4 flex-shrink-0">
                      {rule?.id}
                    </span>
                    <div>
                      <h3 className="font-semibold">{rule.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {rule.description}
                      </p>
                    </div>
                  </li>
                ))}
            </ol>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
