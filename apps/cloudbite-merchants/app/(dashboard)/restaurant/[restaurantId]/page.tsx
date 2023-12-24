'use client'
import GET_RESTAURENT from '@/graphql/actions/getRestaurent.action';
import { useQuery } from '@apollo/client';
import React from 'react';
import Image from 'next/image';
import GET_REVENUE from '@/graphql/actions/get-revenue.action';
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
        <div className="flex items-center justify-center  p-5 gap-5">
          <Revenue
            title="Total Revenue"
            revenue={totalRevenue}
            color="#39DB4A"
          />
          <Revenue
            title={monthName + "," + currentYear}
            revenue={currentMonthRevenue}
            color="#39DB4A"
          />
        </div>
      </>
    );
}

export default Page;