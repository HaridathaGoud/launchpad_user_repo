import React, { useMemo, useState } from 'react'
import Tabs from '../../../ui/Tabs';
import Activity from '../topsellerdetailview/activity';
import CollectionItems from './CollectionItems';

const CollectionTabs = ({
  handleTabChange }) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = useMemo(() => {
    return [
      {
        label: "Items", content: <CollectionItems activeTab={activeTab}  />
      },
      { label: "Activity", content: <Activity /> },
    ];
  }, [activeTab, CollectionItems])
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