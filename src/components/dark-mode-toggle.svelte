<script lang="ts">
  import { Moon, Sun } from "lucide-svelte";
  import { cn } from "@/lib/utils";

  function toggleTheme() {
    const root = document.documentElement;
    root.classList.toggle("dark");
  }
</script>

<button
  class={cn(
        "inline-flex size-9 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium text-sm outline-none transition-all",
        "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
    )}
  on:click={toggleTheme}
  type="button"
>
  <Sun
    class="dark:-rotate-90 h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:scale-0"
  />
  <Moon
    class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
  />
  <span class="sr-only">Toggle theme</span>
</button>
