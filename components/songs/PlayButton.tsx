import React, { FC, ReactNode } from "react";
import { IconType } from "react-icons";
import { FaPlay } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

interface PlayButtonProps {
  className?: string;
  Icon?: IconType;
  size?: number;
  handleClick: () => void;
}

const PlayButton: FC<PlayButtonProps> = ({
  className,
  Icon = FaPlay,
  handleClick,
  size
}) => {
  return (
    <button
      onClick={handleClick}
      className={twMerge(
        "transition opacity-0 rounded-full flex bg-green-500 p-4 drop-shadow-md group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110",
        className
      )}
    >
      <Icon className="text-black" size={size} />
    </button>
  );
};

export default PlayButton;
