import React, { useContext } from "react";

import { StakingContextModal } from "./models";
import { StakingContext } from "./context/stakingContext";

const StakingDetails = () => {
  const { stakedAmount, unstakedAmount, rewardAmount, activeTab }: StakingContextModal =
    useContext(StakingContext);
  let stakedAmt = stakedAmount?.toLocaleString("en-US", {
    maximumFractionDigits: 8,
  });
  let unstakedAmt = unstakedAmount?.toLocaleString("en-US", {
    maximumFractionDigits: 8,
  })
  let rewardAmt = rewardAmount?.toLocaleString("en-US", {
    maximumFractionDigits: 8,
  });
  return (
    <div className="sm:col md:flex justify-between items-center">
      <div className="lg:col-span-2">
        {activeTab === 0 && <p className="text-xl font-semibold text-secondary">Staking</p>}
        {activeTab === 1 && <p className="text-xl font-semibold text-secondary">Unstaking</p>}
        {activeTab === 2 && <p className="text-xl font-semibold text-secondary">Withdraw</p>}
        {activeTab === 3 && <p className="text-xl font-semibold text-secondary">Rewards</p>}
      </div>
      <div className="md:flex lg:ml-auto mt-4 lg-mt-0">
        <div className="flex gap-4 pe-5 ps-5 max-sm:mb-3">
          <div>
            <span className="icon md stake-user"></span>
          </div>
          <div>
            <h2 className="text-base text-secondary font-medium">
              {stakedAmt || 0}
            </h2>
            <p className="text-sm font-normal text-primary">Staked</p>
          </div>
        </div>
        <div className="flex gap-4 md:border-x px-5">
          <div>
            <span className="icon md ybc"></span>
          </div>
          <div>
            <h2 className="text-base text-secondary font-medium">
              {unstakedAmt || 0}
            </h2>
            <p className="text-sm font-normal text-primary">Unstaked</p>
          </div>
        </div>
        <div className="flex gap-4 ps-5">
          <div>
            <span className="icon md apy"></span>
          </div>
          <div>
            <h2 className="text-base text-secondary font-medium">
              {rewardAmt || 0}
            </h2>
            <p className="text-sm font-normal text-primary">Rewards</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakingDetails;
