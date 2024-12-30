import About from "./about";
import Books from "./books";
import Investments from "./investments";
import MyCulture from "./my-culture";

export default async function AboutPage() {
  return (
    <div className="flex flex-col gap-12 w-full max-w-xl mx-auto">
      <About delay={0} />
      <Investments delay={0.25} />
      <MyCulture delay={0.5} />
      <Books delay={0.75} />
    </div>
  );
}
