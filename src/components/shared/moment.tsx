import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';
export default function DateDisp(props: any) {
  const date = moment.utc(props.date).local();
  return (
    <>
      {props.showTime && (
        <Moment local format="DD/MM/YYYY hh:mm A" className={props.className}>
          {date}
        </Moment>
      )}
      {!props.showTime && (
        <Moment local format="DD/MM/YYYY" className={props.className}>
          {date}
        </Moment>
      )}
    </>
  );
}
