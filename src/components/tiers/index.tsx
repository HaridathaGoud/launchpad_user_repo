import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount, useBalance } from "wagmi";
import { get } from "../../utils/api";
import Button from "../../ui/Button";
import TiresShimmer from "../loaders/TiresShimmers";
import { setError } from "../../reducers/layoutReducer";
import { useDispatch } from "react-redux";

export default function Tiers() {
  const rootDispatch=useDispatch()
  const [loader, setLoader] = useState(false);
  const [tiersDetails, setTiersDetails] = useState<any>([]);
  const { isConnected, address } = useAccount();
  const navigate = useNavigate();
  const { data: currency } = useBalance({ address }) || {};
  const { data: tokenData } =
    useBalance({
      address,
      token: process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS as `0x${string}` | undefined,
    }) || {};

  const currencyBalance = currency?.formatted ? Number(currency.formatted) : 0;
  const tokenBalance = tokenData?.formatted ? Number(tokenData.formatted) : 0;
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
      } else {
        rootDispatch(setError({message:response}))
      }
    } catch (error: any) {
      rootDispatch(setError({message:error}))
    } finally {
      setLoader(false);
    }
  };

  const handleStakeAmount = (items: any) => {
    if (isConnected && currencyBalance && tokenBalance) {
      navigate(`/staking/${items.volume}`);
    } else {
      navigate(`/staking`);
    }
  };
  const renderTierFeatures = (features:any) => {
    if (!features) return null;
    return (
        <div className="flex flex-col gap-2">
            {features.split('<p>').map((point:any, index:any) => {
                if (index !== 0) {
                    const text = point.split('</p>')[0];
                    return (
                        <div key={index} className="flex gap-2">
                            <span className="icon tiercheck shrink-0"></span>
                            <p className="text-secondary">{text}</p>
                        </div>
                    );
                }
                return null;
            })}
        </div>
    );
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
          <div className="grid md:grid-cols-3 gap-4 lg:w-[850px] md:mx-auto px-3 lg:px-0">
            {tiersDetails.map((tier: any) => (
              <div
                className={`mb-lg-4 mb-2 tier-card rounded-[16px] text-base-100 bg-primary-content`}
                key={tier.name + tier.volume}
              >
                <div className="p-6">
                  <span className={` font-semibold text-sm px-2.5 py-1 rounded-[24px]
                  ${tier.name == 'Bronze' ? "bg-[#FBF1E9] text-[#DA7821]":""}
                  ${tier.name == 'Silver' ? "bg-[#FFE3EC] text-[#620042]":""}
                  ${tier.name == 'Gold' ? "bg-[#EDE5D0] text-[#A67D13]":""}
                  ${tier.name == 'Platinum' ? "bg-[#E3F8FF] text-[#035388]":""}
                  ${tier.name == 'Diamond' ? "bg-[#FFE3EC] text-[#620042]":""}
                  ${tier.name == 'Blue Diamond' ? "bg-[#E5F0FF] text-[#0068FF]":""}
                  `}>
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
                    {renderTierFeatures(tier.tierFeatures)}
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
