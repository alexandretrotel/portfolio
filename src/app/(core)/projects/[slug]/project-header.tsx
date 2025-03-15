import { Separator } from "@/components/ui/separator";
import type { Project } from "@/types/projects/projects";
import { CheckIcon, PauseIcon, XCircleIcon } from "lucide-react";

export default function ProjectHeader({
  project,
  viewCount,
}: {
  project: Project;
  viewCount: string;
}) {
  const statusIcon = {
    WIP: <PauseIcon className="inline-block h-5 w-5 text-yellow-500" />,
    Completed: <CheckIcon className="inline-block h-5 w-5 text-green-500" />,
    Paused: <PauseIcon className="inline-block h-5 w-5 text-blue-500" />,
    Abandoned: <XCircleIcon className="inline-block h-5 w-5 text-red-500" />,
  };

  return (
    <header className="flex flex-col gap-4">
      <div>
        {viewCount && (
          <p className="text-xs text-muted-foreground">
            {viewCount} {Number(viewCount) > 1 ? "view" : "views"}
          </p>
        )}
        <h1 className="text-2xl font-bold">{project.title}</h1>
      </div>
      <p className="text-muted-foreground">{project.description}</p>

      <div className="flex h-5 flex-wrap items-center gap-4 text-sm">
        <span className="flex items-center gap-1">
          {statusIcon[project.status]}
          {project.status}
        </span>

        <Separator orientation="vertical" className="h-full" />

        <span className="flex items-center gap-1">
          {new Date(project.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}{" "}
          {project.dateCompleted && " - "}
          {project.dateCompleted &&
            new Date(project.dateCompleted).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
        </span>
      </div>
    </header>
  );
}
