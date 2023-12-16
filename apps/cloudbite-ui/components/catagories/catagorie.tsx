import React from 'react';


const Catagorie:React.FC = () => {
    
    return (
      <div className=" flex items-center justify-center p-5">
        <div className="flex-col ">
          <div className="text-center md:mx-4 mt-2 md:mt-3">
            <h1 className="tracking-wider uppercase text-black text-lg md:text-2xl  lg:text-[1.75rem] font-[700]">
              Your favourite cuisines
            </h1>
          </div>
          <div className="flex  gap-5 items-center justify-between lg:w-[70rem] mt-5 p-5  mb-5">
            <div className="cursor-pointer">
              {/** this dev is for catagory barger bg image */}
              <div className="w-[5.1875rem] h-[5rem]  md:w-[9.5625rem] bg-[#C1F1C6] md:h-[9.5625rem] bg-cover bg-no-repeat bg-right rounded-full  bg-[url('/img/burger.png')]" />
              <div className="ml-5">
                <h1 className="text-[#1E1E1E] text-md md:text-[1.875rem] font-[600]">
                  Burger
                </h1>
              </div>
            </div>

            <div className="flex-col items-center  cursor-pointer">
              {/** this dev is for catagory barger bg image */}
              <div className="w-[5.1875rem] h-[5rem] md:w-[9.5625rem] bg-[#C1F1C6]  md:h-[9.5625rem] bg-cover bg-no-repeat bg-middle rounded-full  bg-[url('/img/breakfast.png')]" />
              <div className="ml-5">
                <h1 className="text-[#1E1E1E] text-md md:text-[1.875rem] font-[600] ml-1">
                  Sandwiche
                </h1>
              </div>
            </div>
            <div className="cursor-pointer">
              {/** this dev is for catagory barger bg image */}
              <div className="w-[5.1875rem] h-[5rem] md:w-[9.5625rem] bg-[#C1F1C6] md:h-[9.5625rem] bg-cover bg-no-repeat bg-right rounded-full  bg-[url('/img/7696025.jpg')]" />
              <div className="ml-5">
                <h1 className=" text-[#1E1E1E] md:text-[1.875rem] font-[600] md:ml-2 ">
                  Momo
                </h1>
              </div>
            </div>
            <div className="hidden md:block cursor-pointer">
              {/** this dev is for catagory barger bg image */}
              <div className="w-[5.1875rem] h-[5rem]  md:w-[9.5625rem] bg-[#C1F1C6] md:h-[9.5625rem] bg-cover bg-no-repeat bg-right rounded-full  bg-[url('/img/3092954.jpg')]" />
              <div className="ml-5">
                <h1 className="text-[#1E1E1E] text-md md:text-[1.875rem] font-[600]">
                  Pizza
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
export default Catagorie;