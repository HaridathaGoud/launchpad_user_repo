import React from "react";
import NftCardShimmer from "./NftCardShimmer";
const HotcollectionviewShimmer = () => {
    return (
      <div className="animate-pulse container mx-auto px-3 lg:px-0 mt-5 max-sm:mt-3"> 
      <div className="w-full min-h-[320px] mb-3 h-8  rounded-lg bg-slate-200  mt-4"></div> 
      <div className="md:flex gap-4 items-center">
      <div className="w-40 rounded-[30px] h-[42px] bg-slate-200  mt-2"></div>
      <div className="w-40 rounded-[30px] h-[42px] bg-slate-200  mt-2"></div>
      </div> 
      <div className="md:flex justify-between items-center mt-7 mb-[42px]">
      <div className="xl:w-[42rem] md:w-96 rounded-[30px] h-[42px] bg-slate-200  mt-2"></div>
      <div className="w-40 rounded-[30px] h-[42px] bg-slate-200  mt-2"></div>
      </div>
     <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
      <NftCardShimmer/>
      <NftCardShimmer/>
      <NftCardShimmer/>
      <NftCardShimmer/>
     </div>
     

     </div>
    )
}
export default HotcollectionviewShimmer;