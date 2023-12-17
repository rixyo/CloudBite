import { Dish } from "@/types/Dish.type";
import { create } from "zustand";

interface PreviewModalStore {
  isOpen: boolean;
  data?: Dish;
  onOpen: (data: Dish) => void;
  onClose: () => void;
}

const usePreviewModal = create<PreviewModalStore>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data: Dish) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false }),
}));

export default usePreviewModal;
