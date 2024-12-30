"use client";
import "client-only";

import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { books, INITIAL_NUMBER_OF_BOOKS } from "@/data/about/books";
import Link from "next/link";
import { Tag, Tags } from "@/types/about/books";
import { Badge } from "@/components/ui/badge";
import { useMemo, useState } from "react";

export default function Books() {
  return <StaticBooksContent />;
}

function StaticBooksContent() {
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
  const [showMore, setShowMore] = useState(false);

  const filteredBooks = useMemo(() => {
    return books?.filter((item) => {
      if (selectedTag === null) return true;
      return item?.tags?.includes(selectedTag);
    });
  }, [selectedTag]);

  const visibleBooks = showMore
    ? filteredBooks
    : filteredBooks?.slice(0, INITIAL_NUMBER_OF_BOOKS);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-left">
          Read the books that shaped my thinking
        </h1>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge
          className="cursor-pointer"
          variant={selectedTag === null ? "default" : "outline"}
          onClick={() => setSelectedTag(null)}
        >
          All
        </Badge>

        {books
          ?.reduce<Tags>((acc, item) => {
            if (item?.tags) {
              item.tags.forEach((tag) => {
                if (!acc.includes(tag)) acc.push(tag);
              });
            }
            return acc;
          }, [])
          .map((tag) => {
            return (
              <Badge
                key={tag}
                className="cursor-pointer"
                variant={selectedTag === tag ? "default" : "outline"}
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </Badge>
            );
          })}
      </div>

      <div className="flex flex-col gap-4">
        {visibleBooks?.map((item, index) => {
          if (item?.disabled) return null;
          return <BookItem key={index} {...item} />;
        })}
      </div>

      {filteredBooks.length > INITIAL_NUMBER_OF_BOOKS && (
        <div className="flex justify-center mt-4">
          <Button variant="ghost" onClick={() => setShowMore(!showMore)}>
            {showMore ? "See Less" : "See More"}
          </Button>
        </div>
      )}
    </div>
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
