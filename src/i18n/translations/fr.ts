import type { Translations } from "./types";

export const fr = {
  metadata: {
    title: "Alexandre Trotel",
    description:
      "Alexandre Trotel est un entrepreneur tech et développeur full-stack.",
  },
  nav: {
    home: "\\accueil",
    blog: "\\blog",
    github: "\\github",
  },
  home: {
    intro: "",
    name: "Alexandre Trotel",
    bio: ". Développeur full-stack. Je construis, je livre vite, et j'itère. Je préfère du code qui marche à du code qui impressionne.",
    authorOf: "Je dirige",
    zapStudio: "Zap Studio",
    zapStudioDesc:
      "– des outils open-source, des librairies et des templates pour les développeurs qui préfèrent livrer plutôt qu'écrire du boilerplate.",
    checkBlog: "Lire le blog",
  },
  blog: {
    title: "Blog",
    pageTitle: "Blog | Alexandre Trotel",
    view: "vue",
    views: "vues",
  },
  notFound: {
    title: "Page introuvable | Alexandre Trotel",
    message: "Cette page n'existe pas.",
    goBack: "Retour",
  },
} as const satisfies Translations;
