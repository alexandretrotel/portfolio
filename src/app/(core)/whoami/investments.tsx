import { InvestmentItem } from "@/components/features/investment-item";
import { investments } from "@/data/about/investments";

export default async function Investments() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-left text-lg font-bold">
          Check out my investments
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {investments?.slice(0, 2)?.map((item, index) => {
          if (item?.disabled) return null;

          return <InvestmentItem key={index} {...item} />;
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {investments?.slice(2)?.map((item, index) => {
          if (item?.disabled) return null;

          return <InvestmentItem key={index} {...item} />;
        })}
      </div>
    </div>
  );
}
