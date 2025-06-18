import { Separator } from "@/components/ui/separator";
import { features } from "@/data/features";
import type { Project } from "@/types/projects/projects";

export default function ProjectHeader({
  project,
  count,
}: {
  project: Project;
  count: number;
}) {
  const formattedCount = new Intl.NumberFormat("en-US").format(count);

  return (
    <header className="flex flex-col gap-4">
      <div>
        {formattedCount && (
          <p className="text-muted-foreground text-xs">
            {formattedCount} {count > 1 ? "view" : "views"}
          </p>
        )}
        <h1 className="text-2xl font-bold">{project.title}</h1>
      </div>
      <p className="text-muted-foreground">{project.description}</p>

      <div className="flex h-5 flex-wrap items-center gap-4 text-sm">
        {features.enableProjectStatus && (
          <Separator orientation="vertical" className="h-full" />
        )}
      </div>
    </header>
  );
}
