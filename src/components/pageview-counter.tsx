"use client";

import { useEffect, useState } from "react";

type PageviewCounterProps = {
  slug: string;
};

export default function PageviewCounter({ slug }: PageviewCounterProps) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchCount() {
      try {
        const res = await fetch(
          `/api/pageview?slug=${encodeURIComponent(slug)}`
        );
        if (!res.ok) {
          return;
        }
        const data = await res.json();
        if (mounted && typeof data.count === "number") {
          setCount(data.count);
        }
      } catch {
        // ignore errors
      }
    }

    fetchCount();

    return () => {
      mounted = false;
    };
  }, [slug]);

  if (!count) {
    return null;
  }

  return (
    <p className="inline-flex items-center gap-1 text-muted-foreground text-sm">
      {count} view{count > 1 ? "s" : ""}
    </p>
  );
}
