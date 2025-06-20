import type { Posts } from "@/types/posts";

export const posts: Posts = [
  {
    slug: "how-i-made-this-blog",
    title: "How I made this blog?",
    description: "I write about how I made this blog.",
    date: new Date("2025-02-21"),
  },
  {
    slug: "stories-and-the-lessons-we-learn",
    title: "Stories and the lessons we learn",
    description:
      "This article talks about what makes stories special. It’s not just about action or power—it’s about the deep lessons they teach us. Using Mob Psycho 100 as an example, I share how stories help us grow and understand ourselves.",
    date: new Date("2025-04-06"),
  },
  {
    slug: "what-we-know-about-life",
    title: "What we know about life?",
    description:
      "I've came across a lot of content this week that questioned the meaning of life and the purpose of our existence. Here is what I discovered.",
    date: new Date("2025-04-28"),
  },
];
