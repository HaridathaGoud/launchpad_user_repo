import React from "react";
const CreatenftShimmer = () => {
  return (
    <div className="animate-pulse container mx-auto px-3 lg:px-0 mt-5 max-sm:mt-3">
      <div className="grid lg:grid-cols-2 gap-6 mt-7 mb-[42px]">
        <div className="w-full min-h-[500px] mb-3 h-8  rounded-lg bg-slate-200  mt-4"></div>
        <div>
          <div className="w-full   rounded-[30px] h-[42px] bg-slate-200  mt-2 mb-6"></div>
          <div className="w-full   rounded-[30px] h-[100px] bg-slate-200  mt-2 mb-6"></div>
          <div className="w-full   rounded-[30px] h-[42px] bg-slate-200  mt-2 mb-6"></div>

          <div className="w-full   rounded-[30px] h-[42px] bg-slate-200  mt-2 mb-6"></div>

          <div className="w-full   rounded-[30px] h-[42px] bg-slate-200  mt-2 mb-6"></div>
          <div className="flex gap-4">
            <div className="md:w-36 rounded-[30px] h-[54px] bg-slate-200  mt-2 mb-6"></div>
            <div className="md:w-36 rounded-[30px] h-[54px] bg-slate-200  mt-2 mb-6"></div>
            <div className="md:w-36 rounded-[30px] h-[54px] bg-slate-200  mt-2 mb-6"></div>
          </div>
          <div className="w-full   rounded-[30px] h-[42px] bg-slate-200  mt-2 mb-6"></div>
          <div className="w-full   rounded-[30px] h-[42px] bg-slate-200  mt-2 mb-6"></div>
          <div className="w-full   rounded-[30px] h-[42px] bg-slate-200  mt-2 mb-6"></div>
          <div className="w-full   rounded-[30px] h-[42px] bg-slate-200  mt-2 mb-6"></div>
        </div>
      </div>
    </div>
  );
};

const ImageShimmer = () => {
  return (
    <div className="animate-pulse w-full h-[300px] md:h-[500px] mb-3 rounded-[12px] bg-slate-200  mt-4"></div>
  );
};
CreatenftShimmer.ImageShimmer = ImageShimmer;
export default CreatenftShimmer;
