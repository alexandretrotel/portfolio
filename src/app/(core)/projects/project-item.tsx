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
      <div className="flex flex-col justify-between w-full h-full">
        <div className="flex flex-col gap-2 w-full">
          {showPreview && preview && (
            <div className="relative w-full h-48 border-b">
              {preview?.type === "image" ? (
                <Image
                  src={preview?.asset}
                  alt={title}
                  layout="fill"
                  objectFit="cover"
                  className="w-full h-full"
                />
              ) : (
                <video
                  src={preview?.asset}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          )}
          <CardHeader>
            <div className="flex items-center gap-4 justify-between w-full">
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
                    className="hover:translate-x-0.5 hover:-translate-y-0.5 hover:scale-110 duration-200"
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
                    "border-transparent text-white"
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
              - {dateCompleted ? dateCompleted.toDateString() : "Present"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{description}</p>
          </CardContent>
        </div>
        <CardFooter className="w-full">
          <div className="flex flex-col gap-2 w-full">
            {features.canSeeProjectsReadMore && url && (
              <Button asChild size="sm" className="w-fit">
                <Link href={url}>
                  <Info size={16} />
                  Learn more
                </Link>
              </Button>
            )}

            <Separator className="my-2 w-full" />

            <div className="flex flex-wrap gap-2">
              {tags
                ?.sort((a, b) => a.localeCompare(b))
                ?.map((tag) => (
                  <Badge key={tag} variant="secondary">
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
