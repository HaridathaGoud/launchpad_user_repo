import React, { useState } from 'react';
// import Image from 'next/legacy/image';
import Image from 'react-bootstrap/Image';
import Button from '../../../ui/Button';
const WriteReview = ({ setActiveTab }) => {
    const [isToggle, setIsToggle] = useState(false);

    const ReplayOpen = () => {
        setIsToggle(!isToggle);
    }

    return (
        <>
            <div className="flex justify-between">
                <div>
                    <h1 className='text-2xl font-semibold text-secondary mb-1'>Write a review</h1>
                    <div className="rating rating-md rating-half mr-2 ml-1">
                        <input type="radio" name="rating-10" className="bg-[#F7B704] mask mask-star-2 mask-half-1" />
                        <input type="radio" name="rating-10" className="bg-[#F7B704] mask mask-star-2 mask-half-2" />
                        <input type="radio" name="rating-10" className="bg-[#F7B704] mask mask-star-2 mask-half-1" />
                        <input type="radio" name="rating-10" className="bg-[#F7B704] mask mask-star-2 mask-half-2" />
                        <input type="radio" name="rating-10" className="bg-[#F7B704] mask mask-star-2 mask-half-1" />
                        <input type="radio" name="rating-10" className="bg-[#F7B704] mask mask-star-2 mask-half-2" />
                        <input type="radio" name="rating-10" className="bg-[#F7B704] mask mask-star-2 mask-half-1" />
                        <input type="radio" name="rating-10" className="bg-[#F7B704] mask mask-star-2 mask-half-2" />
                        <input type="radio" name="rating-10" className="bg-[#F7B704] mask mask-star-2 mask-half-1" />
                        <input type="radio" name="rating-10" className="bg-[#F7B704] mask mask-star-2 mask-half-2" />
                    </div>
                </div>
                <span className='icon closeIcon'></span>
            </div>
            <div className="mt-4" >
                <label className='text-dark text-sm font-normal p-0 mb-2 label ml-4'>Name</label>
                <input className='input input-bordered w-full rounded-[28px] border-[#A5A5A5] focus:outline-none pl-4'
                    type="text"
                    placeholder="Enter Name"
                    name="proposal"
                    maxLength={250}
                />
                <label className='text-sm font-normal text-red-600 ml-4'></label>
            </div>
            <div className="mt-4" >
                <label className='text-dark text-sm font-normal p-0 mb-2 label ml-4'>Email</label>
                <input className='input input-bordered w-full rounded-[28px] border-[#A5A5A5] focus:outline-none pl-4'
                    type="email"
                    placeholder="Enter Email"
                    name="proposal"
                    maxLength={250}
                />
                <label className='text-sm font-normal text-red-600 ml-4'></label>
            </div>
            <div className="mb-3 mt-4" >
                <div className="flex gap-2 items-center mb-2"><label className='text-dark text-sm font-normal p-0 label ml-5'>Message</label>
                    <span className='text-[#292929] text-xs'>(10 from 999 words)</span></div>
                <textarea
                    className='textarea textarea-bordered w-full rounded-[28px] focus:outline-none pl-5'
                    rows={3}
                    placeholder="Summary"
                    name='summary'
                />
                <label className='text-sm font-normal text-red-600 ml-4'></label>
            </div>
            <div className="text-center mt-[38px]">
                <Button children={'Review with 1 MATIC'} btnClassName='md:min-w-[257px]' type='primary' handleClick={() => setActiveTab(2)} />
                <p className='text-xs font-semibold mt-2.5 mb-16'>Note: Gas and total fee will debit from your wallet</p>
            </div>
        </>
    );


};

export default WriteReview;