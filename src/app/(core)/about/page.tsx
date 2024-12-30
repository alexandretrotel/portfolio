import About from "./about";
import Books from "./books";
import Investments from "./investments";
import MyCulture from "./my-culture";

export default async function AboutPage() {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-16">
      <About />
      <MyCulture />
      <Investments />
      <Books />
    </div>
  );
}
