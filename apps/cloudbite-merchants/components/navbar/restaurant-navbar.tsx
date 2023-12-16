"use client";
import CURRENT_USER from "@/graphql/actions/currentuser.action";
import { cn } from "@/lib/utils";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

export function RestaurantNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();
    const {
      data: user,
    } = useQuery(CURRENT_USER);
  const routes = [
    {
      href: `/${user.user?.id}`,
      label: "Admin Dashboard",
      isActive: pathname.includes(`${user.user?.id}`),
    },
    {
      href: `/restaurant/${params.restaurantId}`,
      label: "Dashboard",
      isActive: pathname.includes(`/restaurant/${params.restaurantId}`),
    },
    {
      href: `/restaurant/${params.restaurantId}/dishes`,
      label: "Dishes",
      isActive: pathname.includes("dishes"),
    },
    {
      href: `/restaurant/${params.restaurantId}/orders`,
      label: "Orders",
      isActive: pathname.includes("orders"),
    },
    {
      href: `/restaurant/${params.restaurantId}/settings`,
      label: "Settings",
      isActive: pathname.includes("settings"),
    },
  ];
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {routes.map((route) => (
        <Link
          href={route.href}
          key={route.href}
          className={cn(
            "text-sm font-medium transition-colors text-gray-900 hover:text-primary focus:outline-none focus:text-gray-700  duration-150 ease-in-out",
            route.isActive
              ? "text-black dark:text-white"
              : "text-muted-foreground "
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
