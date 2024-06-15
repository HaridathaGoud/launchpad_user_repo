import React, { useState } from 'react';
import NaviLink from '../../../ui/NaviLink';
import DetailviewLeftpanel from './leftpanel';
import CommentsSection from './RightPanel';
import RightPanel from './RightPanel';



import { Link } from 'react-router-dom';
import NftCardDetailview from './Nftcarddetailview';
import SearchInputComponent from './SearchComponent';
import StatusDetailview from './detailviewstatus';
import NftCards from './Nftcards';
// import NftCardDetailview from './Nftcarddetailview';

const HotcollectionView = ({buynft}) => {

const [activeTab,setActiveTab]=useState('nft')
const [cardDetails,setCardDetails]=useState(null)
const handleTabChange=(e,type)=>{
  setActiveTab(type)
}
  return (
    <>
      <div className="max-sm:px-3 md:mt-5 px-4">
       
      
      <div role="tablist" className="tabs tabstyle mt-[34px]">
          <input type="radio" name="my_tabs_1" role="tab" className={`tab !ml-0 ${activeTab==='nft'?  'tab-checked':''}`} aria-label="NFT’s" onChange={(e)=>handleTabChange(e,'nft')} checked={activeTab==='nft'} />
          <div role="tabpanel" className="tab-content py-[18px]">
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

          <input type="radio" name="my_tabs_1" role="tab" className={`tab ${activeTab==='nftMembership' ? 'tab-checked':''}`} aria-label="Buy NFT Membership"  onChange={(e)=>handleTabChange(e,'nftMembership')} checked={activeTab==='nftMembership'}/>
          <div role="tabpanel" className="tab-content py-[18px]">
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
          
        </div>

        {!cardDetails && <div className='grid md:grid-cols-12 lg:gap-[45px]'>
          <div className='col-span-12 lg:col-span-3'>
            <StatusDetailview activeTab={activeTab}/>
          </div>
          <div className='col-span-12 lg:col-span-9 grid md:grid-cols-3 xl:grid-cols-4 gap-[16px]'>
          <NftCards setCardDetails={setCardDetails}/>        
          </div>
        </div>}
        {cardDetails && <NftCardDetailview cardDetails={cardDetails}/>}
        </div>
    </>
  );
}
export default HotcollectionView;
