import React, { useEffect, useReducer, useRef, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { useAccount, useBalance } from "wagmi";
import { get } from "../../utils/api";
import Button from "../../ui/Button";
import TiresShimmer from "../loaders/TiresShimmers";
import { setError } from "../../reducers/layoutReducer";
import { connect, useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../../ui/breadcrumb";
import totalstake from '../../../src/assets/images/total-stake.svg'
import totalinvest from '../../../src/assets/images/total-invest.svg'
import projects from '../../../src/assets/images/project-participate.svg'
import Investments from "./investments";
import { clearPortFolio, clearUserClaims, clearUserInvestments, getPortFolio, getUserClaims, getUserinvestments } from "../../reducers/portfolioReducer";
import { stakeAmountData } from "../staking/utils";
import useContract from "../../hooks/useContract";
import { initialPortfolioState, portfolioReducer } from "./reducer";
const pageSize = 10

 const Portfolio=(props:any)=> {
  const [state, dispatch] = useReducer(portfolioReducer, initialPortfolioState);
  const {getStakedAmount,} = useContract();
  const router = useNavigate();
  const user = useSelector((state: any) => state.auth.user);
  const portfoliodata = useSelector((state:any)=>state.portfolio.portfoliodata)
  const userinvestmentsata = useSelector((state:any)=>state.portfolio.userinvestmentsata)
  const userclaims = useSelector((state:any)=>state.portfolio.userclaims)
  const [showClaimableOnly, setShowClaimableOnly] = useState(false);
  const data = showClaimableOnly ? userclaims.data : userinvestmentsata.data
  const portpolioRef = useRef<any>(null);

   useEffect(() => {
    getAmountDetails();
    if (user?.id) {
      props.portFolio({ customerId: user.id, data: null });
      fetchData(state?.search||null);
    }
     return () => {
       props.clearPortFolioData();
       props.clearUserInvestmentsData()
       props.clearUserClaims();
     };
   }, [user?.id,showClaimableOnly]);
   const fetchData = (search: string | null) => {
    if (showClaimableOnly) {
      props.UserClaims({ page: 1,take: pageSize,customerId: user.id,data: null,search: search});
    } else {
      props.Userinvestments({page: 1,take: pageSize, customerId: user.id,data: null,search: search});
    }
  };
   const navigateToTier=()=>{
    router(`/tiers`);
   }
  const handleSearchIcon = (data: any) => {
    fetchData(state.search?.trim()||null);
  };
  const handleSearch = (e: any) => {
    let data = e.target.value.trim();
    dispatch({ type: "setSearch", payload: data });
    if (e.key === "Enter") {
      fetchData(data||null);
    }
  };
  const handleInputChange = (e: any) => {
    let data = e.target.value.trim();
    dispatch({ type: "setSearch", payload: data });
    if (data === "") {
      fetchData(null);
    }
  };
  const getAmountDetails = async () => {
    let stakedAmount = await stakeAmountData(getStakedAmount);
    let amounts = { stakedAmount };
    dispatch({ type: "setAmounts", payload: amounts });
  };
  
  return (<> 
    {portfoliodata.loading && <TiresShimmer/>}
    {!portfoliodata.loading &&
    <div className="container mx-auto max-lg:px-3 mt-3 investments">
      <BreadCrumb/>
      <div className="grid md:grid-cols-3 gap-4">
       <div className="tier-card rounded-[16px] bg-primary-content p-[18px]">
        <div className="flex gap-2">
        <img src={totalstake} alt="" />
         <div>
         <p className="text-secondary text-sm font-normal">Investor Tier</p>
         <span className="bg-[#E3F8FF] text-[#035388] text-[10px] font-semibold px-3 py-1 rounded-full">{portfoliodata.data?.name}</span>
         </div>
        </div>
        <div className="mt-[26px] mb-6">
          <p className="text-secondary text-sm font-normal">Total Stake</p>
          <h1 className="text-secondary font-medium	text-[32px] text-black">
             {/* 150,015.0 YBT */}
             {state.amounts?.stakedAmount && state.amounts?.stakedAmount + ' YBT'||'--'}
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
            {portfoliodata.data?.totalInvested && portfoliodata.data?.totalInvested + ' USDT'||'--'}
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
            {portfoliodata.data?.projectsParticipatedIn ||'--'}
            </h1>
        </div>
       </div>
       </div>
      </div>
     
      <div className="md:flex items-center justify-between mt-8 mb-3">
      <div className="flex gap-4 items-center"> 
       <h1 className="text-xl font-semibold text-secondary">Investments</h1>
        <input type="checkbox" className="toggle"
        checked={showClaimableOnly}
        onChange={() => setShowClaimableOnly(!showClaimableOnly)} />
        <p className="text-secondary text-sm font-normal">Claimable Only</p>
        </div>       
        <div className="relative max-sm:mt-4">
          <input
            type="text"
            placeholder="Search"
            // onKeyUp={(value)=>handleSearch(value)}
            onKeyUp={(e) => handleSearch(e)}
            onChange={(e) => handleInputChange(e)}
            ref={portpolioRef}
            className="w-full rounded-[28px] border-[#A5A5A5] border h-12 focus:outline-none pl-5 pr-12"                      
          />
          <span onClick={handleSearchIcon}
          // onClick={()=>handleSearchIcon(state.search)}
            className="icon md search absolute right-4 bottom-4 cursor-pointer md:w-72"                     
          />
        </div>      
         
      </div>
      <Investments data={data} loading = {userclaims.loading ||userinvestmentsata.loading}/>
    </div>}
    </>);
}

const connectStateToProps = ({ portfolio }: any) => {
  return { portfolio: portfolio };
};
const connectDispatchToProps = (dispatch: any) => {
  return {
    portFolio: (callback: any) => {
      dispatch(getPortFolio( callback));
    },
    Userinvestments: (callback: any) => {
      dispatch(getUserinvestments( callback));
    },
    UserClaims: (callback: any) => {
      dispatch(getUserClaims( callback));
    },
    clearPortFolioData: () => {
      dispatch(clearPortFolio());
    },
    clearUserInvestmentsData: () => {
      dispatch(clearUserInvestments());
    },
    clearUserClaims: () => { //
      dispatch(clearUserClaims());
    },
    dispatch,
  };
};
export default connect(connectStateToProps, connectDispatchToProps)(Portfolio);