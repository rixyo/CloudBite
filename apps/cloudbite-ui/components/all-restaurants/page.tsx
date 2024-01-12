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

    return (
        <>
        {data?.getRestaurantByLocation?.length === 0?<div>
            <div className="flex justify-center items-center">
                <div className="flex-col ml-10 ">
                    <div className="flex items-center mx-5 md:mx-0">
                        <div className="flex-col md:mx-24">
                            <div className="md:font-[700] text-[2rem] mt-10  text-[#333]  md:leading-[1.5rem] md:tracking-[.5rem] mb-1 mx-10 md:mx-16">
                                <h1>Sorry, no results found!</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>:<div>
            <div className="flex justify-center items-center">
                <div className="flex-col ml-10 ">
                    <div className="flex items-center mx-5 md:mx-0">
                        <div className="flex-col lg:mx-24 mt-10">
                            <div className="font-[700] text-[1.15rem] md:text-[2rem]   text-[#333]  md:leading-[1.5rem] md:tracking-[.5rem] mb-1 mx-10 md:mx-16">
                                <h1>All Restaurents</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 p-5 gap-4">
        {data?.getRestaurantByLocation?.map((item:GetRestaurentsByLocationResponse) => (
            <div key={item.id}>
            <RestaurantCard restaurent={item.restaurant}/>
            </div>
        ))}

      </div>
        </>
    );
}
export default Restaurents;