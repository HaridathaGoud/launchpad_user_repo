import React from "react";

const Spinner = ({size="loading-md",spinnerClass=""}) => {
  return (
      <span className={`loading loading-spinner ${size} ${spinnerClass}`}></span>
  );
};
export default Spinner;
