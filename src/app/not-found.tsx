import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4">
      <div className="flex flex-col items-center justify-center space-y-2">
        <p className="text-muted-foreground">This page doesn&apos;t exist.</p>
      </div>
      <Button variant={"ghost"} className="mt-4" asChild>
        <Link href={"/"}>Go home</Link>
      </Button>
    </div>
  );
}
