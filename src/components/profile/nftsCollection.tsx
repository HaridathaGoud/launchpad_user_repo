import React,{useMemo,useReducer,useRef } from 'react';
import 'react-multi-carousel/lib/styles.css';
import { useEffect } from 'react';
import { useParams,useNavigate} from 'react-router-dom';
import { connect,useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import defaultlogo from '../../assets/images/default-logo.png';
import Tabs from '../../ui/Tabs';
import { fetchNftsCollection,saveFavoriteNFT,getFavoritedCount ,getCreatedCount,getOwnedCountData} from '../../reducers/marketplaceProfileReducer';
import { store } from '../../store';
import NftCardsShimmer from '../loaders/NftCardShimmer';
import NoData from '../../ui/noData';
import Spinner from '../loaders/spinner';
import { setError, setToaster } from '../../reducers/layoutReducer';
import SearchBar from '../../ui/searchBar';
import { useAccount } from "wagmi";
import Nfts from '../nfts.component'

const reducers = (state, action) => {
	switch (action.type) {
		case 'setActiveTab':
			return { ...state, activeTab: action.payload};
      case "setSelectedTab":
        state = { ...state, tabName: action.payload };
        break;
		default:
			return state;
	}
}
const initialState = {
	nftsCollections: [],
  pageNo:1,
  type:null,
  activeTab:0,
  isLastIndex:false,
  showSeeMore:true,
  pageSize:8,
  seeMoreLoader:false,
  favoriteLoader:false,
  selectedFavaratedID:null,
  searchInput:null,
  tabName:'GetNfts'
}
const NFTCollection = (props: any) => {
  const nftRef = useRef<any>();
const [state, dispatch] = useReducer(reducers, initialState);
const previousData = props?.featchNFTsCollection?.collectionData?.data || [];
const { walletAddress } = useParams();
const rootDispatch = useDispatch()
const searchInputRef=useRef<any>(null)
const { address } = useAccount();
const navigate = useNavigate();

useEffect(()=>{
  store.dispatch(getCreatedCount(address || walletAddress,props.auth.user?.id))
  store.dispatch(getFavoritedCount(address || walletAddress))
  store.dispatch(getOwnedCountData(address || walletAddress))
},[]);

useEffect(()=>{
  dispatch({type:'setActiveTab',payload:state.activeTab});
  const selectTabs = getSelectTabs(state.activeTab);
  dispatch({type:'setSelectedTab',payload:selectTabs})
  // store.dispatch(fetchNftsCollection(selectTabs,address,!state.searchInput ? 1 : state.pageNo, state.pageSize, state.type, state.searchInput =='' ? null : state.searchInput,props.auth.user?.id,!state?.searchInput && previousData,(callback)=>{
  //   if(callback.status == 200){
  //     let _pageNo = state.pageNo + 1;
  //     dispatch({ type: 'update', payload: { pageNo: _pageNo } });
  //   }else{
  //     rootDispatch(setError({ message: callback }));
  //   }
  // }));
},[address])
const getNFTImageUrl = (file: any) => {
  const filePath = file?.replace('ipfs://', '');
  return process.env.REACT_APP_IPFS_PREFIX + `${filePath}`;
};
const tabs = useMemo(() => {
  return [
    { label: `Created (${props?.featchNFTsCollection?.createdNFTSCount?.data || 0})`, content: '' },
    { label: `Favorited (${props?.featchNFTsCollection?.saveFavaratedCount?.data || 0})`, content: '' },
    { label: `Owned (${props?.featchNFTsCollection?.ownedNFTsCount?.data || 0})`, content: '' },
  ];
}, [state?.activeTab,props?.featchNFTsCollection])

const getSelectTabs = (activeTab) => {
  switch(activeTab) {
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


const handleTabChange=(selectedTab : any)=>{
  debugger
  dispatch({type:'setActiveTab',payload:selectedTab});
 const selectTabs = getSelectTabs(selectedTab);
//  nftRef?.current?.selectedTab(selectTabs);
dispatch({type:'setSelectedTab',payload:selectTabs})
//  store.dispatch(fetchNftsCollection(selectTabs,address || walletAddress, 1, state?.pageSize, state.type, null,props.auth.user?.id,previousData,(response)=>{
//   dispatch({ type: 'update', payload: { pageNo:2} });
//  }));
//  dispatch({ type: 'update', payload: { activeTab: selectedTab} });
}
return (
    <>
    <Tabs
      tabs={tabs}
      activeTab={state.activeTab}
      tabsClass={"profile-subtabs mt-[26px]"}
      labelClass={""}
      tabContentClass={"hidden"}
      iSTabChange={(selectedTab)=>handleTabChange(selectedTab)}
      setActiveTab={(state) => {
        dispatch({ type: 'setActiveTab', payload: state})
      }}
    />
  <Nfts type="profile" ref={nftRef} selectedTab={state.tabName}/>
    </>
  );
};
const connectStateToProps = ({ auth ,marketPlaceProfileReducer}: any) => {
  return { auth: auth,featchNFTsCollection:marketPlaceProfileReducer };
};
export default connect(connectStateToProps, (dispatch) => {
  return { dispatch };
})(NFTCollection);
