import { rules } from "@/data/about/my-culture";

export default async function MyCulture() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-lg font-bold text-left">Understand my culture</h1>
        <p className="text-sm text-muted-foreground">
          I describe below a set of values that I hold dear and that I believe
          are essential to a <strong>fulfilling life</strong> and{" "}
          <strong>maximizing my productivity</strong>.
        </p>
      </div>

      <ol className="space-y-6 mt-4">
        {rules
          ?.sort((a, b) => a.id - b.id)
          ?.map((rule) => (
            <li key={rule?.id} className="flex items-start">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-semibold mr-4 flex-shrink-0">
                {rule?.id}
              </span>
              <div>
                <h3 className="font-semibold">{rule.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {rule.description}
                </p>
              </div>
            </li>
          ))}
      </ol>
    </div>
  );
}
