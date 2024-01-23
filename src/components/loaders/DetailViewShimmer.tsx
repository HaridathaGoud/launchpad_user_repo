import { NextPage } from 'next';
import React, { useState } from 'react';

const DetailViewShimmer: NextPage = () => {

  return (
    <>
      <div className="animate-pulse space-x-4">
        <div className='grid md:grid-cols-12 gap-6 mt-6'>
       <div className='md:col-span-8'>
       <div className="w-full opacity-1 border rounded-[15px] gap-10 flex items-center p-4 ">
          <div className="w-full md:min-h-[380px] rounded-[15px] bg-slate-200"></div>
        </div>
        <div className='grid md:grid-cols-4 gap-4 mt-6'>
        <div className="w-full h-[48px] rounded-[33px] bg-slate-200"></div>
        <div className="w-full h-[48px] rounded-[33px] bg-slate-200"></div>
        <div className="w-full h-[48px] rounded-[33px] bg-slate-200"></div>
        <div className="w-full h-[48px] rounded-[33px] bg-slate-200"></div>
        </div>
        <div className="w-full h-[16px] rounded-[33px] bg-slate-200 mt-6"></div>
        <div className="w-full h-[16px] rounded-[33px] bg-slate-200 mt-2"></div>
        <div className="w-full h-[16px] rounded-[33px] bg-slate-200 mt-2"></div>
        <div className="w-full h-[16px] rounded-[33px] bg-slate-200 mt-2"></div>
        <div className="w-full h-[16px] rounded-[33px] bg-slate-200 mt-2"></div>
        <div className="w-full h-[16px] rounded-[33px] bg-slate-200 mt-2"></div>
        <div className="w-full h-[16px] rounded-[33px] bg-slate-200 mt-2"></div>
        <div className='grid md:grid-cols-4 mt-4 gap-6'>
        <div className="w-full h-[160px] rounded-md bg-slate-200"></div>
        <div className="w-full h-[160px] rounded-md bg-slate-200"></div>
        <div className="w-full h-[160px] rounded-md bg-slate-200"></div>
        <div className="w-full h-[160px] rounded-md bg-slate-200"></div>
        </div>
        <div className="w-full md:w-[250px] h-[16px] rounded-[33px] bg-slate-200 mt-4"></div>
        <div className="w-full h-[16px] rounded-[33px] bg-slate-200 mt-2"></div>
        <div className='grid md:grid-cols-4 mt-4 gap-6'>
        <div className="w-full h-[160px] rounded-md bg-slate-200"></div>
        <div className="w-full h-[160px] rounded-md bg-slate-200"></div>
        <div className="w-full h-[160px] rounded-md bg-slate-200"></div>
        <div className="w-full h-[160px] rounded-md bg-slate-200"></div>
        </div>
        <div className="w-full h-[16px] rounded-[33px] bg-slate-200 mt-6"></div>
        <div className="w-full h-[16px] rounded-[33px] bg-slate-200 mt-2"></div>
        <div className="w-full h-[16px] rounded-[33px] bg-slate-200 mt-2"></div>
        <div className="w-full h-[16px] rounded-[33px] bg-slate-200 mt-2"></div>
        <div className="w-full h-[16px] rounded-[33px] bg-slate-200 mt-2"></div>
        <div className="w-full h-[16px] rounded-[33px] bg-slate-200 mt-2"></div>
        <div className="w-full h-[16px] rounded-[33px] bg-slate-200 mt-2"></div>
       </div>
        <div className="border shadow rounded-2xl p-4 w-full mx-auto md:col-span-4">
          <div className="animate-pulse flex space-x-4 justify-between">
            <div className="rounded-full bg-slate-200 h-10 w-10"></div>
            <div className='flex gap-4'>
              <div className="rounded-full bg-slate-200 h-7 w-7"></div>
              <div className="rounded-full bg-slate-200 h-7 w-7"></div>
              <div className="rounded-full bg-slate-200 h-7 w-7"></div>
              <div className="rounded-full bg-slate-200 h-7 w-7"></div>
              <div className="rounded-full bg-slate-200 h-7 w-7"></div>
            </div>
          </div>
          <div className="animate-pulse space-x-4 mt-2">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-200 rounded col-span-2"></div>
              <div className="h-2 bg-slate-200 rounded col-span-5"></div>
            </div>
          </div>
          <div className="animate-pulse space-x-4  h-48 mt-2">
            <div className="bg-slate-200 rounded-xl h-full"></div>
          </div>

          <div className="animate-pulse mt-2">
            <div className="h-2 bg-slate-200 rounded-xl mt-2"></div>
            <div className="h-2 bg-slate-200 rounded-xl mt-2"></div>
            <div className="h-2 bg-slate-200 rounded-xl mt-2"></div>
          </div>
          <div className="animate-pulse space-x-4  h-16 mt-2">
            <div className="bg-slate-200 rounded-xl h-full"></div>
          </div>
          <div className="animate-pulse mt-2">
            <div className="h-2 bg-slate-200 rounded-xl mt-2"></div>
            <div className="h-2 bg-slate-200 rounded-xl mt-2"></div>

          </div>
          <div className="animate-pulse space-x-4  h-16 mt-2">
            <div className="bg-slate-200 rounded-xl h-full"></div>
          </div>
          <div className="animate-pulse mt-2">
            <div className="h-2 bg-slate-200 rounded-xl mt-2"></div>
            <div className="h-2 bg-slate-200 rounded-xl mt-2"></div>

          </div>
          <div className="animate-pulse space-x-4  h-16 mt-2">
            <div className="bg-slate-200 rounded-xl h-full"></div>
          </div>
        </div>
        </div>
      </div>

    </>
  );

};
export default DetailViewShimmer;