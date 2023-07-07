"use client";

import Image from "next/image";
import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types/global";
import { usePlayerStore } from "@/hooks";
import { FC } from "react";
import LikeButton from "../LikeButton";

interface PlayingSongProps {
  song: Song;
  onClick?: (id: string) => void;
}

const PlayingSong: FC<PlayingSongProps> = ({ song, onClick }) => {
  const { setId } = usePlayerStore();
  const imageUrl = useLoadImage(song);

  const handleClick = () => {
    if (onClick) return onClick(song.id);

    return setId(song.id);
  };

  return (
    <section
      onClick={handleClick}
      className="
        flex 
        items-center 
        gap-x-3 
        cursor-pointer 
        hover:bg-neutral-800/50 
        w-full 
        p-2 
        rounded-md
      "
    >
      <aside
        className="
          relative 
          rounded-md 
          min-h-[48px] 
          min-w-[48px] 
          overflow-hidden
        "
      >
        <Image
          fill
          src={imageUrl || "/images/music-placeholder.png"}
          alt="Playing song"
          className="object-cover"
        />
      </aside>
      <aside className="flex flex-col gap-y-1 overflow-hidden">
        <p className="text-white truncate">{song.title}</p>
        <p className="text-neutral-400 text-sm truncate">By {song.author}</p>
      </aside>
      <aside className="flex align-middle">
        <LikeButton songId={song.id} />
      </aside>
    </section>
  );
};

export default PlayingSong;
