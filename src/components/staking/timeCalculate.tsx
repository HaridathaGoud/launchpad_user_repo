import React, { useContext } from "react";
import CountdownTimer from "./countdownTimer";
import { StakingContextModal } from "./models";
import { StakingContext } from "./context/stakingContext";
export default function TimeCalculate() {
  function minutesToSeconds(minutes) {
    return (minutes) * 60;
  }

  function daysToSeconds(days) {
    return (days) * 24 * 60 * 60;
  }
  let timerSeconds = 0;
  //const SEVEN_DAYS_IN_MS = 7 * 24 * 60 * 60 * 1000;
  const { stakeDetails, activeTab ,setIsHideCountDownTimer}: StakingContextModal =
    useContext(StakingContext);
  let initiatedTime = 0;
  if (activeTab === 1) {
    initiatedTime =
      Number(stakeDetails?.intialStakingTime[
        stakeDetails?.intialStakingTime?.length - 1
      ])
    timerSeconds = minutesToSeconds(5);
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
      />
    </div>
  );
}
