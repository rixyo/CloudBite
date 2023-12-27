'use client'
import GET_RESTAURENT from '@/graphql/actions/getRestaurant.action';
import { useQuery } from '@apollo/client';
import React from 'react';
import RestaurantHader from './components/restaurant-hader';
import RESTAURENT_DISHES from '@/graphql/actions/getRestaurentDishes.action';
import { Dish } from '@/types/Dish.type';
import DishCard from './components/Dish-card';
import Loader from '@/components/ui/loader';

type pageProps = {
    params:{
        restaurantId:string
    }
};

const Page:React.FC<pageProps> = ({params}) => {
    const {data,loading,error} = useQuery(GET_RESTAURENT,{
        variables:{
            id:params.restaurantId
           
        }
    })
    const {data:dishes,loading:loadingDishes,error:errorDishes} = useQuery(RESTAURENT_DISHES,{
        variables:{
            page:1,
            restaurantId:params.restaurantId,
        }
    })
    if(loading || loadingDishes){
      return(
        <Loader/>
      )
    }
    return (
      <>
        <>
          <RestaurantHader restaurant={data?.restaurant} />
          <h1 className="text-2xl font-bold text-center mt-10 tracking-[.25rem] hover:underline">
            All Dishes
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 lg:mx-36">
            {dishes?.restaurantDishes.map((item: Dish) => (
              <div key={item.id}>
                <DishCard dish={item} />
              </div>
            ))}
          </div>
        </>
      </>
    );
}
export default Page;