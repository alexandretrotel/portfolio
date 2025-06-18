import { Position } from "@/types/home/experiences";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface ExperienceItemProps {
  company: string;
  positions: Position[];
  url?: string;
  image?: string;
}

export const ExperienceItem = async ({
  company,
  positions,
  url,
  image,
}: ExperienceItemProps) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center justify-between gap-4">
      <div className="inline-flex items-center gap-2">
        {image && (
          <Image
            src={image}
            width={24}
            height={24}
            alt={company}
            className="rounded-md"
          />
        )}
        <h2 className="font-bold">{company}</h2>
        {url && (
          <Link
            href={url}
            target="_blank"
            className="duration-200 hover:translate-x-0.5 hover:-translate-y-0.5 hover:scale-110"
          >
            <ArrowUpRight size={16} />
          </Link>
        )}
      </div>
      <p className="text-muted-foreground text-xs whitespace-nowrap">
        {positions?.[0].date}
      </p>
    </div>

    <div className="flex flex-col gap-4">
      {positions.map((pos, idx) => (
        <div key={idx} className="flex flex-col gap-4">
          <div>
            <p className="text-sm font-semibold">{pos.title}</p>
            <p className="text-muted-foreground text-xs">{pos.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
