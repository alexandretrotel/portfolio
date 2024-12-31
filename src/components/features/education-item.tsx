import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface EducationItemProps {
  school: string;
  topic: string;
  date: string;
  url?: string;
  image?: string;
}

export const EducationItem = ({
  school,
  topic,
  date,
  url,
  image,
}: EducationItemProps) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center justify-between gap-4">
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
            className="duration-200 hover:-translate-y-0.5 hover:translate-x-0.5 hover:scale-110"
          >
            <ArrowUpRight size={16} />
          </Link>
        )}
      </div>
      <p className="whitespace-nowrap text-xs text-muted-foreground">{date}</p>
    </div>

    <p className="text-sm font-medium text-muted-foreground">{topic}</p>
  </div>
);
