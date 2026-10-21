import { getCollection } from "astro:content";

export const getSortedEssays = async () => {
  const essays = await getCollection("essays");
  return essays.toSorted(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );
};
