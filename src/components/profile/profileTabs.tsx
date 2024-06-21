import React, { useMemo, useState } from "react";
// import Referrals from "./referral";
import Tabs from "../../ui/Tabs";
import KycDetails from "./kycDetails";
import NFTSCollection from "./nftsCollection";
const ProfileTabs = ({ kycStatus, id }) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = useMemo(() => {
    return [
      { label: "KYC Details", content: <KycDetails kycStatus={kycStatus} id={id} /> },
      // { label: "referals", content: <Referrals /> },
      { label: "NTF's", content: <NFTSCollection /> },
    ];
  }, [activeTab,kycStatus,id,KycDetails,NFTSCollection]) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Tabs
      tabs={tabs}
      activeTab={activeTab}
      setActiveTab={(state) => {
        setActiveTab(state);
      }}
    />
  );
};

export default ProfileTabs;
