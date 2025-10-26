import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import PageviewCounter from "@/components/pageview-counter";
import { getBlogPosts, getPostFromSlug } from "@/lib/blog";
import { customComponents as components } from "@/mdx-components";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

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

type SlugPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page({ params }: SlugPageProps) {
  const { slug } = await params;
  const post = await getPostFromSlug(slug);

  return (
    <>
      <PageviewCounter slug={slug} />
      <MDXRemote components={components} source={post?.content ?? ""} />
    </>
  );
}
