import React, { createContext } from "react";


export const StakingContext = createContext({});

export const StakingProvider = ({ children, value }) => {
  return (
    <StakingContext.Provider value={value}>{children}</StakingContext.Provider>
  );
};
