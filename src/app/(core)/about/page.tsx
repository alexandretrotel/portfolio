import About from "./about";
import Books from "./books";
import Investments from "./investments";
import MyCulture from "./my-culture";
import Animation from "@/components/core/animation";
import Songs from "./songs";
import { ANIMATION_DELAY } from "@/data/animation";

const sections = [
  { component: About },
  { component: MyCulture },
  { component: Investments },
  { component: Songs },
  { component: Books },
];

export default async function AboutPage() {
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
