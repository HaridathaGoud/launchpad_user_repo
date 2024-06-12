import React, { useEffect, useState } from "react";
import totalstake from "../../assets/images/total-stake.svg";
import projects from "../../assets/images/project-participate.svg";
import totalinvest from "../../assets/images/total-invest.svg";
import userImage from "../../assets/images/avatar.jpg";
import apiCalls from "../../utils/api.ts"
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAccount, useBalance } from "wagmi";
import ProfilePicture from "../profile/profilePicture";
import { setUserID } from "../../reducers/rootReducer";
import { setError } from "../../reducers/layoutReducer.ts";

const View = (props: any) => {
  const router = useNavigate();
  const { user, arcanaUser } = useSelector((store: any) => store.auth);
  const [usd,setUSD]=useState(0)
  const dispatch = useDispatch();
  const { address } = useAccount();
  const { data: currency, refetch: getCurrency } =
    useBalance({ address }) || {};
  const { data: tokenData, refetch: getNativeCurrency } =
    useBalance({
      address,
      token: process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS as
        | `0x${string}`
        | undefined,
    }) || {};
  const currencyBalance = Number(currency?.formatted || 0);
  const tokenBalance = Number(tokenData?.formatted || 0);
  useEffect(()=>{
    getUSDFromMatic('matic-network','usd')
  },[currency]);
  const getUSDFromMatic=async (id:string,to:string)=>{
    try{
      const response=await apiCalls.getFiatAmount(id,to)
      if(response.status===200){
        setUSD(response.data[id][to])
      }
      else{
        dispatch(setError({message:response}))
      }
    }catch(err){
      dispatch(setError({message:err.message ||err}))
    }
  }
  const navigateToTier = () => {
    router(`/tiers`);
  };
  return (
    <>
     
        <div className="tier-card rounded-[16px] bg-primary-content p-[18px] grid md:grid-cols-3 gap-6 mb-4">
          {/* <div className="relative profile-size flex justify-center xl-4">
            <div className="avatar">
              <div className="md:w-40 md:h-40 rounded-full">
                <img
                  className="h-full w-full object-cover"
                  src={user?.profilePicUrl || userImage}
                  alt={`${user?.userName || "profile"}`}
                />
              </div>
            </div>
          </div> */}
          <div className="flex justify-center w-full  items-center rounded-lg">
            <ProfilePicture
              profile={{ ...user }}
              updateProfile={(profile: any) => dispatch(setUserID(profile))}
            />
          </div>
          <div className=" grid gap-4">
            <div>
              <p className="text-sm font-normal text-secondary opacity-[0.9]">User Name</p>
              <p className="font-medium text-sm text-secondary">
              {user?.userName ? (
                <span className="bg-[#E3F8FF] text-[#035388] text-[10px] font-semibold px-3 py-1 rounded-full">
                  {user?.userName}
                </span>
              ) : (
                "--"
              )}
              </p>
            </div>
            <div className="">
              <p className="text-sm font-normal text-secondary opacity-[0.9]">
                Wallet Address
              </p>
              <p className="font-medium text-sm text-secondary break-all">
                {/* 150,015.0 YBT */}
                {address ? address : "--"}
              </p>
            </div>
            <div>
              <p className="text-sm font-normal text-secondary opacity-[0.9]">Email</p>
              <p className="font-medium text-sm text-secondary">
                {user?.email || arcanaUser?.email || "--"}
              </p>
            </div>           
          </div>
          <div> 
              <p className="text-sm font-normal text-secondary opacity-[0.9]">USD</p>        
              <p className="text-secondary text-sm font-medium">
                {usd} 
              </p>
              <div className="my-4">
            <p className="text-sm font-normal text-secondary opacity-[0.9]">{process.env.REACT_APP_CURRENCY}</p>
            <p className="font-medium	text-sm text-secondary">
              {currencyBalance > 0 ? currencyBalance?.toFixed(8) : 0}
            </p>
              </div>
              <p className="text-sm font-normal text-secondary opacity-[0.9]">{process.env.REACT_APP_TOKEN_SYMBOL}</p>
              <p className="font-medium	text-sm text-secondary">
                {tokenBalance > 0 ? tokenBalance?.toFixed(8) : 0} 
              </p>                    
          </div>          
        </div>
    
      <div className="grid md:grid-cols-3 gap-4">
        <div className="tier-card rounded-[16px] bg-primary-content p-[18px]">
          <div className="flex gap-2">
            <img src={totalstake} alt="" />
            <div>
              <p className="text-secondary text-sm font-normal">
                Investor Tier
              </p>
              {props.portfoliodata?.name ? (
                <span className="bg-[#E3F8FF] text-[#035388] text-[10px] font-semibold px-3 py-1 rounded-full">
                  {props.portfoliodata?.name}
                </span>
              ) : (
                "--"
              )}
            </div>
          </div>
          <div className="mt-[26px] mb-6">
            <p className="text-secondary text-sm font-normal">Total Stake</p>
            <h1 className="font-medium	text-[32px] text-black">
              {/* 150,015.0 YBT */}
              {props.amounts.stakedAmount
                ? props.amounts.stakedAmount + " YBT"
                : "--"}
            </h1>
          </div>
          <Button
            type="primary"
            btnClassName="w-full"
            handleClick={navigateToTier}
          >
            Upgrade Tier
          </Button>
        </div>
        <div className="tier-card rounded-[16px] bg-primary-content p-[18px] flex justify-center items-center text-center">
          <div>
            <div>
              <img src={totalinvest} alt="" className="mx-auto" />
            </div>
            <div className="mt-[26px]">
              <p className="text-secondary text-sm font-normal">
                Total Invested
              </p>
              <h1 className="font-medium	text-[32px] text-black">
                {props.portfoliodata?.totalInvested
                  ? props.portfoliodata?.totalInvested + " $"
                  : "--"}
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
              <p className="text-secondary text-sm font-normal">
                Projects Participated In
              </p>
              <h1 className="font-medium	text-[32px] text-black">
                {props.portfoliodata?.projectsParticipatedIn || "--"}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="md:flex items-center justify-between mt-8 mb-3">
        <div className="flex gap-4 items-center">
          <h1 className="text-xl font-semibold text-secondary">Investments</h1>
          <input
            type="checkbox"
            className="toggle"
            checked={props.showClaimableOnly}
            onChange={() =>
              props.setShowClaimableOnly(!props.showClaimableOnly)
            }
          />
          <p className="text-secondary text-sm font-normal">Claimable Only</p>
        </div>
        <div className="relative max-sm:mt-4">
          <input
            type="text"
            placeholder="Search by project name"
            onKeyUp={props.handleSearch}
            ref={props.portpolioRef}
            className="w-full rounded-[28px] border-[#A5A5A5] border h-12 focus:outline-none pl-5 pr-12"
          />
          <span
            onClick={props.handleSearchIcon}
            className="icon md search absolute right-4 bottom-4 cursor-pointer md:w-72"
          />
        </div>
      </div>
    </>
  );
};
export default View;
