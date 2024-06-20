import React,{ useEffect, useReducer, useRef, useState } from 'react';
import BreadCrumb from '../../../ui/breadcrumb';
import  CollectionItems  from '../hotcollections.component/CollectionItems';
import { useDispatch, useSelector } from 'react-redux';
import { useAccount } from 'wagmi';
import { store } from '../../../store';
import { saveFavoriteNFT } from '../../../reducers/marketplaceProfileReducer';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../ui/Button';
import SearchInputComponent from '../hotcollections.component/SearchComponent';
import StatusDetailview from '../hotcollections.component/detailviewstatus';
import NftCards from '../hotcollections.component/Nftcards';
import NftCardDetailview from '../hotcollections.component/Nftcarddetailview';
import { browserByCategoryState, browserByCategoryreducer } from './reducer';
import { modalActions } from '../../../ui/Modal';
import { setError, setToaster } from '../../../reducers/layoutReducer';
import { saveFavorite, saveViews } from '../mycollections.component/services';


export default function CategoryView() {
  const searchInputRef=useRef<any>(null)
  const [localState, localDispatch] = useReducer(browserByCategoryreducer, browserByCategoryState);
  const { address, isConnected } = useAccount();
  const [searchInput, setSearchInput] = useState(null);
  const {user,NftDetails,errorMessage} = useSelector((store: any) => {
    return {
      user:store.auth.user,
      NftDetails:store.hotCollections.NftDetails,
      errorMessage:store.layoutReducer.error.message
    }
  });
  const rootDispatch = useDispatch();
  const navigate = useNavigate();
  const [searchValue, setSearchValue]=useState({status:"all",currency:"WMATIC",priceLevel:null,minMaxCategory:null,selectedSearch:null})
  const [activeTab,setActiveTab]=useState('nft')
  const [cardDetails,setCardDetails]=useState(null)
  const handleTabChange=(e,type)=>{
    setActiveTab(type)
  }
  const handlePriceRangeSelection = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, type: string) => {
    event.preventDefault();
    const minMaxCategory = type === 'high2low' ? 'max to min' : 'min to max';
    localDispatch({ type: 'update', payload: { minMaxCategory } });
  };
  const getNftsDetails=async(status:any,currency:any,selecedLevel:any,minMaxCategory:any,on: string = "")=>{
    setSearchValue(prevState => ({
      ...prevState,
      status: status,
      currency:currency,
      priceLevel:selecedLevel,
  }));
  // ..... //
  }
  const addToFavorites = (item: any) => {
    if (isConnected) {
      saveFavoriteNft(item);
    } else {
      modalActions("connect-wallet-model-exploreNfts", "open");
    }
  };
  const saveFavoriteNft = async (item: any) => {
    errorMessage && rootDispatch(setError({message:''}))
    localDispatch({
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
        // store.dispatch( fetchNfts(data, 1, "all", null, user?.id, data.length) );
      }
      if (error) rootDispatch(setError({message:error}));
    } catch (error) {
      rootDispatch(setError({message:"Something went wrong, please try again!"}))
    } finally {
      localDispatch({
        type: "setFavoriteLoader",
        payload: { id: "", loading: false },
      });
    }
  };
  const saveView = async (item) => {
    localDispatch({
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
      localDispatch({
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
  
  return (
   
      <div className="max-sm:px-3 md:mt-5 px-4 container mx-auto">
       <BreadCrumb/>
       <h1 className='text-2xl text-secondary font-semibold'>Browse by category</h1>
      
      {/* <div className="mt-4 mb-[42px]">         
          <div className="md:flex justify-between">
            <SearchInputComponent/>
                        <div className="flex items-center max-sm:mt-2">
                            <div className="dropdown mr-2.5">
                                <div tabIndex={0} role="button" className=" m-1 bg-accent px-4 py-2.5 rounded-[28px] text-sm font-medium border-0 hover:bg-accent">Price: low to high <span className="icon drop-arrow"></span></div>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                    <li><a>Low</a></li>
                                    <li><a>High</a></li>
                                </ul>
                            </div>
                            <span className='bg-accent p-2.5 rounded cursor-pointer'>
                                <span className="icon filter-squre"></span>
                            </span>
                            <span className="mx-4 bg-accent p-2.5 rounded cursor-pointer">
                                <span className="icon filter-dots"></span>
                            </span>
                            <span className='bg-accent p-2.5 rounded relative cursor-pointer'>
                                <span className="icon filter-cart"></span>
                                <span className='bg-primary text-white w-[16px] top-[-4px] right-[4px] text-xs h-[16px] inline-block flex justify-center items-center absolute rounded-full'>4</span>
                            </span>
                        </div>
           </div>
        </div>

        {!cardDetails && <div className='grid md:grid-cols-12 lg:gap-[45px]'>
          <div className='col-span-12 md:col-span-4 lg:col-span-4 xl:col-span-3'>
            <StatusDetailview activeTab={activeTab}/>
          </div>
          <div className='col-span-12 md:col-span-8 lg:col-span-8 xl:col-span-9 grid md:grid-cols-2 xl:grid-cols-3 gap-[16px]'>
          <NftCards setCardDetails={setCardDetails}/>        
          </div>
        </div>}
        {cardDetails && <NftCardDetailview cardDetails={cardDetails}/>} */}

        <CollectionItems activeTab={activeTab} />
        </div> 
    
  );
}
