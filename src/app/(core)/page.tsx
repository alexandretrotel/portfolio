import About from "./about";
import Education from "./education";
import Experiences from "./experiences";

export default async function Home() {
  return (
    <div className="flex flex-col gap-12">
      <About />
      <Experiences />
      <Education />
    </div>
  );
}
