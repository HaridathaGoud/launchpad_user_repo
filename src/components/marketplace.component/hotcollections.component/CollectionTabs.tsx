import React, { useMemo, useState } from 'react'
import { CollectionItems } from './CollectionItems';
import Tabs from '../../../ui/Tabs';
import Activity from '../topsellerdetailview/activity';

const CollectionTabs = ({ handleSearch, handleChange, handleSearchIcon,
  searchValue, minMaxCategory, handlePriceRangeSelection, getNftsDetails,
  activityData, handleTabChange, NftDetails }) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = useMemo(() => {
    return [
      {
        label: "Items", content: <CollectionItems
          handleSearch={handleSearch}
          handleChange={handleChange}
          handleSearchIcon={handleSearchIcon}
          searchValue={searchValue}
          minMaxCategory={minMaxCategory}
          handlePriceRangeSelection={handlePriceRangeSelection}
          activeTab={activeTab} NftDetails={NftDetails}
          getNftsDetails={getNftsDetails} />
      },
      { label: "Activity", content: <Activity activityData={activityData} /> },
    ];
  }, [activeTab, handleSearch, handleChange, handleSearchIcon, minMaxCategory, handlePriceRangeSelection, getNftsDetails, activityData, CollectionItems])
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