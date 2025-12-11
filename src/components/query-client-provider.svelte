<script lang="ts">
  import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";
  import type { Snippet } from "svelte";

  let { children }: { children: Snippet } = $props();

  const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient} {children}/>
