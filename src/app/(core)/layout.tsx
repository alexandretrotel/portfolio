import Footer from "@/components/core/footer";
import "../globals.css";

import Header from "@/components/core/header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-background min-h-screen">
      <Header />
      <main className="max-w-5xl mx-auto py-12 px-4">{children}</main>
      <Footer />
    </div>
  );
}
