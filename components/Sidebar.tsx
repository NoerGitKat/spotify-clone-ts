"use client";

import { ReactNode, FC } from "react";
import { useSidebar } from "@/hooks";
import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";
import { Song } from "@/types/global";

interface ISidebarProps {
  children: ReactNode;
  userSongs: Song[];
}

const Sidebar: FC<ISidebarProps> = ({ userSongs, children }) => {
  const { routes } = useSidebar();

  return (
    <section className="flex h-full">
      <aside className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
        <Box className="flex flex-col gap-y-4 px-5 py-4">
          {routes.map((route) => (
            <SidebarItem key={route.label} {...route} />
          ))}
        </Box>
        <Box className="overflow-y-auto h-full">
          <Library userSongs={userSongs} />
        </Box>
      </aside>
      <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
    </section>
  );
};

export default Sidebar;
