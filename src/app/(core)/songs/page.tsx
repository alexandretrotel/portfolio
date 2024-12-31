import { songs } from "@/data/about/songs";
import Animation from "@/components/core/animation";
import { SongItem } from "@/components/features/song-item";
import { ANIMATION_DELAY } from "@/data/animation";

export default async function Songs() {
  const featuredSongs = songs
    ?.filter((project) => project.featured)
    ?.sort((a, b) => b.date.getTime() - a.date.getTime());

  const otherSongs = songs
    ?.filter((project) => !project.featured)
    ?.sort((a, b) => b.date.getTime() - a.date.getTime());

  const orderedSongs = [...featuredSongs, ...otherSongs];

  return (
    <Animation>
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-lg font-bold">My songs</h1>
          <p className="text-sm text-muted-foreground">
            Listen to some of my songs.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {orderedSongs?.map((song, index) => (
            <Animation key={song.title} delay={index * ANIMATION_DELAY}>
              <SongItem key={song.title} heightFull {...song} />
            </Animation>
          ))}
        </div>
      </div>
    </Animation>
  );
}
