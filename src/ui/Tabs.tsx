import React from "react";
import Button from "./Button";

const Tabs = ({
  tabs,
  activeTab,
  setActiveTab,
  tabsClass,
  labelClass,
  tabContentClass,
  iSTabChange,
}, props) => {
  const handleTabChange = (tab) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    if (typeof iSTabChange === "function") {
      iSTabChange(tab);
    }
  };

  return (<>
  {/* <div className="mb-2 project-detail-tab detail-tabs-dao sticky top-[65px] z-10 flex items-center flex-col justify-center gap-3 pt-2 pb-2 md:flex-row md:justify-between bg-success-content">
    <div>
    <button className="bg-primary tab custom-btn-new leading-normal  font-semibold rounded-[12px] text-neutral whitespace-nowrap">KYC</button>
    <button className=" tab custom-btn-new leading-normal  font-semibold rounded-[12px] text-neutral whitespace-nowrap">NFT's</button>
    </div>
  </div> */}

    <div role="tablist" className={`tabs ${tabsClass ? tabsClass : "tabstyle tab-design-style khudhkufhd"}`}>
      {tabs.map((tab, index) => (
        <React.Fragment key={index}>
          <input
            type="radio"
            name={tab.label}
            role="tab"
            className={`tab ${labelClass ? labelClass : "!w-30 px-7 py-2 !h-auto leading-normal custom-btn-new text-neutral"} ${index === activeTab ? "active-tab-class" : ""}`}
            aria-label={tab.label}
            checked={index === activeTab}
            onChange={() => handleTabChange(index)}
          />
          <div
            role="tabpanel"
            className={`tab-content ${tabContentClass ? tabContentClass : "md:p-3 lg:pl-0 max-sm:mt-4 max-sm:overflow-auto"}`}
          >
            {tabs[activeTab].content}
          </div>
        </React.Fragment>
      ))}
    </div>
    </> );
};

export default Tabs;
