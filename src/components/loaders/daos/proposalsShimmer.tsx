import React from "react";

const ProposalsShimmer = () => {
  return (
    <div className="animate-pulse space-x-4">      
      <div className="w-full h-6 rounded-md bg-slate-200 mt-6 !ml-0 max-w-md"></div>
      <div className=" lg:grid lg:grid-cols-2 gap-4 !ml-0 mt-4">
        <div className="w-full h-[200px] rounded-md bg-slate-200  "></div>
        <div className="w-full h-[200px] rounded-md bg-slate-200  "></div>
        <div className="w-full h-[200px] rounded-md bg-slate-200  "></div>
      </div>
    </div>
  );
};

const CardsShimmer=()=>{
  return (
    <div className="animate-pulse space-x-4">      
      <div className=" lg:grid lg:grid-cols-2 gap-4 !ml-0 mt-4">
        <div className="w-full h-[200px] rounded-md bg-slate-200  "></div>
        <div className="w-full h-[200px] rounded-md bg-slate-200  "></div>
        <div className="w-full h-[200px] rounded-md bg-slate-200  "></div>
      </div>
    </div>
  );
}
ProposalsShimmer.Cards=CardsShimmer;
export default ProposalsShimmer;
