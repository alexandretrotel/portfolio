import About from "./about";
import Books from "./books";
import Investments from "./investments";
import MyCulture from "./my-culture";

export default async function AboutPage() {
  return (
    <div className="flex flex-col gap-16 w-full max-w-xl mx-auto">
      <About />
      <Investments />
      <MyCulture />
      <Books />
    </div>
  );
}
