import { UserDetails } from "@/types/global";
import {
  useSessionContext,
  useUser as useSupaUser
} from "@supabase/auth-helpers-react";
import { User } from "@supabase/supabase-js";
import { createContext, useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Stripe from "stripe";

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  subscription: Stripe.Subscription | null;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export interface UserContextProps {
  [propName: string]: unknown;
}

export const UserContextProvider = (props: UserContextProps) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase
  } = useSessionContext();
  const user = useSupaUser();
  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [subscription, setSubscription] = useState<Stripe.Subscription | null>(
    null
  );

  const getUserDetails = useCallback(
    () => supabase.from("users").select("*").single(),
    [supabase]
  );
  const getSubscription = useCallback(
    () =>
      supabase
        .from("subscriptions")
        .select("*, prices(*, products(*))")
        .in("status", ["trialing", "active"])
        .single(),
    [supabase]
  );

  useEffect(() => {
    if (user && !isLoadingData && !userDetails && !subscription) {
      setIsLoadingData(true);

      Promise.allSettled([getUserDetails(), getSubscription()])
        .then((results) => {
          const userDetailsPromise = results[0];
          const subscriptionPromise = results[1];

          if (userDetailsPromise.status === "fulfilled") {
            setUserDetails(userDetailsPromise.value?.data as UserDetails);
            toast.success("Successfully logged in!");
          }

          if (subscriptionPromise.status === "fulfilled") {
            setSubscription(subscriptionPromise.value?.data);
          }
        })
        .catch((error) => console.error(error))
        .finally(() => setIsLoadingData(false));
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null);
      setSubscription(null);
    }
  }, [
    getSubscription,
    getUserDetails,
    isLoadingData,
    isLoadingUser,
    subscription,
    user,
    userDetails
  ]);

  const contextValue = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
    subscription
  };

  return <UserContext.Provider value={contextValue} {...props} />;
};
