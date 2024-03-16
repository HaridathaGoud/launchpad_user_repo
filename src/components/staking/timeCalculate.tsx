import React, { useContext } from "react";
import CountdownTimer from "./countdownTimer";
import { StakingContextModal } from "./models";
import { StakingContext } from "./context/stakingContext";
import {minutesToSeconds,daysToSeconds} from "./utils"
export default function TimeCalculate() {
  let timerSeconds = 0;
  const { stakeDetails, activeTab ,setIsHideCountDownTimer}: StakingContextModal =
    useContext(StakingContext);
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

  const total = (timerSeconds + initiatedTime)*1000;
  return (
    <div className="d-flex">
      <CountdownTimer
        targetDate={total}
        setIsHideCountDownTimer={setIsHideCountDownTimer}
        activeTab={activeTab}
      />
    </div>
  );
}
