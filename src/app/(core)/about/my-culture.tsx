import { rules } from "@/data/about/my-culture";

export default async function MyCulture() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-left text-lg font-bold">Understand my culture</h1>
        <p className="text-sm text-muted-foreground">
          I describe below a set of values that I hold dear and that I believe
          are essential to a <strong>fulfilling life</strong> and{" "}
          <strong>maximizing productivity</strong>.
        </p>
      </div>

      <ol className="mt-4 space-y-6">
        {rules
          ?.sort((a, b) => a.id - b.id)
          ?.map((rule) => (
            <li key={rule?.id} className="flex items-start">
              <span className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">
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
