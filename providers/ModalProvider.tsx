"use client";

import { useMountCheck } from "@/hooks";
import { FC } from "react";

const ModalProvider: FC<Record<string, never>> = () => {
  const { isMounted } = useMountCheck();

  if (!isMounted) return null;

  return <>Modal</>;
};

export default ModalProvider;
