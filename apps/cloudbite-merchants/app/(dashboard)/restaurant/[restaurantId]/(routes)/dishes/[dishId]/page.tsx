'use client'
import { usePathname } from 'next/navigation';
import React from 'react';
import DishForm from './components/dish-custom-form';
import GET_DISHBYID from '@/graphql/actions/get-DishById.action';
import { useQuery } from '@apollo/client';

type pageProps = {
  params: {
    restaurantId: string;
    dishId: string;
  };
};

const Page:React.FC<pageProps> = ({params}) => {
  const {data,loading,error} = useQuery(GET_DISHBYID,{
    variables:{
     id:params.dishId
    }
  })
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
          {!loading && !error && <DishForm initialData={data?.dish} restaurantId={params.restaurantId}/> }
        </div>
      </div>
    );
}
export default Page;