import React, { useState } from 'react';
import NaviLink from '../../../ui/NaviLink';
import DetailviewLeftpanel from '../../streaming/Detailview/leftpanel';
import CommentsSection from '../../RightPanel';
import RightPanel from '../../streaming/Detailview/RightPanel';
import SearchInputComponent from '../../streaming/SearchComponent';
import StatusDetailview from '../../streaming/Detailview/detailviewstatus';
import NftCards from '../../streaming/Detailview/Nftcards';
import { Link } from 'react-router-dom';
import NftCardDetailview from '../../streaming/Detailview/Nftcarddetailview';
import Button from '../../../ui/Button';
import TopSellerCarousal from './topseller.component';

const TopsellerDetailview = ({ buynft }) => {
  const [isChecked, setIsChecked] = useState(false)
  const [summary, setSummary] = useState(false)
  const [activeTab, setActiveTab] = useState('nft')
  const [cardDetails, setCardDetails] = useState(null)
  const handleTabChange = (e, type) => {
    setActiveTab(type)
  }
  const openChannelDrawer = () => {
    setIsChecked(true)
  }
  const closeChannelDrawer = () => {
    setIsChecked(false)
  }
  const handleSummary = () => {
    setSummary(true);
  }
  const handleCancel = () => {
    setIsChecked(false)
  }
  return (
    <>
      <div className="mx-auto max-sm:px-3 md:mt-5 container">
        <div className='min-h-[320px] rounded-lg mt-4 relative'>
          <img src="https://media.thenerdstash.com/wp-content/uploads/2021/11/disney-plus-new-marvel-banner-2.jpeg" alt="" className='w-full h-[480px] md:h-[400px] object-cover rounded-lg' />
          <div className="md:flex gap-12 items-center absolute p-4 md:px-16 w-full h-full top-0 rounded-lg bg-overlay ">
            <img src={'https://i.pinimg.com/236x/82/6c/fd/826cfd84d6d83cff554b0e5b7834aa39.jpg  '} className="w-[80px] h-[80px] md:w-[150px] md:h-[150px] rounded-full object-cover max-sm:mx-auto" alt="" />
            <div>
              <div className='flex max-sm:mt-4 items-center'>
                <p className='text-white font-semibold text-[32px] leading-8 mr-2'>Marvel Studios</p> <span className='icon circle-check shrink-0'></span>
              </div>
              <div className="flex text-[18px] font-medium gap-2.5 mt-1">
                <p className='text-white'>Marvel Films</p>
                <p className='text-white'>23 M Subscribers</p>                
              </div>
              <div>
                <p className='text-white mt-3 text-base font-semibold break-all'><span className='font-normal mr-2'>Address :</span>0xdB055877e6c13b6A6B25aBcAA29B393777dD0a73</p>
              </div>
              <div className="flex gap-4 mt-4 mb-5">
                <p className='text-white text-base font-semibold'><span className='font-normal mr-1'>Followers</span>98456k</p>
                <p className='text-white text-base font-semibold'><span className='font-normal mr-1'>Following</span>90</p>
                <p className='text-white text-base font-semibold'><span className='font-normal mr-1'>Items</span>100k</p>
              </div>
              <div className="flex md:flex-row items-center gap-2.5 flex-col">
                <Button type='primary' handleClick={openChannelDrawer}><span className='video-icon icon'></span>Subscribe with 2Matic / $1.32</Button>
                <button className="bg-accent px-4 py-2 rounded-[20px] text-sm font-medium whitespace-nowrap"> <span className="icon share mr-2"></span>Share</button></div>
            <div className='flex gap-6 absolute right-10 bottom-6'>
              <span className='icon fb cursor-pointer'></span>
              <span className='icon linkedin cursor-pointer'></span>
              <span className='icon twit cursor-pointer'></span>
              <span className='icon network cursor-pointer'></span>
            </div>
            </div>
            
          </div> 
        </div>
        <div role="tablist" className="tabs tabstyle mt-[34px] customTabs  max-sm:overflow-x-auto scrollbar-hidden">
          <input type="radio" name="my_tabs_1" role="tab" className={`tab !ml-0 ${activeTab === 'nft' ? 'tab-checked' : ''}`} aria-label="Featured" onChange={(e) => handleTabChange(e, 'nft')} checked={activeTab === 'nft'} />
          <div role="tabpanel" className="tab-content py-[18px]">
            <TopSellerCarousal/>
            <div className="md:flex justify-between">
              <SearchInputComponent />
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

          <input type="radio" name="my_tabs_1" role="tab" className={`tab ${activeTab === 'nftMembership' ? 'tab-checked' : ''}`} aria-label="Collected 801" onChange={(e) => handleTabChange(e, 'nftMembership')} checked={activeTab === 'nftMembership'} />
          <div role="tabpanel" className="tab-content py-[18px]">
            <div className="md:flex justify-between">
              <SearchInputComponent />
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
          <input type="radio" name="my_tabs_1" role="tab" className={`tab `} aria-label="Created 6.7k" onChange={(e) => handleTabChange(e, 'nftMembership')} />
          <div role="tabpanel" className="tab-content py-[18px]">
          </div>
          <input type="radio" name="my_tabs_1" role="tab" className={`tab `} aria-label="Favorited 6" onChange={(e) => handleTabChange(e, 'nftMembership')} />
          <div role="tabpanel" className="tab-content py-[18px]">
          </div>
          <input type="radio" name="my_tabs_1" role="tab" className={`tab `} aria-label="Activity" onChange={(e) => handleTabChange(e, 'nftMembership')} />
          <div role="tabpanel" className="tab-content py-[18px]">
          </div>
        </div>

        {!cardDetails && <div className='grid md:grid-cols-12 lg:gap-[45px]'>
          <div className='col-span-12 lg:col-span-3'>
            <StatusDetailview activeTab={activeTab} />
          </div>
          <div className='col-span-12 lg:col-span-9 grid md:grid-cols-3 xl:grid-cols-4 gap-[16px]'>
            <NftCards setCardDetails={setCardDetails} />
          </div>
        </div>}
        {cardDetails && <NftCardDetailview cardDetails={cardDetails} />}
      </div>
      {isChecked && <div className="drawer drawer-end bg-primary-content sm:w-96 md:w-80 lg:w-96 xl:w-112">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" checked={isChecked} />
          <div className="drawer-content">
          </div>
          <div className="drawer-side z-[99]">
            <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay" onClick={handleCancel}></label>
            <ul className="menu p-4 md:w-80 min-h-full bg-primary-content">
              <div className="text-right">
                <span className='icon close cursor-pointer' onClick={closeChannelDrawer}></span>
              </div>
              <div className='flex justify-between flex-col gap-4 min-h-[600px] pt-20'>
                <div className="flex gap-4 justify-center">
                  <div>
                    <div className='flex justify-center'>
                      <div className='relative'>
                        <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpuiTPQhJIciOzncYy6fSWx74TEqyYqA7lJrgHPpXeQw&s'} className="w-[150px] h-[150px] rounded-full object-cover" alt="" />
                        <span className='icon channel-check absolute bottom-2 right-3'></span>
                      </div>
                    </div>
                    <div className='mt-6 items-center'>
                      <p className='text-secondary font-semibold text-[32px] text-center leading-10'>Marvel Entertainment</p>
                    </div>
                    <div className="flex text-[18px] font-medium gap-2.5 justify-center flex-wrap">
                      <p className='text-secondary'>@marvel</p>
                      <p className='text-secondary'>23 M Subscribers</p>
                      <p className='text-secondary'>8.6k Videos</p>
                    </div>
                    <p className='text-base text-info leading-6 mt-12 text-center'>Marvel is committed to bringing great stories, characters, and experiences to fans all over the world. We strive to foster an inclusive, diverse, respectful, and safe environment for all of our fans, and we ask the same of our fan communities. </p>
                  </div>
                </div>

                {summary &&
                  <div className='bg-base-300 px-6 py-8 rounded-[20px] my-20'>
                    <div className="flex justify-between items-center">
                      <p className='text-secondary text-base font-semibold'>Price</p>
                      <p className='text-secondary text-base font-semibold'>0.00001 WATIC</p>
                    </div>
                    <div className="mt-5" >
                      <label className='text-dark text-sm font-normal p-0 mb-2 label ml-4'>Your Bid *</label>
                      <input className='input input-bordered w-full rounded-[28px] border-[#A5A5A5] focus:outline-none pl-4 h-10'
                        type="text"
                        placeholder="Proposal Title"
                        name="proposal"
                        maxLength={250}
                      />
                    </div>
                    <div className="mt-5" >
                      <label className='text-dark text-sm font-normal p-0 mb-2 label ml-4'>Crypto Type</label>
                      <select className="select select-bordered w-full rounded-[28px] border border-[#A5A5A5] focus:outline-none">
                        <option selected>WMATIC</option>
                        <option>Tether</option>
                        <option>USDT</option>
                      </select>
                    </div>
                    <div className="mt-5" >
                      <div className='w-full flex justify-between py-3 px-5 rounded-[28px] border border-[#A5A5A5] bg-info-content'>
                        <p className='text-black'>Your balance</p>
                        <p className='text-black font-medium'>2.3598125 WMATIC</p>
                      </div>
                    </div>
                  </div>

                }
                <div className='md:px-20'>
                  <Button type='' btnClassName='!bg-accent text-secondary w-full !text-[18px] drawer-bid' handleClick={handleSummary}>Place A Bid</Button>
                  <Button btnClassName='w-full mt-5 !text-[18px]'>Own with 0.003Matic / $1.32</Button>
                </div>

              </div>
            </ul>
          </div>
        </div>}
    </>
  );
}
export default TopsellerDetailview;
