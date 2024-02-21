import React, { useState } from 'react';
// import Image from 'next/legacy/image';
import Image from 'react-bootstrap/Image';
import CommentShimmer from '../Loaders/CommentsShimmer';
import Button from '../../../ui/Button';
const   CommentsComponent = () => {
const [isToggle,setIsToggle] =useState(false);

const ReplayOpen = () => {
    setIsToggle (!isToggle);
}
const data = [
    {
        personName:"Donald Rice .",
        minutes:"55min ago",
        description:"Christian spirit passion virtues suicide morality. pinnacle moral pinnacle hope abstract right disgust joy.",
    },
    {
        personName:"Lakshmi .",
        minutes:"55min ago",
        description:"Christian spirit passion virtues suicide morality. pinnacle moral pinnacle hope abstract right disgust joy.",
    },
    {
        personName:"Sandeep .",
        minutes:"55min ago",
        description:"Christian spirit passion virtues suicide morality. pinnacle moral pinnacle hope abstract right disgust joy.",
    },
    {
        personName:"Donald Rice .",
        minutes:"55min ago",
        description:"Christian spirit passion virtues suicide morality. pinnacle moral pinnacle hope abstract right disgust joy.",
    },
]
    return (
        <>
            <div className=''>
                
                {data.map((item, index)=>(
                    <>
                     <div className="px-3 mb-5">  
                    <CommentShimmer/></div>
                    <div className="flex gap-4 px-3 mb-5">                   
                   <div className="avatar shrink-0">
                       <div className="w-12 h-12 rounded-full shrink-0">
                           <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D" />
                       </div>
                       </div>
                   <div>
                       <span className='text-base font-semibold text-secondary'>{item.personName} </span><span>{item.minutes}</span>
                       <p className={`mt-1 mb-4 text-secondary opacity-70 text-sm leading-4`}>{item.description}</p>
                       <div className='flex'>
                           <div className='flex flex-1'>
                           <a className='font-semibold mr-4 md:mr-9 text-sm cursor-pointer text-secondary' >Reply</a>
                           <span className='font-semibold  mr-4 You Liked md:mr-9 text-secondary'>You Liked</span>
                           </div>
                           
                           <span className='flex items-center gap-1'> <span className={`icon like cursor-pointer`}></span><span className='font-semibold text-secondary text-sm'>24</span></span>
                       </div>
                       <div className='mt-3'>
<div className='flex gap-3 '>
<div className="w-9 h-9 rounded-full shrink-0">
<img className='rounded-full' src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D" alt=''/>
</div>
<input type="text" placeholder="Type here" className="input w-full h-9 outline-none focus:outline-none border-1 border-neutral-content focus:border-neutral-content rounded-[30px] text-base font-normal" />
</div>
<div className='flex gap-2 items-center mt-[10px]'>
<Button type='reply' children={"Reply"} />
<Button type='replyCancel' children={"Cancel"} />
</div>
</div>
                   </div>
               </div>
                    </>
                ))}
                <input type="text" placeholder="Type here" className="input w-full  outline-none focus:outline-none border-0 input-transparent rounded-none text-lg font-normal" />
            </div>

        </>
    );


};

export default CommentsComponent;