import { getBlogPosts } from "@/lib/blog";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Animation } from "@/components/animation";

export default async function Blog() {
  const posts = await getBlogPosts();

  return (
    <Animation>
      <div className="flex flex-col gap-6">
        <ul className="flex flex-col">
          {posts.map((post) => (
            <li
              key={post.slug}
              className="group hover:bg-muted/50 flex items-center gap-4 rounded-sm p-2 py-4 transition-colors"
            >
              <span
                className={cn("text-muted-foreground w-20 shrink-0 text-xs", {
                  "opacity-0": !post.showDate,
                })}
              >
                {post.formattedDate}
              </span>
              <Link
                href={`/blog/${post.slug}`}
                className="text-primary flex-1 text-sm font-semibold"
                aria-label={`Read blog post: ${post.title}`}
              >
                {post.title}
              </Link>
              {post.views > 0 && (
                <span className="text-muted-foreground w-20 text-right text-xs">
                  {post.formattedViews} view{post.views > 1 ? "s" : ""}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </Animation>
  );
}
