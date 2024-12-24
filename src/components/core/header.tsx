import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { DarkModeToggle } from "@/components/ui/dark-mode-toggle";
import Image from "next/image";

interface ComponentProps {
  title: string;
  href: string;
  disabled?: boolean;
}

const components: ComponentProps[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "Projects",
    href: "/projects",
    disabled: true,
  },
  {
    title: "Games",
    href: "/games",
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
              {components.map((component) => {
                if (component.disabled) {
                  return null;
                }

                return (
                  <NavigationMenuItem key={component.title}>
                    <Link href={component.href} legacyBehavior passHref>
                      <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 bg-transparent">
                        {component.title}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
}
