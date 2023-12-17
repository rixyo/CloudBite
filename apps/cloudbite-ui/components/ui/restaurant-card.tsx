'use client'
import { Restaurant } from '@/types/restaurant.type';
import React from 'react';
import Image from 'next/image';
import {Clock, Star, Bike} from 'lucide-react'
import { useRouter } from 'next/navigation';

type restaurantcardProps = {
    restaurent:Restaurant
};

const RestaurantCard:React.FC<restaurantcardProps> = ({restaurent}) => {
    const router = useRouter();
    
    return (
      <div className="flex items-center   p-2">
        <div className="flex-col  border-2 border-gray-300 rounded-[1rem] w-[50rem] h-[15rem] shadow-lg p-5 lg:mx-10 ">
          <Image
            src={restaurent.banner}
            alt={restaurent.name}
            width={200}
            height={300}
            className="border-2 rounded-lg w-[30rem] md:w-auto  hover:-translate-y-1 hover:scale-110 lg:mx-16"
          />
          <div className="flex items-center gap-5 lg:mx-5">
            <div className="max-w-[90%] lg:ml-16 mt-3 text-[1rem] hover:underline cursor-pointer font-[600]" onClick={()=>router.push(`/restaurant/${restaurent.id}`)}>
              <h1>{restaurent.name}</h1>
            </div>
            <div>
              <div className="flex items-center mt-2 md:mx-5">
                <Star className="w-5 h-5 text-[#F14A16]" />
                <div className="ml-2 text-[#F14A16] text-[1rem] font-[600]">
                  4.5
                </div>
              </div>
            </div>
          </div>
          <div className='flex gap-10 lg:mx-5'>
          <div className="lg:mx-5  w-[8rem] p-2">
            <div className="flex items-center mt-2">
              <Clock className="w-5 h-5 text-[#F14A16]" />
              <div className="ml-2 text-[#F14A16] text-[1rem] font-[600]">
                30 min
              </div>
            </div>
          </div>
            <div className="flex items-center mt-2 md:mx-5">
              <Bike className="w-5 h-5 text-[#F14A16]" />
              <div className="ml-2 text-[#F14A16] text-[1rem] font-[600]">
               Free
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
export default RestaurantCard;