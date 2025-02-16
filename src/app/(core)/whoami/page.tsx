import About from "./about";
import Books from "./books";
import Investments from "./investments";
import Animation from "@/components/core/animation";
import { ANIMATION_DELAY } from "@/data/animation";

const sections = [
  { component: About },
  { component: Investments },
  { component: Books },
];

export default async function WhoAmIPage() {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-16">
      {sections.map(({ component: Component }, index) => (
        <Animation key={Component.name} delay={index * ANIMATION_DELAY}>
          <Component />
        </Animation>
      ))}
    </div>
  );
}
