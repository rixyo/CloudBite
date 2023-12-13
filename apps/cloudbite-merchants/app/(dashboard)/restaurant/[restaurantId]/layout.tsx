"use client";
import { useQuery } from "@apollo/client";
import USER_RESTAURANT from "@/graphql/actions/userRestaurant.action";
import StoreSwitcher from "@/components/store-switcher/store-switcher";
import { useRouter } from "next/navigation";
import { RestaurantNav } from "@/components/navbar/restaurant-navbar";
import CURRENT_USER from "@/graphql/actions/currentuser.action";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, loading, error } = useQuery(USER_RESTAURANT);
 
  return (
    <>
      <div className="flex items-center justify-center my-5 gap-10">
        <StoreSwitcher items={data?.userRestaurants} />
          <RestaurantNav/>
      </div>
        <div className="">
          {children}
        </div>
     
    </>
  );
}
