import { Song } from "@/types/global";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { toast } from "react-hot-toast";

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
