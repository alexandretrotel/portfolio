import { getBlogPosts, getPostFromSlug } from "@/utils/blog";
import { Metadata } from "next";
import { notFound } from "next/navigation";

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
      url: `https://alexandretrotel.org/blog/${slug}`,
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

  return <Post />;
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
