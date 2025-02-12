import { songs } from "@/data/songs";

export const getSongBySlug = (slug: string) => {
  return songs.find((song) => song.slug === slug);
};
