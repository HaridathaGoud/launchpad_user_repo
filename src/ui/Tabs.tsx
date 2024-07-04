import React from "react";

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

  return (
    <div role="tablist" className={`tabs ${tabsClass ? tabsClass : "tabstyle tab-design-style "}`}>
      {tabs.map((tab, index) => (
        <React.Fragment key={index}>
          <input
            type="radio"
            name={tab.label}
            role="tab"
            className={`tab ${labelClass ? labelClass : "!w-30 px-7 py-2 !h-auto leading-normal"} ${index === activeTab ? "active-tab-class" : ""}`}
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
  );
};

export default Tabs;
