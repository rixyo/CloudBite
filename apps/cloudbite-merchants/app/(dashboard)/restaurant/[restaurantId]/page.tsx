'use client'
import GET_RESTAURENT from '@/graphql/actions/getRestaurent.action';
import { useQuery } from '@apollo/client';
import React from 'react';
import Image from 'next/image';
import GET_REVENUE from '@/graphql/actions/get-revenue.action';
import { DollarSign } from 'lucide-react';
import CURRENT_MONTH_REVENUE from '@/graphql/actions/getCurrentMonthRevenue';
import Revenue from './(routes)/components/Revenue';

type pageProps = {
    params:{
        restaurantId:string
    }
};

const Page:React.FC<pageProps> = ({params}) => {
    const {data,loading,error}=useQuery(GET_RESTAURENT,{
        variables:{
            id:params.restaurantId
        }
    }) 
const {data:rev}=useQuery(GET_REVENUE,{
    variables:{
        restaurantId:params.restaurantId
    }
})
const { data: revMonth } = useQuery(CURRENT_MONTH_REVENUE, {
  variables: {
    restaurentId: params.restaurantId,
  },
});
const currentDate = new Date(); // Current date and time
const monthName = currentDate.toLocaleString("default", { month: "long" });
const currentYear = currentDate.getFullYear();


  const totalRevenue = rev?.revenue?.total;

  const currentMonthRevenue = revMonth?.currentMonthRevenue?.total;

    
    return (
      <>
        <div className=" flex justify-center items-center">
          <div className="flex-col p-5">
            <div className="w-[30rem] flex items-center justify-center h-[10rem] rounded-xl border-2 border-gray-400 p-5">
              <div className="rounded-lg">
                <Image
                  src={data?.restaurant?.banner}
                  alt="restaurant"
                  width={200}
                  height={200}
                  className="rounded-full w-[5rem] h-[5rem] border-2"
                />
              </div>
              <div className="mt-5">
                <h1 className="text-lg leading-[2rem] tracking-tighter ml-5 hover:underline cursor-pointer">
                  {data?.restaurant?.name}
                </h1>
                <h1 className="text-lg leading-[2rem] tracking-tighter ml-5 max-w-[70%]">
                  {data?.restaurant?.address?.street}{" "}
                  {data?.restaurant?.address?.city}{" "}
                  {data?.restaurant?.address?.state}{" "}
                  {data?.restaurant?.address?.country}
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center  p-5 gap-5">
         <Revenue title='Total Revenue' revenue={totalRevenue} color="red-500" />
         <Revenue title={monthName + ',' + currentYear} revenue={currentMonthRevenue} color="green-500" />
        </div>
      </>
    );
}
export default Page;