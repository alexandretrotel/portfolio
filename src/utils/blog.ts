import { posts } from "@/data/blog/posts";

export const getBlogPosts = () => {
  return posts?.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
};

export const getPostFromSlug = (slug: string) => {
  return posts.find((post) => post.slug === slug);
};
