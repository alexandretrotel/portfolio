import Link from "next/link";

export default function Home() {
  return (
    <p className="text-muted-foreground text-sm">
      I know I&apos;m pretty fast but this is still under construction. Please
      come back maybe yesterday. In the meantime, you can check out my{" "}
      <Link href="/contact" className="text-primary hover:underline">
        contact
      </Link>{" "}
      page.
    </p>
  );
}
