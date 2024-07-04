import { NextPage } from 'next';
import React from 'react';

const CheckpointsShimmer: NextPage = () => {

  return (
      <div className="animate-pulse space-x-4">
      
        <div className='mt-8 grid grid-cols-4 gap-6' >
          <div>
            <div className="h-8 w-full bg-slate-200 rounded max-w-lg mb-3"></div>
            <div className="h-8 w-full bg-slate-200 rounded max-w-lg mb-3"></div>
            <div className="h-8 w-full bg-slate-200 rounded max-w-lg mb-3"></div>
            <div className="h-8 w-full bg-slate-200 rounded max-w-lg mb-3"></div>
            <div className="h-8 w-full bg-slate-200 rounded max-w-lg"></div>
            
          </div>
          <div className='col-span-3 border rounded-xl p-4'>
          <div className='grid md:grid-cols-4 gap-4'>
            <div>
              <div className="h-4 w-full bg-slate-200 rounded max-w-lg mb-2"></div>
              <div className="h-4 w-full bg-slate-200 rounded max-w-lg mb-2"></div>
              <div className="h-4 w-full bg-slate-200 rounded max-w-lg mb-2"></div>
              <div className="h-4 w-full bg-slate-200 rounded max-w-lg mb-2"></div>
              <div className="h-4 w-full bg-slate-200 rounded max-w-lg mb-2"></div>
              <div className="h-4 w-full bg-slate-200 rounded max-w-lg mb-2"></div>
            </div>
            <div>
              <div className="h-4 w-full bg-slate-200 rounded max-w-lg mb-2"></div>
              <div className="h-4 w-full bg-slate-200 rounded max-w-lg mb-2"></div>
              <div className="h-4 w-full bg-slate-200 rounded max-w-lg mb-2"></div>
              <div className="h-4 w-full bg-slate-200 rounded max-w-lg mb-2"></div>
              <div className="h-4 w-full bg-slate-200 rounded max-w-lg mb-2"></div>
              <div className="h-4 w-full bg-slate-200 rounded max-w-lg mb-2"></div>
            </div>
            <div>
              <div className="h-4 w-full bg-slate-200 rounded max-w-lg mb-2"></div>
              <div className="h-4 w-full bg-slate-200 rounded max-w-lg mb-2"></div>
              <div className="h-4 w-full bg-slate-200 rounded max-w-lg mb-2"></div>
              <div className="h-4 w-full bg-slate-200 rounded max-w-lg mb-2"></div>
              <div className="h-4 w-full bg-slate-200 rounded max-w-lg mb-2"></div>
              <div className="h-4 w-full bg-slate-200 rounded max-w-lg mb-2"></div>
            </div>
            <div>
              <div className="h-4 w-full bg-slate-200 rounded max-w-lg mb-2"></div>
              <div className="h-4 w-full bg-slate-200 rounded max-w-lg mb-2"></div>
              <div className="h-4 w-full bg-slate-200 rounded max-w-lg mb-2"></div>
              <div className="h-4 w-full bg-slate-200 rounded max-w-lg mb-2"></div>
              <div className="h-4 w-full bg-slate-200 rounded max-w-lg mb-2"></div>
              <div className="h-4 w-full bg-slate-200 rounded max-w-lg mb-2"></div>
            </div>
            </div>
            <div className='mt-4 flex justify-between items-end'>
            <div className="h-4 w-52 bg-slate-200 rounded max-w-lg"></div>
            <div className="h-10 w-56 bg-slate-200 rounded-[12px] max-w-lg"></div>
            </div>
          </div>
        </div>
      </div>
  );

};
export default CheckpointsShimmer;