import "../globals.css";

import Header from "@/components/core/header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="bg-background max-w-5xl mx-auto py-12 px-4">
        {children}
      </main>
    </>
  );
}
