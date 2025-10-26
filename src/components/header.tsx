import Image from "next/image";
import Link from "next/link";
import { HeaderAnimation } from "@/components/header-animation";
import { NavItem } from "@/components/nav-item";
import { DarkModeToggle } from "@/components/ui/dark-mode-toggle";
import { getNumberOfPosts } from "@/lib/blog";

export const getLinks = async () => [
  {
    title: "\\home",
    href: "/",
    hidden: true,
  },
  {
    title: "\\blog",
    href: "/blog",
    hidden: (await getNumberOfPosts()) === 0,
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
    <HeaderAnimation>
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
          {links?.map((link, index) => (
            <NavItem index={index} key={link.href} link={link} />
          ))}

          <div className="transition-transform active:scale-90">
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </HeaderAnimation>
  );
}
