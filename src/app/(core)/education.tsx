import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { education } from "@/data/education";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";

export default async function Education() {
  return (
    <Collapsible className="flex flex-col gap-4" defaultOpen={true}>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-left">Education</h1>
        {education?.length > 1 && (
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        )}
      </div>

      {!education?.[0]?.disabled && <EducationItem {...education[0]} />}

      <CollapsibleContent>
        <div className="flex flex-col gap-4">
          {education?.slice(1)?.map((item, index) => {
            if (item?.disabled) return null;

            return <EducationItem key={index} {...item} />;
          })}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

interface EducationItemProps {
  school: string;
  topic: string;
  date: string;
  url?: string;
  image?: string;
}

const EducationItem = ({
  school,
  topic,
  date,
  url,
  image,
}: EducationItemProps) => (
  <Card>
    <CardHeader>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          {image && (
            <Image
              src={image}
              width={24}
              height={24}
              alt={school}
              className="rounded-md"
            />
          )}
          <CardTitle>{school}</CardTitle>
        </div>
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
    </CardHeader>
    <CardContent>
      <p className="text-sm font-medium">{topic}</p>
      <p className="text-xs text-muted-foreground">{date}</p>
    </CardContent>
  </Card>
);
