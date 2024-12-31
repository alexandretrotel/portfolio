import { cn } from "@/lib/utils";
import { Song } from "@/types/about/songs";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import Link from "next/link";
import { Play } from "lucide-react";

const songsBasePath = "/songs";

interface SongItemProps extends Song {
  heightFull?: boolean;
}

export function SongItem({
  slug,
  title,
  authors,
  status,
  cover,
  date,
  styles,
  heightFull,
}: SongItemProps) {
  return (
    <Card className={cn("overflow-hidden", heightFull && "h-full")}>
      {cover && (
        <div className="relative h-48 w-full border-b">
          <Image
            src={cover}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="h-full w-full"
          />
        </div>
      )}
      <CardHeader className="w-full">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <CardTitle>{title}</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className={cn(
                  status === "Finished"
                    ? "bg-green-500 hover:bg-green-500/80"
                    : status === "WIP"
                      ? "bg-yellow-500 hover:bg-yellow-500/80"
                      : "bg-red-500 hover:bg-red-500/80",
                  "border-transparent text-white",
                )}
              >
                {status}
              </Badge>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              {authors?.map((author) => (
                <span
                  key={author}
                  className="text-sm font-semibold text-muted-foreground"
                >
                  {author}
                </span>
              ))}
            </div>

            <span className="text-xs text-muted-foreground">
              {date?.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Button size="sm" asChild>
              <Link href={`${songsBasePath}/${slug}`}>
                <Play size={16} />
                Listen now
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t py-4">
        <div className="flex flex-wrap gap-2">
          {styles?.map((style) => (
            <Badge
              key={style}
              className="bg-foreground text-background hover:bg-foreground/80"
            >
              {style}
            </Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
