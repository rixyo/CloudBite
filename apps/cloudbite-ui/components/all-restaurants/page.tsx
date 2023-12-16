'use client'
import GET_RESTAURENTSBYLOCATION from '@/graphql/actions/getRestaurentsByLocation.action';
import { GetRestaurentsByLocationResponse } from '@/types/restaurant.type';
import { useQuery } from '@apollo/client';
import React from 'react';
import RestaurantCard from '../ui/restaurant-card';

type pageProps = {
    location:string,
    page:number
};

const Restaurents:React.FC<pageProps> = ({location,page}) => {
    const { data, loading, error } = useQuery(GET_RESTAURENTSBYLOCATION, {
        variables: {
            page: page,
            location: location,
        },
    });
    console.log(data?.getRestaurantByLocation);
    
    return (
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 p-5 gap-4">
        {data?.getRestaurantByLocation?.map((item:GetRestaurentsByLocationResponse) => (
            <div key={item.id}>
            <RestaurantCard restaurent={item.restaurant}/>
            </div>
        ))}

      </div>
    );
}
export default Restaurents;