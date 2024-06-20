import React from 'react'
const NftCardShimmer = () => {
    return (
        <div className="border shadow rounded-2xl h-full">
            <div className="animate-pulse space-x-4"></div>
            <div className="animate-pulse space-x-4 h-60">
                <div className="bg-slate-200 rounded-xl h-64"></div>
            </div>
            <div className="animate-pulse mt-2 py-[1rem] px-3">
                <div className="h-2 bg-slate-200 rounded-xl mt-8"></div>
                <div className="h-2 bg-slate-200 rounded-xl mt-8"></div>
                <div className="h-2 bg-slate-200 rounded-xl mt-8"></div>
            </div>
        </div>
    )
}
export default NftCardShimmer