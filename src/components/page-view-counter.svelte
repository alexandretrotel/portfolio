<script lang="ts">
  import { createQuery } from "@tanstack/svelte-query";
  import { api } from "@zap-studio/fetch";
  import { z } from "astro/zod";

  type Props = {
    slug: string;
  };

  let { slug }: Props = $props();

  const PageCountSchema = z.object({
    count: z.number(),
  });

  const query = createQuery(() => ({
    queryKey: ["pageview", slug],
    queryFn: async () => {
      const result = await api.get(
        `/api/pageview?slug=${encodeURIComponent(slug)}`,
        PageCountSchema
      );
      return result.count;
    },
  }));
</script>

{#if query.isSuccess}
  <p class="inline-flex items-center gap-1 text-muted-foreground text-sm">
    {query.data}view{query.data !== 1 ? "s" : ""}
  </p>
{/if}
