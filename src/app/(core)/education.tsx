import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { education } from "@/data/education";

export default async function Education() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-left">Education</h1>
      </div>

      <div className="flex flex-col gap-6">
        {!education?.[0]?.disabled && <EducationItem {...education[0]} />}

        {education?.slice(1)?.map((item, index) => {
          if (item?.disabled) return null;

          return <EducationItem key={index} {...item} />;
        })}
      </div>
    </div>
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
  <div className="flex flex-col gap-2">
    <div className="flex items-center gap-4 justify-between">
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
        <h2 className="text-sm font-semibold">{school}</h2>
        {url && (
          <Link
            href={url}
            target="_blank"
            className="hover:translate-x-0.5 hover:-translate-y-0.5 hover:scale-110 duration-200"
          >
            <ArrowUpRight size={16} />
          </Link>
        )}
      </div>
      <p className="text-xs text-muted-foreground whitespace-nowrap">{date}</p>
    </div>

    <p className="text-sm font-medium text-muted-foreground">{topic}</p>
  </div>
);
