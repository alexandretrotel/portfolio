import { ExperienceItem } from "@/components/features/experience-item";
import { experiences } from "@/data/experiences";

export default async function Experiences() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-left text-lg font-bold">Work experience</h1>

      <div className="flex flex-col gap-6">
        {!experiences?.[0]?.disabled && <ExperienceItem {...experiences[0]} />}

        {experiences?.slice(1)?.map((item, index) => {
          if (item?.disabled) return null;

          return <ExperienceItem key={index} {...item} />;
        })}
      </div>
    </div>
  );
}
