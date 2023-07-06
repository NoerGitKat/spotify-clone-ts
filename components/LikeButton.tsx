"use client";

import { useLikeButton } from "@/hooks";
import { FC } from "react";

type LikeButtonProps = {
  songId: string;
};

const LikeButton: FC<LikeButtonProps> = ({ songId }) => {
  const { isLiked, Icon, handleLike } = useLikeButton(songId);
  return (
    <button
      className="
    cursor-pointer 
    hover:opacity-75 
    transition
  "
      onClick={handleLike}
    >
      <Icon color={isLiked ? "#22c55e" : "white"} size={25} />
    </button>
  );
};

export default LikeButton;
