import "./globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { METADATA } from "@/data/metadata";
import Header from "@/components/header";
import { Providers } from "@/providers/providers";

const font = Geist({
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: METADATA.TITLE,
	description: METADATA.DESCRIPTION,
	openGraph: {
		type: "website",
		locale: "en_US",
		url: METADATA.BASE_URL,
		title: METADATA.TITLE,
		description: METADATA.DESCRIPTION,
	},
	twitter: {
		title: METADATA.TITLE,
		description: METADATA.DESCRIPTION,
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${font.className} antialiased`}>
				<Providers>
					<div className="bg-background min-h-screen px-6">
						<Header />
						<main className="mx-auto min-h-[calc(100vh-4rem)] max-w-3xl md:py-18 py-12">
							{children}
						</main>
					</div>
				</Providers>
			</body>
		</html>
	);
}
