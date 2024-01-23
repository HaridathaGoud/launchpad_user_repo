import React from 'react';
import CountdownTimer from './countdownTimer';
import { convertUTCToLocalTime } from '../../utils/api';
export default function TimeCalculate(props: any) {
  //const SEVEN_DAYS_IN_MS = 7 * 24 * 60 * 60 * 1000;
  const SEVEN_DAYS_IN_MS: any = 5 * 60 * 1000;
  let convertDate = convertUTCToLocalTime(props?.unstakedDate);
  // let date = moment(convertDate).format("YYYY-MM-DD HH:mm:ss");
  const NOW_IN_MS = new Date(convertDate).getTime();

  const dateTimeAfterSevenDays = NOW_IN_MS + SEVEN_DAYS_IN_MS;

  return (
    <div className="d-flex">
      <CountdownTimer targetDate={dateTimeAfterSevenDays} setIsHideCountDownTimer={props?.setIsHideCountDownTimer} />
    </div>
  );
}
