import About from "./about";
import Books from "./books";
import Investments from "./investments";
import MyCulture from "./my-culture";
import Animation from "@/components/core/animation";
import Songs from "./songs";

const sections = [
  { component: About, delay: 0 },
  { component: MyCulture, delay: 0.25 },
  { component: Investments, delay: 0.5 },
  { component: Songs, delay: 0.75 },
  { component: Books, delay: 1 },
];

export default async function AboutPage() {
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
