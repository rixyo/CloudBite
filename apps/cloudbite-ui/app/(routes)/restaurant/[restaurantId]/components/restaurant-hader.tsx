'use client'
import { Restaurant } from '@/types/restaurant.type';
import { Bike, Star, Info } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

type restauranthaderProps = {
    restaurant:Restaurant
};

const RestaurantHader:React.FC<restauranthaderProps> = ({restaurant}) => {
    
    return (
      <div className="flex items-center mx-5 md:mx-10">
        <div className="flex-col">
          <div className="flex items-center gap-2 md:w-[40rem] lg:w-auto ">
            <div className='hidden md:block'>
                <Image
                    src={restaurant?.banner}
                    alt={restaurant?.name}
                    width={200}
                    height={300}
                    className="border-2 rounded-full md:w-[6rem] md:h-[6rem] lg:w-[9rem] lg:h-[9rem]  hover:-translate-y-1 hover:scale-110 lg:mx-16"
                />
            </div>
            <div className="flex-col">
              <div>
                <h1 className="text-2xl font-bold">{restaurant?.name}</h1>
              </div>
              <div className=" flex items-center gap-10">
                <div className="border-2 border-[#39DB4a] p-1 w-[5rem] mt-2 rounded-full">
                  <h1 className="text-[#39DB4A] text-[1rem] font-[600]  text-center">
                    Open
                  </h1>
                </div>
                <div className="flex items-center mt-2 md:mx-5">
                  <Bike className="w-5 h-5 text-[#F14A16]" />
                  <div className="ml-2 text-[#333] text-[1rem] font-[600]">
                    Free
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-10  p-2 mt-2 w-[21rem] md:w-[30rem]">
                <div className="flex items-center mt-2 md:mx-5">
                  <Star className="w-5 h-5 text-[#F14A16]" />
                  <div className="ml-2 text-[#F14A16] text-[1rem] font-[600]">
                    0
                  </div>
                </div>
                <div className='mt-2'>
                  <h1 className="text-[1rem] font-[600] cursor-pointer hover:underline text-[#39DB4A]">
                    See Reviews
                  </h1>
                </div>
                <div className="flex items-center mt-2 md:mx-5">
                  <Info className="w-5 h-5 text-[#F14A16]" />
                  <div className="ml-2 text-[#333] text-[1rem] font-[600]">
                    More
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
export default RestaurantHader;