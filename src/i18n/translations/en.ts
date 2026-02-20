import type { Translations } from "./types";

export const en = {
  blog: {
    pageTitle: "Blog | Alexandre Trotel",
    readPost: "Read blog post: {title}",
    title: "Blog",
    view: "view",
    views: "views",
  },
  home: {
    authorOf: "I run",
    bio: "Full-stack developer. I build things, ship fast, and iterate. I care about code that works, not code that impresses.",
    checkBlog: "Read the blog",
    intro: "",
    name: "Alexandre Trotel.",
    zapStudio: "Zap Studio",
    zapStudioDesc:
      "– open-source tools, libraries, and templates for developers who'd rather ship than write boilerplate.",
  },
  metadata: {
    description:
      "Alexandre Trotel is a tech entrepreneur and full-stack developer.",
    title: "Alexandre Trotel",
  },
  nav: {
    blog: "\\blog",
    github: "\\github",
    home: "\\home",
  },
  notFound: {
    goBack: "Go back",
    message: "This page does not exist.",
    title: "Not Found | Alexandre Trotel",
  },
} as const satisfies Translations;
