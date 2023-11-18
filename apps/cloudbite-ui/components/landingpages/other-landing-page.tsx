import React from 'react';
import Image from 'next/image';
import { Button } from "../ui/button";


const OtherLandingPage:React.FC= () => {
    
    return (
      <div className="max-w-[108rem] max-h-[74rem] bg-gradient-to-b from-#FAFAFA via-#FCFCFC to-#FCFCFC md:p-5 ">
        <div className="flex-col items-center justify-between w-full p-5 ">
          {/* top side */}
          <div className="p-5 flex flex-col ">
            <div className="w-[20rem] md:w-[40rem] bg-green-400 h-[20rem] md:h-[40rem] bg-cover bg-no-repeat bg-right rounded-full  bg-[url('/img/heroImg.png')]">
              <div className="relative  right-[20%] -top-[20%] md:right-[10%] md:top-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="350"
                  height="169"
                  viewBox="0 0 350 169"
                  fill="none"
                >
                  <g filter="url(#filter0_d_1_255)">
                    <path
                      d="M25 59.1608C25 42.5034 39.1463 29 56.5967 29H238.278C255.728 29 269.875 42.5034 269.875 59.1608C269.875 67.1926 275.305 92.6203 271.849 95.4479C268.394 98.2755 247.314 89.3215 238.278 89.3215H56.5967C39.1463 89.3215 25 75.8181 25 59.1608Z"
                      fill="#FBFBFB"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1_255"
                      x="0"
                      y="0"
                      width="350"
                      height="169"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dx="26" dy="22" />
                      <feGaussianBlur stdDeviation="25.5" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1_255"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1_255"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
                <h1 className="absolute top-16 left-36 text-[#FF6868] text-[1.25rem] font-[600]  transform -translate-x-1/2 -translate-y-1/2 ">
                  Hot spicy Food 🌶
                </h1>
              </div>
            </div>
          </div>
          <div className=" flex-col items-center justify-center  p-5 ">
            <div>
              <h1 className="text-black font-inter text-2xl md:text-4xl md:font-[600] max-w-[70%] md:max-w-[60%] font-extrabold ">
                Dive into Delights Of Delectabl
                <span className="text-[#39DB4A] hover:underline"> Food</span>
              </h1>
            </div>
            <div className="text-[#4A4A4A] text-md md:text-[2rem] md:font-[600] md:max-w-[80%]  mt-5">
              <h3>
                Where Each Plate Weaves a Story of Culinary Mastery and
                Passionate Craftsmanship
              </h3>
            </div>
            <div className="flex items-center gap-5 mt-10 w-full">
              <div className="p-2">
                <Button className="rounded-xl  md:w-[14.3125rem] md:h-[5rem]  bg-[#39DB4A] hover:bg-[#39DB4A]">
                  <span className="text-[#FFF] text-[1.625rem] max-w-auto">
                    Order Now
                  </span>
                </Button>
              </div>
              <div className="flex items-center gap-2 cursor-pointer p-2 md:w-full">
                <div className="">
                  <h1 className="hidden md:block text-[#4D4D4D] text-md  font-[600]">
                    Watch Now
                  </h1>
                  <h1 className="block md:hidden text-[#4D4D4D] text-md  font-[600]">
                    Watch
                  </h1>
                </div>
                <div className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="28"
                    viewBox="0 0 24 28"
                    fill="none"
                  >
                    <path
                      d="M22.5 11.4019C24.5 12.5566 24.5 15.4434 22.5 16.5981L4.49999 26.9904C2.49999 28.1451 -1.34201e-06 26.7017 -1.24107e-06 24.3923L-3.32543e-07 3.60769C-2.31596e-07 1.29829 2.5 -0.145083 4.5 1.00962L22.5 11.4019Z"
                      fill="#1E1E1E"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
export default OtherLandingPage;