import React, { useState } from 'react';
import BreadCrumb from '../../../ui/breadcrumb';
import Button from '../../../ui/Button';
import success from '../../../assets/images/success.png'
import successgif from '../../../assets/images/reviewsuccess.gif'

const NftCardDetailview = ({ cardDetails }) => {
  const [isChecked, setIsChecked] = useState(false)
  const [count, setCount] = useState(1);
  const [activeTab, setActiveTab] = useState('nft')
  const [summary, setSummary] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false);
  const handleTabChange = (e, type) => {
    setActiveTab(type)
  }
  const updateCounter = () => {
    setCount(count + 1);
  };
  const deCounter = () => {
    setCount(count - 1);
  };
  const handleEditProfile = () => {
    setIsChecked(true)
  }
  const handleCancel = () => {
    setIsChecked(false)
  }
  const handleSummary = () => {
    setSummary(true);
  }
  const handleSuccess = () => {
    setShowSuccess(true);
  }

  return (
    <>
      <div className="container mx-auto px-3 lg:px-0">
        <BreadCrumb />
        <div className="grid md:grid-cols-12 gap-[40px] mt-3.5 Overview">
          <div className='md:col-span-12 lg:col-span-5'>
            <div className='relative'>
              <img src="https://i.pinimg.com/736x/88/7f/94/887f94b606965ff9bed58d1b53dd6731.jpg" alt="" className=' w-full lg:w-[620px] md:h-[620px] object-cover rounded-lg' />
              <div className="bg-black top-3 absolute cursor-pointer right-3 rounded-full px-2">
                <span className='text-white align-middle'>16</span><span className='icon like-white '></span>
              </div>
              <span className='icon matic-detail absolute top-3 left-3'></span>
            </div>
            <div className='shadow rounded-lg bg-primary-content mt-4'>
              <div className='px-2.5 py-2'>
                <div className="flex justify-between items-center mb-7">
                  <h1 className='text-2xl font-semibold text-secondary'>Overview</h1>
                  <p className='text-secondary text-base font-semibold'>By <span className='text-neutral'> Doodles_LLC</span></p>
                </div>
                <h2 className='text-base font-semibold text-secondary mb-4'>Description</h2>
                <p className='text-secondary'>The Doodle-y matter in the Dooplicator appears to be searching for new charges of utility for its owner.</p>
              </div>
              <hr className='mt-[22px] mb-3' />
              <div className='px-2.5 pt-2 pb-6'>
                <h2 className='text-base font-semibold text-secondary mb-4'>Details</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <p className='font-semibold text-secondary'>Contract Address</p>
                    <p className='text-neutral font-semibold break-all'>0x466c...13ac</p>
                  </div>
                  <div>
                    <p className='font-semibold text-secondary'>Token ID</p>
                    <p className='text-neutral font-semibold break-all'>1654</p>
                  </div>
                  <div>
                    <p className='font-semibold text-secondary'>Last Updated</p>
                    <p className='text-neutral font-semibold break-all'>5 hours ago</p>
                  </div>
                  <div>
                    <p className='font-semibold text-secondary'>Chain</p>
                    <p className='text-neutral font-semibold break-all'>Matic</p>
                  </div>
                  <div>
                    <p className='font-semibold text-secondary'>Token Standard</p>
                    <p className='text-neutral font-semibold break-all'>ERC-721</p>
                  </div>
                  <div>
                    <p className='font-semibold text-secondary'>Creator Earnings</p>
                    <p className='text-neutral font-semibold break-all'>5%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='md:col-span-12 lg:col-span-6'>
            <h1 className='text-3xl text-secondary font-semibold mb-5'>Hanuman Gada</h1>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className='font-semibold text-secondary'>Creator</p>
                <p className='text-neutral font-semibold'>T- Series</p>
              </div>
              <div>
                <p className='font-semibold text-secondary'>Current Owner</p>
                <p className='text-neutral font-semibold'>Owned by AlanCL</p>
              </div>
            </div>
            <div className='flex gap-6 mt-8'>
              <div>
                <span className='icon eye'></span> <span className='text-secondary font-semibold opacity-60'>300 views</span>
              </div>
              <div>
                <span className='icon gray-love'></span> <span className='text-secondary font-semibold opacity-60'>12 favorites</span>
              </div>
              <div>
                <span className='icon art'></span> <span className='text-secondary font-semibold opacity-60'>Art</span>
              </div>
            </div>
            <hr className='mt-[18px] mb-2.5' />
            <div>
              <div className="md:flex justify-between gap-4">
                <div className=''>
                  <p className='text-secondary text-2xl mb-3 opacity-60'>Current Price</p>
                  <p className='text-3xl text-secondary font-semibold mb-5 break-all'>0.003 Matic</p>
                  <p className='text-secondary mt-7 text-base opacity-60'>$1,072.29</p>
                </div>
                <div className='max-sm:mt-4'>
                  <p className='font-semibold text-secondary break-all'>View proof of authenticity</p>
                  <p className='text-neutral my-3 break-all'>View on Maticscan</p>
                  <p className='text-neutral break-all'>View on IPFS</p>
                  <p></p>
                </div>
              </div>
              <div className="md:flex items-center justify-between mt-4">
                <div>
                  {isChecked && <div className="drawer drawer-end bg-primary-content sm:w-96 md:w-80 lg:w-96 xl:w-112">
                    <input id="my-drawer-4" type="checkbox" className="drawer-toggle" checked={isChecked} />
                    <div className="drawer-content">
                    </div>
                    <div className="drawer-side z-[99]">
                      <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay" onClick={handleCancel}></label>
                      <ul className="menu p-4 md:w-80 min-h-full bg-primary-content">
                        <div className="text-right">
                          <span className='icon close cursor-pointer' onClick={handleCancel}></span>
                        </div>
                        <div className='flex justify-between flex-col gap-4 min-h-[600px] pt-20'>

                          {showSuccess && <div className='text-center relative'>
                            <div className='z-[1] relative'>
                              <img src={success} alt="" className='w-[124px] mx-auto' />
                              <h1 className='text-[28px] text-[#15AB3D] font-semibold mt-3'>Congratulations!</h1>
                              <p className='text-[18px] font-semibold text-secondary mt-4'>You Won this NFT</p>
                            </div>
                            <img src={successgif} alt="" className='h-[262px] mx-auto mt-[-200px]' />
                            <div className="flex gap-4 items-center mt-[-25px] justify-center">
                              <img src="https://i.pinimg.com/736x/88/7f/94/887f94b606965ff9bed58d1b53dd6731.jpg" alt="" className='w-[110px] h-[110px] object-cover rounded-lg' />
                              <div>
                                <h1 className='text-secondary text-[28px] font-semibold mb-4'>Hanuman Gada</h1>
                                <p className='text-secondary opacity-60 text-lg text-left'>Current Price</p>
                                <p className='text-secondary text-[22px] font-semibold text-left'>0.003 Matic</p>
                              </div>
                            </div>
                          </div>}

                          {!showSuccess && <>
                            <div className="flex gap-4 items-center">
                              <img src="https://i.pinimg.com/736x/88/7f/94/887f94b606965ff9bed58d1b53dd6731.jpg" alt="" className='w-[110px] h-[110px] object-cover rounded-lg' />
                              <div>
                                <h1 className='text-secondary text-[28px] font-semibold mb-4'>Hanuman Gada</h1>
                                <p className='text-secondary opacity-60 text-lg'>Current Price</p>
                                <p className='text-secondary text-[22px] font-semibold'>0.003 Matic</p>
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
                                  <input className='input input-bordered w-full rounded-[28px] border-[#A5A5A5] focus:outline-none pl-4 h-9'
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
                              <Button btnClassName='w-full mt-5 !text-[18px]' handleClick={handleSuccess}>Own with 0.003Matic / $1.32</Button>
                            </div>
                          </>}
                        </div>
                      </ul>
                    </div>
                  </div>}
                  <Button type='secondary' btnClassName='mr-2.5 ' handleClick={handleEditProfile}>Buy Now</Button>
                  <Button type='cancel' btnClassName='leading-6 place-bid  text-base' handleClick={handleEditProfile}>Place A Bid</Button>
                </div>
                <div className={`max-sm:mt-4 border border-[2px] rounded-[28px] justify-between md:min-w-[132px] px-3 py-2 flex gap-3 items-center`}>
                  <span className={`detail-minus icon cursor-pointer`} onClick={deCounter}></span>
                  <p className='font-semibold text-secondary'>{count}</p>
                  <span className={`detail-plus icon cursor-pointer`} onClick={updateCounter}></span>

                </div>
              </div>
            </div>
            <h2 className='text-base font-semibold text-secondary mt-9 mb-3.5'>Details</h2>
            <div className="grid md:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="border border-[#939393] px-5 py-4 text-center rounded-lg">
                <p className='text-neutral font-semibold'>OG Wearables Charge</p>
                <p className='text-secondary font-semibold my-1'>Used</p>
                <p className='text-secondary'>7% have this trait</p>
              </div>
              <div className="border border-[#939393] px-5 py-4 text-center rounded-lg">
                <p className='text-neutral font-semibold'>OG Wearables Charge</p>
                <p className='text-secondary font-semibold my-1'>Used</p>
                <p className='text-secondary'>7% have this trait</p>
              </div>
              <div className="border border-[#939393] px-5 py-4 text-center rounded-lg">
                <p className='text-neutral font-semibold'>OG Wearables Charge</p>
                <p className='text-secondary font-semibold my-1'>Used</p>
                <p className='text-secondary'>7% have this trait</p>
              </div>
              <div className="border border-[#939393] px-5 py-4 text-center rounded-lg">
                <p className='text-neutral font-semibold'>OG Wearables Charge</p>
                <p className='text-secondary font-semibold my-1'>Used</p>
                <p className='text-secondary'>7% have this trait</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default NftCardDetailview;
