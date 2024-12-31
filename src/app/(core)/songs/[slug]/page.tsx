import { notFound } from "next/navigation";
import Image from "next/image";
import { getSongBySlug } from "@/utils/getSongBySlug";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import Animation from "@/components/core/animation";
import { AudioPlayer } from "@/components/features/audio-player";

const COVER_SIZE = 400;

interface SongProps {
  params: Promise<{ slug: string }>;
}

export default async function Song({ params }: SongProps) {
  const { slug } = await params;

  const song = getSongBySlug(slug);

  if (!song) {
    notFound();
  }

  return (
    <Animation>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-8 md:flex-row">
          {song.cover && (
            <div className="flex h-fit">
              <Image
                src={song.cover}
                alt={song.title}
                width={COVER_SIZE}
                height={COVER_SIZE}
                className="rounded-lg shadow-lg"
              />
            </div>
          )}

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-sm text-primary">
                  {song.date.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <h1 className="text-2xl font-bold">{song.title}</h1>
                <p className="text-sm text-muted-foreground">
                  by {song.authors.join(", ")}
                </p>
              </div>

              <p className="text-sm text-muted-foreground">
                {song.description}
              </p>

              {song.links && song.links.length > 0 && (
                <div>
                  {song.links.length > 1 ? (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline">
                          Listen on your favorite platform{" "}
                          <ExternalLink className="ml-1 h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="bg-card">
                        <div className="grid gap-4">
                          <h4 className="font-medium leading-none">
                            Platforms
                          </h4>
                          <div className="grid gap-2">
                            {song.links.map((link, index) => (
                              <Button key={index} variant="outline" asChild>
                                <Link
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-between text-sm"
                                >
                                  <div className="flex items-center gap-2">
                                    {link.icon}
                                    {link.platform}
                                  </div>
                                  <ArrowUpRight className="h-4 w-4" />
                                </Link>
                              </Button>
                            ))}
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  ) : (
                    <Button variant="outline" asChild>
                      <Link
                        href={song.links[0].url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Listen on {song.links[0].platform}{" "}
                        <ExternalLink className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </div>
              )}
            </div>

            {song.styles && song.styles.length > 0 && (
              <div className="flex flex-col gap-2">
                <h4 className="text-sm font-medium">
                  Style{song.styles.length > 1 && "s"}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {song.styles.map((style, index) => (
                    <Badge key={index}>{style}</Badge>
                  ))}
                </div>
              </div>
            )}

            {song.labels && song.labels.length > 0 && (
              <div className="flex flex-col gap-2">
                <h4 className="text-sm font-medium">
                  Record label{song.labels.length > 1 && "s"}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {song.labels.map((item, index) => (
                    <Link key={index} href={item.url} target="_blank">
                      <Badge>
                        {item.name} <ArrowUpRight className="ml-1 h-4 w-4" />
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {song.assets && song.assets.length > 0 && (
          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-medium">
              Asset{song.assets.length > 1 && "s"}
            </h4>
            <div className="grid gap-4">
              {song.assets.map((asset, index) => (
                <AudioPlayer key={index} asset={asset} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Animation>
  );
}
