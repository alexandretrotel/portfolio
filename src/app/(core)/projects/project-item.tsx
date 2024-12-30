import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { features } from "@/data/features";
import { cn } from "@/lib/utils";
import { Project } from "@/types/projects";
import { ArrowUpRight, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProjectItemProps extends Project {
  showPreview?: boolean;
}

export function ProjectItem({
  title,
  description,
  date,
  dateCompleted,
  url,
  preview,
  tags,
  status,
  featured,
  showPreview,
  icon,
  links,
}: ProjectItemProps) {
  return (
    <Card className="overflow-hidden">
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
                    className="duration-200 hover:-translate-y-0.5 hover:translate-x-0.5 hover:scale-110"
                  >
                    <ArrowUpRight size={16} />
                  </Link>
                )}
              </div>
              <div className="flex items-center gap-2">
                {featured && <Badge className="text-xs">Featured</Badge>}
                <Badge
                  variant="outline"
                  className={cn(
                    status === "Completed"
                      ? "bg-green-500 hover:bg-green-500/80"
                      : "bg-yellow-500 hover:bg-yellow-500/80",
                    "border-transparent text-white",
                  )}
                >
                  {status}
                </Badge>
              </div>
            </div>
            <CardDescription className="text-sm">
              {date.toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}{" "}
              -{" "}
              {dateCompleted
                ? dateCompleted.toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })
                : "Present"}
            </CardDescription>
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
                  <Link href={url}>
                    <Info size={16} />
                    Learn more
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
