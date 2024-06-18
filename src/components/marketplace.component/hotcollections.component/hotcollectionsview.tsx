import React, { useEffect, useMemo, useReducer, useState } from 'react';
import NftCardDetailview from './Nftcarddetailview';
import SearchInputComponent from './SearchComponent';
import StatusDetailview from './detailviewstatus';
import NftCards from './Nftcards';
import Activity from '../topsellerdetailview/activity';
import { clearCollectionsActivityData, clearHotCollectionsViewDetails, clearNfts, fetchHotCollectionsActivityDetails, fetchHotCollectionsViewDetails, fetchNftsDetails, hotCollectionReducer, hotcollectionState } from './reducer';
import { connect, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setError } from '../../../reducers/layoutReducer';
import Tabs from '../../../ui/Tabs';
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
  const [activeTab, setActiveTab] = useState(0);
  const [searchValue,setIsSearchValue]=useState({status:"all",currency:"WMATIC",priceLevel:null,minMaxCategory:null,selectedSearch:null})
  
  useEffect(() => {
    getHotCollectionsData();
    getNftsDetails(searchValue.status,searchValue.currency,searchValue.priceLevel,state.selection?.minMaxCategory);
    return () => {
      props.clearHotCollectionViewDetails();
      props.clearCollectionsActivityData();
    };
  }, []);
  const tabs = useMemo(() => {
    return [
      { label: "Items", content: '' },
      { label: "Activity", content: '' },
    ];
  }, [activeTab])

  const handleTabChange = (selectedTab: any) => {
    setActiveTab(selectedTab);
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
  // console.log('activeTab ',activeTab);
  
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

        <Tabs
      tabs={tabs}
      activeTab={activeTab}
      tabsClass={"tabstyle mt-[26px]"}
      labelClass={""}
      tabContentClass={""}
      iSTabChange={handleTabChange}
      setActiveTab={(state) => {setActiveTab(state)}}
    />
      <div role="tablist" className="tabs tabstyle mt-[34px] customTabs  max-sm:overflow-x-auto scrollbar-hidden">

        {/* <input type="radio" name="my_tabs_1" role="tab" className={`tab !ml-0 ${activeTab === 'items' ? 'tab-checked' : ''}`} aria-label="Items" onChange={(e) => handleTabChange(e, 'items')} checked={activeTab === 'items'} /> */}
        {/* <input type="radio" name="my_tabs_2" role="tab" className={`tab !ml-0 ${activeTab === 'activity' ? 'tab-checked' : ''}`} aria-label="Activity" onChange={(e) => handleTabChange(e, 'activity')} checked={activeTab === 'activity'} /> */}
       
        {activeTab === 0 &&(
          <div role="tabpanel" className="tab-content py-[18px]">
            <div className="mt-7 mb-[42px]">
              <div className="md:flex justify-between">
                <SearchInputComponent handleSearch={handleSearch} handleChange={handleChange} handleSearchIcon={handleSearchIcon} search={state.selection?.searchValue} />

                <div className="flex items-center max-sm:mt-2">
                  <div className="dropdown mr-2.5">
                    <div tabIndex={0} role="button" className=" m-1 bg-accent px-4 py-2.5 rounded-[28px] text-sm font-medium border-0 hover:bg-accent">Price: {state.selection.minMaxCategory} <span className="icon drop-arrow"></span></div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                      <li onClick={(event) => handlePriceRangeSelection(event, 'low2high')} ><a>Low</a></li>
                      <li onClick={(event) => handlePriceRangeSelection(event, 'high2low')}><a>High</a></li>
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
            <div className='grid md:grid-cols-12 lg:gap-[45px]'>
              <div className='col-span-12 md:col-span-4 lg:col-span-4 xl:col-span-3'>
                <StatusDetailview activeTab={activeTab} getNftsDetails={getNftsDetails} />
              </div>
              <div className='col-span-12 md:col-span-8 lg:col-span-8 xl:col-span-9 grid md:grid-cols-2 xl:grid-cols-3 gap-[16px]'>
                <NftCards />
              </div>
            </div>
          </div>
        )}

        {activeTab === 1 &&(
          <div role="tabpanel" className="tab-content py-[18px]">
            <Activity activityData={activityData} />
          </div>
        )}

      </div>
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
