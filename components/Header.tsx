"use client";

import { useAuthStore, useUser } from "@/hooks";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { FC, ReactNode, useEffect } from "react";
import { toast } from "react-hot-toast";
import { BiSearch } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { twMerge } from "tailwind-merge";
import Button from "./Button";

type HeaderProps = {
  children: ReactNode;
  className?: string;
};

const Header: FC<HeaderProps> = ({ children, className }) => {
  const { back, forward, refresh, push } = useRouter();
  const { onOpen } = useAuthStore();

  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  useEffect(() => {
    if (user) toast.success("Successfully logged in!");
  }, [user]);

  const handleLogout = async () => {
    try {
      const { error } = await supabaseClient.auth.signOut();
      if (error) toast(error.message);

      refresh();
      toast.success("Logged out!");
    } catch (err) {
      toast(err as string);
    }
  };

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
          {user ? (
            <>
              <Button onClick={handleLogout} className="bg-white px-6 py-2">
                Log out
              </Button>
              <Button onClick={() => push("/account")} className="bg-white">
                <FaUserAlt />
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={onOpen}
                className="bg-transparent text-neutral-300 font-medium"
              >
                Sign Up
              </Button>
              <Button onClick={onOpen} className="bg-white px-6 py-2">
                Log In
              </Button>
            </>
          )}
        </div>
      </aside>
      {children}
    </header>
  );
};

export default Header;
