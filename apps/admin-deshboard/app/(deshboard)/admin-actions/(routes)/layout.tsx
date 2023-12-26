"use client";
import { useQuery } from "@apollo/client";

import { redirect,  } from "next/navigation";
import CURRENT_USER from "@/graphql/actions/currentuser.action";
import Loader from "@/components/ui/loader";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 
  const { data: user, loading: userLoading } = useQuery(CURRENT_USER);
  if ( userLoading) return <Loader />;
  if (!user?.user?.permissions?.includes("admin")) redirect("/");

  return (
    <>
      <div className="">{children}</div>
    </>
  );
}
