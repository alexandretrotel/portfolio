import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { experiences } from "@/data/experiences";
import { Position } from "@/types/experiences";

export default async function Experiences() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-left text-lg font-bold">Work experience</h1>

      <div className="flex flex-col gap-6">
        {!experiences?.[0]?.disabled && <ExperiencesItem {...experiences[0]} />}

        {experiences?.slice(1)?.map((item, index) => {
          if (item?.disabled) return null;

          return <ExperiencesItem key={index} {...item} />;
        })}
      </div>
    </div>
  );
}

interface WorkExperienceItemProps {
  company: string;
  positions: Position[];
  url?: string;
  image?: string;
}

const ExperiencesItem = async ({
  company,
  positions,
  url,
  image,
}: WorkExperienceItemProps) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
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
            className="duration-200 hover:-translate-y-0.5 hover:translate-x-0.5 hover:scale-110"
          >
            <ArrowUpRight size={16} />
          </Link>
        )}
      </div>
      <p className="whitespace-nowrap text-xs text-muted-foreground">
        {positions?.[0].date}
      </p>
    </div>

    <div className="flex flex-col gap-4">
      {positions.map((pos, idx) => (
        <div key={idx} className="flex flex-col gap-4">
          <div>
            <p className="text-sm font-semibold">{pos.title}</p>
            <p className="text-xs text-muted-foreground">{pos.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
