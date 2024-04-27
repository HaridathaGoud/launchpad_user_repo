import { StakingContext } from "./context/stakingContext";
import { StakingContextModal } from "./models";
import TimeCalculate from "./timeCalculate";
import React, { useContext } from "react";
import { checkpointTexts, daysToSeconds, formatAmount, minutesToSeconds, timerTexts } from "./utils";

const CheckPointsComponent = () => {
  const {
    stakeDetails,
    activeTab,
    stakedAmount,
    unstakedAmount,
    rewardAmount,
    isHideCountDownTimer,
    isConnected,
    tokenBalance,
    currencyBalance,
    setIsHideCountDownTimer
  }: StakingContextModal = useContext(StakingContext);
  let timerSeconds = 0;
  let initiatedTime = 0;
  if (activeTab === 1) {
    initiatedTime =
      Number(stakeDetails?.intialStakingTime[
        stakeDetails?.intialStakingTime?.length - 1
      ])
    const pool=Number(stakeDetails?.poolLevel[stakeDetails?.poolLevel?.length-1])
    let remainingTime=0;
    if(pool===1) remainingTime=1
    if(pool===2) remainingTime=3
    if(pool===3) remainingTime=6
    timerSeconds = minutesToSeconds(remainingTime);
  }
  if (activeTab === 2) {
    initiatedTime = Number(stakeDetails?.unstakeInitiatedTime);
    timerSeconds = daysToSeconds(7);
  }
  let balanceFormatted: any = { balance: 0, formattedBalance: 0 };
  const formattedCurrencyBalance = currencyBalance
    ? formatAmount(currencyBalance, 8)
    : balanceFormatted;
  switch (activeTab) {
    case 0:
      balanceFormatted = tokenBalance
        ? formatAmount(tokenBalance, 8)
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
        <div className=" lg:border-r border-accent pr-2">
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
        <div className=" lg:border-r border-accent pr-2">
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
              <div>
                <p>
                  <span className="text-sm font-normal text-info">
                    {" "}
                    {activeTab !== 3 && "You currently have"}
                  </span>
                </p>
                <span className="text-sm font-semibold text-secondary break-all">
                  {" "}
                  {balanceFormatted.balance > 0
                    ? balanceFormatted.formattedBalance
                    : "0"}{" "}
                  {`${process.env.REACT_APP_TOKEN_SYMBOL}${" "}`}
                </span>
                {activeTab === 1 && <p className="text-sm font-semibold text-secondary">staked</p>}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-1  lg:border-r border-accent pr-2">
          <div className="">
            <span
              className={
                formattedCurrencyBalance.balance > 0
                  ? "icon active-checkpoint"
                  : "icon checkpoint"
              }
            ></span>
          </div>
          <div className=" ">
            <p className="text-base font-semibold text-secondary">
              {checkpointTexts.currencyText}
            </p>
            <p className="text-sm font-normal text-info">
              {checkpointTexts.currencySubText}
              <br />
              <span className="">
                {" "}
                <span className="text-sm font-semibold text-secondary">
                  {process.env.REACT_APP_CURRENCY} Balance
                </span>
                <span className="text-sm font-semibold text-secondary break-all">
                  {" "}
                  {formattedCurrencyBalance.balance
                    ? formattedCurrencyBalance.formattedBalance
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
                      !(isHideCountDownTimer && process.env.REACT_APP_ENV_VAR!=='dev') &&
                      balanceFormatted.balance > 0 &&
                      !(activeTab === 1 && stakeDetails?.isUnstakeInitiated)) ||
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
              {((isHideCountDownTimer && process.env.REACT_APP_ENV_VAR!=='dev') &&  !(activeTab === 1 && stakeDetails?.isUnstakeInitiated)) && <TimeCalculate timerSeconds={timerSeconds} initiatedTime={initiatedTime} setTimer={setIsHideCountDownTimer} textToDisplay={timerTexts[activeTab || 1]}/>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CheckPointsComponent;
