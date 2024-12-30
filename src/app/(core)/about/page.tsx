import Books from "../books";
import Investments from "../investments";

export default async function About() {
  return (
    <div className="flex flex-col gap-12 w-full max-w-xl mx-auto">
      <Investments delay={0} />
      <Books delay={0.25} />
    </div>
  );
}
