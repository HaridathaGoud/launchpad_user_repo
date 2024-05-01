import React, { useContext, useEffect } from "react";
import WarningUnstake from "./warning";
import InitializeUnstake from "./initializeUnstake";
import AmountStakeUnstakeHandler from "../amountStakeUnstakeHandler";
import ConfirmationComponent from "../confirmation";
import CheckPointsComponent from "../checkPoints";
import useContract from "../../../hooks/useContract";
import { post } from "../../../utils/api";
import Button from "../../../ui/Button";
import Spinner from "../../loaders/spinner";
import CheckBox from "../checkBox";
import { StakingContext } from "../context/stakingContext";
import { StakingContextModal, StakingTabsContextModel } from "../models";
import { StakingTabsContext } from "../context/stakingTabsContext";
import { useDispatch } from "react-redux";
import { setToaster } from "../../../reducers/layoutReducer";
export default function Unstake() {
  const rootDispatch=useDispatch()
  const {
    stakeDetails,
    activeStep,
    setActiveStep,
    getAmounts,
    stakedAmount,
    isHideCountDownTimer,
    isConnected,
    address,
    currencyBalance,
    setTimers,
    getStakeDetails,
    getCurrency,
    getNativeCurrency,
  }: StakingContextModal = useContext(StakingContext);
  const tabContextValues: StakingTabsContextModel =
    useContext(StakingTabsContext);
  const { unStake } = useContract();
  useEffect(() => {
    tabContextValues?.resetTab?.();
    setTimers?.(6, "minutes");
  }, [address]); // eslint-disable-line react-hooks/exhaustive-deps
  const handleNextStep = () => {
    tabContextValues?.tabError && tabContextValues?.setTabError?.("");
    tabContextValues?.setAmountFieldError?.("");
    if (activeStep === 0) {
      setActiveStep?.(1);
    } else if (!tabContextValues?.checkboxValue && activeStep === 1) {
      tabContextValues?.setTabError?.(
        "Please click the checkbox after reading and agreeing to the Terms and Conditions before proceeding.",'warning'
      );
      return;
    } else if (tabContextValues?.checkboxValue && activeStep === 1) {
      setActiveStep?.(2);
    } else if (activeStep === 2) {
      handleAmountToStake();
      return;
    } else if (activeStep === 3) {
      tabContextValues?.setButtonLoader?.(true);
      unStake((res: any) => {
        callBackUnStake(res);
      }, tabContextValues?.tabAmount);
    }
  };

  const callBackUnStake = async (res: any) => {
    if (res.ok) {
      let obj = {
        address: address,
        contractAddress: process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS,
        volume: tabContextValues?.tabAmount,
        transactionHash: res?.response?.blockHash,
      };
      const response = await post(`User/SaveUnstaking`, obj);
      if (response) {
        tabContextValues?.setTabData?.(res.response);
        await getAmounts?.()
        rootDispatch(setToaster({ message: "Amount unstake Successful!" }));
        await getStakeDetails?.()
        await getCurrency?.()
        await getNativeCurrency?.()
        setActiveStep?.(4);
        tabContextValues?.setButtonLoader?.(false);
       
      } else {
        tabContextValues?.setButtonLoader?.(false);
        tabContextValues?.setTabError?.(
          res.error?.cause?.reason || res || response
        );
      }
    } else {
      tabContextValues?.setTabError?.(res.error?.cause?.shortMessage || res);
      tabContextValues?.setButtonLoader?.(false);
    }
  };

  const handleAmountToStake = () => {
    tabContextValues?.setAmountFieldError?.("");
    if (!tabContextValues?.tabAmount) {
      tabContextValues?.setAmountFieldError?.("Please enter amount!");
    } else if (parseFloat(tabContextValues?.tabAmount) === 0) {
      tabContextValues?.setAmountFieldError?.(
        "Please enter amount greater than zero!"
      );
    } else if (
      tabContextValues?.tabAmount &&
      parseFloat(tabContextValues?.tabAmount) > Number(stakedAmount)
    ) {
      tabContextValues?.setAmountFieldError?.("Insufficient Balance!");
    } else {
      setActiveStep?.(3);
    }
  };

  const handleUnStakeAgain = () => {
    tabContextValues?.resetTab?.();
  };
  const activeCondition =
    (!isConnected ||
      !stakedAmount ||
      currencyBalance === "0" ||
      !currencyBalance ||
      (isHideCountDownTimer && process.env.REACT_APP_ENV_VAR!=='dev') ||
      stakeDetails?.isUnstakeInitiated) &&
    activeStep === 1;
  return (
    <div className="container">
      <div className="">
        <div className="">
          <div className="min-h-[288px] bg-base-300 rounded-lg py-5 px-4 mt-5 flex flex-col justify-between">
            {activeStep === 0 && <WarningUnstake />}
            {activeStep === 1 && (
              <div>
                <CheckPointsComponent />
              </div>
            )}
            {activeStep === 2 && (
              <div>
                <AmountStakeUnstakeHandler
                  tokenBalance={stakedAmount}
                  isStaking={false}
                ></AmountStakeUnstakeHandler>
              </div>
            )}
            {activeStep === 3 && <InitializeUnstake></InitializeUnstake>}
            {activeStep === 4 && (
              <ConfirmationComponent
                isStaking={false}
                hash={tabContextValues?.tabData?.transactionHash}
              ></ConfirmationComponent>
            )}

            <div className="lg:flex items-center justify-between max-sm:mt-4">
              {activeStep === 1 && <CheckBox />}
              <span></span>
              <div className="max-sm:text-center max-sm:mt-2">
                {activeStep !== 4 && (
                  <div className="mx-2">
                    <Button
                      type={
                        activeCondition || tabContextValues?.buttonLoader
                          ? "stakingDisabled"
                          : "stakingPrimary"
                      }
                      btnClassName={`flex items-center gap-2`}
                      handleClick={handleNextStep}
                      disabled={
                        activeCondition ||
                        (tabContextValues?.buttonLoader && activeStep === 4)
                      }
                    >
                      {tabContextValues?.buttonLoader && activeStep === 3 && (
                        <Spinner />
                      )}

                      {(activeStep === 0 && "Proceed") ||
                        (activeStep === 1 && "Amount to Unstake") ||
                        (activeStep === 2 && "Initialize Unstake") ||
                        (activeStep === 3 && "Confirm Unstake")}
                    </Button>
                  </div>
                )}
              </div>
              {activeStep === 4 && (
                <div className="">
                  <Button type="primary" handleClick={handleUnStakeAgain}>
                    Unstake Again
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
