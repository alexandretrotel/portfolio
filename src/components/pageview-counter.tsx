"use client";

import { useEffect, useState } from "react";

export default function PageviewCounter({ slug }: { slug: string }) {
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

  if (count === null) {
    return (
      <p className="inline-flex items-center gap-1 text-muted-foreground text-sm">
        Loading…
      </p>
    );
  }

  return (
    <p className="inline-flex items-center gap-1 text-muted-foreground text-sm">
      {count} view{count > 1 ? "s" : ""}
    </p>
  );
}
