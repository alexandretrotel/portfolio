import { projects } from "@/data/projects/projects";
import { ProjectItem } from "../../../components/features/project-item";
import Animation from "@/components/core/animation";
import { ANIMATION_DELAY } from "@/data/animation";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export default async function Projects() {
  const featuredProjects = projects?.filter((project) => project.featured);
  const otherProjects = projects?.filter((project) => !project.featured);
  const orderedProjects = [...featuredProjects, ...otherProjects];

  return (
    <Animation>
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-lg font-bold">Projects</h1>
          <p className="text-sm text-muted-foreground">
            I try to keep this list up to date but check my GitHub to see all my
            projects.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {orderedProjects?.map(async (project, index) => {
            const count: number =
              (await redis.get("pageviews:" + `project-${project.slug}`)) ?? 0;

            return (
              <Animation key={project.title} delay={index * ANIMATION_DELAY}>
                <ProjectItem
                  key={project.title}
                  showPreview
                  heightFull
                  count={count}
                  {...project}
                />
              </Animation>
            );
          })}
        </div>
      </div>
    </Animation>
  );
}
