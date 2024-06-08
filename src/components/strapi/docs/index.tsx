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
import AboutTiers from "./aboutTiers";
import AboutDaos from "./aboutDaos";
import Tokenization from "./tokenization";
import Membership from "./membership";
import ProposalCreation from "./proposalCreation";
import ApplyIvos from "./applyIvos";
import Spinner from "../../loaders/spinner";
import { useDispatch } from "react-redux";
import { setError } from "../../../reducers/layoutReducer";

const Docs = () => {
  const [activeTab, setActiveTab] = useState(-1);
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const rootDispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://wonderful-baseball-df5acc8ae6.strapiapp.com/api/docs?populate=*"
        );
        if (response.ok) {
          const data = await response.json();
          setData(data);
        } else {
          setErrorMessage(response);
        }
      } catch (error) {
        setErrorMessage(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const setErrorMessage = (error: any) => {
    rootDispatch(setError({ message: error.message || error }));
  };
  const tabs = useMemo(
    () => [
      {
        name: "Intro",
        content: [
          {
            name: "Introduction to Launchpads",
            icon: "checkpoints",
            activeIcon: "checkpointsActive",
            content: <LaunchpadIntro data={data} />,
          },
          {
            name: "Types of Launchpads",
            icon: "amount",
            activeIcon: "amountActive",
            content: <LaunchpadTypes data={data} />,
          },
          {
            name: "Benefits of Launchpads",
            icon: "confirmation",
            activeIcon: "confirmationActive",
            content: <LaunchpadBenefits data={data} />,
          },
          {
            name: "Successful Stories",
            icon: "confirmation",
            activeIcon: "confirmationActive",
            content: <SuccessfulStories data={data} />,
          },
          {
            name: "Key Components",
            icon: "confirmation",
            activeIcon: "confirmationActive",
            content: <KeyComponents data={data} />,
          },
          {
            name: "Tips for Participants",
            icon: "confirmation",
            activeIcon: "confirmationActive",
            content: <Tips data={data} />,
          },
          {
            name: "Conclusion",
            icon: "confirmation",
            activeIcon: "confirmationActive",
            content: <ConclusionContent data={data} />,
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
            content: <StakingPlatform data={data} />,
          },
          {
            name: "Unstaking Platform Tokens",
            icon: "amount",
            activeIcon: "amountActive",
            content: <UnStakingPlatform data={data} />,
          },
          {
            name: "Withdraw Platform Tokens",
            icon: "confirm",
            activeIcon: "confirmActive",
            content: <WithDrawPlateformTokens data={data} />,
          },
          {
            name: "Rewards Platform Tokens",
            icon: "confirmation",
            activeIcon: "confirmationActive",
            content: <RewardsPlatformTokens data={data} />,
          },
        ],
      },
      {
        name: "Tiers",
        content: [
          {
            name: "About tiers",
            icon: "confirmation",
            activeIcon: "confirmationActive",
            content: <AboutTiers data={data} />,
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
            content: <Tokenization data={data} />,
          },
          {
            name: "Membership",
            icon: "confirmation",
            activeIcon: "confirmationActive",
            content: <Membership data={data} />,
          },
        ],
      },

      {
        name: "DOA'S",
        content: [
          {
            name: "About DOAS",
            icon: "confirmation",
            activeIcon: "confirmationActive",
            content: <AboutDaos data={data} />,
          },
        ],
      },
      {
        name: "Proposals",
        content: [
          {
            name: "Proposals",
            icon: "confirmation",
            activeIcon: "confirmationActive",
            content: <ProposalCreation data={data} />,
          },
        ],
      },
      {
        name: "Apply IVO’s",
        content: [
          {
            name: "Apply IVO’s",
            content: <ApplyIvos data={data} />,
          },
        ],
      },
    ],
    [data]
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
          {loading && (
            <div className="h-full flex justify-center items-center">
              <Spinner size="loading-lg" />
            </div>
          )}
          {activeTab > -1 && tabs[activeTab].content[activeStep].content}
          {activeTab === -1 && <IntroPage data={data} />}
        </div>
      </div>
      <div className="pt-36">
        <VisitUs />
      </div>
    </>
  );
};

export default Docs;
