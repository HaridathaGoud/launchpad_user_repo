import React, { useMemo, useState } from 'react'
import Tabs from '../../../ui/Tabs';
import Activity from '../topsellerdetailview/activity';
import Nfts from '../../nfts.component'
const CollectionTabs = ({
  handleTabChange }) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = useMemo(() => {
    return [
      {
        label: "Items", content: <Nfts type="hot collections"/>
      },
      { label: "Activity", content: <Activity /> },
    ];
  }, [activeTab])
  return (
    <Tabs
      tabs={tabs}
      activeTab={activeTab}
      setActiveTab={(state) => {
        setActiveTab(state);
        handleTabChange(state);
      }} />
  );
}
export default CollectionTabs