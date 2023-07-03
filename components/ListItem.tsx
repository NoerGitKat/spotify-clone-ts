"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { FaPlay } from "react-icons/fa";

type ListItemProps = {
  image: string;
  name: string;
  href: string;
};

const ListItem: FC<ListItemProps> = ({ image, name, href }) => {
  const { push } = useRouter();

  const handleClick = () => {
    push(href);
  };
  return (
    <li>
      <button
        onClick={handleClick}
        className="
        relative 
        group 
        flex   
        items-center 
        rounded-md 
        overflow-hidden 
        gap-x-4 
        bg-neutral-100/10 
        cursor-pointer 
        hover:bg-neutral-100/20 
        transition 
        pr-4
        w-full
        "
      >
        <aside className="relative min-h-[80px] min-w-[80px]">
          <Image
            className="object-cover"
            fill
            src={image}
            alt={`${name} Image`}
          />
        </aside>
        <p className="font-semibold">{name}</p>
        <aside
          className="
         absolute 
         transition 
         opacity-0 
         rounded-full 
         flex 
         items-center 
         justify-center 
         bg-green-500 
         p-4 
         drop-shadow-md 
         right-5
         group-hover:opacity-100 
         hover:scale-110"
        >
          <FaPlay className="text-black" />
        </aside>
      </button>
    </li>
  );
};

export default ListItem;
