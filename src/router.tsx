import { createRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";

export const getRouter = () =>
  createRouter({
    defaultPreload: "intent",
    routeTree,
    scrollRestoration: true,
  });
