"use client";
import { useQuery } from "@apollo/client";
import USER_RESTAURANT from "@/graphql/actions/userRestaurant.action";
import StoreSwitcher from "@/components/store-switcher/store-switcher";
import { redirect, useRouter } from "next/navigation";
import { RestaurantNav } from "@/components/navbar/restaurant-navbar";
import CURRENT_USER from "@/graphql/actions/currentuser.action";
import Loader from "@/components/ui/loader";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, loading } = useQuery(USER_RESTAURANT);
  const { data: user, loading: userLoading } = useQuery(CURRENT_USER);
  if (loading || userLoading) return (
    <Loader/>
  )
  if (!user?.user?.permissions?.includes("restaurant_owner")) redirect("/");


 
  return (
    <>
      <div className="flex items-center justify-center my-5 gap-10">
        <StoreSwitcher item={data?.userRestaurant} />
          <RestaurantNav/>
      </div>
        <div className="">
          {children}
        </div>
     
    </>
  );
}
