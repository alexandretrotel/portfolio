import Link from "next/link";
import { Animation } from "@/components/animation";
import { getBlogPosts } from "@/lib/blog";
import { cn } from "@/lib/utils";

export default async function Blog() {
  const posts = await getBlogPosts();

  return (
    <Animation>
      <div className="flex flex-col gap-6">
        <ul className="flex flex-col">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                aria-label={`Read blog post: ${post.title}`}
                className="group flex flex-col items-start gap-1 rounded-sm py-4 transition-all hover:bg-muted/50 active:scale-95 md:flex-row md:items-center md:gap-4 md:p-4"
                href={`/blog/${post.slug}`}
              >
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span
                    className={cn(
                      "shrink-0 font-light text-muted-foreground text-xs md:w-20",
                      {
                        "opacity-0": !post.showDate,
                      }
                    )}
                  >
                    {post.formattedDate}
                  </span>
                </div>

                <span className="flex-1 font-medium text-base text-foreground">
                  {post.title}
                </span>

                {!!post.views && post.views > 0 && (
                  <span className="hidden text-right font-light text-muted-foreground text-xs md:flex">
                    {post.formattedViews} view{post.views > 1 ? "s" : ""}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Animation>
  );
}
