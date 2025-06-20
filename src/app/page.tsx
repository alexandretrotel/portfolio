"use client";

import Link from "next/link";
import { cubicBezier, motion } from "motion/react";

export default function Home() {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				duration: 0.6,
				ease: cubicBezier(0.4, 0, 0.2, 1),
			},
		},
	};

	const paragraphVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: (i: number) => ({
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
				ease: cubicBezier(0.4, 0, 0.2, 1),
				delay: i * 0.2,
			},
		}),
	};

	return (
		<motion.div
			variants={containerVariants}
			initial="hidden"
			animate="visible"
			className="flex flex-col h-full gap-16"
		>
			<div className="flex w-full max-w-xl gap-6 flex-col text-muted-foreground font-light">
				<motion.p
					variants={paragraphVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.3 }}
					custom={0}
				>
					I&apos;m{" "}
					<span className="text-foreground font-medium">Alexandre Trotel</span>,
					a<span className="italic"> tech entrepreneur</span> and{" "}
					<span className="italic">full stack developer</span> with interests in{" "}
					<span className="italic">web development</span>,{" "}
					<span className="italic">machine learning</span>, and{" "}
					<span className="italic">open source</span>.
				</motion.p>

				<motion.p
					variants={paragraphVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.3 }}
					custom={1}
				>
					Currently working as a{" "}
					<span className="italic">Consultant-Développeur®</span> at{" "}
					<Link
						href="https://www.allohouston.fr"
						className="text-primary font-medium hover:underline"
						target="_blank"
					>
						<span className="italic">ALLO</span>
						<span className="font-semibold">HOUSTON</span>
					</Link>
					, where I help clients build high-quality web applications{" "}
					<span className="italic">tailored to their needs</span>.
				</motion.p>

				<motion.p
					variants={paragraphVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.3 }}
					custom={2}
				>
					I&apos;m also the author of{" "}
					<Link
						href="https://zap-ts.alexandretrotel.org"
						className="text-primary font-medium hover:underline"
						target="_blank"
					>
						Zap.ts ⚡️
					</Link>
					, a Next.js boilerplate that helps <span className="italic">you</span>{" "}
					<span className="italic">building applications as fast as a zap</span>
					!
				</motion.p>
			</div>
		</motion.div>
	);
}
