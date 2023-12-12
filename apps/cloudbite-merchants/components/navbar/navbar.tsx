'use client'
import React, { useEffect } from 'react';
import { useParams, usePathname, useRouter } from "next/navigation";
import {UtensilsCrossed, ListOrderedIcon, Settings} from 'lucide-react'

export function Navigationbar({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
    const [isMutating, setIsMutating] = React.useState(false);
    interface MenuItem {
     href: string;
     label: string;
     isActive: boolean;
    }
    useEffect(() => {
        setIsMutating(true);
    }, []);

    const params = useParams();
    const pathname = usePathname();
    const router=useRouter();

  const routes = [
    {
      href: `/`,
      label: "Dashboard",
      isActive: pathname.includes("dashboard"),
      icon: UtensilsCrossed,
    },
    {
      href: `/${params.storeId}/products`,
      label: "Dishes",
      icon: UtensilsCrossed,
      isActive: false,
    },
    {
      href: `/${params.storeId}/orders`,
      label: "Orders",
      isActive: false,
      icon: ListOrderedIcon,
    },
    {
      href: `/${params.storeId}/settings`,
      label: "Settings",
      isActive: false,
      icon: Settings,
    },
  ];
  if(!isMutating) return null;
    const handleItemClick = (item: MenuItem) => {
      router.push(item.href);
    };
  return (
    <div className="p-[4px] lg:px-2 lg:w-[260px]">
      {routes.map((item) => (
        <div
          className={`flex flex-col lg:flex-row gap-1 lg:gap-6 p-4 lg:py-2 items-center  ${
            item.isActive ? "text-[#F14A16] ":"text-[#555]"
          } rounded-lg cursor-pointer`}
          onClick={() => handleItemClick(item)}
        >
          <item.icon className="hidden lg:block" />
          <span className="text-xs lg:text-base">{item.label}</span>
        </div>
      ))}
    </div>
  );
};
