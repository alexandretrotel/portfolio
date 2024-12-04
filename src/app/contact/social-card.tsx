import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface SocialCardProps {
  title: string;
  description: string;
  href: string;
  button: string;
  color?: string;
  icon?: React.ReactNode;
}

export default async function SocialCard({
  title,
  description,
  href,
  button,
  color,
  icon,
}: SocialCardProps) {
  return (
    <Card
      className={cn(
        "hover:border-primary hover:shadow",
        color,
        color && "border-transparent"
      )}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          {icon}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button asChild>
          <Link href={href} target="_blank">
            {button} <ArrowUpRight size={16} className="ml-1" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
