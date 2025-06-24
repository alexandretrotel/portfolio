import { getBlogPosts, getPostFromSlug } from "@/lib/blog";
import type { Metadata } from "next";
import { Redis } from "@upstash/redis";
import { Animation } from "@/components/animation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { customComponents as components } from "@/mdx-components";
import { notFound } from "next/navigation";

const redis =
	process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
		? Redis.fromEnv()
		: null;

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const slug = (await params).slug;
	const post = await getPostFromSlug(slug);

	if (!post) {
		return {
			title: "Post not found",
			description: "The requested blog post could not be found.",
		};
	}

	return {
		title: post.title,
		description: post.description,
		openGraph: {
			title: post.title,
			description: post.description,
			type: "article",
			url: `https://www.alexandretrotel.org/blog/${slug}`,
		},
		twitter: {
			title: post.title,
			description: post.description,
		},
	};
}

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const slug = (await params).slug;
	const post = await getPostFromSlug(slug);

	let count = 0;
	if (redis) {
		count = await redis.incr(`pageviews:${slug}`);
	} else {
		console.warn(
			"Redis is not configured. Page view count will not be tracked.",
		);
	}

	if (!post) {
		notFound();
	}

	return (
		<Animation>
			<article className="mx-auto max-w-3xl">
				<div className="prose prose-gray dark:prose-invert max-w-none">
					<p className="text-muted-foreground inline-flex items-center gap-1 text-sm">
						{count} view{count > 1 ? "s" : ""}
					</p>

					<MDXRemote source={post.content} components={components} />
				</div>
			</article>
		</Animation>
	);
}

export async function generateStaticParams() {
	const posts = await getBlogPosts();

	return posts.map((post) => ({
		params: {
			slug: post.slug,
		},
	}));
}

export const dynamicParams = false;
