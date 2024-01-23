import React, { useState } from 'react';
import trending from '../../../assets/images/trending.png'
import TrendingVideos from './TrendingCarousal';
import TopChannels from '../Dashboard/TopChannels';
import Button from '../../../ui/Button';
import MoviesCard from '../Dashboard/MoviesCard';

const ChannelView = () => {
  const [isChecked, setIsChecked] = useState(false)
  const [summary, setSummary] = useState(false)
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
      <div className='container mx-auto max-sm:px-3'>
        <div className='channel-bg bg-no-repeat bg-cover min-h-[320px] bg-center rounded-lg px-4 md:px-[50px] flex items-center mt-4 max-sm:py-4'>
          <div className="md:flex gap-12 items-center">
            <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpuiTPQhJIciOzncYy6fSWx74TEqyYqA7lJrgHPpXeQw&s'} className="w-[150px] h-[150px] rounded-full object-cover" alt="" />
            <div>
              <div className='flex max-sm:mt-4 items-center'>
                <p className='text-white font-semibold text-[32px] leading-8 mr-2'>Marvel Entertainment</p> <span className='icon circle-check shrink-0'></span>
              </div>
              <div className="flex text-[18px] font-medium gap-2.5">
                <p className='text-white'>@marvel</p>
                <p className='text-white'>23 M Subscribers</p>
                <p className='text-white'>8.6k Videos</p>
              </div>
              <p className='text-white mt-4 mb-7 text-base'>Marvel is committed to bringing great stories, characters, and experiences...</p>
              <div className="flex md:flex-row items-center gap-2.5 flex-col">
                <Button type='primary' handleClick={openChannelDrawer}><span className='video-icon icon'></span>Subscribe with 2Matic / $1.32</Button>
                <button className="bg-accent px-4 py-2 rounded-[20px] text-sm font-medium whitespace-nowrap"> <span className="icon share mr-2"></span>Share</button></div>
            </div>
          </div>
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
                      <label className='text-dark text-sm font-normal p-0 mb-2 label ml-5'>Your Bid *</label>
                      <input className='input input-bordered w-full rounded-[28px] border-[#A5A5A5] focus:outline-none pl-5'
                        type="text"
                        placeholder="Proposal Title"
                        name="proposal"
                        maxLength={250}
                      />
                    </div>
                    <div className="mt-5" >
                      <label className='text-dark text-sm font-normal p-0 mb-2 label ml-5'>Crypto Type</label>
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
        <div className="grid md:grid-cols-3 gap-4 mt-3.5">
          <MoviesCard matic='true' />
          <MoviesCard matic='true' />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
        </div>
      </div>
    </>
  );
};

export default ChannelView;
