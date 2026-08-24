import { markdownTwinRoutes } from "../../lib/markdown-twin";

export const { getStaticPaths, GET } = markdownTwinRoutes("essays");
