import React, { useMemo, useState } from "react";
import Tabs from "../../ui/Tabs";
import KycDetails from "./kycDetails";
const ProfileTabs = ({ kycStatus,id }) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = useMemo(()=>{
    return [
      { label: "KYC Details", content: <KycDetails kycStatus={kycStatus} id={id} /> },
    ];
  },[]) // eslint-disable-line react-hooks/exhaustive-deps
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
