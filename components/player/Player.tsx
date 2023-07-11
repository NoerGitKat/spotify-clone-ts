"use client";

import {
  useGetSongById,
  useGetSongUrl,
  useMediaPlayer,
  usePlayerStore
} from "@/hooks";
import { FC } from "react";
import MediaPlayer from "./MediaPlayer";

const Player: FC = () => {
  const { activeId } = usePlayerStore();
  const { stop } = useMediaPlayer();
  const { song } = useGetSongById(activeId);
  const songUrl = useGetSongUrl(song);

  if (!song || !songUrl || !activeId) {
    stop();
    return null;
  }

  return (
    <section className="fixed bottom-0 bg-black w-full py-2 h-[80px] px-4">
      <MediaPlayer />
    </section>
  );
};

export default Player;
