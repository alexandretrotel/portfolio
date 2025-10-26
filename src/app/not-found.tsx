"use client";

import { useRouter } from "@bprogress/next/app";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 py-32">
      <div className="flex flex-col items-center justify-center">
        <p className="text-muted-foreground">This page doesn&apos;t exist.</p>
      </div>
      <Button
        className="active:scale-90 active:bg-accent"
        onClick={() => router.back()}
        variant={"ghost"}
      >
        Go back
      </Button>
    </div>
  );
}
