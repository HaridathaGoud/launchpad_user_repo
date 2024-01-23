import React, { useContext, useState } from "react";
import { addCommasToNumber } from "./utils";
import { StakingTabsContextModel } from "./models";
import { StakingTabsContext } from "./context/stakingTabsContext";
const AmountStakeUnstakeHandler = (props) => {
  const {
    setTabAmount,
    amountFieldError,
    setAmountFieldError,
    tabAmount,
  }: StakingTabsContextModel = useContext(StakingTabsContext);
  const [stakeAmount, setStakeAmount] = useState(
    addCommasToNumber(tabAmount) || ""
  );
  const handleAmount = (e: any) => {
    const cleanedValue = e.target.value.replace(/,/g, "");
    const [wholePart, decimalPart] = cleanedValue.split(".");
    const formattedWholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const formattedValue =
      decimalPart !== undefined
        ? `${formattedWholePart}.${decimalPart}`
        : formattedWholePart;
    if (!cleanedValue || cleanedValue.match(/^\d{1,}(\.\d{0,8})?$/)) {
      setTabAmount?.(cleanedValue);
      setStakeAmount(formattedValue);
      setAmountFieldError?.("");
    }
  };
  let ybtBalance = parseFloat(props?.ybtBalance);
  let ybtBalanceFormattedNumber = ybtBalance?.toLocaleString("en-US", {
    maximumFractionDigits: 8,
  });
  return (
    <div className="">
      <h1 className="mt-2 mb-6 text-lg font-bold text-secondary">
        Please enter the amount of {process.env.REACT_APP_TOKEN_SYMBOL} you want
        to {props?.isStaking ? "stake" : "unstake"}
      </h1>
      <div className="">
        <div>
          <span className="text-sm font-normal text-info">Amount</span>
        </div>
        <div className="flex items-center">
          <div className="w-fit relative">
            <input
              type="text"
              placeholder="Enter Amount"
              className="rounded-[28px] border-warning-content border px-4 text-sm py-2 lg:w-[450px]"
              id="amount"
              value={stakeAmount}
              onChange={handleAmount}
              maxLength={20}
              autoComplete="off"
            />
            <button
              onClick={() => {
                setStakeAmount(ybtBalanceFormattedNumber);
                setTabAmount?.(props?.ybtBalance?.toString());
              }}
              className="absolute right-3 top-1.5 text-base text-primary font-bold"
            >
              MAX
            </button>
          </div>
          <div
            className={`${
              props?.isStaking
                ? "hidden lg:block ml-10 "
                : "hidden lg:block ml-10"
            }`}
          ></div>
        </div>
        <div>
          {amountFieldError && (
            <div>
              <span className="text-[red] text-sm font-normal">
                {amountFieldError}
              </span>
            </div>
          )}
          <p className="">
            {" "}
            <span className="text-sm font-normal text-info">
              Balance :
            </span>{" "}
            <span className="text-sm font-semibold text-secondary">
              {props?.ybtBalance > 0 ? ybtBalanceFormattedNumber : "0.0000"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default AmountStakeUnstakeHandler;
