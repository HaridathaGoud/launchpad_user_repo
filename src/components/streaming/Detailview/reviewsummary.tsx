import React, { useState } from 'react';
// import Image from 'next/legacy/image';
import Image from 'react-bootstrap/Image';
import Button from '../../../ui/Button';
const ReviewSummary = ({setActiveTab}) => {
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
            <div className='px-3 py-4 bg-[#F0F0F0] rounded-lg mt-[22px]'>
                <div className="md:flex justify-between gap-2">
                <div className="flex gap-2 items-center">
                    <div className="w-8 h-8 rounded-full shrink-0">
                        <img className='rounded-full object-cover' src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D" />
                    </div>
                    <div className='break-all'>
                        <h1 className='text-secondary text-base font-[700] break-all'>Johne Doe</h1>
                        <p className='text-[#797979]'>johnedoe@gmail.com</p>
                    </div>
                </div>
                <div className='flex items-center shrink-0'>
                    <span className='text-secondary text-base mt-2'>4.5/5</span>
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
                </div>
                <p className='text-[#292929] mt-3'>Trash - Ramayana, Bhagavatha, Mahabarath are not mythological stories but they are our history n pride. In the name of westernisation or improvisation or direction liberties please do not spoil the soul of our history. For example Lakshmana knows about his brother in and out and never question Rama n his values but in this movie you will see lakshmana doing that. </p>
            </div>
            <div className='mt-[22px] md:px-[46px]'>
               <div className="flex justify-between">
                <p className='text-secondary'>Gas Fee</p> <p className='text-secondary'>0.02 USD</p>                
               </div>
               <div className="flex justify-between">
               <p className='text-secondary'>1 matic</p> <p className='text-secondary'>0.66 USD</p>
               </div>
               <hr className='my-4' />
               <div className="flex justify-between">
               <p className='text-secondary text-base font-[700]'>Total Fee </p> <p className='text-secondary text-base font-[700]'>0.68 USD</p>
               </div>
            </div>
            <div className="text-center mt-[38px]">
                <Button children={'Review with 1 MATIC'} btnClassName='md:min-w-[257px]' type='primary' handleClick={()=>setActiveTab(3)}/>
                <p className='text-xs font-semibold mt-2.5 mb-16'>Note: Gas and total fee will debit from your wallet</p>
            </div>
        </>
    );


};

export default ReviewSummary;