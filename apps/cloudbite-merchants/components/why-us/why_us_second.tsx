"use client"
import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Button } from '../ui/button';
const WhyUsSecond:React.FC = () => {
   
    const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items:1,
        
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
      },
    };
    return (
      <>
        <Carousel
          className=""
          swipeable={true}
          responsive={responsive}
          showDots
          transitionDuration={500}
        >
          <div className="flex items-center justify-center p-5">
            <div className="flex items-center justify-between gap-5  border-2 border-red-100 w-[62.5rem] p-10 rounded-lg">
              <div>
                <div className="w-[27rem] h-[10rem] p-5 border-2">
                  <h1 className="text-[1rem] font-[600]">Unlock new growth</h1>
                  <p className=" tracking-[159%] text-[rem] font-[500] text-[#555]">
                    Thousands of CloudBite app users may be searching for food
                    in your area. By partnering with Uber Eats and adding your
                    restaurant to the platform, we can help you reach those user
                  </p>
                </div>
              </div>

              <div className="h-[40rem] border-2 rounded-xl   w-[50.625rem] bg-cover bg-no-repeat bg-right bg-[url('/imgs/UE1.webp')]" />
            </div>
          </div>
          {/** second elements */}
          <div className="flex items-center justify-center p-5">
            <div className="flex items-center justify-between  border-2 border-red-100 w-[62.5rem] p-10 rounded-lg gap-5">
              <div>
                <div className="w-[27rem] h-[10rem] p-5">
                  <h1 className="text-[1rem] font-[600]">Delight customers</h1>
                  <p className=" tracking-[159%] text-[rem] font-[500] text-[#555]">
                    With reliable delivery from delivery people using the
                    CloudBite platform, you can satisfy customers with the food
                    they want—when and where they want it.
                  </p>
                </div>
              </div>

              <div className="h-[40rem] border-2 rounded-xl   w-[50.625rem] bg-cover bg-no-repeat bg-right bg-[url('/imgs/delivery.jpg')]" />
            </div>
          </div>
          {/** third elements */}
          <div className="flex items-center justify-center p-5">
            <div className="flex items-center justify-between  border-2 border-red-100 w-[62.5rem] p-10 rounded-lg gap-5">
              <div>
                <div className="w-[27rem] h-[10rem] p-5">
                  <h1 className="text-[1rem] font-[600]">
                    Manage it all with ease
                  </h1>
                  <p className=" tracking-[159%] text-[rem] font-[500] text-[#555]">
                    Orders can run smoothly with CloudBite restaurant software,
                    flexible integration options, and support when you need it
                  </p>
                </div>
              </div>

              <div className="h-[40rem] border-2 rounded-xl   w-[40.625rem] bg-cover bg-no-repeat bg-right bg-[url('/imgs/manage.jpg')]" />
            </div>
          </div>
        </Carousel>
      </>
    );
}
export default WhyUsSecond;