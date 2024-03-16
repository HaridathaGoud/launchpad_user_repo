
import React from 'react';

const StakingShimmer= () => {

  return (
      <div className="animate-pulse space-x-4 container m-auto">
        <div className="w-full h-6 rounded-md bg-slate-200 mt-6 !ml-0 max-w-md"></div>
        <div className='mt-8 md:flex items-start justify-between'>
          <div >
            <div className='flex'>
              <div className="w-16 h-16 rounded-full bg-slate-200 !ml-0"></div>

              <div className='px-6'>
                <div className="h-8 w-32 bg-slate-200 rounded  mb-2"></div>
                <div className="h-5 w-32 bg-slate-200 rounded "></div>
              </div>
            </div>
            <div className="w-60 h-10 rounded-[33px] bg-slate-200 !ml-0 mt-4"></div>
          </div>
          <div className='mt-4 md:mt-0'>
            <div className="h-6 w-full md:w-96 bg-slate-200 rounded max-w-lg mb-2"></div>
            <div className="h-8 w-ful md:w-96 bg-slate-200 rounded max-w-lg"></div>
          </div>
        </div>
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
            <div className="h-10 w-56 bg-slate-200 rounded-[33px] max-w-lg"></div>
            </div>
          </div>
        </div>
      </div>

  );

};
export default StakingShimmer;