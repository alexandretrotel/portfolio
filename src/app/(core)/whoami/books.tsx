"use client";
import "client-only";

import { ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  books,
  BOOKS_TO_SHOW,
  INITIAL_NUMBER_OF_BOOKS,
} from "@/data/about/books";
import { Tag, Tags } from "@/types/about/books";
import { Badge } from "@/components/ui/badge";
import { useCallback, useMemo, useState } from "react";
import { BookItem } from "@/components/features/book-item";

export default function Books() {
  return <StaticBooksContent />;
}

function StaticBooksContent() {
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_NUMBER_OF_BOOKS);

  const filteredBooks = useMemo(() => {
    return books?.filter((item) => {
      if (selectedTag === null) return true;
      return item?.tags?.includes(selectedTag);
    });
  }, [selectedTag]);

  const visibleBooks = filteredBooks?.slice(0, visibleCount);

  const handleShowMore = useCallback(() => {
    setVisibleCount((prev) =>
      Math.min(prev + BOOKS_TO_SHOW, filteredBooks.length),
    );
  }, [filteredBooks.length]);

  const handleShowLess = useCallback(() => {
    setVisibleCount((prev) =>
      Math.max(prev - BOOKS_TO_SHOW, INITIAL_NUMBER_OF_BOOKS),
    );
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-left text-lg font-bold">
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
          ?.sort((a, b) => a.localeCompare(b))
          ?.map((tag) => {
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {visibleBooks?.map((item, index) => {
          if (item?.disabled) return null;
          return <BookItem key={index} {...item} />;
        })}
      </div>

      {filteredBooks.length > INITIAL_NUMBER_OF_BOOKS && (
        <div className="mt-4 flex justify-center gap-2">
          {visibleCount > INITIAL_NUMBER_OF_BOOKS && (
            <Button variant="ghost" onClick={handleShowLess}>
              Show Less
              <ArrowUp size={16} />
            </Button>
          )}
          {visibleCount < filteredBooks.length && (
            <Button variant="ghost" onClick={handleShowMore}>
              Show More
              <ArrowDown size={16} />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
