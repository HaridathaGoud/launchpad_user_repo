import React from 'react';
import BreadCrumb from '../../../ui/breadcrumb';
import  CollectionItems  from '../hotcollections.component/CollectionItems';

export default function CategoryView() {

  return (
   
      <div className="max-sm:px-3 md:mt-5 px-4 container mx-auto">
       <BreadCrumb/>
       <h1 className='text-2xl text-secondary font-semibold'>Browse by category</h1>
      
      {/* <div className="mt-4 mb-[42px]">         
          <div className="md:flex justify-between">
            <SearchInputComponent/>
                        <div className="flex items-center max-sm:mt-2">
                            <div className="dropdown mr-2.5">
                                <div tabIndex={0} role="button" className=" m-1 bg-accent px-4 py-2.5 rounded-[28px] text-sm font-medium border-0 hover:bg-accent">Price: low to high <span className="icon drop-arrow"></span></div>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                    <li><a>Low</a></li>
                                    <li><a>High</a></li>
                                </ul>
                            </div>
                            <span className='bg-accent p-2.5 rounded cursor-pointer'>
                                <span className="icon filter-squre"></span>
                            </span>
                            <span className="mx-4 bg-accent p-2.5 rounded cursor-pointer">
                                <span className="icon filter-dots"></span>
                            </span>
                            <span className='bg-accent p-2.5 rounded relative cursor-pointer'>
                                <span className="icon filter-cart"></span>
                                <span className='bg-primary text-white w-[16px] top-[-4px] right-[4px] text-xs h-[16px] inline-block flex justify-center items-center absolute rounded-full'>4</span>
                            </span>
                        </div>
           </div>
        </div>

        {!cardDetails && <div className='grid md:grid-cols-12 lg:gap-[45px]'>
          <div className='col-span-12 md:col-span-4 lg:col-span-4 xl:col-span-3'>
            <StatusDetailview activeTab={activeTab}/>
          </div>
          <div className='col-span-12 md:col-span-8 lg:col-span-8 xl:col-span-9 grid md:grid-cols-2 xl:grid-cols-3 gap-[16px]'>
          <NftCards setCardDetails={setCardDetails}/>        
          </div>
        </div>}
        {cardDetails && <NftCardDetailview cardDetails={cardDetails}/>} */}

        <CollectionItems />
        </div> 
    
  );
}
