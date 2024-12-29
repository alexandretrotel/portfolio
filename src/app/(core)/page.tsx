import About from "./about";
import Education from "./education";
import Experiences from "./experiences";
import Nonprofit from "./nonprofit";

export default async function Home() {
  return (
    <div className="flex flex-col gap-12 w-full">
      <About />
      <Experiences />
      <Nonprofit />
      <Education />
    </div>
  );
}
