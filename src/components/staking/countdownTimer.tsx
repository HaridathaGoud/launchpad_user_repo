import React from 'react';
import { useCountdown } from '../../hooks/useCountDown';

const ExpiredNotice = () => {
  return (
    <div className="expired-notice">
      <span></span>
    </div>
  );
};
const ShowCounter = (props: any) => {
  return (
    <div className="show-counter">
      <div>
        <p className='text-sm font-normal text-info'>
          {props?.activeTab===1 && "Unstake in:"}  
          {props?.activeTab===2 && "Withdrawable in:"}
          <br />
          <p className='text-sm font-semibold text-secondary'>
          {props?.days}
          <span>{'d'}</span> {props?.hours}
          <span>{'h'}</span> {props?.minutes}
          <span>{'m'}</span> {props?.seconds}
          <span>{'s'}</span>
          </p>
        </p>
      </div>
    </div>
  );
};

const CountdownTimer = (props: any) => {
  const [days, hours, minutes, seconds] = useCountdown(props?.targetDate);

  if (days + hours + minutes + seconds <= 0) {
    props?.setIsHideCountDownTimer(false);
    return <ExpiredNotice />;
  } else {
    // props?.setIsHideCountDownTimer(true);
    return <ShowCounter days={days} hours={hours} minutes={minutes} seconds={seconds} activeTab={props.activeTab}/>;
  }
};

export default CountdownTimer;
