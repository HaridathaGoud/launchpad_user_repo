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
import { store } from "../../store";
import { convertUTCToLocalTime, get } from "../../utils/api";
import OutletContextModel from "../../layout/context/model";
import OutletContext from "../../layout/context/outletContext";
import { StakingProvider } from "./context/stakingContext";
import { navigateToUniswap } from "../../utils/commonNavigations";
import TrendingProjects from "./trendingCarousel";
import ConnectToWallet from "../ConnectToWallet";
const Staking = () => {
  const [state, dispatch] = useReducer(stakingReducer, initialStakingState);
  const { getStakedAmount, getUnstakedAmount, getRewards } = useContract();
  const { errorMessage,setErrorMessage }: OutletContextModel = useContext(OutletContext);
  const { isConnected, address } = useAccount();
  const user= useSelector(
    (state: any) => state.auth.user
  );
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

  const getAmountDetails = async () => {
    let stakedAmount = await stakeAmountData(getStakedAmount);
    let unstakedAmount = await unstakeAmtData(getUnstakedAmount);
    let rewardAmount = await rewardsData(getRewards);
    let amounts = { stakedAmount, unstakedAmount, rewardAmount };
    dispatch({ type: "setAmounts", payload: amounts });
  };

  const GetStakingDetails = async (customer: any) => {
    dispatch({ type: "setTimeLoader", payload: true });
    const user = store.getState().auth;
    try {
      let response = await get(
        `User/GetStakingDetails/${customer?.id || user?.user?.id}`
      );
      if (response.statusText.toLowerCase() === "ok") {
        errorMessage && setErrorMessage?.("");
        dispatch({ type: "setStakingDetails", payload: response.data });
        if (new Date(response.data.unstakedDate).getTime() > 0) {
          const SEVEN_DAYS_IN_MS: any = 5 * 60 * 1000;
          const NOW_IN_MS = new Date(
            convertUTCToLocalTime(response.data.unstakedDate)
          ).getTime();
          const presentDate = new Date().getTime();
          const dateTimeAfterSevenDays = NOW_IN_MS + SEVEN_DAYS_IN_MS;
          if (presentDate <= dateTimeAfterSevenDays) {
            dispatch({ type: "setIsHideCountDownTimer", payload: true });
            dispatch({ type: "setTimeLoader", payload: false });
          } else {
            dispatch({ type: "setIsHideCountDownTimer", payload: false });
            dispatch({ type: "setTimeLoader", payload: false });
          }
        } else {
          dispatch({ type: "setTimeLoader", payload: false });
        }
      } else {
        setErrorMessage?.(response);
        dispatch({ type: "setTimeLoader", payload: false });
      }
    } catch (error) {
      setErrorMessage?.(error);
    }
  };

  const contextValue: StakingContextModal = useMemo(() => {
    return {
      activeTab: state?.activeTab,
      setActiveTab: (payload) =>
        dispatch({ type: "setActiveTab", payload: payload }),
      activeStep: state?.activeStep,
      setActiveStep: (payload) =>
        dispatch({ type: "setActiveStep", payload: payload }),
      unstakedDate: state?.stakingDetails?.unstakedDate,
      getStakingDetails: GetStakingDetails,
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
    <div className="container mx-auto max-sm:px-3 px-2 lg:px-0 md:mt-3">
      <div>
        <TrendingProjects/>
        <StakingProvider value={contextValue}>
          <div className="grid lg:grid-cols-4 sm:grid-cols-1 mt-5 mb-4">
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
                    {(user.firstName+" "+user.lastName).toLowerCase()}
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
