import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const ProjectViewTabs = ({projectFeedRef,allocationRef,buyMembershipRef,dao,pjctInfo}) => {
    const [active,setActive]=useState('projectFeed')
    const router = useNavigate();
    const params = useParams();
    const handleTabClick=(tab)=>{
        setActive(tab)
        let ref;
        if(tab==='projectFeed'){
            ref=projectFeedRef?.current
        }
        else if(tab==='allocationClaim'){
            ref=allocationRef?.current
        }
        else if(tab==='buyMembership'){
            ref=buyMembershipRef?.current;
        }
        else if(tab==='dao'){
            ref=dao?.current;  
        }

        ref?.scrollIntoView({ behavior: "smooth", block: "center" })
    }

    return (
        <>
            <div className={`customTabs flex gap-[10px] overflow-x-auto max-sm:pb-2 scrollbar-hidden`}>
                {/* <a href='#projectFeed' className={`tab !bg-primary leading-normal text-base-100 font-semibold rounded-[28px] py-2 px-3.5 whitespace-nowrap`}>Project Feed</a>
                <a href='#allocationClaim' className={`tab bg-accent leading-normal font-semibold rounded-[28px] py-2 px-3.5 text-black whitespace-nowrap`}>Allocation/Claim</a>
                <a  href='#buyMembership'className={`tab tab bg-accent leading-normal font-semibold rounded-[28px] py-2 px-3.5 text-black whitespace-nowrap`}>Buy Membership</a>
              <a href='/dao' className={`tab bg-accent leading-normal font-semibold rounded-[28px] py-2 px-3.5 text-black whitespace-nowrap`}>DAO’s</a> */}
               <button onClick={()=>handleTabClick('projectFeed')}  className={`${active==='projectFeed'? '!bg-primary text-base-100':''} tab bg-accent leading-normal  font-semibold rounded-[28px] py-2 px-3.5 whitespace-nowrap`}>Project Feed</button>
                <button onClick={()=>handleTabClick('allocationClaim')} className={`${active==='allocationClaim'? '!bg-primary text-base-100':'text-secondary'} tab bg-accent leading-normal font-semibold rounded-[28px] py-2 px-3.5  whitespace-nowrap`}>Allocation/Claim</button>
                <button onClick={()=>handleTabClick('buyMembership')} className={`${active==='buyMembership'? '!bg-primary text-base-100':'text-secondary'} tab bg-accent leading-normal font-semibold rounded-[28px] py-2 px-3.5  whitespace-nowrap`}>Buy Membership</button>
                <button onClick={()=>handleTabClick('dao')} className={`${active==='dao'? '!bg-primary text-base-100':'text-secondary'} tab bg-accent leading-normal font-semibold rounded-[28px] py-2 px-3.5  whitespace-nowrap`}>DAO’s</button>
              {/* <a href='/dao' className={`tab bg-accent leading-normal font-semibold rounded-[28px] py-2 px-3.5 text-black whitespace-nowrap`}>DAO’s</a> */}
            </div>
        </>
    );


};

export default ProjectViewTabs;