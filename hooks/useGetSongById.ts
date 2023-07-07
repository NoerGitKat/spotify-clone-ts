import { Song } from "@/types/global";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

const useGetSongById = (songId?: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [song, setSong] = useState<Song | undefined>(undefined);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!songId) return;

    const fetchSongById = async (songId: string) => {
      try {
        const { data, error } = await supabaseClient
          .from("songs")
          .select("*")
          .eq("id", songId)
          .single();

        if (error) throw new Error(error.message);

        setIsLoading(false);

        return setSong(data as Song);
      } catch (error) {
        setIsLoading(false);
        toast.error(error as string);
      }
    };

    fetchSongById(songId);
  }, [songId, supabaseClient]);

  return useMemo(() => ({ isLoading, song }), [isLoading, song]);
};

export default useGetSongById;
