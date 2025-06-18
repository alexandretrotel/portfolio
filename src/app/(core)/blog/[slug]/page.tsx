import { getBlogPosts, getPostFromSlug } from "@/utils/blog";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const post = getPostFromSlug(slug);

  return {
    title: post?.title,
    description: post?.description,
    openGraph: {
      title: post?.title,
      description: post?.description,
      type: "article",
      url: `https://www.alexandretrotel.org/blog/${slug}`,
    },
    twitter: {
      title: post?.title,
      description: post?.description,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  const { default: Post } = await import(`@/blog/${slug}.mdx`);

  if (!Post) {
    notFound();
  }

  const count = await redis.incr("pageviews:" + slug);

  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-muted-foreground inline-flex items-center gap-1 text-sm">
        {count} view{count > 1 ? "s" : ""}
      </p>
      <Post />
    </div>
  );
}

export function generateStaticParams() {
  const posts = getBlogPosts();

  return posts.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));
}

export const dynamicParams = false;
