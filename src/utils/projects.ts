import { projects } from "@/data/projects/projects";

export const getProjects = () => {
  return projects?.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
};

export const getProjectFromSlug = (slug: string) => {
  return projects.find((project) => project.slug === slug);
};
