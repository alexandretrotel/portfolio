"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import "client-only";
import { ArrowUpRight } from "lucide-react";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

const education = [
  {
    title: "Georgia Institute of Technology",
    subtitle: "Electrical and Computer Engineering",
    date: "2025 - Present",
    url: "https://www.gatech.edu/",
    image: "/education/georgia-tech.jpeg",
  },
  {
    title: "ENSEEIHT",
    subtitle: "Computer Science (IBDIOT)",
    date: "2022 - 2025",
    url: "https://www.enseeiht.fr/",
    image: "/education/enseeiht.jpeg",
  },
  {
    title: "Lycée Chateaubriand",
    subtitle: "PCSI - PSI*",
    date: "2020 - 2022",
    url: "https://www.lycee-chateaubriand.fr/",
    image: "/education/chateaubriand.jpeg",
  },
  {
    title: "Lycée Saint-Joseph",
    subtitle: "Scientific Baccalaureate",
    date: "2016 - 2020",
    url: "https://www.lycee-saintjoseph-lamballe.net/",
    image: "",
    disabled: true,
  },
];

export default function Education() {
  return (
    <motion.div
      className="flex flex-col max-w-lg mx-auto gap-4 w-full"
      layoutId="about"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
    >
      <h1 className="text-lg font-semibold">Education</h1>
      <div className="flex flex-col gap-4">
        {education.map((item, index) => {
          if (item.disabled) return null;

          return <EducationItem key={index} {...item} />;
        })}
      </div>
    </motion.div>
  );
}

interface EducationItemProps {
  title: string;
  subtitle: string;
  date: string;
  url?: string;
  image?: string;
}

const EducationItem = ({
  title,
  subtitle,
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
      <CardContent>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
        <p className="text-xs text-muted-foreground">{date}</p>
      </CardContent>
    </Card>
  </motion.div>
);
