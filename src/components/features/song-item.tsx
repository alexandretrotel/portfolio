import { cn } from "@/lib/utils";
import { Song } from "@/types/songs";
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
import { Info } from "lucide-react";
import { Separator } from "../ui/separator";
import SongItemAnimation from "./song-item-animation";

const songsBasePath = "/songs";

interface SongItemProps extends Song {
  heightFull?: boolean;
  delay?: number;
}

export async function SongItem({
  slug,
  title,
  description,
  authors,
  featured,
  status,
  cover,
  date,
  styles,
  heightFull,
  delay = 0,
}: SongItemProps) {
  return (
    <Card
      className={cn(
        "flex flex-col justify-between overflow-hidden",
        heightFull && "h-full",
      )}
    >
      <div>
        {cover && (
          <div className="h-48 w-full border-b">
            <SongItemAnimation delay={delay}>
              <Image
                src={cover}
                alt={title}
                layout="fill"
                objectFit="cover"
                className="h-full w-full"
              />
            </SongItemAnimation>
          </div>
        )}

        <CardHeader className="w-full">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <CardTitle>{title}</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                {featured && <Badge>Featured</Badge>}
                <Badge
                  variant="outline"
                  className={cn(
                    status === "Finished"
                      ? "bg-green-500 hover:bg-green-500/80"
                      : status === "WIP"
                        ? "bg-yellow-500 hover:bg-yellow-500/80"
                        : "bg-gray-500 hover:bg-gray-500/80",
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
        <CardContent className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </div>

      <CardFooter className="flex w-full flex-col items-start gap-4 px-0">
        <div className="px-6">
          <Button size="sm" asChild>
            <Link href={`${songsBasePath}/${slug}`}>
              <Info className="h-4 w-4" />
              Learn more
            </Link>
          </Button>
        </div>

        <Separator className="my-2" />

        <div className="flex flex-wrap gap-2 px-6">
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
