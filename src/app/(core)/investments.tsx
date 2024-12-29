"use client";
import "client-only";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpRight, ChevronsUpDown } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { investments } from "@/data/investments";

interface InvestmentsProps {
  delay: number;
}

export default function Investments({ delay }: InvestmentsProps) {
  return (
    <motion.div
      className="w-full"
      layoutId="about"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Collapsible className="flex flex-col gap-4" defaultOpen={false}>
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-left">My Investments</h1>
          {investments?.length > 2 && (
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                <ChevronsUpDown className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {investments?.slice(0, 2)?.map((item, index) => {
            if (item?.disabled) return null;

            return <InvestmentItem key={index} {...item} />;
          })}
        </div>
        <CollapsibleContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {investments?.slice(2)?.map((item, index) => {
              if (item?.disabled) return null;

              return <InvestmentItem key={index} {...item} />;
            })}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </motion.div>
  );
}

interface InvestmentItemProps {
  asset: string;
  description: string;
  date: string;
  url?: string;
  image?: string;
}

const InvestmentItem = ({
  asset,
  description,
  date,
  url,
  image,
}: InvestmentItemProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <Card>
      <CardHeader className="w-full">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4 justify-between">
            <div className="flex items-center gap-2">
              {image && (
                <Image
                  src={image}
                  width={24}
                  height={24}
                  alt={asset}
                  className="rounded-md"
                />
              )}
              <CardTitle>{asset}</CardTitle>
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
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground">{date}</p>
      </CardContent>
    </Card>
  </motion.div>
);
