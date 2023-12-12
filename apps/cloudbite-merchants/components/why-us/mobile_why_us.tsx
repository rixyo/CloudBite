'use client'
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const MobileWhyUs: React.FC = () => {
     
    const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
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
      <div>
        <h1 className="text-center  text-[1.5rem] font-[600] ">
          Why CloudBite Merchants
        </h1>
      </div>
      <Carousel
        className=""
        swipeable={true}
        responsive={responsive}
        showDots
        transitionDuration={500}
      >
        <div className="w-[20rem] h-[15rem] p-5 border-2 border-red-200 rounded ">
          <h1 className="text-[1rem] font-[600]">Deliver your way</h1>
          <p className=" tracking-[159%] font-[500] max-w-[90%] text-[#555]">
            Our offerings are flexible so you can customize them to your needs.
            Get started with your delivery people or connect with delivery
            people through the CloudBite platform.
          </p>
        </div>
        <div className="w-[20rem] h-[15rem] p-5 border-2 border-red-200 rounded  mt-5">
          <h1 className="text-[1rem] font-[600]">Boost your visibility</h1>
          <p className=" tracking-[159%] max-w-[90%] text-[1rem] font-[500] text-[#555]">
            Stand out with in-app marketing to reach even more customers and
            increase sales.
          </p>
        </div>
        <div className="w-[20rem] h-[15rem] p-5 border-2 border-red-200 rounded mt-5">
          <h1 className="text-[1rem] font-[600]">Connect with customers</h1>
          <p className=" tracking-[159%] text-[rem] font-[500] text-[#555]">
            Turn customers into regulars with actionable data insights, respond
            to reviews or offer a loyalty program.
          </p>
        </div>
      </Carousel>
    </>
  );
};
export default MobileWhyUs;
