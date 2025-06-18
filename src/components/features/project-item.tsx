import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { features } from "@/data/features";
import { cn } from "@/lib/utils";
import { Project } from "@/types/projects/projects";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProjectItemProps extends Project {
  showPreview?: boolean;
  heightFull?: boolean;
  count: number;
}

export async function ProjectItem({
  slug,
  title,
  description,
  url,
  preview,
  tags,
  featured,
  showPreview,
  icon,
  links,
  heightFull,
  count,
}: ProjectItemProps) {
  const formattedCount = new Intl.NumberFormat("en-US").format(count);

  return (
    <Card className={cn("overflow-hidden", heightFull && "h-full")}>
      <div className="flex h-full w-full flex-col justify-between">
        <div className="flex w-full flex-col gap-2">
          {showPreview && preview && (
            <div className="relative h-48 w-full border-b">
              {preview?.type === "image" ? (
                <Image
                  src={preview?.asset}
                  alt={title}
                  layout="fill"
                  objectFit="cover"
                  className="h-full w-full"
                />
              ) : (
                <video
                  src={preview?.asset}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          )}
          <CardHeader>
            <div className="flex w-full items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {icon && (
                  <Image
                    src={icon}
                    alt={title}
                    width={24}
                    height={24}
                    className="rounded-md"
                  />
                )}
                <CardTitle>{title}</CardTitle>
                {links && links?.length > 0 && (
                  <Link
                    href={links?.[0].url}
                    target="_blank"
                    className="duration-200 hover:translate-x-0.5 hover:-translate-y-0.5 hover:scale-110"
                  >
                    <ArrowUpRight size={16} />
                  </Link>
                )}
              </div>

              <div className="flex items-center gap-2">
                {featured && <Badge className="text-xs">Featured</Badge>}
                {features.enableProjectStatus && (
                  <Badge
                    variant="outline"
                    className={cn(
                      status === "Completed"
                        ? "bg-green-500 hover:bg-green-500/80"
                        : status === "WIP"
                          ? "bg-yellow-500 hover:bg-yellow-500/80"
                          : status === "Paused"
                            ? "bg-blue-500 hover:bg-blue-500/80"
                            : "bg-red-500 hover:bg-red-500/80",
                      "border-transparent text-white",
                    )}
                  >
                    {status}
                  </Badge>
                )}
              </div>
            </div>
            {formattedCount && (
              <p className="text-muted-foreground text-xs">
                {formattedCount} view{Number(count) > 1 ? "s" : ""}
              </p>
            )}
          </CardHeader>
          <CardContent>
            <p className="text-sm">{description}</p>
          </CardContent>
        </div>
        <CardFooter className="w-full px-0">
          <div className="flex w-full flex-col gap-2">
            <div className="px-6">
              {features.canSeeProjectsReadMore && url && (
                <Button asChild size="sm" className="w-fit">
                  <Link href={`/projects/${slug}`}>
                    Learn more
                    <ArrowRight size={16} />
                  </Link>
                </Button>
              )}
            </div>

            <Separator className="my-3 w-full" />

            <div className="flex flex-wrap gap-2 px-6">
              {tags
                ?.sort((a, b) => a.localeCompare(b))
                ?.map((tag) => (
                  <Badge
                    key={tag}
                    className="bg-foreground text-background hover:bg-foreground/80"
                  >
                    {tag}
                  </Badge>
                ))}
            </div>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}
