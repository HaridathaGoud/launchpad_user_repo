import React from "react";
import totalstake from '../../../src/assets/images/total-stake.svg'
import projects from '../../../src/assets/images/project-participate.svg'
import totalinvest from '../../../src/assets/images/total-invest.svg'

import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";

const View = (props:any)=>{
    const router = useNavigate();
    const navigateToTier=()=>{
        router(`/tiers`);
       }
    return(<>
    <div className="grid md:grid-cols-3 gap-4">
       <div className="tier-card rounded-[16px] bg-primary-content p-[18px]">
        <div className="flex gap-2">
        <img src={totalstake} alt="" />
         <div>
         <p className="text-secondary text-sm font-normal">Investor Tier</p>
         <span className="bg-[#E3F8FF] text-[#035388] text-[10px] font-semibold px-3 py-1 rounded-full">{props.portfoliodata?.name}</span>
         </div>
        </div>
        <div className="mt-[26px] mb-6">
          <p className="text-secondary text-sm font-normal">Total Stake</p>
          <h1 className="text-secondary font-medium	text-[32px] text-black">
             {/* 150,015.0 YBT */}
             {props.amounts.stakedAmount && props.amounts.stakedAmount + ' YBT'||'--'}
              </h1>
        </div>
        <Button type="primary" btnClassName="w-full" handleClick={navigateToTier}>Upgrade Tier</Button>
       </div>
       <div className="tier-card rounded-[16px] bg-primary-content p-[18px] flex justify-center items-center text-center">
       <div>
       <div>
        <img src={totalinvest} alt="" className="mx-auto" />         
        </div>
        <div className="mt-[26px]">
          <p className="text-secondary text-sm font-normal">Total Invested</p>
          <h1 className="text-secondary font-medium	text-[32px] text-black">
            {props.portfoliodata?.totalInvested && props.portfoliodata?.totalInvested + ' USDT'||'--'}
            </h1>
        </div>
       </div>
       </div>
       <div className="tier-card rounded-[16px] bg-primary-content p-[18px] flex justify-center items-center text-center">
       <div>
       <div>
        <img src={projects} alt="" className="mx-auto" />         
        </div>
        <div className="mt-[26px]">
          <p className="text-secondary text-sm font-normal">Projects Participated In</p>
          <h1 className="text-secondary font-medium	text-[32px] text-black">
            {props.portfoliodata?.projectsParticipatedIn ||'--'}
            </h1>
        </div>
       </div>
       </div>
      </div>
     
      <div className="md:flex items-center justify-between mt-8 mb-3">
      <div className="flex gap-4 items-center"> 
       <h1 className="text-xl font-semibold text-secondary">Investments</h1>
        <input type="checkbox" className="toggle"
        checked={props.showClaimableOnly}
        onChange={() => props.setShowClaimableOnly(!props.showClaimableOnly)} />
        <p className="text-secondary text-sm font-normal">Claimable Only</p>
        </div>       
        <div className="relative max-sm:mt-4">
          <input
            type="text"
            placeholder="Search"
            onKeyUp={(e) => props.handleSearch(e)}
            onChange={(e) => props.handleInputChange(e)}
            ref={props.portpolioRef}
            className="w-full rounded-[28px] border-[#A5A5A5] border h-12 focus:outline-none pl-5 pr-12"                      
          />
          <span onClick={props.handleSearchIcon}
            className="icon md search absolute right-4 bottom-4 cursor-pointer md:w-72"                     
          />
        </div>      
         
      </div>
    </>)
}
export default View;