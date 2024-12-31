import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface InvestmentItemProps {
  asset: string;
  description: string;
  date: string;
  url?: string;
  image?: string;
}

export const InvestmentItem = ({
  asset,
  description,
  date,
  url,
  image,
}: InvestmentItemProps) => (
  <Card>
    <CardHeader className="w-full">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {image && (
              <Image
                src={image}
                width={24}
                height={24}
                alt={asset}
                className="rounded-md"
              />
            )}
            <CardTitle>{asset}</CardTitle>
          </div>
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
        <CardDescription>{description}</CardDescription>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-xs text-muted-foreground">{date}</p>
    </CardContent>
  </Card>
);
