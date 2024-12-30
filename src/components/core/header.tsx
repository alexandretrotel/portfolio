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
import { motion, AnimatePresence } from "motion/react";
import { links } from "@/data/header";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border">
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
                      <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-semibold transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
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

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 top-14 border-b border-border/40 bg-background shadow-sm backdrop-blur dark:border-border md:hidden"
          >
            <nav className="mx-auto flex max-w-5xl flex-col items-start px-4 py-4">
              {links?.map((component) => {
                if (component.disabled) {
                  return null;
                }

                return (
                  <Link
                    key={component.title}
                    href={component.href}
                    className="w-full rounded-md px-2 py-3 text-left text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {component.title}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
