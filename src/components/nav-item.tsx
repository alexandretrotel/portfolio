"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { NavItemLink } from "@/types/nav";

type NavItemProps = {
  link: NavItemLink;
};

export function NavItem({ link }: NavItemProps) {
  const pathname = usePathname();

  if (link.hidden) {
    return null;
  }

  const isActive = pathname.startsWith(link.href);

  return (
    <div key={link.href}>
      <Button
        asChild
        className={cn(
          "transition-transform active:scale-90",
          isActive ? "bg-accent dark:bg-accent/50" : "text-foreground/60"
        )}
        key={link.href}
        variant={"ghost"}
      >
        <Link
          aria-disabled={link.hidden}
          className={"font-medium text-sm transition-colors"}
          href={link.href}
          target={link.target}
        >
          {link.title}
        </Link>
      </Button>
    </div>
  );
}
