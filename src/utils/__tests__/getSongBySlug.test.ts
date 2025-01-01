import { songs } from "@/data/songs";
import { getSongBySlug } from "../getSongBySlug";

describe("getSongBySlug", () => {
  it("should return a song by slug", () => {
    const song = getSongBySlug("feelings");

    expect(song).toEqual(songs?.find((song) => song.slug === "feelings"));
  });

  it("should return undefined if song is not found", () => {
    const song = getSongBySlug("song-404");

    expect(song).toBeUndefined();
  });
});
