import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { DarkModeToggle } from "@/components/ui/dark-mode-toggle";
import Image from "next/image";
import { cn } from "@/lib/utils";

const components: { title: string; href: string }[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

export default async function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border">
      <div className="flex h-14 items-center justify-center px-4 max-w-5xl mx-auto">
        <div className="flex items-center justify-between w-full gap-4">
          <Link href="/" passHref>
            <Image
              src="/letter.png"
              alt="Logo"
              width={32}
              height={32}
              className="rounded-md hover:opacity-80"
            />
          </Link>
          <NavigationMenu>
            <NavigationMenuList className="flex items-center md:gap-6">
              {components.map((component) => (
                <NavigationMenuItem key={component.title}>
                  <Link href={component.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent"
                      )}
                    >
                      {component.title}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
}
