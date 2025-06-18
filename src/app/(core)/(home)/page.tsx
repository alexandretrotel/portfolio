import Introduction from "./introduction";
import Education from "./education";
import Experiences from "./experiences";
import Nonprofit from "./nonprofit";

const sections = [
  { component: Introduction },
  { component: Experiences },
  { component: Nonprofit },
  { component: Education },
];

export default async function Home() {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-16">
      {sections.map(({ component: Component }) => {
        return <Component key={Component.name} />;
      })}
    </div>
  );
}
