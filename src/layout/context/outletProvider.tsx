import React from "react";
import outletContext from "./outletContext";
const OutletProvider = ({ children, value }) => {
  return (
    <outletContext.Provider value={value}>{children}</outletContext.Provider>
  );
};

export default OutletProvider;