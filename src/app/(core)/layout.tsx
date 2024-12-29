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
      <main className="max-w-xl mx-auto py-12 px-4">{children}</main>
    </div>
  );
}
