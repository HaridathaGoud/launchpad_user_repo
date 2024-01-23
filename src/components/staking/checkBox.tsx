import React, { useContext } from "react";
import { StakingTabsContextModel } from "./models";
import { StakingTabsContext } from "./context/stakingTabsContext";

const CheckBox = () => {
  const {
    checkboxValue,
    setCheckboxValue,
    tabError,
    setTabError,
  }: StakingTabsContextModel = useContext(StakingTabsContext);
  const handleIAgree = (event: any) => {
    tabError && setTabError?.("");
    setCheckboxValue?.(event.currentTarget.checked);
  };
  return (
    <div className="flex gap-2 items-center">
      <label className="cursor-pointer relative inline-block mt-2">
        <span>
          <input
            type="checkbox"
            checked={checkboxValue}
            onChange={handleIAgree}
            className="checkbox checkbox-error opacity-0"
          />

          <span></span>
        </span>
      </label>
      <span className="text-info text-sm font-normal">
        I have read the{" "}
        <span className="">
          {/* <a className="text-secondary" href="#" target="_blank"> */}
          Terms and Conditions
          {/* </a> */}
        </span>
      </span>
    </div>
  );
};

export default CheckBox;
