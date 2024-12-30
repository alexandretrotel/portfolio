import Introduction from "./introduction";
import Education from "./education";
import Experiences from "./experiences";
import Nonprofit from "./nonprofit";
import Projects from "./projects";
import Skills from "./skills";
import Animation from "@/components/core/animation";

const sections = [
  { component: Introduction, delay: 0 },
  { component: Experiences, delay: 0.25 },
  { component: Nonprofit, delay: 0.5 },
  { component: Education, delay: 0.75 },
  { component: Skills, delay: 1 },
  { component: Projects, delay: 1.25 },
];

export default async function Home() {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-16">
      {sections.map(({ component: Component, delay }) => (
        <Animation key={Component.name} delay={delay}>
          <Component />
        </Animation>
      ))}
    </div>
  );
}
