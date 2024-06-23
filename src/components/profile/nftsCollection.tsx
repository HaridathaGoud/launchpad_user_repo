import React, { useMemo, useReducer, useRef, useEffect } from 'react';
import 'react-multi-carousel/lib/styles.css';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Tabs from '../../ui/Tabs';
import { getFavoritedCount, getCreatedCount, getOwnedCountData } from '../../reducers/marketplaceProfileReducer';
import { store } from '../../store';
import { useAccount } from "wagmi";
import Nfts from '../nfts.component';

const reducers = (state, action) => {
  switch (action.type) {
    case 'setActiveTab':
      return { ...state, activeTab: action.payload };
    case "setSelectedTab":
      return { ...state, tabName: action.payload };
    default:
      return state;
  }
};

const initialState = {
  type: null,
  activeTab: 0,
  tabName: 'GetNfts'
};

const NFTCollection = (props) => {
  const nftRef = useRef(null);
  const [state, dispatch] = useReducer(reducers, initialState);
  const { walletAddress } = useParams();
  const { address } = useAccount();

  useEffect(() => {
    store.dispatch(getCreatedCount(address || walletAddress, props.auth.user?.id));
    store.dispatch(getFavoritedCount(address || walletAddress));
    store.dispatch(getOwnedCountData(address || walletAddress));
  }, [address, walletAddress, props.auth.user?.id]);

  useEffect(() => {
    dispatch({ type: 'setActiveTab', payload: 0 });
    const selectTabs = getSelectTabs(0);
    dispatch({ type: 'setSelectedTab', payload: selectTabs });
  }, [address]);

  const getNFTImageUrl = (file) => {
    const filePath = file?.replace('ipfs://', '');
    return process.env.REACT_APP_IPFS_PREFIX + `${filePath}`;
  };

  const tabs = useMemo(() => {
    return [
      { label: `Created (${props?.featchNFTsCollection?.createdNFTSCount?.data || 0})`, content: '' },
      { label: `Favorited (${props?.featchNFTsCollection?.saveFavaratedCount?.data || 0})`, content: '' },
      { label: `Owned (${props?.featchNFTsCollection?.ownedNFTsCount?.data || 0})`, content: '' },
    ];
  }, [props?.featchNFTsCollection]);

  const getSelectTabs = (activeTab) => {
    switch (activeTab) {
      case 0:
        return "GetNfts";
      case 1:
        return "Favorites";
      case 2:
        return "GetOwnNfts";
      default:
        return "";
    }
  };

  const handleTabChange = (selectedTab) => {
    debugger
    dispatch({ type: 'setActiveTab', payload: selectedTab });
    const selectTabs = getSelectTabs(selectedTab);
    dispatch({ type: 'setSelectedTab', payload: selectTabs });
  };

  return (
    <>
      <Tabs
        tabs={tabs}
        activeTab={state.activeTab}
        tabsClass={"profile-subtabs mt-[26px]"}
        labelClass={""}
        tabContentClass={"hidden"}
        iSTabChange={handleTabChange}
        setActiveTab={(state) => dispatch({ type: 'setActiveTab', payload: state })}
      />
      <Nfts type="profile" ref={nftRef} selectedTab={state.tabName} />
    </>
  );
};

const connectStateToProps = ({ auth, marketPlaceProfileReducer }) => {
  return { auth: auth, featchNFTsCollection: marketPlaceProfileReducer };
};

export default connect(connectStateToProps)(NFTCollection);
