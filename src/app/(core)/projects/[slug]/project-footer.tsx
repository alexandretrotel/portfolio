import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Project } from "@/types/projects/projects";
import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

export default function ProjectFooter({ project }: { project: Project }) {
  return (
    <footer className="mt-8 border-t pt-8">
      <div className="space-y-6">
        {project?.links && project?.links?.length > 0 && (
          <div>
            <h3 className="mb-2 text-sm font-semibold">Links</h3>
            <div className="flex flex-wrap gap-2">
              {project.links.map((link) => (
                <Button key={link.url} variant="outline" size="sm" asChild>
                  <Link
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.title}
                    <ArrowUpRightIcon className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        )}

        {project?.languages && project?.languages?.length > 0 && (
          <div>
            <h3 className="mb-2 text-sm font-semibold">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {project?.languages?.map((lang) => (
                <Badge key={lang} variant="default">
                  {lang}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}
