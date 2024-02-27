import React from "react";
const toaster = {
  success: {background:"bg-[#f0fbe6]",icon:"successicon scale-[0.8]",textColor:"text-[#2b5800]"},
  error: {background:"bg-[#FFF4F4]",icon:"erroricon scale-[0.8]",textColor:"text-[#b21919]"},
};
const toasterPosition = {
  center: "bottom-5 left-[50%] right-[50%] translate-x-[-50%]",
  bottomLeft: "bottom-5 left-5",
  topRight:"top-15 right-5"
};
const ToasterMessage = ({
  message,
  closeToaster,
  timeout = 2000,
  type,
  position,
  callback,
  callbackTimeout = 1000,
}) => {
  const {background,icon,textColor}=toaster[type];
  setTimeout(() => {
  closeToaster();
  }, timeout);
  callback &&
    setTimeout(() => {
      callback();
    }, callbackTimeout);
  return (
    <div
      id="toast-top-right"
      className={`top-right-toast fixed ${toasterPosition[position]} ${background}`}
      role="alert"
    >
      <div className="text-sm font-normal flex items-center">
        <span className={`icon ${icon} shrink-0`}></span>
        <p className={`${textColor} ml-2`}>{message}</p>
      </div>
    </div>
  );
};
export default ToasterMessage;
