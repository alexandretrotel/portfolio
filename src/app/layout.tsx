import "./globals.css";

import type { Metadata } from "next";
import Header from "@/components/header";
import { METADATA } from "@/data/metadata";
import { font } from "@/lib/fonts";
import { Providers } from "@/providers/providers";

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

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>
        <Providers>
          <div className="min-h-screen bg-background px-6">
            <Header />
            <main className="mx-auto min-h-[calc(100vh-4rem)] max-w-3xl py-12 md:py-18">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
