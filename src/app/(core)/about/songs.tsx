import { songs } from "@/data/about/songs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-left text-lg font-bold">Listen to my songs</h1>
        <Button size="sm" asChild>
          <Link href="/songs">View all</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {orderedSongs?.slice(0, 4)?.map((item, index) => {
          return (
            <SongItem key={index} {...item} delay={index * ANIMATION_DELAY} />
          );
        })}
      </div>
    </div>
  );
}
