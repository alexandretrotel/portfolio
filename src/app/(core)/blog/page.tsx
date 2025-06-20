import { cn } from "@/lib/utils";
import { getBlogPosts } from "@/utils/blog";
import Link from "next/link";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export default async function Blog() {
	const posts = getBlogPosts();

	return (
		<div className="flex flex-col gap-4">
			<div>
				<h1 className="text-lg font-bold">Blog</h1>
				<p className="text-muted-foreground text-sm">
					I write about things I learn, my vision, and my journey.
				</p>
			</div>
			<table className="w-full">
				<tbody className="flex flex-col gap-2">
					{posts?.map(async (post, index) => {
						const formattedDate = new Date(post.date).toLocaleDateString(
							"en-US",
							{
								year: "numeric",
								month: "short",
							},
						);
						const showDate =
							index === 0 ||
							index === posts.length - 1 ||
							formattedDate !==
								new Date(posts[index + 1].date).toLocaleDateString("en-US", {
									year: "numeric",
									month: "short",
								});
						const count: number =
							(await redis.get(`pageviews:${post.slug}`)) ?? 0;
						const formattedCount = new Intl.NumberFormat("en-US").format(count);

						return (
							<tr key={post.slug} className="group flex items-center">
								<td
									className={cn(
										"text-muted-foreground pr-4 text-xs whitespace-nowrap",
										{ "opacity-0": !showDate },
									)}
								>
									{formattedDate}
								</td>
								<td className="w-full">
									<Link
										href={`/blog/${post.slug}`}
										className="text-primary text-sm font-semibold group-hover:underline"
									>
										{post.title}
									</Link>
								</td>
								{count > 0 && (
									<td className="text-muted-foreground text-xs whitespace-nowrap">
										{formattedCount} view{count > 1 ? "s" : ""}
									</td>
								)}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
