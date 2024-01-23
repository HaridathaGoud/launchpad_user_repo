import React, { createContext } from "react";


export const StakingTabsContext = createContext({});

export const StakingTabsProvider = ({ children, value }) => {
  return (
    <StakingTabsContext.Provider value={value}>{children}</StakingTabsContext.Provider>
  );
};