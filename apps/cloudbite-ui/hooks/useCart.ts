// this hook is used to manage the cart state it uses zustand to manage the state and react-toastify to show the toast messages
// it also uses zustand/middleware to persist the cart state in localstorage so that the cart state is not lost on page refresh

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import  {CartProduct}  from "../types/CartProduct.type";
import toast from "react-hot-toast";
interface CartStore {
  items: CartProduct[];
  addItem: (item: CartProduct) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: CartProduct) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);

        if (existingItem) {
          return toast.error("Item already in cart.");
        }

        set({ items: [...get().items, data] });
        toast.success("Item added to cart.");
      },
      removeItem: (id: string) => {
        set({ items: [...get().items.filter((item) => item.id !== id)] });
        toast.success("Item removed from cart.");
      },
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
export default useCart;
