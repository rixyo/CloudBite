'use client'

import { Navigationbar } from "@/components/navbar/navbar";
import { useQuery } from "@apollo/client";
import  USER_RESTAURANT  from "@/graphql/actions/userRestaurant.action";
import StoreSwitcher from "@/components/store-switcher/store-switcher";
import CURRENT_USER from "@/graphql/actions/currentuser.action";
import { redirect } from "next/navigation";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
      const { data } = useQuery(USER_RESTAURANT);
      const {data: user,loading} = useQuery(CURRENT_USER);

      if (!loading && !user?.user?.permissions?.includes("restaurant_owner")) redirect("/");
  return (
    <>
      <div className="flex flex-col h-screen w-screen">
        <StoreSwitcher items={data?.userRestaurants} />
        <div className="flex flex-1 mt-10">
          <Navigationbar />
          {children}
        </div>
      </div>
    </>
  );
}
