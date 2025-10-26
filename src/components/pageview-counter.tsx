"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/swr";

type PageviewCounterProps = {
  slug: string;
};

export default function PageviewCounter({ slug }: PageviewCounterProps) {
  const url = `/api/pageview?slug=${encodeURIComponent(slug)}`;

  const { data: count } = useSWR<number>(url, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
    dedupingInterval: 60_000,
  });

  const finalCount = count ?? 0;

  return (
    <p className="inline-flex items-center gap-1 text-muted-foreground text-sm">
      {finalCount} view{finalCount > 1 ? "s" : ""}
    </p>
  );
}
