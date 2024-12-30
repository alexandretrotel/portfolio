import Introduction from "./introduction";
import Education from "./education";
import Experiences from "./experiences";
import Nonprofit from "./nonprofit";
import Projects from "./projects";
import Skills from "./skills";

export default async function Home() {
  return (
    <div className="flex flex-col gap-16 w-full max-w-xl mx-auto">
      <Introduction />
      <Experiences />
      <Nonprofit />
      <Education />
      <Skills />
      <Projects />
    </div>
  );
}
