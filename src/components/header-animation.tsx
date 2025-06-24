"use client";

import { cubicBezier, motion } from "motion/react";

interface HeaderAnimationProps {
	children: React.ReactNode;
}

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

export function HeaderAnimation({ children }: HeaderAnimationProps) {
	return (
		<motion.header
			className="border-border/40 bg-background/95 supports-backdrop-filter:bg-background/60 top-0 z-50 h-16 w-full backdrop-blur"
			variants={headerVariants}
			initial="hidden"
			animate="visible"
		>
			{children}
		</motion.header>
	);
}
