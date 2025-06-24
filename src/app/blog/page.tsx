import { getBlogPosts } from "@/lib/blog";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Animation } from "@/components/animation";

export default async function Blog() {
	const posts = await getBlogPosts();

	return (
		<Animation>
			<div className="flex flex-col gap-6">
				<ul className="flex flex-col">
					{posts.map((post) => (
						<li key={post.slug}>
							<Link
								href={`/blog/${post.slug}`}
								aria-label={`Read blog post: ${post.title}`}
								className="group hover:bg-muted/50 active:bg-muted/50 flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-4 rounded-sm p-4 transition-all active:scale-95"
							>
								<div className="flex items-center gap-2 text-muted-foreground">
									<span
										className={cn(
											"text-muted-foreground md:w-20 shrink-0 text-xs font-light",
											{
												"opacity-0": !post.showDate,
											},
										)}
									>
										{post.formattedDate}
									</span>
								</div>

								<span className="text-foreground flex-1 text-base font-medium">
									{post.title}
								</span>

								{post.views > 0 && (
									<span className="hidden md:flex text-muted-foreground text-right text-xs font-light">
										{post.formattedViews} view{post.views > 1 ? "s" : ""}
									</span>
								)}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</Animation>
	);
}
