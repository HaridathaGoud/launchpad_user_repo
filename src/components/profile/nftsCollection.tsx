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
  activeTab:0,
  isLastIndex:false,
  showSeeMore:true,
  pageSize:8,
  seeMoreLoader:false,
  favoriteLoader:false,
  selectedFavaratedID:null,
  searchInput:null
}
const NFTCollection = (props: any) => {
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
  const selectTabs = getSelectTabs(state.activeTab);
  store.dispatch(fetchNftsCollection(selectTabs,address,!state.searchInput ? 1 : state.pageNo, state.pageSize, state.type, state.searchInput =='' ? null : state.searchInput,props.auth.user?.id,!state?.searchInput && previousData,(callback)=>{
    if(callback.status == 200){
      let _pageNo = state.pageNo + 1;
      dispatch({ type: 'update', payload: { pageNo: _pageNo } });
    }else{
      rootDispatch(setError({ message: callback }));
    }
  }));
},[state.searchInput,address])
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

const handlePriceRangeSelection = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, type: string) => {
  event.preventDefault();
  const selectTabs = getSelectTabs(state?.activeTab);
  if (type === 'high2low') {
    dispatch({ type: 'update', payload: { type: 'high to low' } });
    store.dispatch(fetchNftsCollection(selectTabs,address || walletAddress,  1, 8, 'high to low', state?.searchInput, props.auth.user?.id));
  } else if (type === 'low2high') {
    dispatch({ type: 'update', payload: { type: 'low to high' } });
    store.dispatch(fetchNftsCollection(selectTabs,address || walletAddress, 1, 8, 'low to high', state?.searchInput, props.auth.user?.id));
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
      const selectTabs = getSelectTabs(state?.activeTab);
      store.dispatch(getFavoritedCount(address || walletAddress))
      store.dispatch(fetchNftsCollection(selectTabs,address || walletAddress, 1, 8, state.type, state?.searchInput,props.auth.user?.id,previousData))
      rootDispatch(
        setToaster({
          message: `Nft ${
            item.isFavourite ? "removed from" : "added to"
          } Favorites!`,
        })
      );
    }else{
      rootDispatch(setError({ message: response }));
    }
  }));
}
const handleTabChange=(selectedTab : any)=>{
  if(searchInputRef.current) searchInputRef.current.value=''
 const selectTabs = getSelectTabs(selectedTab); 
 store.dispatch(fetchNftsCollection(selectTabs,address || walletAddress, 1, state?.pageSize, state.type, null,props.auth.user?.id,previousData,(response)=>{
  dispatch({ type: 'update', payload: { pageNo:2} });
 }));
 dispatch({ type: 'update', payload: { activeTab: selectedTab,showSeeMore:true,searchInput:null ,pageNo:1} });
}
const loadMoreNFTS=()=>{
  const selectTabs = getSelectTabs(state?.activeTab);
  dispatch({ type: 'update', payload: { seeMoreLoader:true} });
  store.dispatch(fetchNftsCollection(selectTabs,address || walletAddress, state.pageNo, state.pageSize, state.type, state?.searchInput,props.auth.user?.id,previousData,(response)=>{
    if(response){
      let _pageNo = state.pageNo + 1;
      dispatch({ type: 'update', payload: { pageNo: _pageNo, showSeeMore: response.data.length < 8 && false ,seeMoreLoader:false} });
    }
  }));
}
const reDirectToBuy=(item)=>{
  navigate(`/marketplace/nft/${item.tokenId}/${item.collectionContractAddress}/${item.id}`)
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
        dispatch({ type: 'update', payload: {activeTab:state} })
      }}
    />
     <div className='flex justify-between items-center gap-4 mt-6'>
     <SearchBar searchBarClass='xl:w-[42rem] md:w-96 relative'
     onSearch={(input) => dispatch({ type: 'update', payload: {searchInput:input} })}
     inputRef={searchInputRef} placeholder="Search Movie, NFT Name,  Category...... "/>
        <div className="dropdown mr-2.5">
          <div tabIndex={0} role="button" className=" m-1 bg-accent px-4 py-2.5 rounded-[28px] text-sm font-medium border-0 hover:bg-accent">Price: {state.type} <span className="icon drop-arrow"></span></div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li onClick={(event) => handlePriceRangeSelection(event, 'low2high')} ><a>Low</a></li>
            <li onClick={(event) => handlePriceRangeSelection(event, 'high2low')} ><a>High</a></li>
          </ul>
        </div>
     </div>
     
    <div className="relative mt-6 ">
    {props?.featchNFTsCollection?.collectionData?.loading &&  !state?.seeMoreLoader && <NftCardsShimmer/>}
    <div className='grid gap-4 lg:grid-cols-4 md:grid-cols-3'>
   
  {props?.featchNFTsCollection?.collectionData?.data?.map((item:any,index:any)=>{
   return (
    <>
   <div className='relative'>
   <div className="bg-black top-3 z-10 absolute cursor-pointer right-3 rounded-full">
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
     <div
   className="mt-1 shadow-md cursor-pointer bg-primary-content rounded-lg relative min-h-[420px] transform transition-transform duration-500 hover:scale-[1.03]"
   onClick={()=>reDirectToBuy(item)}>
   <div className="cursor-pointer" >
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
         <span className="font-semibold text-secondary ml-1 whitespace-nowrap hover:text-primary"
          >
           Buy Now
         </span>
       </div>
     </div>}
   </div>
     </div>
   </div>
    
     </>
     )
   })}
          {(!props?.featchNFTsCollection?.collectionData?.data || props.featchNFTsCollection.collectionData.data.length === 0) && !props?.featchNFTsCollection?.collectionData?.loading &&
            <div className='lg:col-span-4 md:col-span-3'>
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
