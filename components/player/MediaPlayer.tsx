import { Song as SongType } from "@/types/global";
import React, { FC } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import Song from "../songs/Song";
import LikeButton from "../LikeButton";
import PlayingSong from "./PlayingSong";
import PlayButton from "../songs/PlayButton";

type MediaPlayerProps = {
  song: SongType;
  songUrl: string;
};

const MediaPlayer: FC<MediaPlayerProps> = ({ song, songUrl }) => {
  const Icon = songUrl ? BsPauseFill : BsPlayFill;

  return (
    <section className="grid grid-cols-2 md:grid-cols-3 h-full">
      <aside className="flex w-full justify-start">
        <PlayingSong song={song} />
      </aside>
      <aside
        className="
            flex 
            md:hidden 
            col-auto 
            justify-end 
          "
      >
        <PlayButton
          handleClick={() => console.log("from Mediaplayer")}
          Icon={Icon}
          size={30}
          className="
              h-10
              w-10
              bg-white 
              opacity-100
              p-[5px]
              cursor-pointer
            "
        />
      </aside>
    </section>
  );
};

export default MediaPlayer;
