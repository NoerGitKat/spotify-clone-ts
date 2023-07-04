"use client";

import { useAuthStore } from "@/hooks";
import { useRouter } from "next/navigation";
import { FC, ReactNode } from "react";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { twMerge } from "tailwind-merge";
import Button from "./Button";

type HeaderProps = {
  children: ReactNode;
  className?: string;
};

const Header: FC<HeaderProps> = ({ children, className }) => {
  const { back, forward } = useRouter();
  const { onOpen } = useAuthStore();
  return (
    <header
      className={twMerge(
        "h-fit bg-gradient-to-b from-emerald-800 p-6",
        className
      )}
    >
      <aside className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            onClick={back}
            className="rounded-full 
              bg-black 
              flex 
              items-center 
              justify-center 
              cursor-pointer 
              hover:opacity-75 
              transition"
          >
            <RxCaretLeft className="text-white" size={35} />
          </button>
          <button
            onClick={forward}
            className="rounded-full 
              bg-black 
              flex 
              items-center 
              justify-center 
              cursor-pointer 
              hover:opacity-75 
              transition"
          >
            <RxCaretRight className="text-white" size={35} />
          </button>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <HiHome className="text-black" size={20} />
          </button>
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <BiSearch className="text-black" size={20} />
          </button>
        </div>
        <div className="flex justify-between items-center gap-x-4">
          <Button
            onClick={onOpen}
            className="bg-transparent text-neutral-300 font-medium"
          >
            Sign Up
          </Button>
          <Button onClick={onOpen} className="bg-white px-6 py-2">
            Log In
          </Button>
        </div>
      </aside>
      {children}
    </header>
  );
};

export default Header;
