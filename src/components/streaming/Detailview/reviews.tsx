import React, { useState } from 'react';
// import Image from 'next/legacy/image';
import Image from 'react-bootstrap/Image';
import Button from '../../../ui/Button';
const   ReviewComponent = ({setActiveTab}) => {
const [isToggle,setIsToggle] =useState(false);

const ReplayOpen = () => {
    setIsToggle (!isToggle);
}
const data = [
    {
        personName:"Pradeep",
        minutes:"3 months ago",
        description:"Adipurush is an adaptation of Indian mythology that depicts the victory of good over evil..",
    },
    {
        personName:"Lakshmi",
        minutes:"55min ago",
        description:"Christian spirit passion virtues suicide morality. pinnacle moral pinnacle hope abstract right disgust joy.",
    },
    {
        personName:"Sandeep",
        minutes:"55min ago",
        description:"Christian spirit passion virtues suicide morality. pinnacle moral pinnacle hope abstract right disgust joy.",
    },
    {
        personName:"Donald Rice",
        minutes:"55min ago",
        description:"Christian spirit passion virtues suicide morality. pinnacle moral pinnacle hope abstract right disgust joy.",
    },
]
    return (
        <>
            <div className=''>
                <div className='flex items-center'>
                    <span className='text-[30px] h-[40px] font-medium text-base-200'>4.5</span>
                    <div className="rating rating-lg rating-half mr-2 ml-1">
                        <input type="radio" name="rating-10" className="rating-hidden" />
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
                    <span className='text-base-200'>10.5k reviews</span>                    
                </div>
                <Button children={'Write a Review'} type='secondary' btnClassName='mt-4' handleClick={()=>setActiveTab(1)} />
                <hr className='mt-[28px] mb-[24px]' />
                {data.map((item, index)=>(
                    <>
                    <div className="flex gap-4 px-3 mb-[30px]">
                   
                   <div className="avatar shrink-0">
                       <div className="w-12 h-12 rounded-full shrink-0">
                           <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D" />
                       </div>
                       </div>
                   <div>
                      <div className="flex justify-between gap-4">
                     <div className='break-all shrink-0'>
                     <span className='text-base font-semibold text-secondary'>{item.personName} </span>
                       <p className='text-base-200'>1 review</p>
                     </div>
                     <div className='text-right'>
                     <div className="rating rating-sm rating-half mr-1">
                        <input type="radio" name="rating-10" className="rating-hidden" />
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
                       <span className='align-text-bottom whitespace-nowrap'>{item.minutes}</span>
                     </div>
                      </div>
                       <p className={`mt-1 mb-4 text-secondary opacity-70 text-sm leading-4`}>{item.description}</p>
                       <div className='flex items-center'>                          
                           <a className='font-semibold mr-4 md:mr-9 cursor-pointer text-secondary' >Like</a>
                           <span className='font-semibold  mr-4 You Liked md:mr-9 text-secondary'>Dislike</span>
                           <a className='font-semibold mr-4 md:mr-9 cursor-pointer text-secondary' >Reply</a>                          
                       </div>
                       
                   </div>
               </div>
                    </>
                ))}
               
            </div>

        </>
    );


};

export default ReviewComponent;