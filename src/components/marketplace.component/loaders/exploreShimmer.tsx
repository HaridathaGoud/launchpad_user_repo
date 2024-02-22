import React from "react";

const DashboardShimmer = () => {
  return (
    <div className="container mx-auto mt-4">
      <div className="grid gap-4 max-sm:flex md:grid-cols-2 max-sm:flex-col-reverse	items-center">
        <div>
        <div className="animate-pulse space-x-4">
        <div className=" w-full opacity-1 rounded-xl gap-10 p-4 ">
        <div className=" w-1/2 h-4 rounded-md bg-slate-200  mb-4"></div>
        <div className=" w-3/5 h-4 rounded-md bg-slate-200  mb-2"></div>
        <div className=" w-3/5 h-4 rounded-md bg-slate-200   mb-5"></div>
        <div className=" w-1/2 h-4 rounded-md bg-slate-200  mb-2"></div>
        <div className=" w-1/4 h-4 rounded-md bg-slate-200  mb-5"></div>
        <div className="flex gap-4">
        <div className=" w-1/4 h-10 rounded-[20px] bg-slate-200  mb-2"></div>
        <div className=" w-1/4 h-10 rounded-[20px] bg-slate-200  mb-2"></div>
        </div>
         </div>
        </div>
        </div>
    <div className="animate-pulse space-x-4">
      <div className=" w-full opacity-1 border rounded-xl gap-10 flex items-center p-4 ">
        <div className="w-full md:h-[480px] rounded-md bg-slate-200  "></div>
      </div>
    </div>
    </div>
    <div className="grid md:grid-cols-4 mt-5 gap-3">
    <div className="animate-pulse space-x-4">
      <div className=" w-full opacity-1 border rounded-xl gap-10 flex items-center p-4 ">
        <div className="w-full md:h-[176px] rounded-md bg-slate-200  "></div>
      </div>
    </div>
    <div className="animate-pulse space-x-4">
      <div className=" w-full opacity-1 border rounded-xl gap-10 flex items-center p-4 ">
        <div className="w-full md:h-[176px] rounded-md bg-slate-200  "></div>
      </div>
    </div>
    <div className="animate-pulse space-x-4">
      <div className=" w-full opacity-1 border rounded-xl gap-10 flex items-center p-4 ">
        <div className="w-full md:h-[176px] rounded-md bg-slate-200  "></div>
      </div>
    </div>
    <div className="animate-pulse space-x-4">
      <div className=" w-full opacity-1 border rounded-xl gap-10 flex items-center p-4 ">
        <div className="w-full md:h-[176px] rounded-md bg-slate-200  "></div>
      </div>
    </div>
    </div>
    <div className="grid md:grid-cols-3 mt-5 gap-3 my-5">
    <div className="animate-pulse space-x-4">
      <div className=" w-full opacity-1 border rounded-xl gap-10 flex items-center p-4 ">
        <div className="w-full md:h-[520px] rounded-md bg-slate-200  "></div>
      </div>
    </div>    
    <div className="animate-pulse space-x-4">
      <div className=" w-full opacity-1 border rounded-xl gap-10 flex items-center p-4 ">
        <div className="w-full md:h-[520px] rounded-md bg-slate-200  "></div>
      </div>
    </div>
    <div className="animate-pulse space-x-4">
      <div className=" w-full opacity-1 border rounded-xl gap-10 flex items-center p-4 ">
        <div className="w-full md:h-[520px] rounded-md bg-slate-200  "></div>
      </div>
    </div>
    </div>
    <div className="grid md:grid-cols-4 mt-5 gap-3">
    <div className="animate-pulse space-x-4">
      <div className=" w-full opacity-1 border rounded-xl gap-10 flex items-center p-4 ">
        <div className="w-full md:h-[287px] rounded-md bg-slate-200  "></div>
      </div>
    </div>
    <div className="animate-pulse space-x-4">
      <div className=" w-full opacity-1 border rounded-xl gap-10 flex items-center p-4 ">
        <div className="w-full md:h-[287px] rounded-md bg-slate-200  "></div>
      </div>
    </div>
    <div className="animate-pulse space-x-4">
      <div className=" w-full opacity-1 border rounded-xl gap-10 flex items-center p-4 ">
        <div className="w-full md:h-[287px] rounded-md bg-slate-200  "></div>
      </div>
    </div>
    <div className="animate-pulse space-x-4">
      <div className=" w-full opacity-1 border rounded-xl gap-10 flex items-center p-4 ">
        <div className="w-full md:h-[287px] rounded-md bg-slate-200  "></div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default DashboardShimmer;
