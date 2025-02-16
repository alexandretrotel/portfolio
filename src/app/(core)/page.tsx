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
  { component: Skills, disabled: true },
  { component: Projects, disabled: true },
];

export default async function Home() {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-16">
      {sections.map(({ component: Component, disabled }, index) => {
        if (disabled) return null;

        return (
          <Animation key={Component.name} delay={index * ANIMATION_DELAY}>
            <Component />
          </Animation>
        );
      })}
    </div>
  );
}
