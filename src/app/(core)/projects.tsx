"use client";
import "client-only";

import { projects } from "@/data/projects";
import { motion } from "motion/react";
import { ProjectItem } from "./projects/project-item";
import { useMemo } from "react";

const PROJECTS_LIMIT = 3;

interface ProjectsProps {
  delay: number;
}

export default function Projects({ delay }: ProjectsProps) {
  const featuredProjects = useMemo(
    () =>
      projects
        ?.filter((project) => project.featured)
        ?.sort((a, b) => b.date.getTime() - a.date.getTime()),
    []
  );
  const otherProjects = useMemo(
    () =>
      projects
        ?.filter((project) => !project.featured)
        ?.sort((a, b) => b.date.getTime() - a.date.getTime()),
    []
  );

  const orderedProjects = useMemo(
    () => [...featuredProjects, ...otherProjects]?.slice(0, PROJECTS_LIMIT),
    [featuredProjects, otherProjects]
  );

  return (
    <motion.div
      className="flex flex-col"
      layoutId="projects"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <h1 className="text-lg font-semibold">Projects</h1>
      <p className="text-sm text-muted-foreground">
        Here are some of the projects I&apos;ve worked on.
      </p>
      <div className="grid grid-cols-1 gap-4 mt-4">
        {orderedProjects?.map((project) => (
          <ProjectItem key={project.url} {...project} />
        ))}
      </div>
    </motion.div>
  );
}
