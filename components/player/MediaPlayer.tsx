import { Song as SongType } from "@/types/global";
import React, { FC } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import PlayingSong from "./PlayingSong";
import PlayButton from "../songs/PlayButton";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerXMark, HiSpeakerWave } from "react-icons/hi2";
import VolumeSlider from "./VolumeSlider";

type MediaPlayerProps = {
  song: SongType;
  songUrl: string;
};

const MediaPlayer: FC<MediaPlayerProps> = ({ song, songUrl }) => {
  const PlayIcon = songUrl ? BsPauseFill : BsPlayFill;
  const VolumeIcon = songUrl ? HiSpeakerXMark : HiSpeakerWave;

  return (
    <section className="grid grid-cols-2 md:grid-cols-3 h-full">
      <aside className="flex w-full justify-start">
        <PlayingSong song={song} />
      </aside>
      {/* Mobile play button */}
      <aside
        className="
            flex 
            md:hidden 
            col-auto 
            justify-end
            items-center
          "
      >
        <PlayButton
          handleClick={() => console.log("from Mediaplayer")}
          Icon={PlayIcon}
          size={30}
          className="
              h-10
              w-10
              bg-white 
              opacity-100
              p-[5px]
              m-[1rem]
              cursor-pointer
            "
        />
      </aside>
      {/* Desktop play button */}
      <aside
        className="
            hidden
            h-full
            md:flex 
            justify-center 
            items-center 
            w-full 
            max-w-[722px] 
            gap-x-6
          "
      >
        <AiFillStepBackward
          onClick={() => console.log("TODO")}
          size={30}
          className="
              text-neutral-400 
              cursor-pointer 
              hover:text-white 
              transition
            "
        />
        <PlayButton
          handleClick={() => console.log("from Mediaplayer")}
          Icon={PlayIcon}
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
        <AiFillStepForward
          onClick={() => console.log("TODO")}
          size={30}
          className="
              text-neutral-400 
              cursor-pointer 
              hover:text-white 
              transition
            "
        />
      </aside>
      <aside className="hidden md:flex w-full justify-end pr-2">
        <div className="flex justify-end items-center gap-x-2 w-[120px]">
          <VolumeIcon
            onClick={() => console.log("clicked on volume")}
            className="cursor-pointer"
            size={34}
          />
          <VolumeSlider />
        </div>
      </aside>
    </section>
  );
};

export default MediaPlayer;
