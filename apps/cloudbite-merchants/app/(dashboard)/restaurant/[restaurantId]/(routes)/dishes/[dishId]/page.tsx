'use client'
import { usePathname } from 'next/navigation';
import React from 'react';
import DishForm from './components/dish-custom-form';

type pageProps = {
  params: {
    restaurantId: string;
  };
};

const Page:React.FC<pageProps> = ({params}) => {
const pathname=usePathname();
    return (
      <div className="flex-col mt-16">
        <div className="flex-1 space-y-4 p-8 pt-6">
          {pathname.includes("new") && (
            <DishForm
              initialData={undefined}
              restaurantId={params.restaurantId}
            />
          )}
        </div>
      </div>
    );
}
export default Page;