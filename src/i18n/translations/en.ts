import type { Translations } from "./types";

export const en = {
  metadata: {
    title: "Alexandre Trotel",
    description:
      "Alexandre Trotel is a tech entrepreneur and full-stack developer.",
  },
  nav: {
    home: "\\home",
    blog: "\\blog",
    github: "\\github",
  },
  home: {
    intro: "",
    name: "Alexandre Trotel.",
    bio: "Full-stack developer. I build things, ship fast, and iterate. I care about code that works, not code that impresses.",
    authorOf: "I run",
    zapStudio: "Zap Studio",
    zapStudioDesc:
      "– open-source tools, libraries, and templates for developers who'd rather ship than write boilerplate.",
    checkBlog: "Read the blog",
  },
  blog: {
    title: "Blog",
    pageTitle: "Blog | Alexandre Trotel",
    view: "view",
    views: "views",
    readPost: "Read blog post: {title}",
  },
  notFound: {
    title: "Not Found | Alexandre Trotel",
    message: "This page does not exist.",
    goBack: "Go back",
  },
} as const satisfies Translations;
