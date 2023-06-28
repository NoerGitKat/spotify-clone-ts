"use client"

import { useSidebar } from "@/hooks"
import Box from "./Box"

interface ISidebarProps {
  children: React.ReactNode
}

const Sidebar: React.FC<ISidebarProps> = ({ children }) => {
  const { routes, pathname } = useSidebar()

  return (
    <aside className="flex h-full">
      <section className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
        <Box>Sidebar Nav</Box>
        <Box className="overflow-y-auto h-full">Song Library</Box>
      </section>
    </aside>
  )
}

export default Sidebar
