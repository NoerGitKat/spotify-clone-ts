import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

const Library = () => {
  return (
    <section className="flex flex-col">
      <aside className="flex items-center justify-between px-5 pt-4">
        <aside className="inline-flex items-center gap-x-2">
          <TbPlaylist />
          <p className="text-neutral-400 font-medium text-md">Your Library</p>
        </aside>
        <AiOutlinePlus
          size={20}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </aside>
      <aside className="flex flex-col gap-y-2 mt-4 px-3">List of Songs</aside>
    </section>
  );
};

export default Library;
