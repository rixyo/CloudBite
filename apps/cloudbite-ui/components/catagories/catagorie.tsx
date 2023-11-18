import React from 'react';


const Catagorie:React.FC = () => {
    
    return (
      <div className=" flex items-center justify-center p-5">
        <div className="flex-col ">
          <div className="text-center md:mx-4 mb-10">
            <h1 className="tracking-wider uppercase mx-2  text-[#FF6868] text-[1.25rem] font-[700]">
              Customer Favorites
            </h1>
          </div>
          <div className="text-center md:mx-4">
            <h1 className="tracking-wider uppercase text-black text-lg md:text-2xl  lg:text-[3.75rem] font-[700]">
              Popular Catagories
            </h1>
          </div>
          <div className="flex  gap-5 items-center justify-between lg:w-[70rem] mt-5 p-5  mb-5">
            <div>
              {/** this dev is for catagory barger bg image */}
              <div className="w-[5.1875rem] h-[5rem]  md:w-[9.5625rem] bg-[#C1F1C6] md:h-[9.5625rem] bg-cover bg-no-repeat bg-right rounded-full  bg-[url('/img/burger.png')]" />
              <div>
                <h1 className="text-[#1E1E1E] text-md md:text-[1.875rem] font-[600]">
                  Main Dish
                </h1>
              </div>
              <div>
                <h1 className="text-[#555] text-sm md:text-[1.375rem] font-[500]">
                  20 main dish
                </h1>
              </div>
            </div>

            <div className="flex-col items-center ">
              {/** this dev is for catagory barger bg image */}
              <div className="w-[5.1875rem] h-[5rem] md:w-[9.5625rem] bg-[#C1F1C6]  md:h-[9.5625rem] bg-cover bg-no-repeat bg-middle rounded-full  bg-[url('/img/breakfast.png')]" />
              <div>
                <h1 className="text-[#1E1E1E] text-md md:text-[1.875rem] font-[600] ml-1">
                  Break Fast
                </h1>
              </div>
              <div>
                <h1 className="text-[#555] text-sm md:text-[1.375rem] font-[500]">
                  30 break fast
                </h1>
              </div>
            </div>
            <div>
              {/** this dev is for catagory barger bg image */}
              <div className="w-[5.1875rem] h-[5rem] md:w-[9.5625rem] bg-[#C1F1C6] md:h-[9.5625rem] bg-cover bg-no-repeat bg-right rounded-full  bg-[url('/img/dessert.png')]" />
              <div>
                <h1 className="hidden md:block text-[#1E1E1E] md:text-[1.875rem] font-[600] ml-2">
                  Dessert
                </h1>
                <h1 className="md:hidden text-[#1E1E1E] text-sm md:text-[1.875rem] font-[600] ml-2">
                  Browse All
                </h1>
              </div>
              <div>
                <h1 className="text-[#555] text-sm  md:text-[1.375rem] md:font-[500] ml-2">
                  <span className="hidden md:block">20 desserts</span>
                  <span className="md:hidden">100 items</span>
                </h1>
              </div>
            </div>
            <div className="hidden md:block">
              {/** this dev is for catagory barger bg image */}
              <div className="w-[5.1875rem] h-[5rem]  md:w-[9.5625rem] bg-[#C1F1C6] md:h-[9.5625rem] bg-cover bg-no-repeat bg-right rounded-full  bg-[url('/img/juice.png')]" />
              <div>
                <h1 className="text-[#1E1E1E] text-md md:text-[1.875rem] font-[600]">
                  Browse All
                </h1>
              </div>
              <div>
                <h1 className="text-[#555] text-md md:text-[1.375rem] font-[500]">
                  50 items
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
export default Catagorie;