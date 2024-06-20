import React, { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CollectionTabs from './CollectionTabs'
import Button from '../../../ui/Button';
import { useAccount } from "wagmi";
import { modalActions } from "../../../ui/Modal";
import {
  clearCollectionsActivityData,
  clearHotCollectionsViewDetails,
  clearNfts,
  fetchHotCollectionsActivityDetails,
  fetchHotCollectionsViewDetails,
  fetchNftsDetails,
  hotCollectionReducer
  , hotcollectionState
} from './reducer';
import { setError, setToaster } from '../../../reducers/layoutReducer';
import { saveFavorite, saveViews } from '../mycollections.component/services';
const pageSize = 6;

const HotcollectionView = (props: any) => {
  const params = useParams();
  const {  isConnected } = useAccount();
  const rootDispatch = useDispatch();
  const navigate = useNavigate();
  const searchInputRef=useRef<any>(null)
  const [searchInput, setSearchInput] = useState(null);
  const [state, dispatch] = useReducer(hotCollectionReducer, hotcollectionState);
  const errorMessage=useSelector(((store:any)=>store.layoutReducer.error.message))
  const {hotCollectionViewDetails,user,activityData,NftDetails} = useSelector((store: any) => {
    return {
      hotCollectionViewDetails:store.hotCollections.hotCollectionViewDetails,
      user:store.auth.user,
      activityData:store?.hotCollections.hotCollectionsActivityDetails,
      NftDetails:store.hotCollections.NftDetails,
    }
  });
  const [searchValue, setSearchValue]=useState({status:"all",currency:"WMATIC",priceLevel:null,minMaxCategory:'min to max',selectedSearch:null})
  const [isActive, setIsActive] = useState(0);

  useEffect(()=>{
    getHotCollectionsData();
    return () => {
      props.clearHotCollectionViewDetails();
    };
  },[])
  useEffect(() => {
    getNftsDetails(searchValue.status,searchValue.currency,searchValue.priceLevel,state.selection?.minMaxCategory||searchValue.minMaxCategory);
    return () => {
      props.clearNfts();
      props.clearCollectionsActivityData();
    };
  }, [isActive,searchInput]);

  const addToFavorites = (item: any) => {
    if (isConnected) {
      saveFavoriteNft(item);
    } else {
      modalActions("connect-wallet-model-exploreNfts", "open");
    }
  };
  const handleTabChange = (selectedTab: any) => {
    setSearchInput(null)
     if(searchInputRef.current) searchInputRef.current.value=''
     setIsActive(selectedTab);
      getNftsDetails(searchValue.status, searchValue.currency, searchValue.priceLevel, state.selection?.minMaxCategory||searchValue.minMaxCategory);
  };

  const getHotCollectionsData = async () => {
    props.fetchHotCollectionViewDetails({
      data: null,
      id:params.collectionid
    });
  };

  const getNftsDetails=async(status:any,currency:any,selectedLevel:any,minMaxCategory:any,on: string = "")=>{
    setSearchValue(prevState => ({
      ...prevState,
      status: status,
      currency:currency,
      priceLevel:selectedLevel,
  }));
    if(isActive === 1){
      props.fetchHotCollectionsActivityDetails({
        data: on === "seeMore" ? activityData.data : null,
        id:user.id,
        collectionId:params.collectionid,
        page: on === "seeMore" ? activityData.nextPage : 1,
        take: pageSize,
      });
      return; 
    }
      props.fetchNftsDetails({
        data: on === "seeMore" ? NftDetails.data : null,
        id:user.id,
        collectionId:params.collectionid,
        page: on === "seeMore" ? NftDetails.nextPage : 1,
        take: pageSize,
        search: searchInput || state.selection?.searchValue,
        currency:currency,
        status:status,
        minMaxCategory:selectedLevel || minMaxCategory||null
      });
  }

  const handlePriceRangeSelection = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, type: string) => {
    event.preventDefault();
    const minMaxCategory = type === 'high2low' ? 'max to min' : 'min to max';
    dispatch({ type: 'update', payload: { minMaxCategory } });
    getNftsDetails(searchValue.status, searchValue.currency, searchValue.priceLevel, minMaxCategory);
  };

  const saveFavoriteNft = async (item: any) => {
    errorMessage && rootDispatch(setError({message:''}))
    dispatch({
      type: "setFavoriteLoader",
      payload: { id: item.id, loading: true },
    });
    try {
      let obj = {
        nftId: item.id,
        customerId: user?.id,
        isFavourite: !item.isFavourite,
      };
      const { status, error } = await saveFavorite(obj);
      if (status) {
        rootDispatch(
          setToaster({
            message: `Nft ${
              item.isFavourite ? "removed from" : "added to"
            } Favorites!`,
          })
        );
        getNftsDetails(searchValue.status, searchValue.currency, searchValue.priceLevel, state.selection?.minMaxCategory||searchValue.minMaxCategory);
      }
      if (error) rootDispatch(setError({message:error}));
    } catch (error) {
      rootDispatch(setError({message:"Something went wrong, please try again!"}))
    } finally {
      dispatch({
        type: "setFavoriteLoader",
        payload: { id: "", loading: false },
      });
    }
  };
  const saveView = async (item) => {
    dispatch({
      type: "setCardLoader",
      payload: true,
    });
    try {
      let obj = {
        nftId: item.id,
        customerId: user?.id,
      };
      const { status, error } = await saveViews(obj);
      if (status) navigateToAsset(item);
      if (error) rootDispatch(setError({message:error}));
    } catch (_) {
      rootDispatch(setError({message:"Something went wrong, please try again!"}))
    } finally {
      dispatch({
        type: "setCardLoader",
        payload: false,
      });
    }
  };
  const navigateToAsset = (item) => {
    navigate(
      `/marketplace/nft/${item.tokenId}/${item.collectionContractAddress}/${item.id}`
    );
  };
  const showSeeMore = useMemo(() => {
    const { loading, data, nextPage } = isActive===1
      ? activityData
      : NftDetails;
    return !loading && data && data?.length === pageSize * (nextPage-1);
  }, [isActive, activityData, NftDetails]);
 
  
  return (
   
      <div className="max-sm:px-3 md:mt-5 px-4 container mx-auto">
      <div className='min-h-[320px] bg-center relative rounded-lg px-4 md:px-[50px] flex items-center mt-4 max-sm:py-4'>
        <img src={hotCollectionViewDetails?.data?.bannerImage} className='w-full rounded-lg h-full absolute top-0 left-0 object-cover' alt="" />
        <div className='absolute top-0 left-0 w-full h-full bg-black opacity-60 rounded-lg z-10'></div>
      {/* Present we commented this in feature it will required */}
          {/* <div className="md:flex gap-12 items-center z-40">
            <img src={'https://i.pinimg.com/564x/b9/db/d9/b9dbd996972e8d1236c62241923a5493.jpg'} className="w-[150px] h-[150px] rounded-full object-cover" alt="" />
            <div>
              <div className='flex max-sm:mt-4 items-center'>
                <p className='text-white font-semibold text-[32px] leading-8 mr-2'>Marvel Entertainment</p> <span className='icon circle-check shrink-0'></span>
              </div>
              <div className="flex text-[18px] font-medium gap-2.5">
                <p className='text-white'>@marvel</p>
                <p className='text-white'>23 M Subscribers</p>
                <p className='text-white'>8.6k Videos</p>
              </div>
              <p className='text-white mt-4 mb-7 text-base'>Marvel is committed to bringing great stories, characters, and experiences...</p>
              <div className="flex md:flex-row items-center gap-2.5 flex-col">
                <Button type='primary' ><span className='video-icon icon'></span>Subscribe with 2Matic / $1.32</Button>
                <button className="bg-accent px-4 py-2 rounded-[20px] text-sm font-medium whitespace-nowrap"> <span className="icon share mr-2"></span>Share</button></div>
            </div>
          </div> */}
          <div className='flex gap-6 absolute z-10 right-10 bottom-6'>
            {hotCollectionViewDetails?.data?.facebook && 
              <a
              href={hotCollectionViewDetails?.data?.facebook}
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              <span className='icon fb cursor-pointer'></span>
              </a>
               }
            {hotCollectionViewDetails?.data?.linkedIn &&
              <a
              href={hotCollectionViewDetails?.data?.linkedIn}
              target="_blank"
              rel="noreferrer"
              >
              {" "}
              <span className='icon linkedin cursor-pointer'></span>
              </a> 
            }
            {hotCollectionViewDetails?.data?.twitter && 
              <a
              href={hotCollectionViewDetails?.data?.twitter}
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              <span className='icon twit cursor-pointer'></span>
              </a>
            }
            {hotCollectionViewDetails?.data?.websiteUrl && 
              <a
              href={hotCollectionViewDetails?.data?.websiteUrl}
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              <span className='icon network cursor-pointer'></span>
              </a>
            }
            </div>
        </div>
        <hr className="bg-[#f8f6f6] my-6" />
       <CollectionTabs addToFavorites={addToFavorites}
       favoriteLoader={state.favoriteLoader}
        searchInputRef={searchInputRef} setSearchInput={setSearchInput}
        minMaxCategory={state.selection.minMaxCategory}
         handlePriceRangeSelection={handlePriceRangeSelection} 
         getNftsDetails={getNftsDetails} 
         activityData={activityData}
         handleTabChange={handleTabChange}
         NftDetails={NftDetails}
         saveView={saveView}
         cardLoader={state.cardLoader} />
        {showSeeMore && (
        <div className="flex justify-center items-center">
          <Button type="plain" 
          handleClick={() => getNftsDetails(searchValue.status,searchValue.currency,searchValue.priceLevel,state.selection?.minMaxCategory||searchValue.minMaxCategory,'seeMore')}>
          <span className="cursor-pointer text-base text-primary font-semibold">
            See More
          </span>
          <span className="mx-auto block icon see-more cursor-pointer mt-[-4px]"></span>
        </Button>
        </div>
      )}
        </div>
  );
}
const connectStateToProps = ({ oidc,hotCollections }: any) => {
  return { oidc: oidc,hotCollections:hotCollections };
};
const connectDispatchToProps = (dispatch: any) => {
  return {
    fetchHotCollectionViewDetails: (callback: any) => {
      dispatch(fetchHotCollectionsViewDetails(callback));
    },
    clearHotCollectionViewDetails: () => {
      dispatch(clearHotCollectionsViewDetails());
    },
    fetchHotCollectionsActivityDetails:(callback: any)=>{
      dispatch(fetchHotCollectionsActivityDetails(callback));
    },
    clearCollectionsActivityData:()=>{
      dispatch(clearCollectionsActivityData());
    },
    fetchNftsDetails:(callback: any)=>{
      dispatch(fetchNftsDetails(callback))
    },
    clearNfts:()=>{
      dispatch(clearNfts())
    },
    dispatch,
  };
};
export default connect(connectStateToProps, connectDispatchToProps)(HotcollectionView);
