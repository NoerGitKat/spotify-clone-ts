"use client";

import { Song as TSong } from "@/types/global";
import { FC } from "react";
import Song from "./Song";

type SongListProps = {
  songs: TSong[] | [];
  isLibrary?: boolean;
};

const SongList: FC<SongListProps> = ({ songs, isLibrary }) => {
  if (songs.length === 0)
    return <p className="mt-4 text-neutral-400">No available songs.</p>;

  console.log("isLibrary", isLibrary);

  return (
    <ul
      className={
        isLibrary
          ? "flex flex-col gap-y-2 mt-4 px-3"
          : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4"
      }
    >
      {songs.map((song) => (
        <Song
          key={song.id}
          onClick={(id: string) => console.log(id)}
          song={song}
          isLibrary={isLibrary}
        />
      ))}
    </ul>
  );
};

export default SongList;
