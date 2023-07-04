import { FC } from "react";
import Modal from "../Modal";

interface IUploadModalProps {}

const UploadModal: FC<IUploadModalProps> = () => {
  return (
    <Modal
      title="Upload song"
      description="Upload a new song to your collection"
      isOpen={true}
    >
      Upload Modal
    </Modal>
  );
};

export default UploadModal;
