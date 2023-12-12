'use client'
import React from 'react';
import { Button } from "@/components/ui/button";
import useAuthModal from '@/hooks/useAuthModal';
const LandingPage:React.FC = () => {
  const authModal = useAuthModal();
    
    return (
      <div className="md:w-[50rem] lg:w-[120rem] bg-[#FAFAFA] rounded-[1.5625rem] border-2 p-5">
        <div className="flex items-center justify-between w-full p-5">
          {/* Left Side */}

          <div className="flex-col items-center justify-center p-5">
            <div className="">
              <h1 className="text-[#000] text-[5.3125rem] font-[700] leading-[6.25rem] tracking-[0.26563rem]">
                CloudBite Merchants
                <span className="text-[#F14A16]"> Boost</span> Sales
              </h1>
            </div>
            <div className="mt-10">
              <h3 className="text-[ 2rem] font-[200] text-[#282828] tracking-[0.04rem] leading-[2.5rem] max-w-[80%]">
                Empower Your Restaurant Business: Introducing cloudBite
                Merchants - Your Gateway to Effortless Online Sales and Success
              </h3>
            </div>
            <div className="flex items-center gap-5">
              <div className="flex-col">
                <div className="mt-10">
                  <h1 className="text-[1.5rem] font-[700] max-w-[70%] tracking-[0.07rem]">
                    Unlock Success: Request Your Secret Key and Dive into
                    cloudBite Merchants!
                  </h1>
                </div>
                <div className=" flex items-center gap-5 mt-10">
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
                    className="rounded-[ 1.25rem]  border-[3px] bg-white  border-[#F14A16]  hover:opacity-80 hover:bg-white"
                    onClick={() => authModal.onOpen()}
                  >
                    <span className="text-[#F14A16] text-[1.5rem] font-[700] tracking-[0.06rem] ">
                      Login
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="hidden lg:block h-[40rem] border-2 rounded-xl   w-[70rem] bg-cover bg-no-repeat bg-left bg-[url('/imgs/landingImg4.jpg')]" />
        </div>
      </div>
    );
}
export default LandingPage;