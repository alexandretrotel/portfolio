"use client";
import "client-only";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { education } from "@/data/education";

export default function Education() {
  return (
    <motion.div
      className="flex flex-col max-w-lg mx-auto gap-4 w-full"
      layoutId="about"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <h1 className="text-lg font-semibold">Education</h1>
      <div className="flex flex-col gap-4">
        {education.map((item, index) => {
          if (item?.disabled) return null;

          return <EducationItem key={index} {...item} />;
        })}
      </div>
    </motion.div>
  );
}

interface EducationItemProps {
  school: string;
  topic: string;
  date: string;
  url?: string;
  image?: string;
}

const EducationItem = ({
  school,
  topic,
  date,
  url,
  image,
}: EducationItemProps) => (
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
                alt={school}
                className="rounded-md"
              />
            )}
            <CardTitle>{school}</CardTitle>
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
      <CardContent>
        <p className="text-sm text-muted-foreground">{topic}</p>
        <p className="text-xs text-muted-foreground">{date}</p>
      </CardContent>
    </Card>
  </motion.div>
);
