import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount, useBalance } from "wagmi";
import { get } from "../../utils/api";
import Button from "../../ui/Button";
import TiresShimmer from "../loaders/TiresShimmers";
import OutletContextModel from "../../layout/context/model";
import outletContext from "../../layout/context/outletContext";

export default function Tiers() {
  const {errorMessage,setErrorMessage}:OutletContextModel=useContext(outletContext)
  const [loader, setLoader] = useState(false);
  const [tiersDetails, setTiersDetails] = useState<any>([]);
  const { isConnected, address } = useAccount();
  const navigate = useNavigate();
  const { data: maticData } = useBalance({ address }) || {};
  const { data: ybtData } =
    useBalance({
      address,
      token: process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS as `0x${string}` | undefined,
    }) || {};

  const maticBalance = maticData?.formatted ? Number(maticData.formatted) : 0;
  const ybtBalance = ybtData?.formatted ? Number(ybtData.formatted) : 0;
  const shouldLog=useRef(true);
  useEffect(() => {
    if(shouldLog.current){
      shouldLog.current=false;
      GetTiersDetails();
    }
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const GetTiersDetails = async () => {
    setLoader(true);
    try {
      const response = await get(`User/Tiers`);
      if (response.statusText.toLowerCase() === "ok") {
        setTiersDetails(response.data);
        errorMessage && setErrorMessage?.("");
      } else {
        setErrorMessage?.(response);
      }
    } catch (error: any) {
      setErrorMessage?.(error?.reason || error);
    } finally {
      setLoader(false);
    }
  };

  const handleStakeAmount = (items: any) => {
    if (isConnected && maticBalance && ybtBalance) {
      navigate(`/staking/${items.volume}`);
    } else {
      navigate(`/staking`);
    }
  };

  return (
    <div className="container mx-auto max-sm:px-3">
      {loader && <TiresShimmer />}
      {!loader && (
        <div className="">
          <div className="my-5 text-center">
            <h1 className="font-semibold text-secondary text-[32px]">
              Pick The <span className="text-primary">TIERS</span> That's Right
              For You
            </h1>
            <p className="text-[18px] mt-1 font-semibold text-secondary">
              Join millions of other customers on this platform
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4 lg:w-[850px] md:mx-auto">
            {tiersDetails.map((tier: any) => (
              <div
                className={`mb-lg-4 mb-2 tier-card rounded-[16px] text-base-100 bg-primary-content`}
                key={tier.name + tier.volume}
              >
                <div className="p-6">
                  <span className="bg-[#FBF1E9] text-[#DA7821] font-semibold text-sm px-2.5 py-1 rounded-[24px]">
                    {tier.name}
                  </span>
                  <div className="">
                    <div className="text-[30px] font-semibold mt-3 text-secondary ">
                      {tier.volume}
                    </div>
                    <p className="text-secondary ">{tier.desciption}</p>
                    <Button
                      type="applynow"
                      btnClassName={`min-w-[208px] mt-4 stake-btn ${
                        tier.name === "Blue Diamond" ? " !px-2" : ""
                      }`}
                      handleClick={() => handleStakeAmount(tier)}
                    >
                      Stake {tier.name}
                    </Button>
                  </div>
                </div>
                <hr />
                <div className="p-6">
                  <div className="flex gap-2">
                    <span className="icon tiercheck shrink-0"></span>
                    <p className="text-secondary ">Staking Requirement</p>
                  </div>
                  <div className="flex gap-2 my-[18px]">
                    <span className="icon tiercheck shrink-0"></span>
                    <p className="text-secondary ">Staking Length Required</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="icon tiercheck shrink-0"></span>
                    <p className="text-secondary">
                      {tier.desciption}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}