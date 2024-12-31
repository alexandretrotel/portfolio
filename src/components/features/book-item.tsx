import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Tags } from "@/types/about/books";

interface BookItemProps {
  title: string;
  description: string;
  url?: string;
  disabled?: boolean;
  tags?: Tags;
}

export function BookItem({ title, description, url, tags }: BookItemProps) {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader className="col-span-3">
        <div className="flex items-center justify-between gap-4">
          <CardTitle>{title}</CardTitle>
          {url && (
            <Link
              href={url}
              target="_blank"
              className="duration-200 hover:-translate-y-0.5 hover:translate-x-0.5 hover:scale-110"
            >
              <ArrowUpRight size={16} />
            </Link>
          )}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-wrap items-center gap-2">
        {tags?.map((tag) => {
          return <Badge key={tag}>{tag}</Badge>;
        })}
      </CardFooter>
    </Card>
  );
}
