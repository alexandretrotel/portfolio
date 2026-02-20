import type { Translations } from "./types";

export const fr = {
  blog: {
    pageTitle: "Blog | Alexandre Trotel",
    readPost: "Lire l'article : {title}",
    title: "Blog",
    view: "vue",
    views: "vues",
  },
  home: {
    authorOf: "Je dirige",
    bio: "Développeur full-stack. Je construis, je livre vite, et j'itère. Je préfère du code qui marche à du code qui impressionne.",
    checkBlog: "Lire le blog",
    intro: "",
    name: "Alexandre Trotel.",
    zapStudio: "Zap Studio",
    zapStudioDesc:
      "– des outils open-source, des librairies et des templates pour les développeurs qui préfèrent livrer plutôt qu'écrire du boilerplate.",
  },
  metadata: {
    description:
      "Alexandre Trotel est un entrepreneur tech et développeur full-stack.",
    title: "Alexandre Trotel",
  },
  nav: {
    blog: "\\blog",
    github: "\\github",
    home: "\\accueil",
  },
  notFound: {
    goBack: "Retour",
    message: "Cette page n'existe pas.",
    title: "Page introuvable | Alexandre Trotel",
  },
} as const satisfies Translations;
