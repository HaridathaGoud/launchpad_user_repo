import React from "react";

const Tabs = ({ tabs, activeTab,setActiveTab }) => {
    const handleTabChange=(tab)=>{
        if(tab===activeTab) return;
        setActiveTab(tab)
    }
  return (
    <div role="tablist" className="tabs tabstyle">
      {tabs.map((tab, index) => {
        return (
          <>
            <input
              type="radio"
              name={tab.label}
              role="tab"
              className="!w-24 tab px-7 py-2 !h-auto leading-normal !ml-0 "
              aria-label={tab.label}
              checked={index === activeTab}
              onChange={()=>handleTabChange(index)}
            />
            
              <div
                role="tabpanel"
                className="tab-content md:p-3 lg:pl-0 max-sm:mt-4 max-sm:overflow-auto"
              >
                {tab.content}
              </div>
            
          </>
        );
      })}
    </div>
  );
};

export default Tabs;
