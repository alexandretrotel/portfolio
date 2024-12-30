import Footer from "@/components/core/footer";
import "../globals.css";

import Header from "@/components/core/header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-12">{children}</main>
      <Footer />
    </div>
  );
}
