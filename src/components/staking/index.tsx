import React, { useContext, useEffect, useMemo, useReducer } from "react";
import { useAccount, useBalance } from "wagmi";
import { useSelector } from "react-redux";
// import KycStatusPage from "../../components/sumsub/kycStatus";
import daoprofile from "../../assets/images/dao-profile.png";
import StakingDetails from "./stakingDetails";
import StakingTabs from "./stakingTabs";
import { initialStakingState, stakingReducer } from "./reducers";
import useContract from "../../hooks/useContract";
import { rewardsData, stakeAmountData, unstakeAmtData } from "./utils";
import { StakingContextModal } from "./models";
import { StakingProvider } from "./context/stakingContext";
import { navigateToUniswap } from "../../utils/commonNavigations";
import TrendingProjects from "./trendingCarousel";
import ConnectToWallet from "../ConnectToWallet";
const Staking = () => {
  const [state, dispatch] = useReducer(stakingReducer, initialStakingState);
  const {
    getStakedAmount,
    getUnstakedAmount,
    getRewards,
    getUserStakeDetails,
  } = useContract();
  const { isConnected, address } = useAccount();
  const user = useSelector((state: any) => state.auth.user);
  const { data: maticData } = useBalance({ address }) || {};
  const { data: ybtData } =
    useBalance({
      address,
      token: process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS as
        | `0x${string}`
        | undefined,
    }) || {};
  const maticBalance = maticData?.formatted;
  const ybtBalance = ybtData?.formatted;

  useEffect(() => {
    if (address) {
      getAmountDetails?.();
    }
  }, [address]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    
    async function getDetails() {
      let response = await getUserStakeDetails();
      if (response) {
        dispatch({ type: "setStakeDetails", payload: response });
      }
    }
    getDetails();
  }, [state.amounts, address]); // eslint-disable-line react-hooks/exhaustive-deps
  const getAmountDetails = async () => {
    let stakedAmount = await stakeAmountData(getStakedAmount);
    let unstakedAmount = await unstakeAmtData(getUnstakedAmount);
    let rewardAmount = await rewardsData(getRewards);
    let amounts = { stakedAmount, unstakedAmount, rewardAmount };
    dispatch({ type: "setAmounts", payload: amounts });
  };

  const setTimer = (difference, type) => {
    dispatch({ type: "setTimeLoader", payload: true });
    const details = state?.stakeDetails;
    let initiatedTime = BigInt(0);
    if (state?.activeTab ===1) {
      initiatedTime =
        details?.intialStakingTime[details?.intialStakingTime?.length - 1];
    }
    if (state?.activeTab === 2) {
      initiatedTime = details?.unstakeInitiatedTime;
    }
    const currentDateMillis = new Date().getTime();
    const currentDateInSeconds = BigInt(Math.floor(currentDateMillis / 1000));
    const differenceInSeconds = currentDateInSeconds - initiatedTime;
    function minutesToSeconds(minutes) {
      return BigInt(minutes) * 60n;
    }

    function daysToSeconds(days) {
      return BigInt(days) * 24n * 60n * 60n;
    }
    let timerSeconds = 0n;
    if (type === "days") {
      timerSeconds = daysToSeconds(difference);
    }
    if (type === "minutes") {
      timerSeconds = minutesToSeconds(difference);
    }
    if (differenceInSeconds >= timerSeconds) {
      dispatch({ type: "setIsHideCountDownTimer", payload: false });
    }else {
      if(state.activeTab!==0) dispatch({ type: "setIsHideCountDownTimer", payload: true });
    }
    dispatch({ type: "setTimeLoader", payload: false });
  };

  const contextValue: StakingContextModal = useMemo(() => {
    return {
      stakeDetails: state?.stakeDetails,
      activeTab: state?.activeTab,
      setActiveTab: (payload) =>
        dispatch({ type: "setActiveTab", payload: payload }),
      activeStep: state?.activeStep,
      setActiveStep: (payload) =>
        dispatch({ type: "setActiveStep", payload: payload }),
      unstakedDate: state?.stakingDetails?.unstakedDate,
      stakeAmountData: async () => {
        let stakedAmount = await stakeAmountData(getStakedAmount);
        dispatch({
          type: "setAmounts",
          payload: { ...state.amounts, stakedAmount: stakedAmount },
        });
      },
      unStakeAmtData: async () => {
        let unstakedAmount = await unstakeAmtData(getUnstakedAmount);
        dispatch({
          type: "setAmounts",
          payload: { ...state.amounts, unstakedAmount: unstakedAmount },
        });
      },
      rewardsData: async () => {
        let rewardAmount = await rewardsData(getRewards);
        dispatch({
          type: "setAmounts",
          payload: { ...state.amounts, rewardAmount: rewardAmount },
        });
      },
      stakedAmount: state?.amounts?.stakedAmount,
      unstakedAmount: state?.amounts?.unstakedAmount,
      rewardAmount: state?.amounts?.rewardAmount,
      timeLoader: state?.timeLoader,
      isHideCountDownTimer: state?.isHideCountDownTimer,
      setIsHideCountDownTimer: (payload) =>
        dispatch({ type: "setIsHideCountDownTimer", payload: payload }),
      maticBalance: maticBalance,
      ybtBalance: ybtBalance,
      address: address,
      isConnected: isConnected,
      setTimers:setTimer
    };
  }, [state, address]); // eslint-disable-line react-hooks/exhaustive-deps

  // useEffect(() => {
  //   if (user?.id && !user.isReferralPage) {
  //     navigate(`/referrals/${user.id}`);
  //   }
  // }, [address]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!isConnected) {
    return <ConnectToWallet />;
  }
  // if(isConnected && user?.kycStatus?.toLowerCase()!=='completed'){
  //   return <KycStatusPage isConnected={isConnected}/>
  // }
  return (
    <div className="container mx-auto max-sm:px-3 px-2 lg:px-0 mt-3">
      <div>
        <TrendingProjects />
        <StakingProvider value={contextValue}>
          <div className="grid lg:grid-cols-4 sm:grid-cols-1 mt-5 mb-4 gap-4">
            <div className="pr-5">
              <div className="flex items-center gap-3 col">
                <div className="w-12 h-12 ">
                  <img
                    src={daoprofile}
                    alt="Dao Profile"
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-lg font-semibold mb-1 text-secondary capitalize">
                    {(user.firstName && user.lastName) ?(user.firstName + " " + user.lastName).toLowerCase() : address}
                  </h1>
                  <p className="text-secondary">63k Members</p>
                </div>
              </div>
              <div className=" mt-4">
                <button
                  className="bg-secondary w-full rounded-[28px] h-[42px] px-6 inline-block text-lg font-semibold text-base-100"
                  onClick={navigateToUniswap}
                >
                  Buy {process.env.REACT_APP_TOKEN_SYMBOL}
                </button>
              </div>
            </div>
            <div className="lg:col-span-3">
              <StakingDetails />
            </div>
          </div>
          <div className="mt-4">
            <StakingTabs />
          </div>{" "}
        </StakingProvider>
      </div>
    </div>
  );
};
export default Staking;
