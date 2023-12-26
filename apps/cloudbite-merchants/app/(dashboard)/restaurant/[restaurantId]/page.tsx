'use client'
import { useQuery } from '@apollo/client';
import React from 'react';
import GET_REVENUE from '@/graphql/actions/get-revenue.action';
import CURRENT_MONTH_REVENUE from '@/graphql/actions/getCurrentMonthRevenue';
import Revenue from './(routes)/components/Revenue';
import GET_TODAYS_REVENUE from '@/graphql/actions/getTodaysRevenue.action';
import Loader from '@/components/ui/loader';

type pageProps = {
    params:{
        restaurantId:string
    }
};

const Page:React.FC<pageProps> = ({params}) => {
const {data:rev, loading:rl}=useQuery(GET_REVENUE,{
    variables:{
        restaurantId:params.restaurantId
    }
})
const { data: revMonth, loading:mrl } = useQuery(CURRENT_MONTH_REVENUE, {
  variables: {
    restaurentId: params.restaurantId,
  },
});
const {data:todayRevenue, loading:trl}=useQuery(GET_TODAYS_REVENUE,{
  variables:{
    restaurantId:params.restaurantId
  }
})
const currentDate = new Date(); // Current date and time
const monthName = currentDate.toLocaleString("default", { month: "long" });
const currentYear = currentDate.getFullYear();


  const totalRevenue = rev?.revenue?.total;

  const currentMonthRevenue = revMonth?.currentMonthRevenue?.total;
  const todayRevenueAmount = todayRevenue?.todaysRevenue?.total;

    if( rl || mrl || trl){
      return(
        <Loader/>
      )
    }
    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-4 p-5">
          <Revenue
            title="Total Revenue"
            revenue={totalRevenue}
            color="#39DB4A"
            titleColor='#000'
          />
          <Revenue
            title={currentDate.toDateString()}
            revenue={todayRevenueAmount}
            color="#39DB4A"
            titleColor='#000'
          />
          <Revenue
            title={monthName + "," + currentYear}
            revenue={currentMonthRevenue}
            color="#39DB4A"
            titleColor='#39DB4A'
          />
        </div>
      </>
    );
}

export default Page;