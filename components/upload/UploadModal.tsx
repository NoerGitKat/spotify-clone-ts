"use client";

import { FC } from "react";
import Modal from "../Modal";
import { useUploadStore } from "@/hooks";
import UploadForm from "./UploadForm";

interface IUploadModalProps {}

const UploadModal: FC<IUploadModalProps> = () => {
  const { isOpen, onClose } = useUploadStore();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Modal
      title="Upload song"
      description="Upload a new song to your collection!"
      isOpen={isOpen}
      onChange={onChange}
    >
      <UploadForm closeModal={onClose} />
    </Modal>
  );
};

export default UploadModal;
