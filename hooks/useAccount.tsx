import { useCallback, useEffect, useState } from "react";
import useUser from "./useUser";
import { useRouter } from "next/navigation";
import { postPrice } from "@/libs";

const useAccount = () => {
  const { replace } = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (!user) replace("/");
  }, [user, replace]);

  const redirectToCustomerPortal = useCallback(async () => {
    try {
      const { url, error } = await postPrice({
        url: "/api/create-portal-link"
      });
      if (error) throw new Error(error.message);
      window.location.assign(url);
    } catch (error) {
      if (error) return alert((error as Error).message);
    }
  }, []);

  return { redirectToCustomerPortal };
};

export default useAccount;
