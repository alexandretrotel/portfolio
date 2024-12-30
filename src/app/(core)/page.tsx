import Introduction from "./introduction";
import Education from "./education";
import Experiences from "./experiences";
import Nonprofit from "./nonprofit";
import Projects from "./projects";
import Skills from "./skills";

export default async function Home() {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-16">
      <Introduction />
      <Experiences />
      <Nonprofit />
      <Education />
      <Skills />
      <Projects />
    </div>
  );
}
