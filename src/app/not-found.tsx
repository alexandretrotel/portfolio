"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 py-32">
      <div className="flex flex-col items-center justify-center">
        <p className="text-muted-foreground">This page doesn&apos;t exist.</p>
      </div>
      <Button variant={"ghost"} onClick={() => router.back()}>
        Go back
      </Button>
    </div>
  );
}
