import React, { useState } from "react";
import error from "../assets/images/error.svg";
const ErrorMessage = ({ errorMessage, setErrorMessage, onCloseCallback }) => {
  const [readMore, setReadMore] = useState(false)
  const handleClose = () => {
    onCloseCallback?.();
    setErrorMessage();
  }
  const handleReadError = (value: string) => {
    value === "more" && setReadMore(true);
    value === "less" && setReadMore(false);
  }
  return (<>
    {/* <div className="fixed top-15 left-[50%] right-[50%] translate-x-[-50%] z-[99999] cust-error-bg w-[25rem] w-[95%] md:max-w-[30rem] md:min-w-[400px] my-4 flex justify-between items-start box-border">
     <div className="flex">
      <img src={error} alt="" width={32} height={32} className="me-2" />
      <span className={`icon erroricon shrink-0`}></span>
      <div>
        <p className="error-title ">Error</p>
        <p className="error-desc">{errorMessage.length>40 ? <>
          {errorMessage.slice(0,31)}
          {!readMore && <button onClick={()=>handleReadError('more')} className="font-bold text-[#b21919]"> &nbsp; ...read more</button>}
          {readMore && <><span>{errorMessage.slice(31)}</span>
          <button onClick={()=>handleReadError('less')} className="font-bold text-[#b21919]"> &nbsp; ...read less</button>
          </>}
        </>:errorMessage}</p>
      </div>
     </div>
     <button className="icon close cursor-pointer shrink-0" onClick={handleClose}></button>
    </div> */}

    <div className="fixed top-15 left-[50%] right-[50%] translate-x-[-50%] z-[99999] w-[95%] md:w-[35%] my-4 ">
      <div className='rounded-lg flex border-2 border-[#F05454] min-h-[90px] mt-5 shadow-md relative bg-white'>
        <button className={`closeerror cursor-pointer icon absolute top-[-12px] right-[-12px]`} onClick={handleClose}></button>
        <span className={`w-4 h-4 bg-[#FF3838]  absolute top-[22px] right-[22px] rounded-full`}></span>
        <span className={`w-2 h-2 bg-[#FF3838]  absolute top-[42px] right-[42px] rounded-full`}></span>
        <div className="bg-[#FF3838] w-[120px] relative flex justify-center items-center shrink-0">
          <span className={`icon erroricon`}></span>
          <div className="w-0 h-0 border-l-[26px] border-l-[#FF3838] border-t-[16px] border-t-transparent and border-b-[16px] border-b-transparent absolute right-[-18px] top-[32px]"></div>
        </div>
        <div className='items-center pb-4 pt-5 px-12'>
          <h2 className={`warning text-[#F05454] text-[24px] font-medium not-italic`}>Oh Error!</h2>
          <p className='text-[#F05454] text-[13px] font-normal not-italic '>{errorMessage.length > 40 ? <>
            {errorMessage.slice(0, 31)}
            {!readMore && <button onClick={() => handleReadError('more')} className="font-bold text-[#000]"> &nbsp; ...read more</button>}
            {readMore && <><span>{errorMessage.slice(31)}</span>
              <button onClick={() => handleReadError('less')} className="font-bold text-[#000]"> &nbsp; ...read less</button>
            </>}
          </> : errorMessage}</p>
        </div>
      </div>
    </div>
  </>
  );
};

export default ErrorMessage;
