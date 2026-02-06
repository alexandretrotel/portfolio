export interface Translations {
  metadata: {
    title: string;
    description: string;
  };
  nav: {
    home: string;
    blog: string;
    github: string;
  };
  home: {
    intro: string;
    name: string;
    bio: string;
    authorOf: string;
    zapStudio: string;
    zapStudioDesc: string;
    checkBlog: string;
  };
  blog: {
    title: string;
    pageTitle: string;
    view: string;
    views: string;
    readPost: string;
  };
  notFound: {
    title: string;
    message: string;
    goBack: string;
  };
}
