"use client";
import "client-only";

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@radix-ui/react-collapsible";
import { ArrowUpRight, ChevronsUpDown } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { books } from "@/data/books";
import Link from "next/link";
import { Tags } from "@/types/books";
import { Badge } from "@/components/ui/badge";

interface BooksProps {
  delay: number;
}

export default function Books({ delay }: BooksProps) {
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
          <h1 className="text-lg font-semibold text-left">
            Books I&apos;ve Read
          </h1>
          {books?.length > 2 && (
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                <ChevronsUpDown className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          )}
        </div>

        {!books?.[0]?.disabled && <BookItem {...books[0]} />}

        <CollapsibleContent>
          <div className="flex flex-col gap-4">
            {books?.slice(1)?.map((item, index) => {
              if (item?.disabled) return null;

              return <BookItem key={index} {...item} />;
            })}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </motion.div>
  );
}

interface BookItemProps {
  title: string;
  description: string;
  url?: string;
  disabled?: boolean;
  tags?: Tags;
}

function BookItem({ title, description, url, tags }: BookItemProps) {
  return (
    <Card>
      <CardHeader className="col-span-3">
        <div className="flex items-center justify-between gap-4">
          <CardTitle>{title}</CardTitle>
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
      </CardHeader>
      <CardFooter className="flex flex-wrap gap-2 items-center">
        {tags?.map((tag) => {
          return <Badge key={tag}>{tag}</Badge>;
        })}
      </CardFooter>
    </Card>
  );
}
