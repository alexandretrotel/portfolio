import Introduction from "./introduction";
import Education from "./education";
import Experiences from "./experiences";
import Nonprofit from "./nonprofit";
import Projects from "./projects";
import Skills from "./skills";
import Animation from "@/components/core/animation";
import { ANIMATION_DELAY } from "@/data/animation";

const sections = [
  { component: Introduction },
  { component: Experiences },
  { component: Nonprofit },
  { component: Education },
  { component: Skills },
  { component: Projects },
];

export default async function Home() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-16">
      {sections.map(({ component: Component }, index) => (
        <Animation key={Component.name} delay={index * ANIMATION_DELAY}>
          <Component />
        </Animation>
      ))}
    </div>
  );
}
