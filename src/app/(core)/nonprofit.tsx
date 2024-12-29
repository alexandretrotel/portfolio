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
import { roles } from "@/data/nonprofit";
import { Position } from "@/types/experiences";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { features } from "@/data/features";

interface NonprofitProps {
  delay: number;
}

export default function Nonprofit({ delay }: NonprofitProps) {
  return (
    <motion.div
      className="w-full"
      layoutId="about"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Collapsible className="flex flex-col gap-4" defaultOpen={true}>
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-left">Nonprofit Roles</h1>
          {roles?.length > 1 && (
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                <ChevronsUpDown className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          )}
        </div>

        {!roles?.[0]?.disabled && <NonprofitItem {...roles[0]} />}

        <CollapsibleContent>
          <div className="flex flex-col gap-4">
            {roles?.slice(1)?.map((item, index) => {
              if (item?.disabled) return null;

              return <NonprofitItem key={index} {...item} />;
            })}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </motion.div>
  );
}

interface NonprofitItemProps {
  association: string;
  positions: Position[];
  url?: string;
  image?: string;
  readMore?: string;
}

const NonprofitItem = ({
  association,
  positions,
  url,
  image,
  readMore,
}: NonprofitItemProps) => (
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
                alt={association}
                className="rounded-md"
              />
            )}
            <CardTitle>{association}</CardTitle>
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
      {features.canSeeNonprofitReadMore && (
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
