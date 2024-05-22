import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount, useBalance } from "wagmi";
import { get } from "../../utils/api";
import Button from "../../ui/Button";
import TiresShimmer from "../loaders/TiresShimmers";
import { setError } from "../../reducers/layoutReducer";
import { useDispatch } from "react-redux";
import BreadCrumb from "../../ui/breadcrumb";
import totalstake from '../../../src/assets/images/total-stake.svg'
import totalinvest from '../../../src/assets/images/total-invest.svg'
import projects from '../../../src/assets/images/project-participate.svg'
import Investments from "./investments";

export default function Portfolio() {
 

  return (
    <div className="container mx-auto max-lg:px-3 mt-3 investments">
      <BreadCrumb/>
      <div className="grid md:grid-cols-3 gap-4">
       <div className="tier-card rounded-[16px] bg-primary-content p-[18px]">
        <div className="flex gap-2">
        <img src={totalstake} alt="" />
         <div>
         <p className="text-secondary text-sm font-normal">Investor Tier</p>
         <span className="bg-[#E3F8FF] text-[#035388] text-[10px] font-semibold px-3 py-1 rounded-full">Platinum</span>
         </div>
        </div>
        <div className="mt-[26px] mb-6">
          <p className="text-secondary text-sm font-normal">Total Stake</p>
          <h1 className="text-secondary font-medium	text-[32px] text-black">150,015.0 YBT</h1>
        </div>
        <Button type="primary" btnClassName="w-full">Upgrade Tier</Button>
       </div>
       <div className="tier-card rounded-[16px] bg-primary-content p-[18px] flex justify-center items-center text-center">
       <div>
       <div>
        <img src={totalinvest} alt="" className="mx-auto" />         
        </div>
        <div className="mt-[26px]">
          <p className="text-secondary text-sm font-normal">Total Invested</p>
          <h1 className="text-secondary font-medium	text-[32px] text-black">263.22 USDT</h1>
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
          <h1 className="text-secondary font-medium	text-[32px] text-black">2</h1>
        </div>
       </div>
       </div>
      </div>
     
      <div className="md:flex items-center justify-between mt-8 mb-3">
      <div className="flex gap-4 items-center"> 
       <h1 className="text-xl font-semibold text-secondary">Investments</h1>
        <input type="checkbox" className="toggle" />
        <p className="text-secondary text-sm font-normal">Claimable Only</p>
        </div>       
        <div className="relative max-sm:mt-4">
          <input
            type="text"
            placeholder="Search"
            className="w-full rounded-[28px] border-[#A5A5A5] border h-12 focus:outline-none pl-5 pr-12"                      
          />
          <span
            className="icon md search absolute right-4 bottom-4 cursor-pointer md:w-72"                     
          />
        </div>      
         
      </div>
      <Investments/>
    </div>
  );
}
