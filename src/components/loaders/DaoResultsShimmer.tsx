import React  from "react";

const DaoResultsShimmer = ()=>{
    return(
        <div className="animate-pulse space-x-4 col-span-4">
            <div className="w-full opacity-1 rounded-xl gap-10 flex items-center p-4 !ml-0 border-1 mt-2">
              <div className="w-full opacity-1 rounded-xl border-2 p-4">
                <div className="w-full h-5  rounded-full bg-slate-200  mb-2"></div>
                <div className="w-full h-5  rounded-full bg-slate-200  mb-2"></div>
                <div className="w-full h-5  rounded-full bg-slate-200 mb-2"></div>
                <div className="w-full h-5  rounded-full bg-slate-200 mb-2"></div>
              </div>
            </div>
          </div>
    )
}
export default DaoResultsShimmer;