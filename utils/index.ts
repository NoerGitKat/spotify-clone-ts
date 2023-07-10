import { Price } from "@/types/global";

export const formatPrice = (price: Price) => {
  const stringifiedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currency,
    minimumFractionDigits: 0
  }).format((price?.unit_amount || 0) / 100);

  return stringifiedPrice;
};
