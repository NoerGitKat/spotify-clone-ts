import { Song } from "@/types/global";
import usePlayerStore from "./usePlayerStore";
import useAuthStore from "./useAuthStore";
import useUser from "./useUser";
import useSubscribeStore from "./useSubscribeStore";

const usePlaylist = (songs: Song[]) => {
  const { setId, setIds } = usePlayerStore();
  const { onOpen: openAuthModal } = useAuthStore();
  const { onOpen: openSubscribeModal } = useSubscribeStore();
  const { user, subscription } = useUser();

  const onPlay = (id: string) => {
    if (!user) return openAuthModal();
    if (!subscription) return openSubscribeModal();

    setId(id);
    setIds(songs.map((song) => song.id));
  };

  return onPlay;
};

export default usePlaylist;
