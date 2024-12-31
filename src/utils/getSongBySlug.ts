import { songs } from "@/data/about/songs";

export const getSongBySlug = (slug: string) => {
  return songs.find((song) => song.slug === slug);
};
