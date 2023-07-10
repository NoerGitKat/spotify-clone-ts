"use client";

import { FC } from "react";
import Modal from "../Modal";
import { Price, ProductWithPrice } from "@/types/global";
import useCheckout from "@/hooks/useCheckout";
import Button from "../Button";
import { formatPrice } from "@/utils";

interface ISubscribeModalProps {
  activeProducts: ProductWithPrice[];
}

const SubscribeModal: FC<ISubscribeModalProps> = ({ activeProducts }) => {
  const {
    isLoading,
    handleCheckout,
    onChange,
    isOpen,
    priceIdLoading,
    subscription
  } = useCheckout();

  let content: JSX.Element = (
    <aside className="text-center">No products available.</aside>
  );

  if (activeProducts.length) {
    content = (
      <aside>
        {activeProducts.map((product: ProductWithPrice) => {
          if (!product.prices?.length) {
            return <p key={product.id}>No prices available.</p>;
          }

          return product.prices.map((price: Price) => (
            <Button
              key={price.id}
              onClick={() => handleCheckout(price)}
              disabled={isLoading || price.id === priceIdLoading}
              className="mb-4"
            >
              {`Subscribe for ${formatPrice(price)} a ${price.interval}`}
            </Button>
          ));
        })}
      </aside>
    );
  }

  if (subscription) {
    content = (
      <aside className="bg-orange-300 p-2">You are already subscribed!</aside>
    );
  }

  return (
    <Modal
      title="Only for premium users"
      description="Listen to music with Spotify Premium!"
      isOpen={isOpen}
      onChange={onChange}
    >
      {content}
    </Modal>
  );
};

export default SubscribeModal;
