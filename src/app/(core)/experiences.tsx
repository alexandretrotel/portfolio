"use client";
import "client-only";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ArrowUpRight, ChevronsUpDown } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { experiences } from "@/data/experiences";
import { Position } from "@/types/experiences";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { features } from "@/data/features";

export default function Experiences() {
  return (
    <motion.div
      className="mx-auto w-full"
      layoutId="about"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
    >
      <Collapsible className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-left">Work Experience</h1>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>

        {!experiences?.[0]?.disabled && (
          <ExperiencesItem {...experiences[0]} key={0} />
        )}
        <CollapsibleContent>
          <div className="flex flex-col gap-4">
            {experiences?.slice(1)?.map((item, index) => {
              if (item?.disabled) return null;

              return <ExperiencesItem key={index} {...item} />;
            })}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </motion.div>
  );
}

interface WorkExperienceItemProps {
  company: string;
  positions: Position[];
  url?: string;
  image?: string;
  readMore?: string;
}

const ExperiencesItem = ({
  company,
  positions,
  url,
  image,
  readMore,
}: WorkExperienceItemProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            {image && (
              <Image
                src={image}
                width={24}
                height={24}
                alt={company}
                className="rounded-md"
              />
            )}
            <CardTitle>{company}</CardTitle>
          </div>
          {url && (
            <Link
              href={url}
              target="_blank"
              className="hover:translate-x-1 hover:-translate-y-1 hover:scale-110 duration-200"
            >
              <ArrowUpRight size={16} />
            </Link>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="flex flex-col gap-4">
          {positions.map((pos, idx) => (
            <div key={idx} className="mb-2 flex flex-col gap-2">
              <div>
                <p className="text-sm font-medium">{pos.title}</p>
                <p className="text-xs text-muted-foreground">{pos.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      {features.canSeeExperienceReadMore && (
        <CardFooter>
          {readMore && (
            <Button size="sm" className="w-fit" asChild>
              <Link href={readMore} passHref>
                Read More
              </Link>
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  </motion.div>
);
