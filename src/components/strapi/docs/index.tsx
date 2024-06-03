import React, { useContext, useEffect, useMemo, useReducer, useState } from "react";
import StakingComponent from "../../staking/stake";
import Collapse from "../../../ui/Collapse";
import Docstabs from "../../../ui/docstabs";

const Docs = () => {
const[activeTab,setActiveTab ] = useState(0);
const[activeStep,setActiveStep ] = useState(0);

  const tabs = useMemo(
    () => [
      {
        name: "Intro",
        content: [
          {
            name: "Introduction to Launchpads",
            icon: "checkpoints",
            activeIcon: "checkpointsActive",
          },
          {
            name: "Types of Launchpads",
            icon: "amount",
            activeIcon: "amountActive",
          },
          {
            name: "Benefits of Launchpads",
            icon: "confirmation",
            activeIcon: "confirmationActive",
          },
          {
            name: "Successful Stories",
            icon: "confirmation",
            activeIcon: "confirmationActive",
          },
          {
            name: "Key Components",
            icon: "confirmation",
            activeIcon: "confirmationActive",
          },
          {
            name: "Tips for Participants",
            icon: "confirmation",
            activeIcon: "confirmationActive",
          },
          {
            name: "Conclusion",
            icon: "confirmation",
            activeIcon: "confirmationActive",
          },
        ],
      },
      {
        name: "Staking",
        content: [
          { name: "Staking Platform Tokens", icon: "warning", activeIcon: "warningactive" },
          {
            name: "Checkpoints",
            icon: "checkpoints",
            activeIcon: "checkpointsActive",
          },
          {
            name: "Unstaking Platform Tokens",
            icon: "amount",
            activeIcon: "amountActive",
          },
          {
            name: "Withdraw Platform Tokens",
            icon: "confirm",
            activeIcon: "confirmActive",
          },
          {
            name: "Rewards Platform Tokens",
            icon: "confirmation",
            activeIcon: "confirmationActive",
          },
        ],
      },
      {
        name: "Tiers",
        content:[{name:'About tiers'}],
      },
      { name: "Projects", content: [
        {
            name: "Tokenization",
            icon: "confirmation",
            activeIcon: "confirmationActive",
            
        },
        {
            name: "Membership",
            icon: "confirmation",
            activeIcon: "confirmationActive",
        }
      ] },
      { name: "Apply IVO’s", content: [] },
    ],
  );
  return (
    <div className="grid lg:grid-cols-4 mt-2 container mx-auto">
      <div className="mt-5">
        <Docstabs
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={(payload: number) => setActiveTab?.(payload)}
          activeStep={activeStep}
          setActiveStep={(payload: number) => setActiveStep?.(payload)}
        />
      </div>
      {/* <StakingTabsProvider value={tabsContextValue}> */}
        <div className="lg:col-span-3">
          { <StakingComponent />}
          {/* {activeTab === 1 && <Unstake />}
          {activeTab === 2 && <WithdrawComponent />}
          {activeTab === 3 && <RewardsComponent />} */}
        </div>
      {/* </StakingTabsProvider> */}
    </div>
  );
};

export default Docs;
