import { posts } from "@/data/posts";
import { Redis } from "@upstash/redis";

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? Redis.fromEnv()
    : null;

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export async function getBlogPosts() {
  if (!posts) return [];

  // sort posts by date (descending)
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  // pre-fetch view counts and format data
  const enhancedPosts = await Promise.all(
    sortedPosts.map(async (post, index, arr) => {
      // fetch view count from Redis (default to 0 if null or Redis unavailable)
      const views: number = (await redis?.get(`pageviews:${post.slug}`)) ?? 0;

      // format date
      const formattedDate = formatDate(post.date);

      // show date only for first, last, or when different from next post
      const showDate =
        index === 0 ||
        index === arr.length - 1 ||
        formattedDate !== formatDate(arr[index + 1]?.date);

      return {
        ...post,
        views,
        formattedViews: new Intl.NumberFormat("en-US").format(views),
        formattedDate,
        showDate,
      };
    }),
  );

  return enhancedPosts;
}

export async function getPostFromSlug(slug: string) {
  const post = posts.find((post) => post.slug === slug);
  if (!post) return null;

  // fetch view count for consistency
  const views: number = (await redis?.get(`pageviews:${slug}`)) ?? 0;

  return {
    ...post,
    views,
    formattedViews: new Intl.NumberFormat("en-US").format(views),
    formattedDate: new Date(post.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
  };
}
