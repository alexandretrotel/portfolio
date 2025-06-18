import "../globals.css";

import Footer from "@/components/core/footer";
import Header from "@/components/core/header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-background min-h-screen">
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-12 md:py-24">{children}</main>
      <Footer />
    </div>
  );
}
