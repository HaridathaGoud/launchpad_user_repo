import React, { useMemo, useState } from 'react'
import { CollectionItems } from './CollectionItems';
import Tabs from '../../../ui/Tabs';
import Activity from '../topsellerdetailview/activity';

const CollectionTabs = ({ minMaxCategory,
  handlePriceRangeSelection,
  getNftsDetails,
  activityData,
  handleTabChange,
  NftDetails,
  setSearchInput,
  searchInputRef }) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = useMemo(() => {
    return [
      {
        label: "Items", content: <CollectionItems
           searchInputRef={searchInputRef}
           setSearchInput={setSearchInput}
          minMaxCategory={minMaxCategory}
          handlePriceRangeSelection={handlePriceRangeSelection}
          activeTab={activeTab} NftDetails={NftDetails}
          getNftsDetails={getNftsDetails} />
      },
      { label: "Activity", content: <Activity activityData={activityData} /> },
    ];
  }, [activeTab, minMaxCategory, handlePriceRangeSelection, getNftsDetails, activityData, CollectionItems])
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