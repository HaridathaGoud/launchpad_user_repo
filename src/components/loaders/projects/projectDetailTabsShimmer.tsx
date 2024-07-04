import React from 'react'

export const ProjectDetailTabsShimmer = () => {
    return (
        <div className="animate-pulse space-x-4">
            {" "}
            <div className="grid md:grid-cols-4 gap-4 mt-6">
                <div className="w-full h-[48px] rounded-[12px] bg-slate-200"></div>
                <div className="w-full h-[48px] rounded-[12px] bg-slate-200"></div>
                <div className="w-full h-[48px] rounded-[12px] bg-slate-200"></div>
                <div className="w-full h-[48px] rounded-[12px] bg-slate-200"></div>
            </div>
        </div>
    )
}
