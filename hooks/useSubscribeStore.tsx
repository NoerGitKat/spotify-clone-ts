import { create } from "zustand";

interface SubscribeStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSubscribeStore = create<SubscribeStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));

export default useSubscribeStore;
