import { getProjectFromSlug, getProjects } from "@/utils/projects";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectHeader from "./project-header";
import ProjectContent from "./project-content";
import ProjectPreview from "./project-preview";
import ProjectFooter from "./project-footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const project = getProjectFromSlug(slug);

  return {
    title: project?.title,
    description: project?.description,
    openGraph: {
      title: project?.title,
      description: project?.description,
      type: "article",
      url: `https://alexandretrotel.org/projects/${project?.slug}`,
    },
    twitter: {
      title: project?.title,
      description: project?.description,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const project = getProjectFromSlug(slug);

  const { default: ProjectMDX } = await import(`@/projects/${slug}.mdx`);

  if (!ProjectMDX || !project) {
    notFound();
  }

  return (
    <article className="mx-auto">
      <ProjectHeader project={project} />

      <div className="mt-8 grid grid-cols-1 gap-8">
        <ProjectPreview preview={project.preview} />
      </div>

      <ProjectContent>
        <ProjectMDX />
      </ProjectContent>

      <ProjectFooter project={project} />
    </article>
  );
}

export function generateStaticParams() {
  const projects = getProjects();

  return projects.map((project) => ({
    params: {
      slug: project.slug,
    },
  }));
}

export const dynamicParams = false;
