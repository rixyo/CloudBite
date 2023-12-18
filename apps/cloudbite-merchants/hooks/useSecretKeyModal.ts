import { create } from "zustand";

interface WalletStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
const useSecretKeyModal = create<WalletStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
export default useSecretKeyModal;
