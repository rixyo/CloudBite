'use client'
import React from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';
import useAuthModal from '@/hooks/useAuthModal';


const MobileLandingPage:React.FC= () => {
     const authModal = useAuthModal();
    return (
      <div className="max-w-[108rem] max-h-[74rem] bg-gradient-to-b from-#FAFAFA via-#FCFCFC to-#FCFCFC md:p-5 ">
        <div className="flex-col items-center justify-between w-full p-5 ">
          {/* top side */}
          <div className="p-5 flex flex-col ">
            <div className="w-[20rem] md:w-[40rem] bg-green-400 h-[20rem] md:h-[40rem] bg-cover bg-no-repeat bg-right rounded-full  bg-[url('/imgs/landingImg4.jpg')]" />
          </div>
          <div className=" flex-col items-center justify-center  p-5 ">
            <div>
              <h1 className="text-black font-inter text-2xl md:text-4xl md:font-[600] max-w-[70%] md:max-w-[60%] font-extrabold ">
                CloudBite Merchants
                <span className="text-[#F14A16] hover:underline">Boost</span>
                Sales
              </h1>
            </div>
            <div className="text-[#4A4A4A] text-md md:text-[2rem] md:font-[600] md:max-w-[80%]  mt-5">
              <h3>
                Empower Your Restaurant Business: Introducing cloudBite
                Merchants - Your Gateway to Effortless Online Sales and Success
              </h3>
            </div>
            <div className="mt-10">
              <h1 className="text-black font-inter text-xl md:text-4xl md:font-[600] max-w-[90%] md:max-w-[60%] font-extrabold ">
                Unlock Success: Request Your Secret Key and Dive into cloudBite
                Merchants!
              </h1>
            </div>
            <div className="flex-col items-center w-full">
              <div className=" flex-col  gap-2 mt-10">
                <Button
                  variant="default"
                  size="lg"
                  className="rounded-[ 1.25rem] bg-[#F14A16] hover:bg-[#F14A16] hover:opacity-80"
                >
                  <span className="text-[#E5E5E5] text-[1.5rem] font-[700] tracking-[0.06rem]">
                    Secret Key
                  </span>
                </Button>
                <Button
                  variant="default"
                  size="lg"
                  className="rounded-[ 1.25rem] w-[11.5rem] mt-2 border-[3px] bg-white  border-[#F14A16]  hover:opacity-80 hover:bg-white"
                >
                  <span className="text-[#F14A16] text-[1.5rem] font-[700] tracking-[0.06rem] " onClick={()=>authModal.onOpen()}>
                    Login
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
export default MobileLandingPage;