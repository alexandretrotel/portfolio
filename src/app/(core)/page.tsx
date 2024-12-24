import Link from "next/link";

export default function Home() {
  return (
    <p className="text-muted-foreground text-sm">
      This page isn&apos;t ready yet but you can check out the{" "}
      <Link href="/contact" className="text-primary hover:underline">
        contact
      </Link>{" "}
      page.
    </p>
  );
}
