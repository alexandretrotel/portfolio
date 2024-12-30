import { projects } from "@/data/projects";
import { ProjectItem } from "./project-item";
import Animation from "@/components/core/animation";

export default async function Projects() {
  const featuredProjects = projects
    ?.filter((project) => project.featured)
    ?.sort((a, b) => b.date.getTime() - a.date.getTime());

  const otherProjects = projects
    ?.filter((project) => !project.featured)
    ?.sort((a, b) => b.date.getTime() - a.date.getTime());

  const orderedProjects = [...featuredProjects, ...otherProjects];

  return (
    <Animation>
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-lg font-bold">Projects</h1>
          <p className="text-sm text-muted-foreground">
            Here are some of the projects I&apos;ve worked on.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {orderedProjects?.map((project, index) => (
            <Animation key={project.title} delay={index * 0.25}>
              <ProjectItem
                key={project.title}
                showPreview
                heightFull
                {...project}
              />
            </Animation>
          ))}
        </div>
      </div>
    </Animation>
  );
}
