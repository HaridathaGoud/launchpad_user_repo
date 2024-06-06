import React, { useEffect, useReducer, useRef, useState } from "react";
import TiresShimmer from "../loaders/tiresShimmers";
import { setError, setToaster } from "../../reducers/layoutReducer";
import { connect, useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../../ui/breadcrumb";
import Investments from "./investments";
import { clearPortFolio, clearUserClaims, clearUserInvestments, getPortFolio, getUserClaims, getUserinvestments } from "../../reducers/portfolioReducer";
import { stakeAmountData } from "../staking/utils";
import useContract from "../../hooks/useContract";
import { initialPortfolioState, portfolioReducer } from "./reducer";
import View from "./view";
import { ethers } from "ethers";
const pageSize = 10

 const Portfolio=(props:any)=> {
  const [state, dispatch] = useReducer(portfolioReducer, initialPortfolioState);
  const {getStakedAmount,claimTokens} = useContract();
  const user = useSelector((state: any) => state.auth.user);
  const portfoliodata = useSelector((state:any)=>state.portfolio.portfoliodata)
  const userinvestmentsata = useSelector((state:any)=>state.portfolio.userinvestmentsata)
  const userclaims = useSelector((state:any)=>state.portfolio.userclaims)
  const [showClaimableOnly, setShowClaimableOnly] = useState(false);
  const data = showClaimableOnly ? userclaims.data : userinvestmentsata.data
  const portpolioRef = useRef<any>(null);
  const rootDispatch = useDispatch();
  const [claimIndex, setClaimIndex] = useState<any>(null);
  const [claimBtnLoader, setClaimBtnLoader] = useState<any>(false);

   useEffect(() => {
    getAmountDetails();
    if (user?.id) {
      props.portFolio({ customerId: user.id, data: null });
      fetchData(state.search||null)
    }
     return () => {
       props.clearPortFolioData();
     };
   }, [user?.id]);
   useEffect(()=>{
    fetchData(state?.search||null);
    return()=>{
       props.clearUserInvestmentsData()
       props.clearUserClaims();
    }
   },[showClaimableOnly])
   const fetchData = (search: string | null) => {
    if (showClaimableOnly) {
      props.UserClaims({ page: 1,take: pageSize,customerId: user.id,data: null,search: search});
    } else {
      props.Userinvestments({page: 1,take: pageSize, customerId: user.id,data: null,search: search});
    }
  };
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
  
  const handleClaim = (index: any,item:any) => {
    rootDispatch(setError({message:''}))
    setClaimIndex(index);
    setClaimBtnLoader(true);
    claimTokens(item?.contractAddress)
      .then((res: any) => {
        _provider()
          .waitForTransaction(res?.hash)
          .then((receipt: any) => {
            setClaimBtnLoader(false);
            fetchData(null);
            rootDispatch(setToaster({message:"Tokens claim successful!"}))
          })
          .catch((error: any) => {
            setClaimBtnLoader(false);
            rootDispatch(setError({message:error?.reason || error}))
          });
      })
      .catch((error: any) => {
        setClaimBtnLoader(false);
        rootDispatch(setError({message:error,from:'contract'}))
      });
  };
  function _provider() {
    const _connector: any = window?.ethereum;
    const provider = new ethers.providers.Web3Provider(_connector);
    return provider;
  }
  return (<> 
    {portfoliodata.loading && <TiresShimmer/>}
    {!portfoliodata.loading &&

    <div className="container mx-auto max-lg:px-3 mt-3 investments">
      <BreadCrumb/>
      <View
      portfoliodata={portfoliodata.data}
      amounts ={state.amounts}
      showClaimableOnly={showClaimableOnly}
      setShowClaimableOnly={setShowClaimableOnly}
      handleSearch={handleSearch}
      handleInputChange={handleInputChange}
      portpolioRef={portpolioRef}
      handleSearchIcon={handleSearchIcon}
      />
      <Investments data={data}
       claimBtnLoader={claimBtnLoader}
       claimIndex={claimIndex}
       handleClaim={handleClaim}
      loading = {userclaims.loading ||userinvestmentsata.loading}
      showClaimableOnly={showClaimableOnly}
      />
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