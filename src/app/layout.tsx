import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const font = Inter({
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
      <body className={`${font.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}

          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
