import React, { useEffect, useMemo, useReducer } from "react";
import { useAccount, useBalance } from "wagmi";
import { useSelector } from "react-redux";
// import KycStatusPage from "../../components/sumsub/kycStatus";
import defaultAvatar from "../../assets/images/default-avatar.jpg";
import StakingDetails from "./stakingDetails";
import StakingTabs from "./stakingTabs";
import { initialStakingState, stakingReducer } from "./reducers";
import useContract from "../../hooks/useContract";
import {
  daysToSeconds,
  minutesToSeconds,
  rewardsData,
  stakeAmountData,
  unstakeAmtData,
} from "./utils";
import { StakingContextModal } from "./models";
import { StakingProvider } from "./context/stakingContext";
import { navigateToUniswap } from "../../utils/commonNavigations";
import BreadCrumb from "../../ui/breadcrumb";
import ConnectToWallet from "../ConnectToWallet";
import CopyToClipboard from "react-copy-to-clipboard";
import StakingShimmer from "../loaders/StakingShimmer";
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
  const { data: currency, refetch: getCurrency } =
    useBalance({ address }) || {};
  const { data: tokenData, refetch: getNativeCurrency } =
    useBalance({
      address,
      token: process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS as
        | `0x${string}`
        | undefined,
    }) || {};
  const currencyBalance = currency?.formatted;
  const tokenBalance = tokenData?.formatted;
  useEffect(() => {
    if (address && isConnected) {
      getDetails();
    }
  }, [address, isConnected]); // eslint-disable-line react-hooks/exhaustive-deps
  const getDetails = async () => {
    dispatch({ type: "setLoader", payload: true });
    await getStakeDetails?.();
    await getAmountDetails?.();
    dispatch({ type: "setLoader", payload: false });
  };

  const getStakeDetails = async () => {
    let response = await getUserStakeDetails();
    if (response) {
      dispatch({ type: "setStakeDetails", payload: response });
    }
  };
  const getAmountDetails = async () => {
    let stakedAmount = await stakeAmountData(getStakedAmount);
    let unstakedAmount = await unstakeAmtData(getUnstakedAmount);
    let rewardAmount = await rewardsData(getRewards);
    let amounts = { stakedAmount, unstakedAmount, rewardAmount };
    dispatch({ type: "setAmounts", payload: amounts });
  };

  const setTimer = (difference, type) => {
    const details = state?.stakeDetails;
    let initiatedTime = 0;
    if (state?.activeTab === 1) {
      initiatedTime = Number(
        details?.intialStakingTime[details?.intialStakingTime?.length - 1]
      );
    }
    if (state?.activeTab === 2) {
      initiatedTime = Number(details?.unstakeInitiatedTime);
    }
    const currentDateMillis = new Date().getTime();
    const currentDateInSeconds = Math.floor(currentDateMillis / 1000);
    const differenceInSeconds = currentDateInSeconds - initiatedTime;
    let timerSeconds = 0;
    if (type === "days") {
      timerSeconds = daysToSeconds(difference);
    }
    if (type === "minutes") {
      timerSeconds = minutesToSeconds(difference);
    }
    if (differenceInSeconds >= timerSeconds) {
      dispatch({ type: "setIsHideCountDownTimer", payload: false });
    } else {
      if (state.activeTab !== 0)
        dispatch({ type: "setIsHideCountDownTimer", payload: true });
    }
  };
  const handleCopy = () => {
    dispatch({ type: "setAddressCopied", payload: true });
    setTimeout(
      () => dispatch({ type: "setAddressCopied", payload: false }),
      1000
    );
  };
  const contextValue: StakingContextModal = useMemo(() => {
    return {
      stakeDetails: state?.stakeDetails,
      activeTab: state?.activeTab,
      loader: state?.loader,
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
      getAmounts: getAmountDetails,
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
      isHideCountDownTimer: state?.isHideCountDownTimer,
      setIsHideCountDownTimer: (payload) =>
        dispatch({ type: "setIsHideCountDownTimer", payload: payload }),
      currencyBalance: currencyBalance,
      tokenBalance: tokenBalance,
      address: address,
      isConnected: isConnected,
      setTimers: setTimer,
      getStakeDetails: getStakeDetails,
      getCurrency: getCurrency,
      getNativeCurrency: getNativeCurrency,
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
    <>
      {!state?.loader && (
        <div className="container mx-auto max-sm:px-3 px-2 lg:px-0 mt-3">
          <div>
            <div className="container m-auto">
              <BreadCrumb />
            </div>
            <StakingProvider value={contextValue}>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 sm:grid-cols-1 mt-5 mb-4 gap-4">
                <div className="pr-5">
                  <div className="flex items-center gap-3 col">
                    <div className="w-12 h-12 ">
                      <img
                        src={user?.profilePicUrl || defaultAvatar}
                        alt="Dao Profile"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <h1 className="text-lg font-semibold mb-1 text-secondary capitalize">
                        {user.firstName && user.lastName ? (
                          (user.firstName + " " + user.lastName).toLowerCase()
                        ) : (
                          <>
                            <span className="tooltip" data-tip={address}>
                              {address?.slice(0, 4)}...{address?.slice(-4)}
                            </span>
                            <CopyToClipboard
                              text={address}
                              options={{ format: "text/plain" }}
                              onCopy={() => handleCopy()}
                            >
                              <span
                                className={
                                  !state?.addressCopied
                                    ? "icon md copy-icon cursor-pointer ms-0 pl-4"
                                    : "icon md check-icon pl-4"
                                }
                              />
                            </CopyToClipboard>
                          </>
                        )}
                      </h1>
                      {/* <p className="text-secondary">63k Members</p> */}
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
      )}
      {state?.loader && <StakingShimmer />}
    </>
  );
};
export default Staking;
