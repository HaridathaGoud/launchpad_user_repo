import React, { useEffect, useMemo, useState } from "react";
import Docstabs from "../../../ui/docstabs";
import IntroPage from "./intro";
import VisitUs from "../../visitus";
import LaunchpadIntro from "./launchpadintro";
import LaunchpadTypes from "./typesofLaunchpad";
import LaunchpadBenefits from "./benefits";
import SuccessfulStories from "./successstories";
import KeyComponents from "./keycomponents";
import Tips from "./tips";
import ConclusionContent from "./conclusioncomponent";
import StakingPlatform from "./stakingplatform";
import UnStakingPlatform from "./unStakingplatform";
import WithDrawPlateformTokens from "./withDrawPlateformTokens";
import RewardsPlatformTokens from "./rewardsPlatformTokens";
import AboutDaos from "./aboutDaos";
import Tokenization from "./tokenization";
import Membership from "./membership";
import ApplyIvos from "./applyIvos";
import Spinner from "../../loaders/spinner";
import { useDispatch ,connect, useSelector} from "react-redux";
import { setError } from "../../../reducers/layoutReducer";
import { BronzeTier } from "./BronzeTier";
import { SilverTier } from "./silverTier";
import { GoldTier } from "./goldTier";
import { PlatinumTier } from "./platinumTier";
import { DiamondTier } from "./diamondTier";
import { BlueTier } from "./blueTier";
import Proposals from "./proposals";
import SelectERC20token from "./selectERC20token";
import { clearDocsData, clearDocsPageRestData, getDocPageRestDeatils, getDocsDeatils } from "./strapiReducer";

const Docs = (props:any) => {
  const [activeTab, setActiveTab] = useState(-1);
  const [activeStep, setActiveStep] = useState(0);
  const docsData = useSelector((store: any) => store.strapiData.docsData);
  const docsPageRestData = useSelector((store: any) => store.strapiData.docsPageRestData);
  const rootDispatch = useDispatch();
  const getDocsData = async () => {
    await props.getDocsData();
  };
  const getDocsRestData=async()=>{
    await props.getDocsRestData();
  }
  useEffect(() => {
    getDocsData();
    getDocsRestData();
    return () => {
      props.clearDocs();
      props.clearDocsRestData();
    };
  }, []);
  if (docsData?.error) rootDispatch(setError(docsData?.error));

  const tabs = useMemo(
    () => [
      {
        name: "Intro",
        content: [
          {
            name: "Introduction to Launchpads",
            icon: "checkpoints",
            activeIcon: "checkpointsActive",
            content: <LaunchpadIntro data={docsData} />,
          },
          {
            name: "Types of Launchpads",
            icon: "amount",
            activeIcon: "amountActive",
            content: <LaunchpadTypes data={docsData} />,
          },
          {
            name: "Benefits of Launchpads",
            icon: "confirmation",
            activeIcon: "confirmationActive",
            content: <LaunchpadBenefits data={docsData} />,
          },
          {
            name: "Successful Stories",
            icon: "confirmation",
            activeIcon: "confirmationActive",
            content: <SuccessfulStories data={docsData} />,
          },
          {
            name: "Key Components",
            icon: "confirmation",
            activeIcon: "confirmationActive",
            content: <KeyComponents data={docsData} />,
          },
          {
            name: "Tips for Participants",
            icon: "confirmation",
            activeIcon: "confirmationActive",
            content: <Tips data={docsData} />,
          },
          {
            name: "Conclusion",
            icon: "confirmation",
            activeIcon: "confirmationActive",
            content: <ConclusionContent data={docsData} />,
          },
        ],
      },
      {
        name: "Staking",
        content: [
          {
            name: "Staking Platform Tokens",
            icon: "warning",
            activeIcon: "warningactive",
            content: <StakingPlatform data={docsData} />,
          },
          {
            name: "Unstaking Platform Tokens",
            icon: "amount",
            activeIcon: "amountActive",
            content: <UnStakingPlatform data={docsData} />,
          },
          {
            name: "Withdraw Platform Tokens",
            icon: "confirm",
            activeIcon: "confirmActive",
            content: <WithDrawPlateformTokens data={docsData} />,
          },
          {
            name: "Rewards Platform Tokens",
            icon: "confirmation",
            activeIcon: "confirmationActive",
            content: <RewardsPlatformTokens data={docsPageRestData} />,
          },
        ],
      },
      {
        name: "Tiers",
        content: [
          {
            name: "Bronze Tier",
            icon: "confirmation",
            activeIcon: "confirmationActive",
            content: <BronzeTier data={docsPageRestData} />,
          },
          {
            name: "Silver Tier",
            icon: "confirmation",
            activeIcon: "confirmationActive",
            content: <SilverTier data={docsPageRestData} />,
          },
          {
            name: "Gold Tier",
            icon: "confirmation",
            activeIcon: "confirmationActive",
            content: <GoldTier data={docsPageRestData} />,
          },
          {
            name: "Platinum Tier",
            icon: "confirmation",
            activeIcon: "confirmationActive",
            content: <PlatinumTier data={docsPageRestData} />,
          },
          {
            name: "Diamond Tier",
            icon: "confirmation",
            activeIcon: "confirmationActive",
            content: <DiamondTier data={docsPageRestData} />,
          },
          {
            name: "Blue Diamond Tier",
            icon: "confirmation",
            activeIcon: "confirmationActive",
            content: <BlueTier data={docsPageRestData} />,
          },
        ],
      },
      {
        name: "Projects",
        content: [
          {
            name: "Tokenization",
            icon: "confirmation",
            activeIcon: "confirmationActive",
            content: <Tokenization data={docsPageRestData} />,
          },
          {
            name: "Membership",
            icon: "confirmation",
            activeIcon: "confirmationActive",
            content: <Membership data={docsPageRestData} />,
          },
        ],
      },

      {
        name: "DOA'S",
        content: [
          {
            name: "DOA’s",
            icon: "confirmation",
            activeIcon: "confirmationActive",
            content: <AboutDaos data={docsPageRestData} />,
          },
          {
            name: "Proposals",
            icon: "confirmation",
            activeIcon: "confirmationActive",
            content: <Proposals data={docsPageRestData} />,
          },
        ],
      },
      {
        name: "Apply IVO’s",
        content: [
          {
            name: "Steps To Apply IVO’s",
            content: <ApplyIvos data={docsPageRestData} />,
          },
          {
            name: "Why I select ERC 20 token",
            content: <SelectERC20token data={docsPageRestData} />,
          },
        ],
      },
    ],
    [docsData,docsPageRestData]
  );
  
  return (
    <>
      <div className="grid lg:grid-cols-4 mt-2 container mx-auto">
        <div className="mt-5 pr-4 border-r">
          <Docstabs
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={(payload: number) => setActiveTab?.(payload)}
            activeStep={activeStep}
            setActiveStep={(payload: number) => setActiveStep?.(payload)}
          />
        </div>
        <div className="lg:col-span-3 pl-6">
          {docsData.loading && (
            <div className="h-full flex justify-center items-center">
              <Spinner size="loading-lg" />
            </div>
          )}
          {activeTab > -1 && tabs[activeTab].content[activeStep].content}
          {activeTab === -1 && <IntroPage data={docsData} />}
        </div>
      </div>
      <div className="pt-36">
        <VisitUs />
      </div>
    </>
  );
};

const connectStateToProps = ({ oidc,strapiData }: any) => {
  return { oidc: oidc, strapiData:strapiData };
};
const connectDispatchToProps = (dispatch: any) => {
  return {
    getDocsData: () => {
      dispatch(getDocsDeatils());
    },
    getDocsRestData:()=>{
      dispatch(getDocPageRestDeatils());
    },
    clearDocs: () => {
      dispatch(clearDocsData());
    },
    clearDocsRestData: () => {
      dispatch(clearDocsPageRestData());
    },
    dispatch,
  };
};
export default connect(connectStateToProps, connectDispatchToProps)(Docs);
