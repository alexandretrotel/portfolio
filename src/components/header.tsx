"use client";

import Link from "next/link";
import Image from "next/image";
import { DarkModeToggle } from "@/components/ui/dark-mode-toggle";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { cubicBezier, motion } from "motion/react";

export const links = [
	{
		title: "\\home",
		href: "/",
		hidden: true,
	},
	{
		title: "\\blog",
		href: "/blog",
		hidden: true,
	},
	{
		title: "\\github",
		href: "https://www.github.com/alexandretrotel",
		hidden: false,
		target: "_blank",
	},
];

const headerVariants = {
	hidden: { opacity: 0, y: -20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.6,
			ease: cubicBezier(0.4, 0.0, 0.2, 1.0),
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, scale: 0.9 },
	visible: (i: number) => ({
		opacity: 1,
		scale: 1,
		transition: {
			duration: 0.4,
			ease: cubicBezier(0.4, 0.0, 0.2, 1.0),
			delay: i * 0.1,
		},
	}),
};

export default function Header() {
	const pathname = usePathname();

	return (
		<motion.header
			className="border-border/40 bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full backdrop-blur h-16"
			variants={headerVariants}
			initial="hidden"
			animate="visible"
		>
			<div className="mx-auto flex h-14 max-w-3xl items-center justify-between py-8">
				<Link
					href="/"
					className="flex items-center gap-4 active:scale-90 transition-transform"
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
					{links.map((link, index) => {
						if (link.hidden) {
							return null;
						}

						const isActive = pathname.startsWith(link.href);

						return (
							<motion.div
								key={link.href}
								variants={itemVariants}
								initial="hidden"
								animate="visible"
								whileHover="hover"
								whileTap="tap"
								custom={index + 1}
							>
								<Button
									key={link.href}
									variant={"ghost"}
									className={cn(
										"active:scale-90 transition-transform",
										isActive
											? "dark:bg-accent/50 bg-accent"
											: "text-foreground/60",
									)}
									asChild
								>
									<Link
										href={link.href}
										target={link.target}
										className={"text-sm font-medium transition-colors"}
										aria-disabled={link.hidden}
									>
										{link.title}{" "}
										{link.target === "_blank" && (
											<ArrowUpRight className="inline h-4 w-4" />
										)}
									</Link>
								</Button>
							</motion.div>
						);
					})}

					<div className="active:scale-90 transition-transform">
						<DarkModeToggle />
					</div>
				</div>
			</div>
		</motion.header>
	);
}
