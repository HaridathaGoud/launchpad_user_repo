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
          {props?.textToDisplay}
          {/* <br /> */}
          <span className='text-sm font-semibold text-secondary ms-2'>
          {props?.days ? <>{props?.days} <span>{'d'}</span></> :''}
          {props?.hours ? <>{props?.hours} <span>{'h'}</span></> :''}
          {props?.minutes ? <>{props?.minutes} <span>{'m'}</span></> :''}
          {props?.seconds ? <>{props?.seconds} <span>{'s'}</span></> :''}
          </span>
        </p>
      </div>
    </div>
  );
};

const CountdownTimer = (props: any) => {
  const [days, hours, minutes, seconds] = useCountdown(props?.targetDate);

  if (days + hours + minutes + seconds <= 0) {
    props?.setTimer(false);
    return <ExpiredNotice />;
  } else {
    // props?.setTimer(true);
    return <ShowCounter days={days} hours={hours} minutes={minutes} seconds={seconds} textToDisplay={props?.textToDisplay}/>;
  }
};

export default CountdownTimer;
