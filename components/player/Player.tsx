"use client";

import { useGetSongById, useGetSongUrl, usePlayerStore } from "@/hooks";
import React, { FC } from "react";
import MediaPlayer from "./MediaPlayer";

const Player: FC = () => {
  const { activeId } = usePlayerStore();
  const { song } = useGetSongById(activeId);
  const songUrl = useGetSongUrl(song);

  if (!song || !songUrl || !activeId) return <p>No song available.</p>;

  return (
    <section className="fixed bottom-0 bg-black w-full py-2 h-[80px] px-4">
      <MediaPlayer />
    </section>
  );
};

export default Player;
