import React from "react";
import Button from "../../ui/Button";
import StakingShimmer from "../loaders/stakingShimmer";
import { useNavigate } from "react-router-dom";
const KycStatus = (props: any) => {
  const navigate = useNavigate();
  const handleKyc = () => {
    navigate("/completeKyc");
  };
  return (
  
      <div className="container">
        {props?.loader && (
          <>
            <StakingShimmer />
          </>
        )}
        {!props?.loader && (
          <div className="proceedKyc card-mt-pt mt-5">
            {!props?.isConnected ? (
              <>
                <h1 className="mt-8 font-semibold text-2xl text-secondary text-center">
                  Please Click{" "}
                  <span className="text-primary">Connect Wallet</span> Button
                  <br /> For Connect Your Wallet
                </h1>
              </>
            ) : (
              <div className="text-center">
                <h1 className="mt-8 font-semibold text-2xl text-secondary text-center">
                  To proceed with Launchpad
                  <br /> please{" "}
                  <span className="text-primary">complete your KYC</span>
                </h1>
                <Button type="applynow" handleClick={handleKyc}>
                  Complete KYC
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    
  );
};

export default KycStatus;
