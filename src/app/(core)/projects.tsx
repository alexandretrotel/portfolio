import { projects } from "@/data/projects";
import { ProjectItem } from "./projects/project-item";

const PROJECTS_LIMIT = 3;

export default async function Projects() {
  const featuredProjects = projects
    ?.filter((project) => project.featured)
    ?.sort((a, b) => b.date.getTime() - a.date.getTime());

  const otherProjects = projects
    ?.filter((project) => !project.featured)
    ?.sort((a, b) => b.date.getTime() - a.date.getTime());

  const orderedProjects = [...featuredProjects, ...otherProjects]?.slice(
    0,
    PROJECTS_LIMIT,
  );

  return (
    <div>
      <h1 className="text-lg font-bold">Projects</h1>
      <p className="text-sm text-muted-foreground">
        Here are some of the projects I&apos;ve worked on.
      </p>
      <div className="mt-4 grid grid-cols-1 gap-4">
        {orderedProjects?.map((project) => (
          <ProjectItem key={project.url} showPreview {...project} />
        ))}
      </div>
    </div>
  );
}
