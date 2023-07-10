import { useCallback, useMemo, useState } from "react";
import useUser from "./useUser";
import { Price } from "@/types/global";
import { toast } from "react-hot-toast";
import { getStripe, postPrice } from "@/libs";
import { useSubscribeStore } from ".";

const useCheckout = () => {
  const [priceIdLoading, setPriceIdLoading] = useState<string | undefined>();
  const { onClose, isOpen } = useSubscribeStore();
  const { user, isLoading, subscription } = useUser();

  const onChange = useCallback(
    (open: boolean) => {
      if (!open) {
        onClose();
      }
    },
    [onClose]
  );

  const handleCheckout = useCallback(
    async (price: Price) => {
      setPriceIdLoading(price.id);

      if (!user) {
        throw new Error("You must log in first.");
      }

      if (subscription) {
        throw new Error("You're already subscribed!");
      }

      try {
        const { sessionId } = await postPrice({
          url: "/api/create-checkout-session",
          data: { price }
        });

        const stripe = await getStripe();
        stripe?.redirectToCheckout({ sessionId });
      } catch (error: any) {
        return toast.error(error);
      } finally {
        setPriceIdLoading(undefined);
      }
    },
    [subscription, user]
  );

  return useMemo(
    () => ({
      isLoading,
      handleCheckout,
      onChange,
      isOpen,
      priceIdLoading,
      subscription
    }),
    [handleCheckout, isLoading, onChange, isOpen, priceIdLoading, subscription]
  );
};

export default useCheckout;
