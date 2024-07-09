import React, { useContext } from "react";

import { StakingContextModal } from "./models";
import { StakingContext } from "./context/stakingContext";
import { numberWithCommas } from "../../ui/formatNumber";

const StakingDetails = () => {
  const {
    stakedAmount,
    unstakedAmount,
    rewardAmount,
    activeTab,
  }: StakingContextModal = useContext(StakingContext);
  let stakedAmt = numberWithCommas(stakedAmount);
  let unstakedAmt = numberWithCommas(unstakedAmount);
  let rewardAmt = numberWithCommas(rewardAmount);
  return (
    <div className="">
      <div className="">
        {activeTab === 0 && (
          <p className="text-xl font-semibold text-secondary">Staking</p>
        )}
        {activeTab === 1 && (
          <p className="text-xl font-semibold text-secondary">Unstaking</p>
        )}
        {activeTab === 2 && (
          <p className="text-xl font-semibold text-secondary">Withdraw</p>
        )}
        {activeTab === 3 && (
          <p className="text-xl font-semibold text-secondary">Rewards</p>
        )}
      </div>
      <div className="grid md:grid-cols-5 lg:grid-cols-5 gap-2 lg:gap-0 lg:ml-auto mt-4 lg-mt-0">
        <div className="flex gap-4 pe-5 ps-5 max-sm:mb-3">
          <div>
            <span className="icon md stake-user"></span>
          </div>
          <div>
            <h2 className="text-base text-secondary font-medium break-all truncate w-[100px] break-all">
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
            <h2 className="text-base text-secondary font-medium break-all truncate w-[100px] break-all">
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
            <h2 className="text-base text-secondary font-medium break-all truncate w-[100px] break-all">
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
