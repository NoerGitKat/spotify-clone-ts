import { Song } from "@/types/global";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useGetSongUrl = (song: Song | undefined) => {
  const supabaseClient = useSupabaseClient();

  if (!song) return undefined;

  const { data } = supabaseClient.storage
    .from("songs")
    .getPublicUrl(song.song_path);

  return data.publicUrl;
};

export default useGetSongUrl;
