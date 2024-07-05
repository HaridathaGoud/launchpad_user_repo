import React, { useEffect, useState } from "react";
import projects from "../../assets/images/project-participate.svg";
import totalstake from "../../assets/images/total-stake.svg";
import totalinvest from "../../assets/images/total-invest.svg";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import useContractMethods from "../../hooks/useContract";
import { stakeAmountData } from "../staking/utils";
import { clearPortFolio, getPortFolio } from "../../reducers/portfolioReducer";
import PortfolioShimmer from "../loaders/portfolioshimmer";
import { numberWithCommas, shortTheNumber } from "../../ui/formatNumber";
const ParticipationInfo = (props: any) => {
  const [stakedAmount, setStakedAmount] = useState(0);
  const { getStakedAmount } = useContractMethods();
  const { user, participationInfo } = useSelector(
    ({ auth, portfolio }: any) => {
      const user = auth.user;
      const participationInfo = portfolio.portfolio;
      return {
        user,
        participationInfo,
      };
    }
  );
  useEffect(() => {
    if (user?.id) {
      props.getPortFolio({ customerId: user.id, data: null });
    }
    return () => {
      props.clearPortFolioData();
    };
  }, [user?.id]);
  useEffect(() => {
    getAmountDetails();
  }, []);
  const getAmountDetails = async () => {
    let stakedAmount = await stakeAmountData(getStakedAmount);
    setStakedAmount(stakedAmount || 0);
  };
  const navigateTo = useNavigate();
  const navigateToTier = () => {
    navigateTo(`/tiers`);
  };
  return (
    <>
      {participationInfo.loading && <PortfolioShimmer.ParticipationInfo />}
      {!participationInfo.loading && (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="tier-card rounded-[16px] bg-primary-content p-[18px]">
            <div className="flex gap-2">
              <img src={totalstake} alt="" />
              <div>
                <p className="text-secondary text-sm font-normal">
                  Investor Tier
                </p>
                {participationInfo.data?.name ? (
                  <span className="bg-[#E3F8FF] text-[#035388] text-[10px] font-semibold px-3 py-1 rounded-full">
                    {participationInfo.data?.name}
                  </span>
                ) : (
                  <h1 className="font-medium	text-[32px] text-neutral">{ "--"}</h1>
                )}
              </div>
            </div>
            <div className="mt-[26px] mb-6">
              <p className="text-secondary text-sm font-normal">Total Stake</p>
              <h1 className="font-medium	text-[32px] text-neutral">
                {stakedAmount
                  ? numberWithCommas(stakedAmount) + ` ${process.env.REACT_APP_TOKEN_SYMBOL}`
                  : "--"}
              </h1>
            </div>
            <Button
              type="primary"
              btnClassName="w-full"
              handleClick={navigateToTier}
            >
              Upgrade Tier
            </Button>
          </div>
          <div className="tier-card rounded-[16px] bg-primary-content p-[18px] flex justify-center items-center text-center">
            <div>
              <div>
                <img src={totalinvest} alt="" className="mx-auto" />
              </div>
              <div className="mt-[26px]">
                <p className="text-secondary text-sm font-normal">
                  Total Invested
                </p>
                <h1 className="font-medium	text-[32px] text-neutral">
                  {participationInfo.data?.totalInvested
                    ? numberWithCommas(participationInfo.data?.totalInvested) + " $"
                    : "--"}
                </h1>
              </div>
            </div>
          </div>
          <div className="tier-card rounded-[16px] bg-primary-content p-[18px] flex justify-center items-center text-center">
            <div>
              <div>
                <img src={projects} alt="" className="mx-auto" />
              </div>
              <div className="mt-[26px]">
                <p className="text-secondary text-sm font-normal">
                  Projects Participated In
                </p>
                <h1 className="font-medium	text-[32px] text-neutral">
                  {shortTheNumber(participationInfo.data?.projectsParticipatedIn) || "--"}
                </h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
const connectDispatchToProps = (dispatch: any) => {
  return {
    getPortFolio: (callback: any) => {
      dispatch(getPortFolio(callback));
    },
    clearPortFolioData: () => {
      dispatch(clearPortFolio());
    },
  };
};
export default connect(null, connectDispatchToProps)(ParticipationInfo);
