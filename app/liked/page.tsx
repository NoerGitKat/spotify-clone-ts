import { getLikedSongs } from "@/actions";
import { Header, SongList } from "@/components";
import Image from "next/image";

export default async function LikedSongs(): Promise<JSX.Element> {
  const songs = await getLikedSongs();

  return (
    <main className="bg-neutral-900 rounded-lg h-full w-full overflow-hdden overflow-y-auto">
      <Header className="from-bg-neutral-900">
        <section className="flex flex-col md:flex-row items-center gap-x-5">
          <aside className="relative h-32 w-32 lg:h-44 lg:2-44">
            <Image
              src="/images/liked.png"
              alt="Liked Playlist"
              fill
              className="object-cover"
            />
          </aside>
          <aside className="flex flex-col gap-y-2 mt-4 md:mt-0">
            <p className="hidden md:block font-semibold text-sm">Playlist</p>
            <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-bold">
              Liked songs
            </h1>
          </aside>
        </section>
      </Header>
      <SongList songs={songs} isRow hasLikeButton />
    </main>
  );
}
