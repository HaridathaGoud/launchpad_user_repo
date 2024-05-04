import React from "react";

const DashboardShimmers = () => {
  return (
    <div className="container mx-auto mt-4">
      <div className="animate-pulse space-x-4">
        <div className=" w-full opacity-1 border rounded-xl gap-10 flex items-center p-4 ">
          <div className="w-full md:h-[480px] rounded-md bg-slate-200  "></div>
        </div>
      </div>
      <div className='mt-10 grid md:grid-cols-4 gap-4 animate-pulse'>
    <div className='px-6'>
      <div className="h-8 w-28 bg-slate-200 rounded  mb-2"></div>
      <div className="h-5 w-28 bg-slate-200 rounded "></div>
      </div>
      <div className='px-6'>
      <div className="h-8 w-28 bg-slate-200 rounded  mb-2"></div>
      <div className="h-5 w-28 bg-slate-200 rounded "></div>
      </div>
      <div className='px-6'>
      <div className="h-8 w-28 bg-slate-200 rounded  mb-2"></div>
      <div className="h-5 w-28 bg-slate-200 rounded "></div>
      </div>
      <div className='px-6'>
      <div className="h-8 w-28 bg-slate-200 rounded  mb-2"></div>
      <div className="h-5 w-28 bg-slate-200 rounded "></div>
      </div>
    </div>
    </div>
  );
};

export default DashboardShimmers;
