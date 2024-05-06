import React from "react";
const toaster = {
  success: {
    background:"bg-[#2b5800]",
    icon: "toastersuccess scale-[0.8]",
    textColor:"text-[#2b5800]",
    text: "Success",
    arrowBorder: "border-l-[#2b5800]",
  },
  error: {
    background:"bg-[#b21919]",
    icon: "erroricon scale-[0.8]",
    textColor: "text-[#b21919]",
    text: "Error",
    arrowBorder: "border-l-[#b21919]",
  },
};
const toasterPosition = {
  center: "bottom-5 left-[50%] right-[50%] translate-x-[-50%]",
  bottomLeft: "bottom-5 left-5",
  topRight: "top-15 right-5",
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
  setTimeout(() => {
    closeToaster();
  }, timeout);
  callback &&
    setTimeout(() => {
      callback();
    }, callbackTimeout);
  const messageType = toaster[type];
  return (
    <div
      id="toast-top-right"
      className={`top-right-toast fixed ${toasterPosition[position]} bg-white`}
      role="alert"
    >
      <div
        className={`rounded-lg flex border ${messageType["border"]} min-h-[50px] shadow-lg relative bg-white`}
      >
        <span
          className={`w-6 h-6 rounded-full ${messageType["background"]} absolute top-[-10px] right-[-10px]`}
        ></span>
        <span
          className={`w-4 h-4 ${messageType["background"]} absolute top-[22px] right-[22px] rounded-full`}
        ></span>
        <span
          className={`w-2 h-2 ${messageType["background"]}  absolute top-[42px] right-[42px] rounded-full`}
        ></span>
        <div
          className={`${messageType["background"]}  w-[90px] relative flex justify-center items-center shrink-0 rounded-tl-md rounded-bl-md`}
        >
          <span className={`icon ${messageType["icon"]} scale-[0.8]`}></span>
          <div
            className={`w-0 h-0 border-l-[26px] ${messageType["arrowBorder"]} border-t-[16px] border-t-transparent and border-b-[16px] border-b-transparent absolute right-[-18px] top-[30%]`}
          ></div>
        </div>
        <div className="items-center py-2 px-12">
          <h2
            className={`warning ${messageType["textColor"]} text-[24px] font-medium not-italic`}
          >
            {messageType["text"]}
          </h2>
          <p
            className={`pt-2 ${messageType["textColor"]} font-[500] text-[13px] not-italic`}
          >
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};
export default ToasterMessage;
