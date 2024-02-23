import React, { useState } from "react";
import error from "../assets/images/error.svg";
const ErrorMessage = ({ errorMessage,setErrorMessage,onCloseCallback }) => {
  const [readMore,setReadMore]=useState(false)
  const handleClose=()=>{
    onCloseCallback?.();
    setErrorMessage();
  }
  const handleReadError=(value:string)=>{
      value==="more" && setReadMore(true);
      value==="less" && setReadMore(false);
  }
  return (
    <div className="fixed top-15 left-[50%] right-[50%] translate-x-[-50%] z-[99999] cust-error-bg w-[25rem] w-[95%] md:max-w-[30rem] md:min-w-[400px] my-4 flex justify-between items-start box-border">
     <div className="flex">
      <img src={error} alt="" width={32} height={32} className="me-2" />
      {/* <span className={`icon erroricon shrink-0`}></span> */}
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
    </div>
  );
};

export default ErrorMessage;
