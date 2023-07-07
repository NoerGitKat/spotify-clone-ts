import { useSessionContext } from "@supabase/auth-helpers-react";
import useAuthStore from "./useAuthStore";
import useUser from "./useUser";
import { useEffect, useMemo, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { toast } from "react-hot-toast";

const useLikeButton = (songId: string) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const { supabaseClient } = useSessionContext();
  const { onOpen } = useAuthStore();
  const { user } = useUser();

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  useEffect(() => {
    if (!user?.id) return;

    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from("liked_songs")
        .select("*")
        .eq("user_id", user.id)
        .eq("song_id", songId)
        .single();

      if (!error && data) setIsLiked(true);
    };

    fetchData();
  }, [user?.id, songId, supabaseClient]);

  const handleLike = async () => {
    if (!user) return onOpen();

    if (isLiked) {
      try {
        const { error } = await supabaseClient
          .from("liked_songs")
          .delete()
          .eq("user_id", user?.id)
          .eq("song_id", songId);

        if (error) throw new Error(error.message);
        setIsLiked(false);
      } catch (error) {
        toast.error("Couldn't unlike song. Try again later.");
      }
    } else {
      try {
        const { error } = await supabaseClient.from("liked_songs").insert({
          user_id: user?.id,
          song_id: songId
        });
        if (error) throw new Error(error.message);
        setIsLiked(true);
      } catch (error) {
        toast.error("Couldn't like song. Try again later.");
      }
    }
  };

  return useMemo(
    () => ({ isLiked, Icon, handleLike }),
    [isLiked, Icon, handleLike]
  );
};

export default useLikeButton;
