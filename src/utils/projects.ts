import { projects } from "@/data/projects/projects";

export const getProjects = () => {
  return projects;
};

export const getProjectFromSlug = (slug: string) => {
  return projects.find((project) => project.slug === slug);
};
