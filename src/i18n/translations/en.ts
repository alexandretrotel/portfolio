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
    intro: "I'm",
    name: "Alexandre Trotel",
    bio: ", a tech entrepreneur and full stack developer with interests in web development, machine learning, and open source.",
    authorOf: "I'm also the founder of",
    zapStudio: "Zap Studio",
    zapStudioDesc:
      "– where we help developers and businesses create powerful applications by providing high-quality templates and tools.",
    checkBlog: "Check out my blog",
  },
  blog: {
    title: "Blog",
    pageTitle: "Blog | Alexandre Trotel",
    view: "view",
    views: "views",
  },
  notFound: {
    title: "Not Found | Alexandre Trotel",
    message: "This page does not exist.",
    goBack: "Go back",
  },
} as const satisfies Translations;
