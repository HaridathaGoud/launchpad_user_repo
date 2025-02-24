import React from "react";

export const ClaimsShimmer = () => {
    return (
        <div className="animate-pulse space-x-1">
            <div className="w-full h-[16px] rounded-[12px] bg-slate-200 mt-2"></div>
            <div className="w-full h-[16px] rounded-[12px] bg-slate-200 mt-6 !ml-0"></div>
            <div className="w-full h-[16px] rounded-[12px] bg-slate-200 mt-2 !ml-0"></div>
            <div className="w-full h-[16px] rounded-[12px] bg-slate-200 mt-2 !ml-0"></div>
            <div className="w-full h-[16px] rounded-[12px] bg-slate-200 mt-2 !ml-0"></div>
        </div>
    )
}
