"use client";
import "client-only";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { experiences } from "@/data/experiences";

const readMoreBaseURL = "/experiences";

export default function Experiences() {
  return (
    <motion.div
      className="flex flex-col max-w-lg mx-auto gap-4 w-full"
      layoutId="about"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
    >
      <h1 className="text-lg font-semibold">Work Experience</h1>
      <div className="flex flex-col gap-4">
        {experiences.map((item, index) => {
          if (item?.disabled) return null;

          return <ExperiencesItem key={index} {...item} />;
        })}
      </div>
    </motion.div>
  );
}

interface WorkExperienceItemProps {
  title: string;
  subtitle: string;
  date: string;
  url?: string;
  image?: string;
  readMore?: string;
}

const ExperiencesItem = ({
  title,
  subtitle,
  date,
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
                alt={title}
                className="rounded-md"
              />
            )}
            <CardTitle>{title}</CardTitle>
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
        <p className="text-sm text-muted-foreground">{subtitle}</p>
        <p className="text-xs text-muted-foreground">{date}</p>
      </CardContent>
      {readMore && (
        <CardFooter>
          <Button size="sm" asChild>
            <Link href={`${readMoreBaseURL}${readMore}`} passHref>
              Read More
            </Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  </motion.div>
);
