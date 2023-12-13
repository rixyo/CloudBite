'use client'

import { Navigationbar } from "@/components/navbar/navbar";
import { useQuery } from "@apollo/client";
import  USER_RESTAURANT  from "@/graphql/actions/userRestaurant.action";
import StoreSwitcher from "@/components/store-switcher/store-switcher";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
      const { data } = useQuery(USER_RESTAURANT);
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
