"use client"
import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from 'next/image'
const MobileWhyUsSecond:React.FC = () => {
   
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
          <div className="flex-col items-center gap-5">
            <Image src="/imgs/UE1.webp" width={500} height={500} alt="" />
            <div className="w-[20rem] h-[15rem] p-5 border-2">
              <h1 className="text-[1rem] font-[600]">Unlock new growth</h1>
              <p className=" tracking-[159%] text-[rem] font-[500] text-[#555]">
                Thousands of CloudBite app users may be searching for food in
                your area. By partnering with Uber Eats and adding your
                restaurant to the platform, we can help you reach those user
              </p>
            </div>
          </div>
          <div className="flex-col items-center gap-5">
            <Image src="/imgs/delivery.jpg" width={200} height={100} alt="" className='ml-5' />
            <div className="w-[20rem] h-[15rem] p-5 border-2">
              <h1 className="text-[1rem] font-[600]">Delight customers</h1>
              <p className=" tracking-[159%] text-[rem] font-[500] text-[#555]">
                With reliable delivery from delivery people using the CloudBite
                platform, you can satisfy customers with the food they want—when
                and where they want it.
              </p>
            </div>
          </div>
          <div className="flex-col items-center gap-5">
            <Image src="/imgs/manage.jpg" width={300} height={300} alt="" />
            <div className="w-[20rem] h-[15rem] p-5 border-2">
              <h1 className="text-[1rem] font-[600]">
                {" "}
                Manage it all with ease
              </h1>
              <p className=" tracking-[159%] text-[rem] font-[500] text-[#555]">
                Orders can run smoothly with CloudBite restaurant software,
                flexible integration options, and support when you need it.
              </p>
            </div>
          </div>
        </Carousel>
      </>
    );
}
export default MobileWhyUsSecond;