"use client";

import Link from "next/link";
import { cubicBezier, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				duration: 0.2,
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
				duration: 0.3,
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
			className="flex h-full flex-col gap-16"
		>
			<div className="text-muted-foreground flex w-full max-w-xl flex-col gap-6 font-light">
				<motion.p
					variants={paragraphVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.3 }}
					custom={0}
				>
					I&apos;m{" "}
					<span className="text-foreground font-medium">Alexandre Trotel</span>,
					a tech entrepreneur and full stack developer with interests in web
					development, machine learning, and open source.
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
					, where I help clients build high-quality web applications tailored to
					their needs.
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
					</Link>{" "}
					– a Next.js boilerplate that helps <span className="italic">you</span>{" "}
					building applications as fast as a zap !
				</motion.p>

				<motion.div
					variants={paragraphVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.3 }}
					custom={3}
				>
					<Button
						variant="ghost"
						className="active:scale-95 active:bg-accent"
						asChild
					>
						<Link
							href="/blog/the-story-of-my-life"
							className="text-primary text-sm flex items-center gap-2 font-medium"
						>
							<ArrowRight size={16} />
							Read my story
						</Link>
					</Button>
				</motion.div>
			</div>
		</motion.div>
	);
}
