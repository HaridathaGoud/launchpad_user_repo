import React,{ useEffect, useRef, useState } from 'react';
import BreadCrumb from '../../../ui/breadcrumb';
import { CollectionItems } from '../hotcollections.component/CollectionItems';
import { useSelector } from 'react-redux';
import { store } from '../../../store';
import { saveFavoriteNFT } from '../../../reducers/marketplaceProfileReducer';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../ui/Button';
import SearchInputComponent from '../hotcollections.component/SearchComponent';
import StatusDetailview from '../hotcollections.component/detailviewstatus';
import NftCards from '../hotcollections.component/Nftcards';
import NftCardDetailview from '../hotcollections.component/Nftcarddetailview';

export default function CategoryView() {
  const searchInputRef=useRef<any>(null)
  const [searchInput, setSearchInput] = useState(null);
  const {user,NftDetails} = useSelector((store: any) => {
    return {
      user:store.auth.user,
      NftDetails:store.hotCollections.NftDetails,
    }
  });
  const [searchValue, setSearchValue]=useState({status:"all",currency:"WMATIC",priceLevel:null,minMaxCategory:null,selectedSearch:null})
  const [activeTab,setActiveTab]=useState('nft')
  const [cardDetails,setCardDetails]=useState(null)
  const handleTabChange=(e,type)=>{
    setActiveTab(type)
  }
  const handlePriceRangeSelection = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, type: string) => {
    event.preventDefault();

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
  const saveFavorite=(item:any)=>{
    let obj = {
      nftId: item?.id,
      customerId: user?.id,
      isFavourite: item?.isFavourite ? false : true,
    };
    store.dispatch(saveFavoriteNFT(obj, (response:any) => {
     getNftsDetails(searchValue.status, searchValue.currency, searchValue.priceLevel, searchValue.minMaxCategory);
    }))
  }
  
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

        <CollectionItems 
        setSearchInput={setSearchInput}
        searchInputRef={searchInputRef}
        minMaxCategory={searchValue.minMaxCategory}
        handlePriceRangeSelection={handlePriceRangeSelection}
        activeTab={activeTab}
        getNftsDetails={getNftsDetails}
        NftDetails={NftDetails} saveFavorite={saveFavorite}/>
        </div> 
    
  );
}
