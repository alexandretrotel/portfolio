import { getBlogPosts, getPostFromSlug } from "@/lib/blog";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Redis } from "@upstash/redis";
import { Animation } from "@/components/animation";

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

  let count = 0;
  if (redis) {
    count = await redis.incr(`pageviews:${slug}`);
  } else {
    console.warn("Redis is not configured. Page view count will not be tracked.");
  }

  return (
    <Animation>
      <div className="mx-auto max-w-3xl">
        <p className="text-muted-foreground inline-flex items-center gap-1 text-sm">
          {count} view{count > 1 ? "s" : ""}
        </p>
        <Post />
      </div>
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
