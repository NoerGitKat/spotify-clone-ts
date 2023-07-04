"use client";

import { AuthModal } from "@/components/auth";
import { UploadModal } from "@/components/upload";
import { useMountCheck } from "@/hooks";
import { FC } from "react";

const ModalProvider: FC<Record<string, never>> = () => {
  const { isMounted } = useMountCheck();

  if (!isMounted) return null;

  return (
    <>
      <AuthModal />
      <UploadModal />
    </>
  );
};

export default ModalProvider;
