import React, { useEffect, useState } from "react";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
import { useAccount, useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useSelector } from "react-redux";
import { navigateToUniswap } from "../../utils/commonNavigations";
import ConnectWallet from "../../ui/connectButton";
const DashboardSteps = () => {
  const navigate = useNavigate();
  const [isKycComplete, setIsKycComplete] = useState<boolean>(false);
  const { isConnected, address } = useAccount();
  const user = useSelector((state: any) => state?.auth?.user);
  const { connectAsync } = useConnect({ connector: new InjectedConnector() });
  useEffect(() => {
    if (
      user?.kycStatus?.toLowerCase() === "completed" &&
      isConnected &&
      address
    ) {
      setIsKycComplete(true);
    } else {
      setIsKycComplete(false);
    }
  }, [user, address, isConnected]);
  const navigateToStake = () => {
    navigate("/staking");
  };
  const navigateToCompleteKyc = async () => {
    if (isConnected) {
      navigate('/completeKyc')
    } else {
      await connectAsync();
      navigate('/completeKyc');
    }
  };
  return (
    <div className="lg:px-0 max-sm:mt-[30px] lg:mt-[90px]">
      <div className="grid lg:grid-cols-2 items-center gap-4 md:mb-24">
        <div className="flex-1 flex items-center">
          <div>
            <h1 className="max-sm:text-[36px] md:text-[48px] font-semibold leading-tight text-secondary	">
              How To Join The <br className="hidden lg:block" />{" "}
              <span className="text-primary">Blockchain</span> Movie{" "}
              <br className="hidden lg:block" /> Revolution With Us
            </h1>
            <p className="text-secondary mt-3">
              Only 3 little steps are needed for you to start enjoying all
              <br className="hidden lg:block" /> the advantages of{" "}
              {process.env.REACT_APP_TOKEN_SYMBOL}
            </p>
          </div>
        </div>
        <div className="flex-1">
          <div className="">
            <div className="">
              <section className="">
                <ul className="grid md:grid-cols-2 gap-4">
                  <li className="md:mb-5">
                    <span className={`icon walletPuchase mb-3`}></span>
                    <h5 className="font-semibold text-base uppercase mb-2.5 text-secondary">
                      Purchase {process.env.REACT_APP_TOKEN_SYMBOL} Token
                    </h5>

                    <p className="text-neutral-content text-sm font-normal mb-2 md:min-h-[80px]">
                      {" "}
                      {process.env.REACT_APP_TOKEN_SYMBOL} is YellowBlock’s
                      token that <br className="max-sm:hidden" /> enables its
                      holders to participate
                      <br className="max-sm:hidden" /> in the{" "}
                      {process.env.REACT_APP_OFFERING_TITLE}s, stake and farm
                      for
                      <br className="max-sm:hidden" /> passive income
                    </p>
                    <div className="max-sm:flex max-sm:justify-end">                      
                    {isConnected && <Button
                        type="secondary"
                        handleClick={() => navigateToUniswap()}
                      >
                        Buy {process.env.REACT_APP_TOKEN_SYMBOL}
                      </Button>}
                      {!isConnected && <ConnectWallet type="secondary"/>}
                    </div>
                  </li>
                  <li className="timeline-item md:mb-5">
                    <span className={`icon stake mb-3`}></span>
                    <h5 className="font-semibold text-base uppercase mb-2.5 text-secondary">
                      Stake Or Farm Your {process.env.REACT_APP_TOKEN_SYMBOL}{" "}
                    </h5>
                    <p className="text-neutral-content text-sm font-normal mb-2 md:min-h-[80px]">
                      {" "}
                      Add your {process.env.REACT_APP_TOKEN_SYMBOL} to one of
                      our staking or <br className="max-sm:hidden" /> farming
                      pools and earn passive income
                    </p>
                    <div className="max-sm:text-right">                     
                      <Button
                        type="secondary"
                        handleClick={() => navigateToStake()}
                      >
                        Start Now
                      </Button>
                    </div>
                  </li>
                  <li className="timeline-item md:mb-5">
                    <span className={`icon completeKyc mb-3`}></span>
                    <h5 className="font-semibold text-base uppercase mb-2.5 text-secondary">
                      {isKycComplete ? "Kyc Completed" : "Complete Kyc"}
                    </h5>
                    <p className="text-neutral-content text-sm font-normal mb-2">
                      It's a simple step to ensure{" "}
                      <br className="max-sm:hidden" /> your participation in the
                      &nbsp;
                      {process.env.REACT_APP_OFFERING_TITLE}s
                    </p>
                    {isConnected && !isKycComplete && (
                      <div className="max-sm:text-right">                       
                        <Button type="secondary" handleClick={navigateToCompleteKyc}>
                          Complete KYC
                        </Button>
                      </div>
                    )}
                  </li>
                  <li className="timeline-item md:mb-5">
                    <span className={`icon check mb-3`}></span>
                    <h5 className="font-semibold text-base uppercase mb-2.5 text-secondary">
                      You're All Set!
                    </h5>
                    <p className="text-neutral-content text-sm font-normal mb-2">
                      Now you can purchase the tokens{" "}
                      <br className="max-sm:hidden" /> and NFTs os the best
                      blockchain games
                    </p>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSteps;
