import About from "./about";
import Education from "./education";

export default async function Home() {
  return (
    <div className="flex flex-col gap-12">
      <About />
      <Education />
    </div>
  );
}
