"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "@bprogress/next/app";

export default function NotFound() {
	const router = useRouter();

	return (
		<div className="flex h-full flex-col items-center justify-center gap-4 py-32">
			<div className="flex flex-col items-center justify-center">
				<p className="text-muted-foreground">This page doesn&apos;t exist.</p>
			</div>
			<Button
				variant={"ghost"}
				className="active:scale-90 active:bg-accent"
				onClick={() => router.back()}
			>
				Go back
			</Button>
		</div>
	);
}
