import React from "react";

const DetailpageShimmer = () => {
  return (
    <div className="container mx-auto mt-4">
      <div className="grid gap-4 max-sm:flex md:grid-cols-12 max-sm:flex-col-reverse">
      <div className="animate-pulse md:col-span-5">
      <div className=" w-full opacity-1 border rounded-xl gap-10 flex items-center p-4 mb-5 ">
        <div className="w-full md:h-[480px] rounded-md bg-slate-200  "></div>
      </div>
      <div className=" w-1/4 h-4 rounded-md bg-slate-200  mb-5"></div>
        <div className=" w-3/4 h-4 rounded-md bg-slate-200  my-4"></div>  
        <div className=" w-2/3 h-4 rounded-md bg-slate-200  my-4"></div>  
        <div className=" w-1/2 h-4 rounded-md bg-slate-200  my-4"></div>  
        <div className=" w-1/3 h-4 rounded-md bg-slate-200  my-4"></div>  
    </div>
        <div className="md:col-span-7">
        <div className="animate-pulse">
        <div className=" w-1/2 h-4 rounded-md bg-slate-200  mb-4"></div>  
        <div className=" w-full opacity-1 rounded-xl">
        <div className="flex my-6">
        <div className="w-full opacity-1 rounded-xl">
        <div className=" w-1/2 h-4 rounded-md bg-slate-200  mb-4"></div>        
        <div className=" w-1/3 h-4 rounded-md bg-slate-200  mb-2"></div>
        </div>
        <div className="w-full opacity-1 rounded-xl">
        <div className=" w-1/2 h-4 rounded-md bg-slate-200  mb-4"></div>        
        <div className=" w-1/3 h-4 rounded-md bg-slate-200  mb-2"></div>
        </div>
        </div>
        <div className=" w-1/4 h-4 rounded-md bg-slate-200  mb-5"></div>
        <div className=" w-3/4 h-4 rounded-md bg-slate-200  my-4"></div>  
        <div className=" w-2/3 h-4 rounded-md bg-slate-200  my-4"></div>  
        <div className=" w-1/2 h-4 rounded-md bg-slate-200  my-4"></div>  
        <div className=" w-1/3 h-4 rounded-md bg-slate-200  my-4"></div>  
        <div className="flex gap-4 mt-6">
        <div className=" w-1/4 h-10 rounded-[20px] bg-slate-200  mb-2"></div>
        <div className=" w-1/4 h-10 rounded-[20px] bg-slate-200  mb-2"></div>
        </div>
         </div>
         <div className=" w-1/4 h-4 rounded-md bg-slate-200  mt-10 mb-4"></div> 
          <div className="grid md:grid-cols-3 gap-4">
          <div className=" w-full opacity-1 border rounded-xl gap-10 flex items-center p-4 ">
             <div className="w-full md:h-[110px] rounded-md bg-slate-200  "></div>
         </div>
         <div className=" w-full opacity-1 border rounded-xl gap-10 flex items-center p-4 ">
             <div className="w-full md:h-[110px] rounded-md bg-slate-200  "></div>
         </div>
         <div className=" w-full opacity-1 border rounded-xl gap-10 flex items-center p-4 ">
             <div className="w-full md:h-[110px] rounded-md bg-slate-200  "></div>
         </div>
         <div className=" w-full opacity-1 border rounded-xl gap-10 flex items-center p-4 ">
             <div className="w-full md:h-[110px] rounded-md bg-slate-200  "></div>
         </div>
         <div className=" w-full opacity-1 border rounded-xl gap-10 flex items-center p-4 ">
             <div className="w-full md:h-[110px] rounded-md bg-slate-200  "></div>
         </div>
          </div>
        </div>
        </div>
    
    </div>
   
    </div>
  );
};

export default DetailpageShimmer;
