import { create } from "zustand";

interface WalletStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
const useWalletModal = create<WalletStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
export default useWalletModal;
