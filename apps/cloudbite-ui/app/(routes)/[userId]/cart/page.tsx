"use client";
import React, { useEffect, useState } from "react";

import Container from "@/components/ui/container";
import useCart from "@/hooks/useCart";
import CartItem from "./components/cart-item";


import { useQuery } from "@apollo/client";
import CURRENT_USER from "@/graphql/actions/currentuser.action";
import Summary from "./components/summery";
import Loader from "@/components/ui/loader";

const CartPage: React.FC = () => {
  const [mounted, setIsMounted] = useState<boolean>(false);
  const { data, loading, error } = useQuery(CURRENT_USER);
  const cart = useCart();
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!mounted) return null;
    if (loading) {
      return <Loader />;
    }
  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8 mt-5">
          <h1 className="text-3xl font-bold text-black">
            {data?.user?.fullName} &apos;s Beg
          </h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
              {cart.items.length === 0 && (
                <p className="text-neutral-500">No items added to cart.</p>
              )}
              <ul>
                {cart.items.map((item) => (
                  <CartItem key={item.id} data={item} />
                ))}
              </ul>
            </div>
            <Summary />
          </div>
        </div>
      </Container>
    </div>
  );
};
export default CartPage;
