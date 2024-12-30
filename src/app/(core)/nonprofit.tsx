import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { roles } from "@/data/nonprofit";
import { Position } from "@/types/experiences";

export default async function Nonprofit() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg font-bold text-left">Nonprofit experience</h1>

      <div className="flex flex-col gap-6">
        {!roles?.[0]?.disabled && <NonprofitItem {...roles[0]} />}

        {roles?.slice(1)?.map((item, index) => {
          if (item?.disabled) return null;

          return <NonprofitItem key={index} {...item} />;
        })}
      </div>
    </div>
  );
}

interface NonprofitItemProps {
  association: string;
  positions: Position[];
  url?: string;
  image?: string;
}

const NonprofitItem = async ({
  association,
  positions,
  url,
  image,
}: NonprofitItemProps) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {image && (
          <Image
            src={image}
            width={24}
            height={24}
            alt={association}
            className="rounded-md"
          />
        )}
        <h2 className="font-bold">{association}</h2>
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
      <p className="text-xs text-muted-foreground">{positions?.[0]?.date}</p>
    </div>

    {positions.map((pos, idx) => (
      <div key={idx} className="flex flex-col gap-4">
        <div>
          <p className="text-sm font-semibold">{pos.title}</p>
          <p className="text-xs text-muted-foreground">{pos.description}</p>
        </div>
      </div>
    ))}
  </div>
);
