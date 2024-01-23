import {StakingContext} from "./context/stakingContext";
import { StakingContextModal } from "./models";
import TimeCalculate from "./timeCalculate";
import React, { useContext } from "react";
import { checkpointTexts, formatAmount } from "./utils";

const CheckPointsComponent = () => {
  const {
    activeTab,
    stakedAmount,
    unstakedAmount,
    rewardAmount,
    isHideCountDownTimer,
    unstakedDate,
    setIsHideCountDownTimer,
    isConnected,
    ybtBalance,
    maticBalance,
  }: StakingContextModal = useContext(StakingContext);
  let balanceFormatted: any = { balance: 0, formattedBalance: 0 };
  const maticBalanceFormatted = maticBalance
    ? formatAmount(maticBalance, 8)
    : balanceFormatted;
  switch (activeTab) {
    case 0:
      balanceFormatted = ybtBalance
        ? formatAmount(ybtBalance, 8)
        : balanceFormatted;
      break;
    case 1:
      balanceFormatted = stakedAmount
        ? formatAmount(stakedAmount, 8)
        : balanceFormatted;
      break;
    case 2:
      balanceFormatted = unstakedAmount
        ? formatAmount(unstakedAmount, 8)
        : balanceFormatted;
      break;
    case 3:
      balanceFormatted = rewardAmount
        ? formatAmount(rewardAmount, 8)
        : balanceFormatted;
      break;
    default:
      balanceFormatted = { ...balanceFormatted };
  }

  return (
    <div className="">
      <h1 className="mt-2 mb-6 text-lg font-bold text-secondary">
        To proceed, the following conditions must be met
      </h1>
      <div className=" grid lg:grid-cols-4 md:grid-cols-2 gap-4 sm:grid-cols-1">
        <div className="">
          <div className="flex gap-1">
            <div className="">
              <span
                className={
                  isConnected ? "icon active-checkpoint" : "icon checkpoint"
                }
              ></span>
            </div>
            <div className="">
              <p className="text-base font-semibold text-secondary">
                Connected with MetaMask
              </p>
              <p className="text-sm font-normal text-info">
                If not connected, click the "Connect Wallet" button in the top
                right corner
              </p>
            </div>
          </div>
        </div>
        <div className="">
          <div className="flex gap-1">
            <div className="">
              <span
                className={
                  balanceFormatted.balance > 0
                    ? "icon active-checkpoint"
                    : "icon checkpoint"
                }
              ></span>
            </div>
            <div className="">
              <p className="text-base font-semibold text-secondary">
                {activeTab !== undefined &&
                  checkpointTexts.balaneTexts[activeTab]}
              </p>
              <p>
                <span className="text-sm font-normal text-info">
                  {" "}
                  {activeTab !== 3 && "You currently have"}
                </span>
                <span className="text-sm font-semibold text-secondary">
                  {" "}
                  {balanceFormatted.balance > 0
                    ? balanceFormatted.formattedBalance
                    : "0"}{" "}
                  {`${process.env.REACT_APP_TOKEN_SYMBOL}${" "}`}
                  {activeTab === 1 && `staked`}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-1">
          <div className="">
            <span
              className={
                maticBalanceFormatted.balance > 0
                  ? "icon active-checkpoint"
                  : "icon checkpoint"
              }
            ></span>
          </div>
          <div className=" ">
            <p className="text-base font-semibold text-secondary">
              {checkpointTexts.maticText}
            </p>
            <p className="text-sm font-normal text-info">
              {checkpointTexts.maticSubText}
              <br />
              <span className="">
                {" "}
                <span className="text-sm font-semibold text-secondary">
                  {process.env.REACT_APP_CURRENCY} Balance
                </span>
                <span className="text-sm font-semibold text-secondary">
                  {" "}
                  {maticBalanceFormatted.balance
                    ? maticBalanceFormatted.formattedBalance
                    : "0"}
                </span>
              </span>
            </p>
          </div>
        </div>
        <div className="">
          <div className="flex gap-1">
            {
              <div className="">
                <span
                  className={
                    (activeTab !== 0 &&
                      !isHideCountDownTimer &&
                      balanceFormatted.balance > 0) ||
                    (activeTab === 0 && balanceFormatted.balance > 0)
                      ? "icon active-checkpoint"
                      : "icon checkpoint"
                  }
                ></span>
              </div>
            }
            <div className="">
              <p className="text-base font-semibold text-secondary">
                {activeTab !== undefined &&
                  checkpointTexts.eligibleTexts[activeTab]}
              </p>
              <p className="text-sm font-normal text-info">
                {activeTab !== undefined &&
                  (checkpointTexts.eligibleSubTexts[activeTab]
                    ? checkpointTexts.eligibleSubTexts[activeTab]
                    : "")}
              </p>
              {isHideCountDownTimer && (
                <TimeCalculate
                  unstakedDate={unstakedDate}
                  setIsHideCountDownTimer={setIsHideCountDownTimer}
                ></TimeCalculate>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CheckPointsComponent;
