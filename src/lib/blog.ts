import fs from "node:fs";
import path from "node:path";
import { Redis } from "@upstash/redis";
import matter from "gray-matter";

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? Redis.fromEnv()
    : null;

const postsDirectory = path.join(process.cwd(), "src/data/blog");

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: Date;
  content: string;
  views?: number;
  formattedViews?: string;
  formattedDate?: string;
  showDate?: boolean;
};

const formatDate = (date: Date) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const MDX_REGEX = /\.mdx$/;

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    const mdxFiles = fileNames.filter((fileName) => fileName.endsWith(".mdx"));

    const posts = await Promise.all(
      mdxFiles.map((fileName) => {
        const slug = fileName.replace(MDX_REGEX, "");
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");

        const { data, content } = matter(fileContents);

        if (!(data.title && data.description && data.date)) {
          // biome-ignore lint/suspicious/noConsole: Missing required frontmatter is important to log
          console.warn(`Missing required frontmatter in ${fileName}`);
          return null;
        }

        const date = new Date(data.date);
        if (Number.isNaN(date.getTime())) {
          // biome-ignore lint/suspicious/noConsole: Invalid date is important to log
          console.warn(`Invalid date in ${fileName}: ${data.date}`);
          return null;
        }

        return {
          slug,
          title: data.title,
          description: data.description,
          date,
          content,
        };
      })
    );

    const validPosts = posts.filter((post): post is BlogPost => post !== null);
    const sortedPosts = validPosts.sort(
      (a, b) => b.date.getTime() - a.date.getTime()
    );

    const enhancedPosts = await Promise.all(
      sortedPosts.map(async (post, index, arr) => {
        const views: number = (await redis?.get(`pageviews:${post.slug}`)) ?? 0;

        const formattedDate = formatDate(post.date);

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
      })
    );

    return enhancedPosts;
  } catch (error) {
    process.stderr.write(
      `Error reading blog posts: ${JSON.stringify(error)}\n`
    );
    return [];
  }
}

export async function getPostFromSlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    if (!(data.title && data.description && data.date)) {
      // biome-ignore lint/suspicious/noConsole: Missing required frontmatter is important to log
      console.warn(`Missing required frontmatter in ${slug}.mdx`);
      return null;
    }

    const date = new Date(data.date);
    if (Number.isNaN(date.getTime())) {
      // biome-ignore lint/suspicious/noConsole: Invalid date is important to log
      console.warn(`Invalid date in ${slug}.mdx: ${data.date}`);
      return null;
    }

    const views: number = (await redis?.get(`pageviews:${slug}`)) ?? 0;

    return {
      slug,
      title: data.title,
      description: data.description,
      date,
      content,
      views,
      formattedViews: new Intl.NumberFormat("en-US").format(views),
      formattedDate: formatDate(date),
    };
  } catch (error) {
    process.stderr.write(
      `Error reading post ${slug}: ${JSON.stringify(error)}\n`
    );
    return null;
  }
}

export async function getNumberOfPosts(): Promise<number> {
  try {
    const posts = await getBlogPosts();
    return posts.length;
  } catch (error) {
    process.stderr.write(
      `Error getting number of posts: ${JSON.stringify(error)}\n`
    );
    return 0;
  }
}
