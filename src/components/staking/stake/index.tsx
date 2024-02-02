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
import OutletContextModel from "../../../layout/context/model";
import OutletContext from "../../../layout/context/outletContext";
import { StakingTabsContext } from "../context/stakingTabsContext";
const StakingComponent = () => {
  const navigate = useNavigate();
  const {
    activeStep,
    setActiveStep,
    stakeAmountData,
    rewardsData,
    maticBalance,
    ybtBalance,
    address,
    isConnected,
  }: StakingContextModal = useContext(StakingContext);
  const {setToaster }: OutletContextModel = useContext(OutletContext);
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
          "Please click the checkbox after reading and agreeing to the Terms and Conditions before proceeding."
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
        setToaster?.(`Amount stake successful!`);
        setActiveStep?.(3);
        tabContextValues.setButtonLoader?.(false);
        tabContextValues?.setTabData?.(res.data);
        stakeAmountData?.();
        rewardsData?.();
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
    if(tiresAmount) navigate("/staking");
    window.location.reload();
    tabContextValues.resetTab?.()
    stakeAmountData?.();
    rewardsData?.();
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
      parseFloat(tabContextValues?.tabAmount) > parseFloat(ybtBalance || "0")
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
    ybtBalance === "0" ||
    !ybtBalance ||
    maticBalance === "0" ||
    !maticBalance;
  return (
    <div className="">
      <div className="sm:col lg:col-span-3">
        <div className="min-h-[288px] bg-base-300 rounded-lg py-5 px-4 mt-5 flex flex-col justify-between">
          {activeStep === 0 && <CheckPointsComponent />}
          {activeStep === 1 && (
            <AmountStakeUnstakeHandler
              ybtBalance={ybtBalance}
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
              hash={tabContextValues?.tabData?.hash}
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