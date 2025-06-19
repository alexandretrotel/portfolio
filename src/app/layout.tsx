import "./globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";

const font = Geist({
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	subsets: ["latin"],
});
const fontMono = Geist_Mono({
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Alexandre Trotel | Official Website",
	description:
		"Alexandre Trotel is a tech entrepreneur and full-stack developer with expertise in blockchain, web development, and innovation.",
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://www.alexandretrotel.org",
		title: "Alexandre Trotel | Official Website",
		description:
			"Alexandre Trotel is a tech entrepreneur and full-stack developer with expertise in blockchain, web development, and innovation.",
	},
	twitter: {
		title: "Alexandre Trotel | Official Website",
		description:
			"Alexandre Trotel is a tech entrepreneur and full-stack developer with expertise in blockchain, web development, and innovation.",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${font.className} ${fontMono.className} antialiased`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
