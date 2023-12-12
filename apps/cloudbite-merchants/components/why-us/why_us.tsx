import React from 'react';


const WhyUs:React.FC = () => {
    
    return (
      <div className="">
        <div>
          <h1 className="text-center  text-[3.75rem] font-[700] leading-[131.023%] ">
            Why CloudBite Merchants
          </h1>
        </div>
        <div className="flex items-center justify-center gap-5 mt-5 p-5">
          <div className="w-[27rem] h-[15rem] lg:h-[10rem] p-5 border-2 border-red-200 rounded ">
            <h1 className="text-[1rem] font-[600]">Deliver your way</h1>
            <p className=" tracking-[159%] text-[1rem] font-[500] text-[#555]">
              Our offerings are flexible so you can customize them to your
              needs. Get started with your delivery people or connect with
              delivery people through the CloudBite platform.
            </p>
          </div>
          <div className="w-[27rem] h-[15rem] lg:h-[10rem] p-5 border-2 border-red-200 rounded ">
            <h1 className="text-[1rem] font-[600]">Boost your visibility</h1>
            <p className=" tracking-[159%] text-[rem] font-[500] text-[#555]">
              Stand out with in-app marketing to reach even more customers and
              increase sales.
            </p>
          </div>
          <div className="w-[27rem] h-[15rem] lg:h-[10rem] p-5 border-2 border-red-200 rounded ">
            <h1 className="text-[1rem] font-[600]">Connect with customers</h1>
            <p className=" tracking-[159%] text-[rem] font-[500] text-[#555]">
              Turn customers into regulars with actionable data insights,
              respond to reviews or offer a loyalty program.
            </p>
          </div>
        </div>
      </div>
    );
}
export default WhyUs;