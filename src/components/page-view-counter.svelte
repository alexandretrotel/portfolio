<script lang="ts">
  import { api } from "@zap-studio/fetch";
  import { z } from "astro/zod";
  import { onMount } from "svelte";

  type Props = {
    slug: string;
  };

  let { slug }: Props = $props();

  const PageCountSchema = z.object({
    count: z.number(),
  });

  let pageViewCount: number | null = $state(null);
  let isLoaded = $state(false);

  onMount(async () => {
    try {
      const result = await api.get(
        `/api/pageview?slug=${encodeURIComponent(slug)}`,
        PageCountSchema
      );
      pageViewCount = result.count;
    } finally {
      isLoaded = true;
    }
  });
</script>

{#if isLoaded && pageViewCount !== null}
  <p class="inline-flex items-center gap-1 text-muted-foreground text-sm">
    {pageViewCount}view{pageViewCount !== 1 ? "s" : ""}
  </p>
{/if}
