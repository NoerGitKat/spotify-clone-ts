import { ProductWithPrice } from "@/types/global";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const getActiveProductsWithPrices = async (): Promise<
  ProductWithPrice[]
> => {
  const supabase = createServerComponentClient({
    cookies
  });

  try {
    const { data: products, error } = await supabase
      .from("products")
      .select("*, prices(*)")
      .eq("active", true)
      .eq("prices.active", true)
      .order("metadata->index")
      .order("unit_amount", { foreignTable: "prices" });

    if (error) throw new Error(error.message);

    return products;
  } catch (error) {
    console.error(error);
    return [];
  }
};
