import Image from "next/image";
import Link from "next/link";
import { DarkModeToggle } from "@/components/dark-mode-toggle";
import { NavItem } from "@/components/nav-item";
import { shouldShowBlog } from "@/lib/blog";
import type { LinkItem } from "@/types/nav";

export const getLinks: () => Promise<LinkItem[]> = async () => [
  {
    title: "\\home",
    href: "/",
    hidden: true,
  },
  {
    title: "\\blog",
    href: "/blog",
    hidden: await shouldShowBlog().then((show) => !show),
  },
  {
    title: "\\github",
    href: "https://www.github.com/alexandretrotel",
    hidden: false,
    target: "_blank",
  },
];

export default async function Header() {
  const links = await getLinks();

  return (
    <div className="top-0 z-50 h-16 w-full border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between py-8">
        <Link
          className="flex items-center gap-4 transition-transform active:scale-90"
          href="/"
          passHref
        >
          <Image
            alt="Logo"
            className="rounded-md hover:opacity-80"
            height={32}
            priority
            src="/logo.png"
            width={32}
          />
        </Link>

        <div className="flex items-center gap-2">
          {links.map((link) => (
            <NavItem key={link.href} link={link} />
          ))}

          <div className="transition-transform active:scale-90">
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
