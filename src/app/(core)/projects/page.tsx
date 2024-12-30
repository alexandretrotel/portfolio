import { projects } from "@/data/projects";
import { ProjectItem } from "./project-item";

export default async function Projects() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-lg font-bold">Projects</h1>
        <p className="text-sm text-muted-foreground">
          Here are some of the projects I&apos;ve worked on.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects
          ?.sort((a, b) => b.date.getTime() - a.date.getTime())
          ?.map((project) => (
            <ProjectItem key={project.title} showImage {...project} />
          ))}
      </div>
    </div>
  );
}
