import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex h-full flex-col gap-16">
      <div className="flex w-full max-w-xl flex-col gap-6 font-light text-muted-foreground">
        <p>
          I&apos;m{" "}
          <span className="font-medium text-foreground">Alexandre Trotel</span>,
          a tech entrepreneur and full stack developer with interests in web
          development, machine learning, and open source.
        </p>

        <p>
          Currently working as a{" "}
          <span className="italic">Consultant-Développeur®</span> at{" "}
          <Link
            className="font-medium text-primary hover:underline"
            href="https://www.allohouston.fr"
            target="_blank"
          >
            <span className="italic">ALLO</span>
            <span className="font-semibold">HOUSTON</span>
          </Link>
          , where I help clients build high-quality web applications tailored to
          their needs.
        </p>

        <p>
          I&apos;m also the author of{" "}
          <Link
            className="font-medium text-primary hover:underline"
            href="https://www.zapstudio.dev"
            target="_blank"
          >
            Zap Studio
          </Link>{" "}
          – where we help developers and businesses create powerful applications
          by providing high-quality templates and tools.
        </p>

        <div>
          <Button
            asChild
            className="active:scale-95 active:bg-accent"
            variant="ghost"
          >
            <Link
              className="flex items-center gap-2 font-medium text-primary text-sm"
              href="/blog"
            >
              <ArrowRight size={16} />
              Check out my blog
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
