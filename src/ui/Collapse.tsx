import React from "react";

const Collapse = ({ tabs,activeTab,setActiveTab,activeStep,setActiveStep }) => {
  return (
    <>
      {tabs.map((tab, index) => {
        return (
          <div
            className={`collapse col ${
              activeTab === index ? "collapse-open" : "collapse-close"
            }`}
            key={tab.name}
          >
            <div
              className={`collapse-title ${
                activeTab === index ? "pt-0 min-h-0" : "pt-0 pb-0 min-h-0 mb-2"
              }`}
            >
              <button
                onClick={() => {
                  setActiveTab(index);
                  setActiveStep(0);
                }}
                className={`font-semibold text-base text-secondary ${
                  activeTab === index ? "" : "opacity-60"
                }`}
              >
                {tab.name}
              </button>
            </div>
            <div className={`collapse-content`}>
              <ul className="">
                {tab.content.map((step, index) => (
                  <li
                    className={`flex gap-6 items-center mb-3`}
                    key={step.name}
                  >
                    <div
                      className={`!after:content-[''] after:w-4 after:bg-primary after:h-px after:inlne-block ${
                        activeStep >= index
                          ? "bg-primary border-primary"
                          : "bg-black bg-opacity-10 border-gray-400 border"
                      } after:absolute after:top-[19px] after:right-[-16px] after:z-[-1]  p-2 rounded-full relative`}
                    >
                      <span
                        className={`icon  ${
                          activeStep >= index ? step.activeIcon : step.icon
                        }`}
                      ></span>
                    </div>
                    <span
                      className={`whitespace-nowrap ${
                        activeStep >= index
                          ? "font-semibold text-base text-primary"
                          : "text-secondary font-medium opacity-60"
                      }`}
                    >
                      {step.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Collapse;
