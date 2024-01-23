import React from "react";
import { Link } from "react-router-dom";
const WarningUnstake = () => {
  return (
    <div className="flex-1 flex items-center">
      <div className="flex items-center gap-6">
        <div className="">
          <span className="icon xxl exclamation"></span>
        </div>
        <div className="">
          <p className="text-sm font-normal text-info mb-2">
            After Unstaking, you must wait 7 days before you can withdraw your{" "}
            {process.env.REACT_APP_TOKEN_SYMBOL} and rewards.
          </p>
          <p className="text-sm font-normal text-info">
            The amount of tokens you Unstake will not count towards your tier
            level for upcoming{" "}
            <Link to="/projects">
              <span className="">Projects.</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default WarningUnstake;
