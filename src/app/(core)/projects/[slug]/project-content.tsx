import type { ReactNode } from "react";

export default function ProjectContent({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-bold">Project description</h2>
      {children}
    </div>
  );
}
