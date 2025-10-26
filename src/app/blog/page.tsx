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
								className="group hover:bg-muted/50 flex flex-col items-start gap-1 rounded-sm py-4 transition-all active:scale-95 md:flex-row md:items-center md:gap-4 md:p-4"
							>
								<div className="text-muted-foreground flex items-center gap-2">
									<span
										className={cn(
											"text-muted-foreground shrink-0 text-xs font-light md:w-20",
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

								{!!post.views && post.views > 0 && (
									<span className="text-muted-foreground hidden text-right text-xs font-light md:flex">
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
