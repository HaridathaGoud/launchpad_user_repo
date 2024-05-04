import React from "react";
const ProposalViewShimmer = () => {
    return (
        <div className="animate-pulse space-x-4 col-span-8">
            <div className=" w-full opacity-1 border rounded-xl gap-10 flex items-center p-4 ">
                <div className="w-full h-[288px] rounded-md bg-slate-200"></div>
            </div>
        </div>
    )
}
export default ProposalViewShimmer;