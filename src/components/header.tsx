import Link from "next/link";
import Image from "next/image";
import { DarkModeToggle } from "@/components/ui/dark-mode-toggle";
import { getNumberOfPosts } from "@/lib/blog";
import { NavItem } from "@/components/nav-item";
import { HeaderAnimation } from "@/components/header-animation";

export const getLinks = async () => {
  return [
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
};

export default async function Header() {
  const links = await getLinks();

  return (
    <HeaderAnimation>
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between py-8">
        <Link
          href="/"
          className="flex items-center gap-4 transition-transform active:scale-90"
          passHref
        >
          <Image
            src="/logo.png"
            alt="Logo"
            width={32}
            height={32}
            className="rounded-md hover:opacity-80"
            priority
          />
        </Link>

        <div className="flex items-center gap-2">
          {links?.map((link, index) => (
            <NavItem key={link.href} link={link} index={index} />
          ))}

          <div className="transition-transform active:scale-90">
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </HeaderAnimation>
  );
}
