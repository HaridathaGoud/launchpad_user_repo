import React from "react";

const ProposalsShimmer = (props: any) => {
    return (
        <div className="animate-pulse space-x-4">
            <div className="w-full h-6 rounded-md bg-slate-200 mt-6 !ml-0 max-w-md"></div>
            <div className=" w-full opacity-1 rounded-xl flex flex-col gap-4 !m-0 !mt-6">
                <div className="w-full md:h-[260px] rounded-md bg-slate-200  "></div>
                {props?.from !== 'project' && <>
                    <div className="w-full md:h-[260px] rounded-md bg-slate-200  "></div>
                    <div className="w-full md:h-[260px] rounded-md bg-slate-200  "></div>
                </>}
            </div>
        </div>
    )
}
export default ProposalsShimmer;