import { DollarSign } from 'lucide-react';
import React from 'react';

type RevenueProps = {
    revenue:string
    color:string
    titleColor:string
    title:string
};

const Revenue:React.FC<RevenueProps> = ({revenue,color,title,titleColor}) => {
   
    return (
      <div
        className={`border-2 border-red-200 w-auto md:w-[20rem] lg:w-[30rem] lg:h-[10rem] p-5 rounded-lg `}
      >
        <h1
          style={{ color:titleColor}}
          className="text-[2rem] font-[700] text-center"
        >
          {title}
        </h1>
        <div className="flex gap-3 justify-center mt-3">
          <DollarSign
            style={{ color: color }}
            size={40}
            className={`text-center`}
          />
          <h1 style={{ color: color }} className={` text-[2rem] font-[700]`}>
            {revenue}
          </h1>
        </div>
      </div>
    );
}
export default Revenue;