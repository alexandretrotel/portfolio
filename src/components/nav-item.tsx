"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { cubicBezier, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemProps {
	link: {
		title: string;
		href: string;
		hidden: boolean;
		target?: string;
	};
	index: number;
}

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

export function NavItem({ link, index }: NavItemProps) {
	const pathname = usePathname();

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
					"transition-transform active:scale-90",
					isActive ? "dark:bg-accent/50 bg-accent" : "text-foreground/60",
				)}
				asChild
			>
				<Link
					href={link.href}
					target={link.target}
					className={"text-sm font-medium transition-colors"}
					aria-disabled={link.hidden}
				>
					{link.title}
				</Link>
			</Button>
		</motion.div>
	);
}
