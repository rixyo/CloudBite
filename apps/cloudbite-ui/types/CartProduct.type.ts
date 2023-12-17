export type CartProduct = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  restaurant: {
    id: string;
  };
};
