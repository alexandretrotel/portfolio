import Introduction from "./introduction";

const sections = [{ component: Introduction }];

export default async function Home() {
	return (
		<div className="mx-auto flex w-full max-w-xl flex-col gap-16">
			{sections.map(({ component: Component }) => {
				return <Component key={Component.name} />;
			})}
		</div>
	);
}
