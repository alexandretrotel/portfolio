"use client";
import "client-only";

import { Badge } from "@/components/ui/badge";
import { skills } from "@/data/skills";
import { ArrowUpRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "motion/react";
import Link from "next/link";

interface SkillsProps {
  delay: number;
}

export default function Skills({ delay }: SkillsProps) {
  return (
    <motion.div
      className="flex flex-col"
      layoutId="skills"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <h1 className="text-lg font-semibold">Skills</h1>
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">
          I&apos;ve worked with a variety of technologies and tools. Here are
          some of the skills I&apos;ve picked up along the way in a
          non-exhaustive list.
        </p>
        <Accordion type="single" collapsible className="space-y-4">
          {skills
            ?.sort((a, b) => a.category.localeCompare(b.category))
            ?.map((group, groupIndex) => (
              <AccordionItem key={groupIndex} value={group.category}>
                <AccordionTrigger className="text-lg font-semibold py-2">
                  {group.category}
                </AccordionTrigger>
                <AccordionContent className="pb-2">
                  <div className="flex flex-wrap gap-2">
                    {group?.skills
                      ?.sort((a, b) => a.skill.localeCompare(b.skill))
                      ?.map((item, itemIndex) =>
                        item?.url ? (
                          <Link key={itemIndex} href={item.url} target="_blank">
                            <Badge className="cursor-pointer flex items-center">
                              {item.skill}
                              <ArrowUpRight size={16} className="ml-1" />
                            </Badge>
                          </Link>
                        ) : (
                          <Badge key={itemIndex}>{item.skill}</Badge>
                        )
                      )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
      </div>
    </motion.div>
  );
}
