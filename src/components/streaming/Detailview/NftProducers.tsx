import React, { useState } from 'react';
import Image from 'react-bootstrap/Image';
import member from '../../../assets/images/dao-profile.png';
import { Link } from 'react-router-dom';


const NftProducers = () => {


    return (
        <>
            <div className={`flex gap-12 md:gap-4 md:text-center justify-between overflow-x-auto`}>

                    <div className='max-sm:min-w-[120px] truncate flex-1 '>
                        <div className={`relative w-20 h-20 mx-auto `}>
                            <Image src={member} className={`rounded-full`} alt='' />
                        </div>
                        <p className={`text-base font-normal  text-secondary text-center opacity-80 truncate`}>Earned - <span className='font-[700]'>100Matic</span></p>
                        <p className={`  text-base font-normal text-center font-semibold truncate`}>0xaf....D8f8</p>
                    </div>
                    <div className='max-sm:min-w-[120px] truncate flex-1'>
                        <div className={`relative w-20 h-20 mx-auto `}>
                            <Image src={member} className={`rounded-full`} alt='' />
                        </div>
                        <p className={`text-base font-normal  text-secondary text-center opacity-80 truncate`}>Earned - <span className='font-[700]'>100Matic</span></p>
                        <p className={`  text-base font-normal text-center font-semibold truncate`}>0xaf....D8f8</p>
                    </div>
                    <div className='max-sm:min-w-[120px] truncate flex-1'>
                        <div className={`relative w-20 h-20 mx-auto `}>
                            <Image src={member} className={`rounded-full`} alt='' />
                        </div>
                        <p className={`text-base font-normal  text-secondary text-center opacity-80 truncate`}>Earned - <span className='font-[700]'>100Matic</span></p>
                        <p className={`  text-base font-normal text-center font-semibold truncate`}>0xaf....D8f8</p>
                    </div>
                    <div className='max-sm:min-w-[120px] truncate flex-1'>
                        <div className={`relative w-20 h-20 mx-auto `}>
                            <Image src={member} className={`rounded-full`} alt='' />
                        </div>
                        <p className={`text-base font-normal  text-secondary text-center opacity-80 truncate`}>Earned - <span className='font-[700]'>100Matic</span></p>
                        <p className={`  text-base font-normal text-center font-semibold truncate`}>0xaf....D8f8</p>
                    </div>
                    <div className='max-sm:min-w-[120px] truncate flex-1'>
                        <div className={`relative w-20 h-20 mx-auto `}>
                            <Image src={member} className={`rounded-full`} alt='' />
                        </div>
                        <p className={`text-base font-normal  text-secondary text-center opacity-80 truncate`}>Earned - <span className='font-[700]'>100Matic</span></p>
                        <p className={`  text-base font-normal text-center font-semibold truncate`}>0xaf....D8f8</p>
                    </div>
              <Link to='/foundingmemebersview'>
               <div className={`bg-secondary w-20 h-20 rounded-full shrink-0 flex items-center justify-center cursor-pointer ml-0 md:ml-3`}>
                    <div className={`text-center`}>
                        <span className={`icon plus`}></span>
                        <p className={`text-base-100 text-xs font-normal`}>Add Me</p>
                    </div>
                </div></Link>
            </div>
        </>
    );


};

export default NftProducers;