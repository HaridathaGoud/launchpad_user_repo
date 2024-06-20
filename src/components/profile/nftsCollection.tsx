import React,{useMemo,useReducer } from 'react';
import Image from 'react-bootstrap/Image';
import 'react-multi-carousel/lib/styles.css';
import { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import { connect,useDispatch,useSelector } from 'react-redux';
import Button from '../../ui/Button';
import defaultlogo from '../../assets/images/default-logo.png';
import Tabs from '../../ui/Tabs';
import SearchInputComponent from '../marketplace.component/hotcollections.component/SearchComponent';
import { fetchNftsCollection,saveFavoriteNFT,getFavoritedCount ,getCreatedCount,getOwnedCountData} from '../../reducers/marketplaceProfileReducer';
import { store } from '../../store';
import NftCardsShimmer from '../loaders/NftCardShimmer';
import NoData from '../../ui/noData';
import Spinner from '../loaders/spinner';
import { setError, setToaster } from '../../reducers/layoutReducer';
const reducers = (state, action) => {
	switch (action.type) {
		case 'update':
			return { ...state, ...action.payload };
		default:
			return state;
	}
}
const initialState = {
	nftsCollections: [],
  pageNo:1,
  type:null,
  searchValue:null,
  activeTab:0,
  isLastIndex:false,
  showSeeMore:true,
  pageSize:8,
  seeMoreLoader:false,
  favoriteLoader:false,
  selectedFavaratedID:null
}
const NFTCollection = (props: any) => {
const [state, dispatch] = useReducer(reducers, initialState);
const [activeTab, setActiveTab] = useState(0);
const { walletAddress } = useParams();
const previousData = props?.featchNFTsCollection?.collectionData?.data || [];
const rootDispatch = useDispatch()
useEffect(()=>{
  store.dispatch(getCreatedCount(walletAddress,props.auth.user?.id))
  store.dispatch(getFavoritedCount(walletAddress))
  store.dispatch(getOwnedCountData(walletAddress))
  const selectTabs = getSelectTabs(activeTab);
  store.dispatch(fetchNftsCollection(selectTabs,walletAddress,state.pageNo, state.pageSize, state.type, state.searchValue,props.auth.user?.id,previousData,(callback)=>{
    let _pageNo = state.pageNo + 1;
    dispatch({ type: 'update', payload: { pageNo: _pageNo } });
  }));
},[]);

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
}, [activeTab,props?.featchNFTsCollection])

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
const handleSearch=(e:any)=>{
  const selectTabs = getSelectTabs(activeTab);
  let data=e.target.value.trim()
  dispatch({ type: 'update', payload: { searchValue: data } });
   if (e.key==='Enter') {
    if(data == ""||data.includes(".")){	
      e.preventDefault();
    }
    else{
      store.dispatch(fetchNftsCollection(selectTabs,walletAddress, state.pageNo, 8, state.type, state.searchValue,props.auth.user?.id,));//previousData
      e.preventDefault();
     }	
  }
}

const handleChange=(e:any)=>{
  let data=e.target.value.trim()
  dispatch({ type: 'update', payload: { searchValue: data } });
  if(!data){
    const selectTabs = getSelectTabs(activeTab);
    store.dispatch(fetchNftsCollection(selectTabs,walletAddress, state.pageNo, 8, state.type, state.searchValue,props.auth.user?.id));//previousData
     e.preventDefault();
   }
}
const handleSearchIcon = () => {
  let data=state.searchValue;
  if(data == ""||data == null || data.includes(".")){	
  }
  else{
    const selectTabs = getSelectTabs(activeTab);
    store.dispatch(fetchNftsCollection(selectTabs,walletAddress, state.pageNo, 8, state.type, data || null,props.auth.user?.id));//previousData
 }
};

const handlePriceRangeSelection = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, type: string) => {
  event.preventDefault();
  const selectTabs = getSelectTabs(activeTab);
  if (type === 'high2low') {
    dispatch({ type: 'update', payload: { type: 'high to low' } });
    store.dispatch(fetchNftsCollection(selectTabs,walletAddress,  1, 8, 'high to low', state.searchValue, props.auth.user?.id));//previousData
  } else if (type === 'low2high') {
    dispatch({ type: 'update', payload: { type: 'low to high' } });
    store.dispatch(fetchNftsCollection(selectTabs,walletAddress, 1, 8, 'low to high', state.searchValue, props.auth.user?.id));//previousData
  }
};

const saveFavorite=(item:any)=>{
  dispatch({ type: 'update', payload: { selectedFavaratedID: item?.id } });
  let obj = {
    nftId: item?.id,
    customerId: props.auth.user?.id,
    isFavourite: !item?.isFavourite,
  };
  store.dispatch(saveFavoriteNFT(obj, (response:any) => {
    if(response.status == 200){
      const selectTabs = getSelectTabs(activeTab);
      store.dispatch(getFavoritedCount(walletAddress))
      store.dispatch(fetchNftsCollection(selectTabs,walletAddress, 1, 8, state.type, state.searchValue,props.auth.user?.id,previousData))
    }else{
      rootDispatch(setError({ message: response }));
    }
  }));
}
const handleTabChange=(selectedTab : any)=>{
 let selectTabs=selectedTab == 0 ? "GetNfts" : selectedTab==1 ? "Favorites" : "GetOwnNfts";
 dispatch({ type: 'update', payload: { activeTab: selectedTab,showSeeMore:true,searchValue:null } });
 store.dispatch(fetchNftsCollection(selectTabs,walletAddress, 1, 8, state.type, null,props.auth.user?.id,previousData));
}
const loadMoreNFTS=()=>{
  const selectTabs = getSelectTabs(activeTab);
  store.dispatch(fetchNftsCollection(selectTabs,walletAddress, state.pageNo, state.pageSize, state.type, state.searchValue,props.auth.user?.id,previousData,(response)=>{
    if(response){
      let _pageNo = state.pageNo + 1;
      dispatch({ type: 'update', payload: { pageNo: _pageNo, showSeeMore: response.data.length == 0 && false ,seeMoreLoader:false} });
    }
  }));
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
        setActiveTab(state);
      }}
    />
     <div className='flex justify-between items-center gap-4 mt-6'>
     <SearchInputComponent handleSearch={handleSearch} handleChange={handleChange} handleSearchIcon={handleSearchIcon} search={state.searchValue}/>
        <div className="dropdown mr-2.5">
          <div tabIndex={0} role="button" className=" m-1 bg-accent px-4 py-2.5 rounded-[28px] text-sm font-medium border-0 hover:bg-accent">Price: {state.type} <span className="icon drop-arrow"></span></div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li onClick={(event) => handlePriceRangeSelection(event, 'low2high')} ><a>Low</a></li>
            <li onClick={(event) => handlePriceRangeSelection(event, 'high2low')} ><a>High</a></li>
          </ul>
        </div>
     </div>
    
     
    <div className="relative mt-6 ">
    {props?.featchNFTsCollection?.collectionData?.loading && <NftCardsShimmer/>}
    <div className='grid gap-4 lg:grid-cols-4 md:grid-cols-3'>
   
  {props?.featchNFTsCollection?.collectionData?.data?.map((item:any,index:any)=>{
   return (
    <>
    
     <div
   className="mt-3 shadow-md cursor-pointer bg-primary-content rounded-lg relative min-h-[420px] transform transition-transform duration-500 hover:scale-[1.03]"
   >
   <div className="cursor-pointer">
     <Button
       type="plain"
       btnClassName='w-full'
     >
       <div className="">
         {" "}
           <img
             src={item?.image && !item?.image?.includes('null')
             ? `${getNFTImageUrl(item?.image)}`
             : defaultlogo}
             alt=""
             className={`h-[255px] w-full object-cover rounded-tl-lg rounded-tr-lg`}
           />
       </div>
     </Button>
     <div className="bg-black top-3 absolute cursor-pointer right-3 rounded-full">
       <Button
         type="plain"
         btnClassName=""
         handleClick={()=>saveFavorite(item)}
       >
         <span
           className={`icon like-white ${item.isFavourite && "active"}`}
         ></span>
         {props?.featchNFTsCollection?.saveFavaratedCount?.loading && (<span>
         {state.selectedFavaratedID === item.id && <Spinner />}</span>)}
       </Button>
     </div>
     <Button
       type="plain"
       btnClassName="w-[100%]"
     >
       <div className="px-2 py-2.5 text-left">
         <p className="text-base text-secondary truncate">
           {item?.name}
         </p>
         <p className="text-base font-semibold text-secondary truncate">
           {item?.name}
         </p>
         <div className="flex justify-between truncate mt-2 mb-3 gap-2">
           <p className="opacity-60 truncate text-secondary">
             Price
           </p>
           <p className="font-semibold text-secondary flex-1 truncate text-right">
             {item?.price}
           </p>
         </div>
         <div className="flex justify-between gap-2">
           <p className="opacity-60 truncate text-secondary">
             Highest bid
           </p>
           <p className="font-semibold text-secondary flex-1 truncate text-right">
             {item?.highestbid || 0}
           </p>
         </div>
       </div>
     </Button>
     <hr />
     {item?.isPutOnSale && (item?.walletAddress !== walletAddress )&& <div className="px-2.5 py-4 flex justify-center">
       <div className="flex shop-card cursor-pointer">
         <span className="icon card-shop"></span>
         <span className="font-semibold text-secondary ml-1 whitespace-nowrap hover:text-primary">
           Buy Now
         </span>
       </div>
     </div>}
   </div>
     </div>
    
     </>
     )
   })}

          {props?.featchNFTsCollection?.collectionData?.data?.length === 0 &&
            <div className='text-center'>
              <NoData text={""} />
            </div>}
  </div>
  {(state.showSeeMore && props?.featchNFTsCollection?.collectionData?.data?.length >= 8 )&& (
           <div className='text-center mt-6'> <Button type="plain" >
           <span className="cursor-pointer text-base text-primary font-semibold" onClick={()=>loadMoreNFTS()} >
           <span>{state.seeMoreLoader && <Spinner size="sm" />} </span><span> See More</span>
           </span>
           <span className="mx-auto block icon see-more cursor-pointer mt-[-4px]"></span>
         </Button></div>
          )}
    </div>
    </>
  );
};
const connectStateToProps = ({ auth ,marketPlaceProfileReducer}: any) => {
  return { auth: auth,featchNFTsCollection:marketPlaceProfileReducer };
};
export default connect(connectStateToProps, (dispatch) => {
  return { dispatch };
})(NFTCollection);
