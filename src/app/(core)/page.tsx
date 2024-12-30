import Introduction from "./introduction";
import Education from "./education";
import Experiences from "./experiences";
import Nonprofit from "./nonprofit";
import Projects from "./projects";
import Skills from "./skills";

export default async function Home() {
  return (
    <div className="flex flex-col gap-12 w-full max-w-xl mx-auto">
      <Introduction delay={0} />
      <Experiences delay={0.25} />
      <Nonprofit delay={0.5} />
      <Education delay={0.75} />
      <Skills delay={1} />
      <Projects delay={1.25} />
    </div>
  );
}
