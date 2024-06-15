import React, { useContext, useEffect } from "react";
import CheckPointsComponent from "../checkPoints";
import InitializeWithdrawl from "./initializewithdrawal";
import ConfirmationComponent from "../confirmation";
import useContract from "../../../hooks/useContract";
import Spinner from "../../loaders/spinner";
import { post } from "../../../utils/api";
import CheckBox from "../checkBox";
import Button from "../../../ui/Button";
import { StakingContext } from "../context/stakingContext";
import { StakingContextModal, StakingTabsContextModel } from "../models";
import { StakingTabsContext } from "../context/stakingTabsContext";
import { useDispatch } from "react-redux";
import { setToaster } from "../../../reducers/layoutReducer";

const WithdrawComponent = () => {
  const rootDispatch = useDispatch();
  const {
    activeStep,
    setActiveStep,
    unstakedAmount,
    getAmounts,
    getStakeDetails,
    getCurrency,
    getNativeCurrency,
    isHideCountDownTimer,
    isConnected,
    address,
    currencyBalance,
    setTimers,
  }: StakingContextModal = useContext(StakingContext);
  const tabContextValues: StakingTabsContextModel =
    useContext(StakingTabsContext);
  const { withDrawTokens } = useContract();
  useEffect(() => {
    tabContextValues?.resetTab?.();
    setTimers?.(7, "days");
  }, [address]); // eslint-disable-line react-hooks/exhaustive-deps
  const handleNextStep = () => {
    tabContextValues?.tabError && tabContextValues?.setTabError?.("");
    if (!tabContextValues?.checkboxValue && activeStep === 0) {
      tabContextValues?.setTabError?.(
        "Please click the checkbox after reading and agreeing to the Terms and Conditions before proceeding.",'warning'
      );
    } else if (tabContextValues?.checkboxValue && activeStep === 0) {
      setActiveStep?.(1);
    } else if (activeStep === 1) {
      tabContextValues?.setButtonLoader?.(true);
      withDrawTokens((res: any) => {
        callBackWithdraw(res);
      }, unstakedAmount);
    }
  };

  const callBackWithdraw = async (res: any) => {
    if (res.ok) {
      let obj = {
        address: address,
        contractAddress: process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS,
        volume: unstakedAmount,
        transactionHash: res?.response?.blockHash, //blockHash,
      };
      let response = await post(`User/SaveWithdraw`, obj);
      if (response) {
        await getAmounts?.();
        rootDispatch(setToaster({ message: "Amount withdraw successful!" }));
        await getStakeDetails?.();
        await getCurrency?.();
        await getNativeCurrency?.();
        tabContextValues?.setTabData?.(res.response);
        setActiveStep?.(2);
        tabContextValues?.setButtonLoader?.(false);
      }
    } else {
      tabContextValues?.setTabError?.(res.error?.cause?.shortMessage || res);
      tabContextValues?.setButtonLoader?.(false);
    }
  };

  const handleWithdrawAgain = () => {
    tabContextValues?.resetTab?.();
  };

  const activeCondition =
    !isConnected ||
    unstakedAmount === "0" ||
    !unstakedAmount ||
    currencyBalance === "0" ||
    !currencyBalance ||
    (isHideCountDownTimer && process.env.REACT_APP_ENV_VAR!=='dev');
  return (
    <div className="">
      <div className="">
        <div className="">
          <div className="min-h-[288px] bg-base-300 rounded-lg py-5 px-4 mt-5 flex flex-col justify-between">
            {activeStep === 0 && (
              <div>
                <CheckPointsComponent />
              </div>
            )}
            {activeStep === 1 && <InitializeWithdrawl></InitializeWithdrawl>}
            {activeStep === 2 && (
              <ConfirmationComponent
                isWithdrawal={true}
                hash={tabContextValues?.tabData?.transactionHash}
              ></ConfirmationComponent>
            )}

            <div className="lg:flex items-center justify-between max-sm:mt-4">
              {activeStep === 0 && <CheckBox />}

              <span></span>
              <div className="md:flex items-center">
                <div className="">
                  {activeStep !== 2 && (
                    <div className="max-sm:text-center max-sm:mt-2">
                      <Button
                       type={"stakingPrimary"}
                        btnClassName={`flex items-center gap-2`}
                        handleClick={handleNextStep}
                        disabled={
                          (activeCondition || tabContextValues?.buttonLoader) &&
                          activeStep === 0
                        }
                      >
                        {tabContextValues?.buttonLoader && activeStep === 1 && (
                          <Spinner />
                        )}
                        {(activeStep === 0 && "Initialize Withdrawal") ||
                          (activeStep === 1 && "Confirm Withdraw")}
                      </Button>
                    </div>
                  )}
                </div>
                {activeStep === 2 && (
                  <div className="max-sm:text-center max-sm:mt-2">
                    <button
                      type="button"
                      className="bg-primary rounded-[28px] h-[42px] px-6 inline-block text-lg font-semibold text-base-100"
                      onClick={handleWithdrawAgain}
                    >
                      Withdraw Again
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawComponent;
