import type { Preview } from "@/types/projects/projects";
import Image from "next/image";

export default function Preview({ preview }: { preview?: Preview }) {
  if (!preview) return null;

  return (
    <div className="mb-8 overflow-hidden rounded-lg border transition-all duration-500 hover:shadow-xl">
      {preview.type === "image" ? (
        <Image
          src={preview.asset || "/placeholder.svg"}
          alt="Project preview"
          width={800}
          height={450}
          className="w-full object-cover"
        />
      ) : (
        <video src={preview.asset} controls className="w-full" />
      )}
    </div>
  );
}
