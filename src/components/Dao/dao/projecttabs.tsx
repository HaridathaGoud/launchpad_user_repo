import React, { useState } from 'react';
const ProjectViewTabs = ({projectFeedRef,allocationRef,buyMembershipRef}) => {
    const [active,setActive]=useState('projectFeed')
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
              {/* <a href='/dao' className={`tab bg-accent leading-normal font-semibold rounded-[28px] py-2 px-3.5 text-black whitespace-nowrap`}>DAO’s</a> */}
            </div>
        </>
    );


};

export default ProjectViewTabs;