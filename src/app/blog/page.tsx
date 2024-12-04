import Link from "next/link";

export default async function Blog() {
  return (
    <p className="text-muted-foreground text-sm">
      I&apos;m so excited to share my thoughts with you but you&apos;ll have to
      wait a little longer, just the time that it takes to write a book I think.
      In the meantime, you can check out my{" "}
      <Link href="/contact" className="text-primary hover:underline">
        contact
      </Link>{" "}
      page.
    </p>
  );
}
