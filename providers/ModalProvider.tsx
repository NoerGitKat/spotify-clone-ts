"use client";

import { AuthModal } from "@/components/auth";
import { SubscribeModal } from "@/components/subscription";
import { UploadModal } from "@/components/upload";
import { useMountCheck } from "@/hooks";
import { ProductWithPrice } from "@/types/global";
import { FC } from "react";

interface ModalProviderProps {
  activeProducts: ProductWithPrice[];
}

const ModalProvider: FC<ModalProviderProps> = ({ activeProducts }) => {
  const { isMounted } = useMountCheck();

  if (!isMounted) return null;

  return (
    <>
      <AuthModal />
      <UploadModal />
      <SubscribeModal activeProducts={activeProducts} />
    </>
  );
};

export default ModalProvider;
