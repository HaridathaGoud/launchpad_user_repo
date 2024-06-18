import React, { useEffect, useReducer, useState } from 'react';
import { clearCollectionsActivityData, clearHotCollectionsViewDetails, clearNfts, fetchHotCollectionsActivityDetails, fetchHotCollectionsViewDetails, fetchNftsDetails, hotCollectionReducer, hotcollectionState } from './reducer';
import { connect, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CollectionTabs from './CollectionTabs'
const pageSize = 10;

const HotcollectionView = (props: any) => {
  const params = useParams();
  const [state, dispatch] = useReducer(hotCollectionReducer, hotcollectionState);
  const {hotCollectionViewDetails,user,activityData,NftDetails} = useSelector((store: any) => {
    return {
      hotCollectionViewDetails:store.hotCollections.hotCollectionViewDetails,
      user:store.auth.user,
      activityData:store?.hotCollections.hotCollectionsActivityDetails,
      NftDetails:store.hotCollections.NftDetails,
    }
  });
  const [searchValue,setIsSearchValue]=useState({status:"all",currency:"WMATIC",priceLevel:null,minMaxCategory:null,selectedSearch:null})
  
  useEffect(() => {
    getHotCollectionsData();
    getNftsDetails(searchValue.status,searchValue.currency,searchValue.priceLevel,state.selection?.minMaxCategory);
    return () => {
      props.clearHotCollectionViewDetails();
      props.clearCollectionsActivityData();
    };
  }, []);

  const handleTabChange = (selectedTab: any) => {
    if (selectedTab === 1) {
      getHotCollectionsActivityData();
    } else {
      getNftsDetails(searchValue.status, searchValue.currency, searchValue.priceLevel, state.selection?.minMaxCategory);
    }
  };

  const getHotCollectionsData = async () => {
    props.fetchHotCollectionViewDetails({
      data: null,
      id:params.collectionid
    });
  };
  const getHotCollectionsActivityData=()=>{
    props.fetchHotCollectionsActivityDetails({
      data: null,
      id:user.id,
      collectionId:params.collectionid,
      page: 1,
      take: pageSize,
    });
  }
  const getNftsDetails=async(status:any,currency:any,selecedLevel:any,minMaxCategory:any)=>{
    setIsSearchValue(prevState => ({
      ...prevState,
      status: status,
      currency:currency,
      priceLevel:selecedLevel,
  }));
    props.fetchNftsDetails({
      data: null,
      id:user.id,
      collectionId:params.collectionid,
      page: 1,
      take: pageSize,
      search: state.selection?.searchValue||null,
      currency:currency,
      status:status,
      minMaxCategory:selecedLevel || minMaxCategory||null
    })
  }

  const handleSearch=(e:any)=>{
    let data=e.target.value.trim()
    dispatch({ type: 'update', payload: { searchValue: data } });
     if (e.key==='Enter') {
      if(data == ""||data.includes(".")){	
        e.preventDefault();
      }
      else{  
        getNftsDetails(searchValue.status,searchValue.currency,searchValue.priceLevel,state.selection?.minMaxCategory);
        e.preventDefault();
       }	
    }
  }
  const handleChange=(e:any)=>{
    let data=e.target.value.trim()
    dispatch({ type: 'update', payload: { searchValue: data } });
    if(!data){
       getNftsDetails(searchValue.status,searchValue.currency,searchValue.priceLevel,state.selection?.minMaxCategory);
       e.preventDefault();
     }
  }
  const handleSearchIcon = () => {
    let data=state.selection.searchValue;
    if(data == ""||data == null || data.includes(".")){	
    }
    else{
      getNftsDetails(searchValue.status,searchValue.currency,searchValue.priceLevel,state.selection?.minMaxCategory);
   }
  };
  const handlePriceRangeSelection = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, type: string) => {
    event.preventDefault();
    const minMaxCategory = type === 'high2low' ? 'high to low' : 'low to high';
    dispatch({ type: 'update', payload: { minMaxCategory } });
    getNftsDetails(searchValue.status, searchValue.currency, searchValue.priceLevel, minMaxCategory);
  };
  
  return (<>
   
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
          <a
              href="https://www.facebook.com/YellowblockNet/"
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              <span className='icon fb cursor-pointer'></span>
              </a>
              <a
              href="https://www.facebook.com/YellowblockNet/"
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              <span className='icon linkedin cursor-pointer'></span>
              </a>
              <a
              href="https://twitter.com/YellowblockNet"
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              <span className='icon twit cursor-pointer'></span>
              </a>
              <a
              href="https://x.com/DOTT73762"
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              <span className='icon network cursor-pointer'></span>
              </a>
            </div>
        </div>
        <hr className="bg-[#f8f6f6] my-6" />
       <CollectionTabs handleSearch={handleSearch}
        handleChange={handleChange} 
        handleSearchIcon={handleSearchIcon} 
        searchValue={state.selection?.searchValue} 
        minMaxCategory={state.selection.minMaxCategory}
         handlePriceRangeSelection={handlePriceRangeSelection} 
         getNftsDetails={getNftsDetails} 
         activityData={activityData}
         handleTabChange={handleTabChange}
         NftDetails={NftDetails}/>

        </div>
  </>);
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
