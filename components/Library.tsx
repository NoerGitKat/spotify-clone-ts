"use client";

import { useAuthStore, useUploadStore, useUser } from "@/hooks";
import { Song } from "@/types/global";
import { FC } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";
import { SongList } from "./songs";

interface LibraryProps {
  userSongs: Song[];
}

const Library: FC<LibraryProps> = ({ userSongs }) => {
  const { onOpen: openAuthModal } = useAuthStore();
  const { onOpen: openUploadModal } = useUploadStore();
  const { user } = useUser();

  const onClick = () => {
    if (!user) {
      return openAuthModal();
    }

    // TODO: Check for subscription

    return openUploadModal();
  };

  return (
    <section className="flex flex-col">
      <aside className="flex items-center justify-between px-5 pt-4">
        <aside className="inline-flex items-center gap-x-2">
          <TbPlaylist />
          <p className="text-neutral-400 font-medium text-md">Your Library</p>
        </aside>
        <AiOutlinePlus
          onClick={onClick}
          size={20}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </aside>
      <aside className="flex flex-col gap-y-2 mt-4 px-3">
        <SongList songs={userSongs} isRow />
      </aside>
    </section>
  );
};

export default Library;
