'use client'
import React, { useEffect } from 'react';
import { useParams, usePathname, useRouter } from "next/navigation";
import {UtensilsCrossed, WalletCards, BadgePlus, Settings, Home } from 'lucide-react'

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

    const pathname = usePathname();
     const params=useParams()
    const router=useRouter();

  const routes = [
    {
      href: `/${params.userId}`,
      label: "Home",
      isActive: pathname.includes(`${params.userId}`) || pathname.includes("home"),
      icon: Home,
    },
    {
      href: `/${params.userId}/create-restaurant`,
      label: "Create Restaurant",
      isActive: pathname.includes("create-restaurant"),
      icon: BadgePlus,

    },
    {
      href: `/${params.userId}/wallet`,
      label: "Wallet",
      isActive: pathname.includes("wallet"),
      icon: WalletCards,
    },
    {
      href: `/${params.userId}/settings`,
      label: "Settings",
      isActive: pathname.includes("settings"),
      icon: Settings,
    }
  ];
  if(!isMutating) return null;
    const handleItemClick = (item: MenuItem) => {
      router.push(item.href);
    };
  return (
    <div className="p-[4px] lg:px-2 lg:w-[260px]">
      {routes.map((item) => (
        <div key={item.href}
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
}
