import React,{ useEffect, useState } from 'react';
import SearchInputComponent from './hotcollections.component/SearchComponent';


export default function FilterComponent() {
  const [activeTab,setActiveTab]=useState('nft')
  const [cardDetails,setCardDetails]=useState(null)
  const handleTabChange=(e,type)=>{
    setActiveTab(type)
  }
  return (
    <>
      <div className="mt-4 mb-[42px]">         
          <div className="md:flex justify-between items-center">
            <SearchInputComponent/>
                        <div className="flex items-center max-sm:mt-2">
                            <div className="dropdown mr-2.5">
                                <div tabIndex={0} role="button" className=" m-1 bg-accent px-4 py-2.5 rounded-[12px] text-sm font-medium border-0 hover:bg-accent dar-bg-cont">Price: low to high <span className="icon drop-arrow"></span></div>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 dropdown-style-price">
                                    <li><a>Low</a></li>
                                    <li><a>High</a></li>
                                </ul>
                            </div>
                            <span className='bg-accent p-2.5 rounded cursor-pointer'>
                                <span className="icon filter-squre"></span>
                            </span>
                            <span className="mx-4 bg-accent p-2.5 rounded cursor-pointer">
                                <span className="icon properties"></span>
                            </span>
                            <span className='bg-accent p-2.5 rounded relative cursor-pointer'>
                                <span className="icon filter-cart"></span>
                                <span className='bg-primary text-white w-[16px] top-[-4px] right-[4px] text-xs h-[16px] inline-block flex justify-center items-center absolute rounded-full'>4</span>
                            </span>
                        </div>
           </div>
        </div>
       </>
  );
}
