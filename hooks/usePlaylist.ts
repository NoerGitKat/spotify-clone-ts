import { Song } from "@/types/global";
import usePlayerStore from "./usePlayerStore";
import useAuthStore from "./useAuthStore";
import useUser from "./useUser";

const usePlaylist = (songs: Song[]) => {
  const { setId, setIds } = usePlayerStore();
  const { onOpen } = useAuthStore();
  const { user } = useUser();

  const onPlay = (id: string) => {
    if (!user) return onOpen();

    setId(id);
    setIds(songs.map((song) => song.id));
  };

  return onPlay;
};

export default usePlaylist;
