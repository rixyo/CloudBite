'use client'
import Currency from '@/app/(routes)/restaurant/[restaurantId]/components/currency';
import useCart from '@/hooks/useCart';
import { Dish } from '@/types/Dish.type';
import React, { MouseEventHandler, useState } from 'react';
import { Button } from './button';
import { ShoppingCart } from 'lucide-react';
import { useQuery } from '@apollo/client';
import CURRENT_USER from '@/graphql/actions/currentuser.action';
import useAuthModal from '@/hooks/useAuthModal';

type infoProps = {
    data:Dish
};

const Info:React.FC<infoProps> = ({data}) => {
      const [quantity, setQuantity] = useState<number>(1);
         const { data:user, loading, error } = useQuery(CURRENT_USER);
         const authModal = useAuthModal();
      const cart = useCart();
       const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
         event.stopPropagation();
           if (!user) {
             authModal.onOpen();
             return;
           }
         cart.addItem({
           id: data.id,
           quantity,
           price: data.price,
           name: data.name,
           image: data.thumbnails[0],
           restaurant:{
            id:data.restaurant.id,
           }
         });
       };
    
    return (
      <div className="p-5 mt-8">
        <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
        <p className="mt-1 text-sm text-gray-500">{data.description}</p>
        <div className="text-2xl text-gray-900 mt-2">
          <Currency value={data?.price} />
        </div>
        <div className="mt-10 flex items-center gap-x-3">
          <h1 className="font-semibold text-gray-900">Quantity:</h1>
          <div className="flex items-center gap-x-3">
            <Button
              onClick={() => setQuantity(quantity - 1)}
              disabled={quantity === 1}
              className="flex items-center gap-x-2 bg-red-400 hover:bg-red-500"
            >
              -
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">{quantity}</h1>
            <Button
              onClick={() => setQuantity(quantity + 1)}
              className="flex items-center gap-x-2 bg-[#39DB4A] hover:bg-[#39db49bb]"
            >
              +
            </Button>
          </div>
        </div>
        <div className="mt-10 flex items-center gap-x-3">
          <Button
            className="flex items-center gap-x-2 bg-[#39DB4A] hover:bg-[#39db49bb]"
            onClick={onAddToCart}
          >
            Add To Cart
            <ShoppingCart size={20} />
          </Button>
        </div>
      </div>
    );
}
export default Info;