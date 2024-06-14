import React from "react";

const PortfolioShimmer = () => {
  return (
    <div className="animate-pulse container mx-auto mt-2">
      <div className="border p-4 rounded-xl">
        <div className="w-full md:h-[247px] rounded-[16px] bg-slate-200 "></div>
      </div>
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <div className="border p-4 rounded-xl">
          <div className="w-full md:h-[247px] rounded-[16px] bg-slate-200 "></div>
        </div>
        <div className="border p-4 rounded-xl">
          <div className="w-full md:h-[247px] rounded-[16px] bg-slate-200 "></div>
        </div>
        <div className="border p-4 rounded-xl">
          <div className="w-full md:h-[247px] rounded-[16px] bg-slate-200 "></div>
        </div>
      </div>
      <div className="w-full md:h-[56px] rounded-[16px] bg-slate-200 mt-4 "></div>
      <div className="w-full md:h-[56px] rounded-[16px] bg-slate-200 mt-4 "></div>
      <div className="w-full md:h-[56px] rounded-[16px] bg-slate-200 mt-4 "></div>
      <div className="w-full md:h-[56px] rounded-[16px] bg-slate-200 mt-4 "></div>
    </div>
  );
};

const UserInfoShimmer = () => {
  return (
    <div className="animate-pulse container mx-auto mt-2">
      <div className="border p-4 rounded-xl">
        <div className="w-full md:h-[247px] rounded-[16px] bg-slate-200 "></div>
      </div>
    </div>
  );
};
const ParticipationInfoShimmer = () => {
  return (
    <div className="grid md:grid-cols-3 gap-4 mt-6">
    <div className="border p-4 rounded-xl">
      <div className="w-full md:h-[247px] rounded-[16px] bg-slate-200 "></div>
    </div>
    <div className="border p-4 rounded-xl">
      <div className="w-full md:h-[247px] rounded-[16px] bg-slate-200 "></div>
    </div>
    <div className="border p-4 rounded-xl">
      <div className="w-full md:h-[247px] rounded-[16px] bg-slate-200 "></div>
    </div>
  </div>
  );
};
const TabShimmer=()=>{
  return (
    <div className="animate-pulse space-x-1">
    <div className="w-full h-[36px] rounded-[8px] bg-slate-200 mt-2 !ml-0"></div>
    <div className="w-full h-[36px] rounded-[8px] bg-slate-200 mt-2 !ml-0"></div>
    <div className="w-full h-[36px] rounded-[8px] bg-slate-200 mt-2 !ml-0"></div>
    <div className="w-full h-[36px] rounded-[8px] bg-slate-200 mt-2 !ml-0"></div>
</div>
  )
}
PortfolioShimmer.UserInfo=UserInfoShimmer
PortfolioShimmer.ParticipationInfo=ParticipationInfoShimmer
PortfolioShimmer.Tab=TabShimmer
export default PortfolioShimmer;
