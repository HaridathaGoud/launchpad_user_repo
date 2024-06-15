import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function BrowseByCategory() {
  return (
    <>
      <div className="container mx-auto mt-[40px]">
        <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-secondary mb-4">Browse by category</h2>
        <a href="" className='text-primary text-base font-medium'>View All</a>
        </div>

        <div className="grid lg:grid-cols-4 gap-4">
        <div className='card bg-primary-content border border-slate-200 w-full'>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1-eFLgJYTN32j3g25R8MoVssmTuWPhatjtA&usqp=CAU" className='h-[130px] object-cover rounded-t-2xl w-full' alt="" />
          <div className="flex gap-1 mt-1">
           <div className='flex-1'> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFEG3WzneASDZB24ZVoJ9o-RutaKaxwgUuQA&usqp=CAU" alt="" className='h-[100px] object-cover w-full'/></div>
           <div className='flex-1'> <img src="https://i.pinimg.com/236x/33/93/b9/3393b99e69aab58be7b53302660092bb.jpg" alt="" className='h-[100px] object-cover w-full' /></div>
           <div className='flex-1'> <img src="https://i.pinimg.com/236x/33/13/e8/3313e8938fa9ecf5da4b008e0cc6fc65.jpg" alt="" className='h-[100px] object-cover w-full' /></div>
          </div>
          <div className='pt-2 px-5 pb-4'>
            <h1 className='text-lg text-secondary font-semibold truncate'>Weapons</h1>
          </div>
        </div>
        <div className='card bg-primary-content border border-slate-200 w-full'>
          <img src="https://i.pinimg.com/236x/9b/e7/32/9be7324c5dc4027996ae37e0e4b0e3b8.jpg" className='h-[130px] object-cover rounded-t-2xl w-full' alt="" />
          <div className="flex gap-1 mt-1">
           <div className='flex-1'> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFEG3WzneASDZB24ZVoJ9o-RutaKaxwgUuQA&usqp=CAU" alt="" className='h-[100px] object-cover w-full'/></div>
           <div className='flex-1'> <img src="https://i.pinimg.com/236x/12/c2/95/12c29550d87b8404171b9cbebde267d3.jpg" alt="" className='h-[100px] object-cover w-full' /></div>
           <div className='flex-1'> <img src="https://i.pinimg.com/236x/20/9d/35/209d35d27284f103f96ef1e4c7024424.jpg" alt="" className='h-[100px] object-cover w-full' /></div>
          </div>
          <div className='pt-2 px-5 pb-4'>
            <h1 className='text-lg text-secondary font-semibold truncate'>Costumes</h1>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}
