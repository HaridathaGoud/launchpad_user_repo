import React, { useEffect, useReducer, useRef, useState } from 'react'
import StatusDetailview from './detailviewstatus'
import NftCards from './Nftcards'
import SearchBar from '../../../ui/searchBar'
import { fetchNftsDetails, hotCollectionReducer, hotcollectionState } from './reducer'
import {  connect} from 'react-redux'
import { useParams } from 'react-router-dom'
import { store } from '../../../store';
const pageSize = 6;

 const CollectionItems = (props:any) => {
    const params = useParams();
    const [state, dispatch] = useReducer(hotCollectionReducer, hotcollectionState);
    const [searchInput, setSearchInput] = useState(null);
    const searchInputRef=useRef<any>(null)

    useEffect(()=>{
      store.dispatch(fetchNftsDetails({
        take:pageSize,
        page:1,
        collectionId:params.collectionid,
        minMaxCategory:state.selection.minMaxCategory||state.selectedPriceLevel,
        status:state.selectedStatus,
        currency:state.selectedCurrency,
        search:searchInput,
        data:null,
       }));
    },[searchInput,state.selectedStatus,state.selection.minMaxCategory])
    const handlePriceRangeSelection = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, type: string) => {
      event.preventDefault();
      const minMaxCategory = type === 'high2low' ? 'max to min' : 'min to max';
      dispatch({ type: 'update', payload: { minMaxCategory } });
    };

    const handleChange = (event :any) => {
      const newStatus = event.target.value;
      dispatch({ type: 'setSelectedStatus', payload: newStatus });
  };
  const handleDropdownChange = (value:any) => {
    dispatch({ type: 'setSelectedCurrency', payload: value });

  };
  const handleApplyClick = () => {
    store.dispatch(fetchNftsDetails({
      take:pageSize,
      page:1,
      collectionId:params.collectionid,
      minMaxCategory:state.selectedPriceLevel,
      status:state.selectedStatus,
      currency:state.selectedCurrency,
      search:searchInput,
      data:null,
     }));
  };
  const sendSelectedValue = (value:any) => {
    dispatch({ type: 'setSelectedPriceLevel', payload: value });
  };
  
  return (<>
    <div className="mt-7 mb-[42px]">
      <div className="md:flex justify-between gap-4">
        <SearchBar searchBarClass='xl:w-[42rem] md:w-96 relative' onSearch={setSearchInput} inputRef={searchInputRef} placeholder="Search Movie, NFT Name,  Category...... "/>
        <div className="flex items-center max-sm:mt-2">
          <div className="dropdown mr-2.5">
            <div tabIndex={0} role="button" className=" m-1 bg-accent px-4 py-2.5 rounded-[28px] text-sm font-medium border-0 hover:bg-accent">Price: {state.selection.minMaxCategory||state.selectedPriceLevel} <span className="icon drop-arrow"></span></div>
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
          {/* <span className='bg-accent p-2.5 rounded relative cursor-pointer'>
            <span className="icon filter-cart"></span>
            <span className='bg-primary text-white w-[16px] top-[-4px] right-[4px] text-xs h-[16px] inline-block flex justify-center items-center absolute rounded-full'>4</span>
          </span> */}
        </div>
      </div>
    </div>
    <div className='grid gap-6 md:grid-cols-12 lg:gap-[45px]'>
      <div className='col-span-12 md:col-span-4 lg:col-span-4 xl:col-span-3'>
        <StatusDetailview 
        handleChange={handleChange} 
        handleDropdownChange={handleDropdownChange}
        sendSelectedValue={sendSelectedValue}
        selectedStatus={state.selectedStatus}
        handleApplyClick={handleApplyClick}
        selectedCurrency={state.selectedCurrency}  />
      </div>
      <div className='col-span-12 md:col-span-8 lg:col-span-8 xl:col-span-9 grid md:grid-cols-2 xl:grid-cols-3 gap-[16px]'>
        <NftCards />
      </div>
    </div>

  </>)
}
const connectStateToProps = ({ oidc,hotCollections }: any) => {
  return { oidc: oidc,hotCollections:hotCollections };
};
export default connect(connectStateToProps, (dispatch) => {
  return { dispatch };
})(CollectionItems);