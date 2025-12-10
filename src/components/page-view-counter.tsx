import { api } from "@zap-studio/fetch";
import useSWR from "swr";
import { z } from "zod";

type PageviewCounterProps = {
  slug: string;
};

const PageviewSchema = z.object({
  count: z.number(),
});

const fetcher = (url: string) =>
  api.get(url, PageviewSchema).then((data) => data.count);

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
