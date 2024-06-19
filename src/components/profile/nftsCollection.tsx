import React,{useMemo,useReducer } from 'react';
import Image from 'react-bootstrap/Image';
import 'react-multi-carousel/lib/styles.css';
import { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import { connect,useSelector } from 'react-redux';
import Button from '../../ui/Button';
import defaultlogo from '../../assets/images/default-logo.png';
import Tabs from '../../ui/Tabs';
import SearchInputComponent from '../marketplace.component/hotcollections.component/SearchComponent';
import { fetchNftsCollection,saveFavoriteNFT,getFavoritedCount ,getCreatedCount,getOwnedCountData} from '../../reducers/marketplaceProfileReducer';
import { store } from '../../store';
import NftCardsShimmer from '../loaders/NftCardShimmer';
import NoData from '../../ui/noData';
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
  activeTab:0
}
const NFTCollection = (props: any) => {
const [state, dispatch] = useReducer(reducers, initialState);
const [activeTab, setActiveTab] = useState(0);
const { walletAddress } = useParams();
const pageSize = 10;
const [currentIndex, setCurrentIndex] = useState(0);
const items = props?.featchNFTsCollection?.collectionData?.data || [];
const itemsPerPage = 4;
useEffect(()=>{
  store.dispatch(getCreatedCount(walletAddress,props.auth.user?.id))
  store.dispatch(getFavoritedCount(walletAddress))
  store.dispatch(getOwnedCountData(walletAddress))
  store.dispatch(fetchNftsCollection(walletAddress,items, state.pageNo, pageSize, null, null,props.auth.user?.id));
  dispatch({ type: 'update', payload: { pageNo: state.pageNo+1 } });
},[]);
const { loader, error, data, pageNo } = useSelector(
  (store: any) => store.exploreNfts
);
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
const handleSearch=(e:any)=>{
  let data=e.target.value.trim()
  dispatch({ type: 'update', payload: { searchValue: data } });
   if (e.key==='Enter') {
    if(data == ""||data.includes(".")){	
      e.preventDefault();
    }
    else{  
      store.dispatch(fetchNftsCollection(walletAddress,data, 1, 8, null, state.searchValue || null,props.auth.user?.id));
      e.preventDefault();
     }	
  }
}

const handleChange=(e:any)=>{
  let data=e.target.value.trim()
  dispatch({ type: 'update', payload: { searchValue: data } });
  if(!data){
    store.dispatch(fetchNftsCollection(walletAddress,data, 1, 8, null, data || null,props.auth.user?.id));
     e.preventDefault();
   }
}
const handleSearchIcon = () => {
  let data=state.searchValue;
  if(data == ""||data == null || data.includes(".")){	
  }
  else{
    store.dispatch(fetchNftsCollection(walletAddress,data, 1, 8, null, data || null,props.auth.user?.id));
 }
};

const handlePriceRangeSelection = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, type: string) => {
  event.preventDefault();
  if (type === 'high2low') {
    dispatch({ type: 'update', payload: { type: 'high to low' } });
    store.dispatch(fetchNftsCollection(walletAddress, data, 1, 10, 'high to low', data || null, props.auth.user?.id));
  } else if (type === 'low2high') {
    dispatch({ type: 'update', payload: { type: 'low to high' } });
    store.dispatch(fetchNftsCollection(walletAddress, data, 1, 10, 'low to high', data || null, props.auth.user?.id));
  }
};

const saveFavorite=(item:any)=>{
  let obj = {
    nftId: item?.id,
    customerId: props.auth.user?.id,
    isFavourite: item?.isFavourite ? false : true,
  };
  store.dispatch(saveFavoriteNFT(obj, (response:any) => {
    let selectTabs=activeTab == 0 ? "GetNfts" : activeTab==1 ? "Favorites" : "GetOwnNfts";
    store.dispatch(getFavoritedCount(walletAddress))
    store.dispatch(fetchNftsCollection(walletAddress,data, 1, 8, null, data || null,props.auth.user?.id,selectTabs));
  }));
}
const handleTabChange=(selectedTab : any)=>{
 let selectTabs=selectedTab == 0 ? "GetNfts" : selectedTab==1 ? "Favorites" : "GetOwnNfts";
 console.log('Tab Action:', selectTabs);
 setCurrentIndex(0);
 dispatch({ type: 'update', payload: { activeTab: selectedTab } });
 store.dispatch(fetchNftsCollection(walletAddress,data, 1, 8, null, data || null,props.auth.user?.id,selectTabs));
}

const handleSlideActions = (direction) => {
  if (direction === "previous") {
      setCurrentIndex(prevIndex => (prevIndex === 0 ? Math.floor(items.length / itemsPerPage) * itemsPerPage : prevIndex - itemsPerPage));
  } else if (direction === "next") {
      setCurrentIndex(prevIndex => {
          const newIndex = prevIndex >= items.length - itemsPerPage ? 0 : prevIndex + itemsPerPage;
          if (newIndex >= items.length - itemsPerPage) {
            let selectTabs=state.activeTab == 0 ? "GetNfts" : state.activeTab==1 ? "Favorites" : "GetOwnNfts";
            store.dispatch(fetchNftsCollection(walletAddress,items, state.pageNo, 8, null, data || null,props.auth.user?.id,selectTabs));
            dispatch({ type: 'update', payload: { pageNo: state.pageNo+1 } });
          }
          return newIndex;
      });
  }
};

const getDisplayedItems = () => {
  return items.slice(currentIndex, currentIndex + itemsPerPage);
};
  return (
    <>
    {console.log(props?.featchNFTsCollection,'props?.featchNFTsCollection')}
    <Tabs
      tabs={tabs}
      activeTab={state.activeTab}
      tabsClass={"profile-subtabs mt-[26px]"}
      labelClass={""}
      tabContentClass={"hidden"}
      iSTabChange={handleTabChange}
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
    
     
    <div className="relative container mx-auto profile-nfts lg:px-24 mt-10">
    <div className='carousel w-full gap-4 py-2 px-2'>
    {props?.featchNFTsCollection?.collectionData?.loading && <NftCardsShimmer/>}
  {getDisplayedItems()?.map((item:any,index:any)=>{
   return (
    <>
     <div className='carousel-item inline-block max-sm:w-full lg:w-[260px] xl:w-[300px]'>
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
       >
         <span
           className={`icon like-white active`}
           onClick={()=>saveFavorite(item)}
         ></span>
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
     <div className="px-2.5 py-4 flex justify-between">
       <div className="flex add-cart cursor-pointer">
         <span className="icon card-cart"></span>
         <span className="font-semibold text-secondary ml-1 whitespace-nowrap hover:text-primary">
           Add to Cart
         </span>
       </div>
       <div className="w-px border"></div>
       <div className="flex shop-card cursor-pointer">
         <span className="icon card-shop"></span>
         <span className="font-semibold text-secondary ml-1 whitespace-nowrap hover:text-primary">
           Buy Now
         </span>
       </div>
     </div>
   </div>
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
  <div className="md:flex md:absolute md:w-full justify-between md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 max-sm:mt-4">
    <span className="icon carousal-left-arrow cursor-pointer lg:scale-[1.4] mr-1" onClick={() => handleSlideActions("previous")}></span>
    <span className="icon carousal-right-arrow cursor-pointer lg:scale-[1.4]" onClick={() => handleSlideActions("next")}></span>
  </div>
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
