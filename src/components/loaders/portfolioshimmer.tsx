import { NextPage } from 'next';
import React from 'react';

const PortfolioShimmer: NextPage = () => {

  return (
      <div className="animate-pulse container mx-auto mt-2">
        <div className='grid md:grid-cols-3 gap-4 mt-6'>      
        <div className="border p-4 rounded-xl">
        <div className="w-full md:h-[247px] rounded-[16px] bg-slate-200 "></div>        
        </div>
        <div className="border p-4 rounded-xl">
        <div className="w-full md:h-[247px] rounded-[16px] bg-slate-200 "></div>        
        </div>
        <div className="border p-4 rounded-xl">
        <div className="w-full md:h-[247px] rounded-[16px] bg-slate-200 "></div>        
        </div>
        </div>
        <div className="w-full md:h-[56px] rounded-[16px] bg-slate-200 mt-4 "></div>        
        <div className="w-full md:h-[56px] rounded-[16px] bg-slate-200 mt-4 "></div>        
        <div className="w-full md:h-[56px] rounded-[16px] bg-slate-200 mt-4 "></div>        
        <div className="w-full md:h-[56px] rounded-[16px] bg-slate-200 mt-4 "></div>  
      </div>
  );

};
export default PortfolioShimmer;