import { User } from "@supabase/auth-helpers-nextjs";

type UserContext = {
  accessToken: string | null;
  user: User | null;
};

export const UserContextProvider = () => {};

const useUser = () => {};

export default useUser;
