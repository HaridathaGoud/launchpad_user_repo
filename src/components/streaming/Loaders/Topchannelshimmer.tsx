import { NextPage } from 'next';
import React, { useState } from 'react';

const TopChannelShimmer: NextPage = () => {

  return (
    <>
      <div>
      <div className="w-[150px] h-[150px] mx-auto rounded-full bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
        <div className='mt-4'>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2 mx-auto"></div>
            <div className="w-42 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div className='mt-4'>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2 mx-auto"></div>
            <div className="w-42 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div className='mt-4'>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2 mx-auto"></div>
            <div className="w-42 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
    </div>
      
    </>
  );

};
export default TopChannelShimmer;