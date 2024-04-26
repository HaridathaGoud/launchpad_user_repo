import React, { useContext, useEffect } from "react";
import CheckPointsComponent from "../checkPoints";
import AmountStakeUnstakeHandler from "../amountStakeUnstakeHandler";
import ConfirmComponent from "./confirm";
import ConfirmationComponent from "../confirmation";
import useContract from "../../../hooks/useContract";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../loaders/spinner";
import { post } from "../../../utils/api";
import Button from "../../../ui/Button";
import CheckBox from "../checkBox";
import { StakingContext } from "../context/stakingContext";
import { StakingContextModal, StakingTabsContextModel } from "../models";
import { StakingTabsContext } from "../context/stakingTabsContext";
import { useDispatch } from "react-redux";
import { setToaster } from "../../../reducers/layoutReducer";
const StakingComponent = () => {
  const navigate = useNavigate();
  const {
    activeStep,
    setActiveStep,
    getAmounts,
    currencyBalance,
    tokenBalance,
    address,
    isConnected,
    getStakeDetails,
    getCurrency,
    getNativeCurrency,
  }: StakingContextModal = useContext(StakingContext);
  const rootDispatch = useDispatch();
  const tabContextValues: StakingTabsContextModel =
    useContext(StakingTabsContext);
  const { approve, stack } = useContract();
  const tiresAmount = useParams().stakeAmount;
  useEffect(() => {
    tabContextValues?.resetTab?.();
    tiresAmount && tabContextValues?.setTabAmount?.(tiresAmount);
  }, [address, tiresAmount]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleNextStep = () => {
    tabContextValues.setAmountFieldError?.("");
    // tabContextValues?.tabError && tabContextValues?.setTabError?.("");
    if (activeStep === 0) {
      if (!tabContextValues.checkboxValue) {
        tabContextValues?.setTabError?.(
          "Please click the checkbox after reading and agreeing to the Terms and Conditions before proceeding.",'warning'
        );
      } else {
        setActiveStep?.(1);
      }
    } else if (activeStep === 1) {
      handleAmountToStake("confirm");
    } else if (activeStep === 2) {
      tabContextValues.setButtonLoader?.(true);
      handleStake();
    }
  };

  const stakeCallBack = async (res: any) => {
    if (res.ok) {
      const obj = {
        address: address,
        contractAddress: process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS,
        volume: tabContextValues?.tabAmount,
        transactionHash: res?.response?.blockHash,
      };
      const response = await post(`User/SaveStaking`, obj);
      if (response.statusText.toLowerCase() === "ok") {
        await getAmounts?.();
        rootDispatch(setToaster({ message: `Amount stake successful!` }));
        await getStakeDetails?.();
        await getCurrency?.();
        await getNativeCurrency?.();
        tabContextValues?.setTabData?.(res.response);
        setActiveStep?.(3);
        tabContextValues.setButtonLoader?.(false);
      } else {
        tabContextValues.setButtonLoader?.(false);
        tabContextValues?.setTabError?.(res.error?.cause?.reason || res);
      }
    } else {
      tabContextValues.setButtonLoader?.(false);
      tabContextValues?.setTabError?.(res.error?.cause?.shortMessage || res);
    }
  };
  const handleStake = async () => {
    stack(
      (res: any) => {
        stakeCallBack(res);
      },
      tabContextValues?.tabAmount,
      false
    );
  };

  const handleStakeAgain = () => {
    if (tiresAmount) navigate("/staking");
    tabContextValues.resetTab?.();
  };

  const handleAmountToStake = (type: any) => {
    tabContextValues.setAmountFieldError?.("");
    tabContextValues?.tabError && tabContextValues?.setTabError?.("");
    if (!tabContextValues?.tabAmount) {
      tabContextValues.setAmountFieldError?.("Please enter amount!");
    } else if (parseFloat(tabContextValues?.tabAmount) === 0) {
      tabContextValues.setAmountFieldError?.(
        "Please enter amount greater than zero!"
      );
    } else if (tabContextValues?.tabAmount < 1000) {
      tabContextValues.setAmountFieldError?.("Please enter min value of 1000!");
    } else if (
      tabContextValues?.tabAmount &&
      parseFloat(tabContextValues?.tabAmount) > parseFloat(tokenBalance?.toString() || "0")
    ) {
      tabContextValues.setAmountFieldError?.("Insufficient balance!");
    } else {
      tabContextValues.setButtonLoader?.(true);
      approve((res: any) => {
        approveStake(res);
      }, parseFloat(tabContextValues?.tabAmount));
    }
  };

  const approveStake = (res: any) => {
    if (res.ok) {
      tabContextValues.setButtonLoader?.(false);
      setActiveStep?.(2);
    } else {
      tabContextValues.setButtonLoader?.(false);
      tabContextValues?.setTabError?.(res.error.shortMessage || res);
    }
  };
  const activeCondition =
    !isConnected ||
    tokenBalance === "0" ||
    !tokenBalance ||
    currencyBalance === "0" ||
    !currencyBalance;
  return (
    <div className="">
      <div className="sm:col lg:col-span-3">
        <div className="min-h-[288px] bg-base-300 rounded-lg py-5 px-4 mt-5 flex flex-col justify-between">
          {activeStep === 0 && <CheckPointsComponent />}
          {activeStep === 1 && (
            <AmountStakeUnstakeHandler
            tokenBalance={tokenBalance}
              isStaking={true}
            ></AmountStakeUnstakeHandler>
          )}
          {activeStep === 2 && (
            <ConfirmComponent
              amountStake={parseFloat(tabContextValues?.tabAmount)}
              loader={tabContextValues.buttonLoader}
            ></ConfirmComponent>
          )}
          {activeStep === 3 && (
            <ConfirmationComponent
              isStaking={true}
              amountStake={tabContextValues?.tabAmount}
              hash={tabContextValues?.tabData?.transactionHash}
            ></ConfirmationComponent>
          )}
          {activeStep === 3 && (
            <div className="flex justify-end">
              <div className="">
                <Button type="stakingPrimary" handleClick={handleStakeAgain}>
                  Stake Again
                </Button>
              </div>
            </div>
          )}
          <div className="lg:flex items-center justify-between max-sm:mt-4">
            {activeStep === 0 && <CheckBox />}
            <span></span>
            {activeStep !== 3 && (
              <div className="max-sm:text-center max-sm:mt-2">
                <Button
                  type={
                    activeCondition || tabContextValues.buttonLoader
                      ? "stakingDisabled"
                      : "stakingPrimary"
                  }
                  btnClassName={`flex items-center gap-2`}
                  handleClick={handleNextStep}
                  disabled={activeCondition || tabContextValues.buttonLoader}
                >
                  {tabContextValues.buttonLoader &&
                    (activeStep === 1 || activeStep === 2) && <Spinner />}

                  {(activeStep === 0 && "Amount to Stake") ||
                    (activeStep === 1 && "Confirm") ||
                    (activeStep === 2 && "Confirm Stake")}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default StakingComponent;
