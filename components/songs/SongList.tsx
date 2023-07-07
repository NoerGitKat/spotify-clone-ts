"use client";

import { Song as TSong } from "@/types/global";
import { FC } from "react";
import Song from "./Song";
import { usePlaylist } from "@/hooks";

type SongListProps = {
  songs: TSong[] | [];
  isRow?: boolean;
  hasLikeButton?: boolean;
};

const SongList: FC<SongListProps> = ({ songs, isRow, hasLikeButton }) => {
  const onPlay = usePlaylist(songs);

  if (songs.length === 0)
    return <p className="mt-4 text-neutral-400 px-6">No available songs.</p>;

  return (
    <ul
      className={
        isRow
          ? "flex flex-col gap-y-2 mt-4 px-3"
          : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4"
      }
    >
      {songs.map((song) => (
        <Song
          key={song.id}
          onClick={(id: string) => onPlay(id)}
          song={song}
          isRow={isRow}
          hasLikeButton={hasLikeButton}
        />
      ))}
    </ul>
  );
};

export default SongList;
