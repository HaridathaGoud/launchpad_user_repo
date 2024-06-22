import React, { useState } from "react";

const errorType={
  error:{
    icon:'erroricon',
    closeIcon:'closeerror',
    text:'Oh Error!',
    backgroundStyles:{
      primary:'bg-[#FF3838]',
      secondary:'bg-[#F05454]',
    },
    textStyles:{
      primary:'text-[#FF3838]',
      secondary:'text-[#F05454]',
    },
    borderLeft:'border-l-[#FF3838]',
    border:'border-[#F05454]'
  },
  warning:{
    icon:'warningicon',
    closeIcon:'closewarning',
    text:'Warning!',
    backgroundStyles:{
      primary:'bg-[#F9A402]',
      secondary:'bg-[#FFBA33]',
    },
    textStyles:{
      primary:'text-[#F9A402]',
      secondary:'text-[#FFBA33]',
    },
    borderLeft:'border-l-[#F9A402]',
    border:'border-[#F9A402]'
  }
}
const ErrorMessage = ({ errorMessage, setErrorMessage, onCloseCallback ,type}) => {
  const [readMore, setReadMore] = useState(false)
  const handleClose = () => {
    onCloseCallback?.();
    setErrorMessage();
  }
  const handleReadError = (value: string) => {
    value === "more" && setReadMore(true);
    value === "less" && setReadMore(false);
  }
  const messageType=errorType[type];
  return (
    <div className="fixed top-15 left-[50%] right-[50%] translate-x-[-50%] z-[99999] w-[95%] md:w-[35%] my-4 ">
      <div className={`rounded-lg flex border ${messageType['border']} min-h-[50px] mt-5 shadow-lg relative bg-white`}>
        <button className={`${messageType['closeIcon']} cursor-pointer icon absolute top-[-12px] right-[-12px]`} onClick={handleClose}></button>
        <span className={`w-4 h-4 ${messageType['backgroundStyles']['primary']} absolute top-[22px] right-[22px] rounded-full`}></span>
        <span className={`w-2 h-2 ${messageType['backgroundStyles']['primary']}  absolute top-[42px] right-[42px] rounded-full`}></span>
        <div className={`${messageType['backgroundStyles']['primary']}  w-[90px] relative flex justify-center items-center shrink-0 rounded-tl-md rounded-bl-md`}>
          <span className={`icon ${messageType['icon']} scale-[0.8]`}></span>
          <div className={`w-0 h-0 border-l-[26px] ${messageType['borderLeft']} border-t-[16px] border-t-transparent and border-b-[16px] border-b-transparent absolute right-[-18px] top-[30%]`}></div>
        </div>
        <div className='items-center py-2 px-12'>
          <h2 className={`warning ${messageType['textStyles']['primary']} text-[24px] font-medium not-italic`}>{messageType['text']}</h2>
          <p className={`pt-2 ${messageType['textStyles']['primary']} font-[500] text-[13px] not-italic break-all`}>{errorMessage.length > 40 ? <>
            {errorMessage.slice(0, 31)}
            {!readMore && <button onClick={() => handleReadError('more')} className={`font-[700] ${messageType['textStyles']['primary']}`}> &nbsp; ...read more</button>}
            {readMore && <><span>{errorMessage.slice(31)}</span>
              <button onClick={() => handleReadError('less')} className={`font-[700] ${messageType['textStyles']['primary']}`}>...read less</button>
            </>}
          </> : errorMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
