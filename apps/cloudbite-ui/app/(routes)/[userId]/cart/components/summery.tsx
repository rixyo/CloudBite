"use client";


import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";

import { Button } from "@/components/ui/button";
import useCart from "@/hooks/useCart";
import toast from "react-hot-toast";
import Currency from "@/app/(routes)/restaurant/[restaurantId]/components/currency";
import { useMutation } from "@apollo/client";
import CHECKOUT from "@/graphql/actions/checkout.test.action";
import { CartProduct } from "@/types/CartProduct.type";
import { CHECKOUT_MUTATION } from "@/graphql/actions/checkout.action";

interface CheckoutMutationResponse {
  checkout: {
    id: string;
    url: string;
  };
}

const Summary = () => {
  const [checkout]=useMutation(CHECKOUT);
  const [checkoutMutation] = useMutation(CHECKOUT_MUTATION);

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
  );

  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.clearCart);
  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed.");
      removeAll();
    }

    if (searchParams.get("canceled")) {
      toast.error("Something went wrong.");
    }
  }, [searchParams, removeAll]);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price * item.quantity);
  }, 0);
  const onCheckout: () => Promise<void> = async () => {
      const response = (await checkoutMutation({
        variables: {
          createOrderInput: {
            orderItems:[ ...items.map((item: CartProduct) => ({
              itemId: item.id,
              quantity: item.quantity,
              price: item.price,
              restaurantId: item.restaurant.id,
              itemName: item.name,
            }))
            ],
          },
        },
      }).catch(()=>{
        toast.error("Something went wrong");
      })) as { data: CheckoutMutationResponse };

      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({
        sessionId: response.data.checkout.id,
      });
      window.location.href = response.data.checkout.url;
    
  };
  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
          <Currency value={totalPrice} />
        </div>
      </div>
      <Button
        onClick={onCheckout}
        disabled={items.length === 0}
        className="w-full mt-6"
      >
        Checkout
      </Button>
    </div>
  );
};

export default Summary;
