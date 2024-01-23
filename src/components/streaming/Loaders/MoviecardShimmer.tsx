import { NextPage } from 'next';
import React, { useState } from 'react';

const MovieShimmer: NextPage = () => {

  return (
    <>
      <div className="animate-pulse space-x-4">
        <div className=" w-full opacity-1 border rounded-xl gap-10 p-4 ">
          <div className="w-full md:h-[213px] rounded-md bg-slate-200  "></div>   
          <div className="w-full mt-4">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>        
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>        
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
    </div>       
        </div>
      </div>
      
    </>
  );

};
export default MovieShimmer;