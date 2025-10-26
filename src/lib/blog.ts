import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { redis } from "@/lib/redis";
import type { BlogPost, FrontMatter } from "@/types/blog";

const MDX_EXTENSION = ".mdx" as const;
const postsDirectory = path.join(process.cwd(), "src/data/blog");

const formatDate = (date: Date): string =>
  date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const isValidFrontMatter = (data: unknown): data is FrontMatter =>
  typeof data === "object" &&
  data !== null &&
  "title" in data &&
  "description" in data &&
  "date" in data &&
  typeof (data as FrontMatter).title === "string" &&
  typeof (data as FrontMatter).description === "string";

const parseDate = (dateValue: string | Date): Date | null => {
  const date = new Date(dateValue);
  return Number.isNaN(date.getTime()) ? null : date;
};

async function getViewCount(slug: string): Promise<number> {
  if (!redis) {
    return 0;
  }

  try {
    const views = await redis.get(`pageviews:${slug}`);
    return typeof views === "number" ? views : 0;
  } catch {
    return 0;
  }
}

const formatViewCount = (views: number): string =>
  new Intl.NumberFormat("en-US").format(views);

async function parseBlogPost(fileName: string): Promise<BlogPost | null> {
  const slug = fileName.replace(MDX_EXTENSION, "");
  const fullPath = path.join(postsDirectory, fileName);

  try {
    const fileContents = await fs.readFile(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    if (!isValidFrontMatter(data)) {
      return null;
    }

    const date = parseDate(data.date);
    if (!date) {
      return null;
    }

    return {
      slug,
      title: data.title,
      description: data.description,
      date,
      content,
    };
  } catch {
    return null;
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const fileNames = await fs.readdir(postsDirectory);
    const mdxFiles = fileNames.filter((fileName) =>
      fileName.endsWith(MDX_EXTENSION)
    );

    // Parse all posts
    const posts = await Promise.all(mdxFiles.map(parseBlogPost));
    const validPosts = posts.filter((post): post is BlogPost => post !== null);

    // Sort by date (newest first)
    const sortedPosts = validPosts.sort(
      (a, b) => b.date.getTime() - a.date.getTime()
    );

    // Enhance posts with view counts and formatted data
    const enhancedPosts = await Promise.all(
      sortedPosts.map(async (post, index, arr) => {
        const views = await getViewCount(post.slug);
        const formattedDate = formatDate(post.date);

        // Show date if it's the first post, last post, or different from next post
        const showDate =
          index === 0 ||
          index === arr.length - 1 ||
          (arr[index + 1] && formattedDate !== formatDate(arr[index + 1].date));

        return {
          ...post,
          views,
          formattedViews: formatViewCount(views),
          formattedDate,
          showDate,
        };
      })
    );

    return enhancedPosts;
  } catch {
    return [];
  }
}

export async function getPostFromSlug(slug: string): Promise<BlogPost | null> {
  const fullPath = path.join(postsDirectory, `${slug}${MDX_EXTENSION}`);

  try {
    // Check if file exists
    await fs.access(fullPath);

    const fileContents = await fs.readFile(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    if (!isValidFrontMatter(data)) {
      return null;
    }

    const date = parseDate(data.date);
    if (!date) {
      return null;
    }

    const views = await getViewCount(slug);

    return {
      slug,
      title: data.title,
      description: data.description,
      date,
      content,
      views,
      formattedViews: formatViewCount(views),
      formattedDate: formatDate(date),
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return null;
    }
    return null;
  }
}

export async function getNumberOfPosts(): Promise<number> {
  try {
    const fileNames = await fs.readdir(postsDirectory);
    return fileNames.filter((fileName) => fileName.endsWith(MDX_EXTENSION))
      .length;
  } catch {
    return 0;
  }
}

export async function shouldShowBlog(): Promise<boolean> {
  const posts = await getBlogPosts();
  return posts.length > 0;
}
