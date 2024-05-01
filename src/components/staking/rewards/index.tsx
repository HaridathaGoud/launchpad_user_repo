import React, { useContext, useEffect } from "react";
import CheckPointsComponent from "../checkPoints.tsx";
import useContract from "../../../hooks/useContract.ts";
import Spinner from "../../loaders/spinner.tsx";
import { post } from "../../../utils/api.ts";
import CheckBox from "../checkBox.tsx";
import Button from "../../../ui/Button.tsx";
import { StakingContext } from "../context/stakingContext.tsx";
import { StakingContextModal, StakingTabsContextModel } from "../models.ts";
import { StakingTabsContext } from "../context/stakingTabsContext.tsx";
import { useDispatch } from "react-redux";
import { setToaster } from "../../../reducers/layoutReducer.ts";
import { formatAmount } from "../utils.ts";
const RewardsComponent = () => {
  const rootDispatch = useDispatch();
  const {
    rewardAmount,
    getAmounts,
    getStakeDetails,
    currencyBalance,
    isConnected,
    address,
    getCurrency,
    getNativeCurrency
  }: StakingContextModal = useContext(StakingContext);
  const tabContextValues: StakingTabsContextModel =
    useContext(StakingTabsContext);
  const { stakeRewards, approve } = useContract();
  useEffect(() => {
    tabContextValues?.resetTab?.();
  }, [address]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleStakeRewards = () => {
    tabContextValues?.setButtonLoader?.(true);
    if (!tabContextValues?.checkboxValue) {
      tabContextValues?.setTabError?.(
        "Please click the checkbox after reading and agreeing to the Terms and Conditions before proceeding.",'warning'
      );
      tabContextValues?.setButtonLoader?.(false);
    } else {
      stakeRewards(
        (res: any) => {
          callbackRewards(res);
        },
        formatAmount(rewardAmount,8).formattedBalance,
        true
      );
    }
  };
  const callbackRewards = async (res: any) => {
    const obj = {
      address: address,
      contractAddress: process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS,
      volume: rewardAmount,
      transactionHash: res?.response?.blockHash,
    };
    const response = await post(`User/SaveStakerewards`, obj);
    if (res.ok && response) {
      await getAmounts?.();
      rootDispatch(setToaster({ message: "Rewards stake successful!" }));
      await getStakeDetails?.();
      await getCurrency?.()
      await getNativeCurrency?.()
      tabContextValues?.setButtonLoader?.(false);
      tabContextValues?.tabError && tabContextValues?.setTabError?.("");
    } else {
      tabContextValues?.setButtonLoader?.(false);
      tabContextValues?.setTabError?.(res?.error?.shortMessage || res);
      tabContextValues?.setCheckboxValue?.(false);
    }
  };
  const inActiveCondition:boolean | undefined= !isConnected ||
  rewardAmount === "0" ||
  !rewardAmount ||
  currencyBalance === "0" ||
  !currencyBalance || tabContextValues?.buttonLoader
  return (
    <div className="">
      <div className="">
        <div className="mt-5">
          <div className="min-h-[288px] bg-base-300 rounded-lg py-5 px-4 mt-5 flex flex-col justify-between">
            <CheckPointsComponent />

            <div className="lg:flex items-center justify-between max-sm:mt-4">
              <CheckBox />
              <div className="max-sm:text-center max-sm:mt-2">
                <Button
                  type={
                    inActiveCondition
                      ? "stakingDisabled"
                      : "stakingPrimary"
                  }
                  btnClassName={`flex items-center gap-2`}
                  handleClick={handleStakeRewards}
                  disabled={inActiveCondition}
                >
                  {tabContextValues?.buttonLoader && <Spinner />}
                  Stake Rewards
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsComponent;
