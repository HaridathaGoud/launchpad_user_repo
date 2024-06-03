import React from "react";

const Docstabs = ({ tabs,activeTab,setActiveTab,activeStep,setActiveStep }) => {
  return (
    <>
      {tabs.map((tab, index) => {
        return (
          <div
            className={`collapse col pl-2 ${
              activeTab === index ? "collapse-open" : "collapse-close"
            }`}
            key={tab.name}
          >
            <div
              className={`collapse-title p-0 pl-3 ${
                activeTab === index ? "pt-0 min-h-0 !border-l-[2px] !border-primary mb-5 " : "pt-0 pb-0 min-h-0"
              }`}
            >
              <button
                onClick={() => {
                  setActiveTab(index);
                  setActiveStep(0);
                }}
                className={`font-semibold text-base text-primary ${
                  activeTab === index ? "" : "text-secondary !font-normal"
                }`}
              >
                {tab.name}
              </button>
            </div>
            <hr  className={` my-3 ${
              index === tabs.length - 1 ? "hidden" : "block"
            }`} />
           {tab.content && <div className={`collapse-content`}>
              <ul className="">
                {tab.content.map((step, index) => (
                  <li
                    className={`flex gap-1 items-center mb-3 cursor-pointer`}
                    key={step.name}
                    onClick={()=>setActiveStep(index)}
                  >                   
                      <span
                        className={`  ${
                          activeStep === index ? 'inline-block w-[6px] h-[6px] bg-primary rounded-full' : ''
                        }`}
                      ></span>                   
                    <span
                      className={`whitespace-nowrap ${
                        activeStep === index
                          ? "font-normal text-sm text-primary"
                          : "text-secondary font-normal text-sm opacity-60"
                      }`}
                    >
                      {step.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>}
          </div>
        );
      })}
    </>
  );
};

export default Docstabs;
