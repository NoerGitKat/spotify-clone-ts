import { Song } from "@/types/global";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const getSongs = async (): Promise<Song[] | []> => {
  const supabase = createServerComponentClient({
    cookies
  });

  try {
    const { data, error } = await supabase
      .from("songs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error(error.message);

    return data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getSongsByUserId = async (): Promise<Song[] | []> => {
  const supabase = createServerComponentClient({
    cookies
  });

  try {
    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();

    if (sessionError) throw new Error(sessionError.message);

    const { data: songs, error: songsError } = await supabase
      .from("songs")
      .select("*")
      .eq("user_id", sessionData.session?.user.id)
      .order("created_at", { ascending: false });

    if (songsError) throw new Error(songsError.message);

    return songs || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getSongsByTitle = async (title: string): Promise<Song[] | []> => {
  const supabase = createServerComponentClient({
    cookies
  });

  try {
    const { data: songs, error: songsError } = await supabase
      .from("songs")
      .select("*")
      .ilike("title", `%${title}%`)
      .order("created_at", { ascending: false });

    if (songsError) throw new Error(songsError.message);

    return songs || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getLikedSongs = async (): Promise<Song[] | []> => {
  const supabase = createServerComponentClient({
    cookies
  });

  try {
    const {
      data: { session }
    } = await supabase.auth.getSession();

    const { data, error } = await supabase
      .from("liked_songs")
      .select("*, songs(*)")
      .eq("user_id", session?.user.id)
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);

    return data.map(({ songs }) => ({
      ...songs
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};
