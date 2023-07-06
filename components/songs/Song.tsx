"use client";

import Image from "next/image";

import { useLoadImage } from "@/hooks";
import { Song } from "@/types/global";
import { FC } from "react";
import PlayButton from "./PlayButton";
import LikeButton from "../LikeButton";

interface SongProps {
  song: Song;
  onClick: (id: string) => void;
  isRow?: boolean;
  hasLikeButton?: boolean;
}

const Song: FC<SongProps> = ({ song, onClick, isRow, hasLikeButton }) => {
  const imagePath = useLoadImage(song);

  const turnOnPlayer = () => {
    if (onClick) return onClick(song.id);
  };

  return (
    <li
      onClick={turnOnPlayer}
      className={
        isRow
          ? "flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md"
          : "relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3"
      }
    >
      <aside
        className={
          isRow
            ? "relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden"
            : "relative aspect-square w-full h-full rounded-md overflow-hidden"
        }
      >
        <Image
          className="object-cover"
          src={imagePath || "/images/music-placeholder.png"}
          fill
          alt="Image"
        />
      </aside>
      {isRow ? (
        <section className="flex justify-between">
          <aside className="flex flex-col gap-y-1 overflow-hidden">
            <p className="text-white truncate">{song.title}</p>
            <p className="text-neutral-400 text-sm truncate">
              By {song.author}
            </p>
          </aside>
          {hasLikeButton ? (
            <aside className="flex align-middle ml-4">
              <LikeButton songId={song.id} />
            </aside>
          ) : null}
        </section>
      ) : (
        <>
          <aside className="flex flex-col items-start w-full pt-4 gap-y-1">
            <p className="font-semibold truncate w-full">{song.title}</p>
            <p
              className="
            text-neutral-400 
            text-sm 
            pb-4 
            w-full 
            truncate
          "
            >
              By {song.author}
            </p>
          </aside>
          <aside
            className="
          absolute 
          bottom-24 
          right-5
        "
          >
            <PlayButton />
          </aside>
        </>
      )}
    </li>
  );
};

export default Song;
