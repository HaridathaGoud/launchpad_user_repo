import React, { useState } from 'react';
// import Image from 'next/legacy/image';
import Image from 'react-bootstrap/Image';
import Button from '../../../ui/Button';
import success from  '../../../assets/images/success.png'
import successgif from  '../../../assets/images/reviewsuccess.gif'
const ReviewSuccess= () => {
    const [isToggle, setIsToggle] = useState(false);

    const ReplayOpen = () => {
        setIsToggle(!isToggle);
    }

    return (
        <>
            <div className="flex justify-between">                
              <h1 className='text-2xl font-semibold text-secondary mb-1'>Write a review</h1>                  
              <span className='icon closeIcon'></span>
            </div>
           <div className='text-center py-20 relative'>            
            <div className='z-[1] relative'>
            <img src={success} alt="" className='w-[124px] mx-auto' />
            <h1 className='text-[28px] text-[#15AB3D] font-semibold mt-3'>Congratulations!</h1>
            <p className='text-secondary mt-2 text-[18px]'>0x4a9Df2CF...37c33929A</p>
            <p className='my-4 text-2xl text-secondary leading-7'><span className='opacity-60'>Your</span> <span className=' font-semibold'>Review for the Trailer</span> is <br /><span className='opacity-60'> Successful</span>  </p>
            <p className='text-2xl text-secondary font-semibold'>with 0.68 USD </p>
            </div>
            <img src={successgif} alt="" className='absolute top-0' />
           </div>
        </>
    );


};

export default ReviewSuccess;