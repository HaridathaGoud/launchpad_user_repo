import React from "react";

const ProposalViewCardShimmer = () => {
  return (<>
   
    <div className="grid grid-cols-12 gap-4 mt-5">
    <div className="animate-pulse space-x-4 col-span-4">
      <div className=" w-full opacity-1 rounded-xl gap-10 flex items-center p-4 ">
        <div className="w-12 h-12  rounded-full bg-slate-200  shrink-0"></div>        
        <div className="w-full opacity-1 rounded-xl">
        <div className="w-full h-5  rounded-full bg-slate-200  mb-2"></div>        
        <div className="w-full h-5  rounded-full bg-slate-200  "></div>   
          </div>     
      </div>
      <div className="w-full opacity-1 rounded-xl p-4">
      <div className="w-full h-5  rounded-full bg-slate-200  ">
        </div>  
        </div>  
        <div className="animate-pulse space-x-4 col-span-8">
      <div className=" w-full opacity-1 border rounded-xl gap-10 flex items-center p-4 ">
        <div className="w-full md:h-[150px] rounded-md bg-slate-200  "></div>
      </div>
    </div>
    </div>
    <div className="animate-pulse space-x-4 col-span-8">
      <div className=" w-full opacity-1 border rounded-xl gap-10 flex items-center p-4 ">
        <div className="w-full md:h-[288px] rounded-md bg-slate-200  "></div>
      </div>
    </div>
    </div>
    </>
  );
};

export default ProposalViewCardShimmer;
