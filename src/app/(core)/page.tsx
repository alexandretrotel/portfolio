import About from "./about";
import Education from "./education";
import Experiences from "./experiences";
import Nonprofit from "./nonprofit";

export default async function Home() {
  return (
    <div className="flex flex-col gap-12 w-full max-w-xl mx-auto">
      <About delay={0} />
      <Experiences delay={0.25} />
      <Nonprofit delay={0.5} />
      <Education delay={0.75} />
    </div>
  );
}
