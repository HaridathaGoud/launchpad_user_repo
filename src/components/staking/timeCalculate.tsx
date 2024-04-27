import React from "react";
import CountdownTimer from "./countdownTimer";
export default function TimeCalculate({timerSeconds,initiatedTime,setTimer,textToDisplay}:any) {
  const total = (timerSeconds + initiatedTime)*1000;
  return (
    <div className="d-flex">
      <CountdownTimer
        targetDate={total}
        setTimer={setTimer}
        textToDisplay={textToDisplay}
      />
    </div>
  );
}
