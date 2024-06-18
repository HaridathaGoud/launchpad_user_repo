import React from "react";
import NftCardShimmer from "../hotcollections.component/NftCardShimmer";
const ExplorenftShimmer = () => {
    return (
      <div className="animate-pulse container mx-auto px-3 lg:px-0 mt-5 max-sm:mt-3">   

      <div className="w-1/4 mb-3 h-8  rounded-md bg-slate-200  mt-4"></div>

      <div className="md:flex justify-between items-center">
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
export default ExplorenftShimmer;