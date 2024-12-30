import Animation from "@/components/core/animation";
import Link from "next/link";

export default async function Blog() {
  return (
    <Animation>
      <p className="text-sm text-muted-foreground">
        This page isn&apos;t ready yet but you can check out the{" "}
        <Link href="/contact" className="text-primary hover:underline">
          contact
        </Link>{" "}
        page.
      </p>
    </Animation>
  );
}
