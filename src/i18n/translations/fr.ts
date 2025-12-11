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
    intro: "Je suis",
    name: "Alexandre Trotel",
    bio: ", un entrepreneur tech et développeur full stack avec des intérêts pour le développement web, le machine learning et l'open source.",
    authorOf: "Je suis également le fondateur de",
    zapStudio: "Zap Studio",
    zapStudioDesc:
      "– où nous aidons les développeurs et les entreprises à créer des applications puissantes en fournissant des templates et des outils de haute qualité.",
    checkBlog: "Découvrez mon blog",
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
