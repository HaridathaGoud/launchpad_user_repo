import { NextPage } from 'next';
import React, { useState } from 'react';

const StreamingBannerShimmer: NextPage = () => {

  return (
    <>
      <div className="animate-pulse space-x-4">
        <div className=" w-full opacity-1 border rounded-xl gap-10 flex items-center p-4 ">
          <div className="w-full md:h-[320px] rounded-md bg-slate-200  "></div>          
        </div>
      </div>
      
    </>
  );

};
export default StreamingBannerShimmer;