"use client";

import { Modal } from "@/components";
import { useMountCheck } from "@/hooks";
import { FC } from "react";

const ModalProvider: FC<Record<string, never>> = () => {
  const { isMounted } = useMountCheck();

  if (!isMounted) return null;

  return (
    <>
      <Modal
        title="Test modal"
        description="A test modal for you!"
        isOpen
        onChange={() => {}}
      >
        My beautiful children
      </Modal>
    </>
  );
};

export default ModalProvider;
