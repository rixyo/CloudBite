import { DollarSign } from 'lucide-react';
import React from 'react';

type RevenueProps = {
    revenue:string
    color:string
    title:string
};

const Revenue:React.FC<RevenueProps> = ({revenue,color,title}) => {
    
    return (
      <div
        className={`border-2 border-red-200 w-[30rem] h-[10rem] p-5 rounded-lg `}
      >
        <h1 className="text-[2rem] font-[700] text-center">{title}</h1>
        <div className="flex gap-3 justify-center mt-3">
          <DollarSign size={40} className={`text-${color} text-center`} />
          <h1 className={`text-${color} text-[2rem] font-[700]`}>{revenue}</h1>
        </div>
      </div>
    );
}
export default Revenue;