import React from "react";

const ProposalCardShimmer = () => {
  return (<>
    <div className="animate-pulse space-x-4">
      <div className=" w-full opacity-1 border rounded-xl gap-10 flex items-center p-4 ">
        {/* <div className="w-full md:h-[208px] rounded-md bg-slate-200  "></div> */}
      </div>
    </div>
    <div className="grid grid-cols-12 gap-4 mt-5">
    <div className="animate-pulse space-x-4 col-span-4">
      <div className=" w-full opacity-1 rounded-xl gap-10 flex items-center p-4 border-b-1 mb-2">
        {/* <div className="w-12 h-12  rounded-full bg-slate-200  shrink-0"></div>         */}
        <div className="w-full opacity-1 border-b-2">
        <div className="w-full h-5  rounded-full bg-slate-200  mb-2"></div>         
        <div className="w-full h-5  rounded-full bg-slate-200 mb-2"></div> 
        <div className="w-full h-5  rounded-full bg-slate-200 mb-2"></div> 
        <div className="w-full h-5  rounded-full bg-slate-200 mb-2"></div>   
          </div>     
      </div>
      <div className="w-full opacity-1 rounded-xl gap-10 flex items-center p-4 !ml-0 border-1 mt-2">
      <div className="w-full opacity-1 rounded-xl border-2 p-4">
        <div className="w-full h-5  rounded-full bg-slate-200  mb-2"></div>        
        <div className="w-full h-5  rounded-full bg-slate-200  mb-2"></div>   
        <div className="w-full h-5  rounded-full bg-slate-200 mb-2"></div> 
        <div className="w-full h-5  rounded-full bg-slate-200 mb-2"></div> 
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

export default ProposalCardShimmer;
