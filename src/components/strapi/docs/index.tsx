import React, { useEffect, useMemo, useState } from "react";
import Docstabs from "../../../ui/docstabs";
import VisitUs from "../../visitus";
import Spinner from "../../loaders/spinner";
import { useDispatch ,connect, useSelector} from "react-redux";
import { setError } from "../../../reducers/layoutReducer";
import Markdown from 'react-markdown';
import { clearDocsData, getDocsDeatils } from "./strapiReducer";

const Docs = (props:any) => {
  const [activeTab, setActiveTab] = useState(-1);
  const [activeStep, setActiveStep] = useState(0);
  const docsData = useSelector((store: any) => store.strapiData.docsData);
  const rootDispatch = useDispatch();
  const getDocsData = async () => {
    await props.getDocsData();
  };

  useEffect(() => {
    getDocsData();
    return () => {
      props.clearDocs();
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
            content: <Markdown>{docsData?.data?.[0]?.attributes?.IntroductiontoLaunchpad}</Markdown>,
          },
          {
            name: "Types of Launchpads",
            icon: "amount",
            activeIcon: "amountActive",
            content: <Markdown>{docsData?.data?.[0]?.attributes?.TypesofLaunchpad}</Markdown>,
          },
          {
            name: "Benefits of Launchpads",
            icon: "confirmation",
            activeIcon: "confirmationActive",
            content: <Markdown>{docsData?.data?.[0]?.attributes?.BenefitsofLaunchpads}</Markdown>,
          },
          {
            name: "Successful Stories",
            icon: "confirmation",
            activeIcon: "confirmationActive",
            content: <div>
              <Markdown>{docsData?.data?.[0]?.attributes?.SuccessfulStories}</Markdown>
              <Markdown>{docsData?.data?.[0]?.attributes?.SuccessfulStoriesfirstblock}</Markdown>
              <Markdown>{docsData?.data?.[0]?.attributes?.SuccessfulStoriessecondblock}</Markdown>
            </div>,
          },
          {
            name: "Key Components",
            icon: "confirmation",
            activeIcon: "confirmationActive",
            content: <Markdown>{docsData?.data?.[0]?.attributes?.KeyComponents}</Markdown>,
          },
          {
            name: "Tips for Participants",
            icon: "confirmation",
            activeIcon: "confirmationActive",
            content: <Markdown>{docsData?.data?.[0]?.attributes?.TipsforParticipants}</Markdown>,
          },
          {
            name: "Conclusion",
            icon: "confirmation",
            activeIcon: "confirmationActive",
            content: <Markdown>{docsData?.data?.[0]?.attributes?.Conclusion}</Markdown>,
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
            content: <Markdown>{docsData?.data?.[0]?.attributes?.StakingPlatformTokens}</Markdown>,
          },
          {
            name: "Unstaking Platform Tokens",
            icon: "amount",
            activeIcon: "amountActive",
            content: <Markdown>{docsData?.data?.[0]?.attributes?.UnstakingPlatformTokens}</Markdown>,
          },
          {
            name: "Withdraw Platform Tokens",
            icon: "confirm",
            activeIcon: "confirmActive",
            content: <Markdown>{docsData?.data?.[0]?.attributes?.WithdrawPlatformTokens}</Markdown>,
          },
          {
            name: "Rewards Platform Tokens",
            icon: "confirmation",
            activeIcon: "confirmationActive",
            content: <Markdown>{docsData?.data?.[0]?.attributes?.RewardsPlatformTokens}</Markdown>,
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
            content: <Markdown>{docsData?.data?.[0]?.attributes?.BronzeTier}</Markdown>,
          },
          {
            name: "Silver Tier",
            icon: "confirmation",
            activeIcon: "confirmationActive",
            content: <Markdown>{docsData?.data?.[0]?.attributes?.SilverTier}</Markdown>,
          },
          {
            name: "Gold Tier",
            icon: "confirmation",
            activeIcon: "confirmationActive",
            content: <Markdown>{docsData?.data?.[0]?.attributes?.GoldTier}</Markdown>,
          },
          {
            name: "Platinum Tier",
            icon: "confirmation",
            activeIcon: "confirmationActive",
            content: <Markdown>{docsData?.data?.[0]?.attributes?.PlatinumTier}</Markdown>,
          },
          {
            name: "Diamond Tier",
            icon: "confirmation",
            activeIcon: "confirmationActive",
            content: <Markdown>{docsData?.data?.[0]?.attributes?.DiamondTier}</Markdown>,
          },
          {
            name: "Blue Diamond Tier",
            icon: "confirmation",
            activeIcon: "confirmationActive",
            content: <Markdown>{docsData?.data?.[0]?.attributes?.BlueDiamond}</Markdown>,
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
            content: <Markdown>{docsData?.data?.[0]?.attributes?.Tokenization}</Markdown>,
          },
          {
            name: "Membership",
            icon: "confirmation",
            activeIcon: "confirmationActive",
            content: <Markdown>{docsData?.data?.[0]?.attributes?.Membership}</Markdown>,
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
            content: <Markdown>{docsData?.data?.[0]?.attributes?.DAOs}</Markdown>,
          },
          {
            name: "Proposals",
            icon: "confirmation",
            activeIcon: "confirmationActive",
            content: <Markdown>{docsData?.data?.[0]?.attributes?.Proposals}</Markdown>,
          },
        ],
      },
      {
        name: "Apply IVO’s",
        content: [
          {
            name: "Steps To Apply IVO’s",
            content: <Markdown>{docsData?.data?.[0]?.attributes?.StepsToApplyIVOs}</Markdown>,
          },
          {
            name: "Why I select ERC 20 token",
            content: <Markdown>{docsData?.data?.[0]?.attributes?.WhyIselectERCtoken}</Markdown>,
          },
        ],
      },
    ],
    [docsData]
  );
  
  
  return (
    <>
      <div className="grid lg:grid-cols-4 mt-2 container mx-auto max-sm:gap-8">
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
          {activeTab === -1 && <Markdown>{docsData?.data?.[0]?.attributes?.intro}</Markdown>}
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
    clearDocs: () => {
      dispatch(clearDocsData());
    },
    dispatch,
  };
};
export default connect(connectStateToProps, connectDispatchToProps)(Docs);
