import { NonprofitItem } from "@/components/features/nonprofit-item";
import { roles } from "@/data/nonprofit";

export default async function Nonprofit() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-left text-lg font-bold">Nonprofit experience</h1>

      <div className="flex flex-col gap-6">
        {!roles?.[0]?.disabled && <NonprofitItem {...roles[0]} />}

        {roles?.slice(1)?.map((item, index) => {
          if (item?.disabled) return null;

          return <NonprofitItem key={index} {...item} />;
        })}
      </div>
    </div>
  );
}
