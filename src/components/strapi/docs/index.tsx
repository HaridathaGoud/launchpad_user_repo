import React, { useContext, useEffect, useMemo, useReducer, useState } from "react";
import StakingComponent from "../../staking/stake";
import Collapse from "../../../ui/Collapse";
import Docstabs from "../../../ui/docstabs";
import IntroPage from "./intro";
import VisitUs from "../../visitus";
import LaunchpadIntro from "./launchpadintro";
import LaunchpadTypes from "./typesofLaunchpad";
import LaunchpadBenefits from "./benefits";
import SuccessfulStories from "./successstories";
import KeyComponents from "./keycomponents";
import Tips from "./tips";
import Conclusion from "./launchpadintro";
import ConclusionContent from "./conclusioncomponent";

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
            content:<LaunchpadIntro/>

          },
          {
            name: "Types of Launchpads",
            icon: "amount",
            activeIcon: "amountActive",
            content:<LaunchpadTypes/>
          },
          {
            name: "Benefits of Launchpads",
            icon: "confirmation",
            activeIcon: "confirmationActive",
            content:<LaunchpadBenefits/>
          },
          {
            name: "Successful Stories",
            icon: "confirmation",
            activeIcon: "confirmationActive",
            content:<SuccessfulStories/>
          },
          {
            name: "Key Components",
            icon: "confirmation",
            activeIcon: "confirmationActive",
            content:<KeyComponents/>
          },
          {
            name: "Tips for Participants",
            icon: "confirmation",
            activeIcon: "confirmationActive",
            content:<Tips/>
          },
          {
            name: "Conclusion",
            icon: "confirmation",
            activeIcon: "confirmationActive",
            content:<ConclusionContent/>
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
    <>
    <div className="grid lg:grid-cols-4 mt-2 container mx-auto">
      <div className="mt-5 pr-4 border-r">
        <Docstabs
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={(payload: number) => setActiveTab?.(payload)}
          activeStep={activeStep}
          setActiveStep={(payload: number) => setActiveStep?.(payload)}
        />
      </div>      
        <div className="lg:col-span-3 pl-6">
          {tabs[activeTab].content[activeStep].content}         
        </div>
      {/* </StakingTabsProvider> */}
    </div>
    <div className='pt-36'>
    <VisitUs />
  </div>
    </>
  );
};

export default Docs;
