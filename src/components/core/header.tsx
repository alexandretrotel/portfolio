"use client";
import "client-only";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DarkModeToggle } from "@/components/ui/dark-mode-toggle";
import { links } from "@/data/core/header";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-border/40 bg-background/95 supports-backdrop-filter:bg-background/60 dark:border-border sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-4" passHref>
          <Image
            src="/logo.png"
            alt="Logo"
            width={32}
            height={32}
            className="rounded-md hover:opacity-80"
          />
          <h1 className="block font-semibold md:hidden">Alexandre Trotel</h1>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center gap-6">
              {links?.map((component) => {
                if (component.disabled) {
                  return null;
                }

                return (
                  <NavigationMenuItem key={component.title}>
                    <Link href={component.href} legacyBehavior passHref>
                      <NavigationMenuLink className="group hover:bg-accent hover:text-accent-foreground data-active:bg-accent/50 data-[state=open]:bg-accent/50 inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50">
                        {component.title}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden md:flex">
          <DarkModeToggle />
        </div>

        <div className="flex items-center md:hidden">
          <DarkModeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-border/40 bg-background dark:border-border absolute inset-x-0 top-14 border-b shadow-sm backdrop-blur md:hidden">
          <nav className="mx-auto flex max-w-5xl flex-col items-start px-4 py-4">
            {links?.map((component) => {
              if (component.disabled) {
                return null;
              }

              return (
                <Link
                  key={component.title}
                  href={component.href}
                  className="hover:bg-accent hover:text-accent-foreground w-full rounded-md px-2 py-3 text-left text-sm font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {component.title}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
