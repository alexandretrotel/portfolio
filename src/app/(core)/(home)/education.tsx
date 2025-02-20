import { education } from "@/data/home/education";
import { EducationItem } from "@/components/features/education-item";

export default async function Education() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-left text-lg font-bold">Education</h1>
      </div>

      <div className="flex flex-col gap-6">
        {!education?.[0]?.disabled && <EducationItem {...education[0]} />}

        {education?.slice(1)?.map((item, index) => {
          if (item?.disabled) return null;

          return <EducationItem key={index} {...item} />;
        })}
      </div>
    </div>
  );
}
