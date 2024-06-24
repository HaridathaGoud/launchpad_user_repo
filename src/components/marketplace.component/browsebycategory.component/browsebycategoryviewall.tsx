import React, { useEffect, useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { browserByCategoryreducer, browserByCategoryState } from './reducer';
import { setError } from "../../../reducers/layoutReducer";
import { getMarketplace } from '../../../utils/api';
import Button from "../../../ui/Button";
import defaultbg from "../../../assets/images/default-bg.png";
import NftCardsShimmer from '../hotcollections.component/NftCardShimmer'
import BreadCrumb from '../../../ui/breadcrumb';

export default function BrowseByCategoryViewAll() {
  const rootDispatch = useDispatch();
  const { isConnected } = useAccount();
  const [localState, localDispatch] = useReducer(browserByCategoryreducer, browserByCategoryState);
  const itemsPerPage = 4; // Number of items to display per page
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    localDispatch({ type: 'setCurrentIndex', payload: 0 });
    getBrowseByCategoryDetails(0);
  }, [isConnected]); // eslint-disable-line react-hooks/exhaustive-deps

  const getBrowseByCategoryDetails = async (pageNumber) => {
    try {
      localDispatch({ type: 'setLoader', payload: true });
      const response = await getMarketplace(`User/GetAllCategories/8/${pageNumber}`);
      if (response.status === 200) {
        const newData = response.data;
        if (newData.length < 8) {
          setHasMore(false);
        }
        localDispatch({ type: 'setBrowseByCategoryList', payload:[...localState.browseByCategoryList, ...newData] });
      } else {
        rootDispatch(setError({ message: response }));
      }
    } catch (error) {
      rootDispatch(setError({ message: error }));
    } finally {
      localDispatch({ type: 'setLoader', payload: false });
    }
  };

  const handleSlideActions = (action) => {
    if (action === 'previous') {
      const newIndex = (localState.currentIndex + 1) % localState.browseByCategoryList.length;
      localDispatch({ type: 'setCurrentIndex', payload: newIndex });
    }
    else {
      const newIndex = (localState.currentIndex - 1 + localState.browseByCategoryList.length) % localState.browseByCategoryList.length;
      localDispatch({ type: 'setCurrentIndex', payload: newIndex });
    }
  };

  const getDisplayedItems = () => {
    const items = [];
    for (let i = 0; i < itemsPerPage; i++) {
      items.push(localState.browseByCategoryList[(localState.currentIndex + i) % localState.browseByCategoryList.length]);
    }
    return items;
  };
  const handleSeeMore = () => {
    const nextPage = page + 8;
    setPage(nextPage);
    getBrowseByCategoryDetails(nextPage);
  }

  return (
    <>
          <div className="container mx-auto mt-5">
            <BreadCrumb/>
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-secondary mb-4">Browse by category</h2>
            </div>

            <div className="grid lg:grid-cols-4 gap-4">
            {localState.loader &&
                Array.from({ length: 8 }, (_, index) => (
                  <div key={index}>
                    <NftCardsShimmer />
                  </div>
                ))}
              { !localState.loader && localState.browseByCategoryList.length > 0 &&
              getDisplayedItems().map((item: any, idx: any) =>
                <Link to={`/marketplace/categoryview/${item?.id}/${item?.name}?`} key={idx}>
                  <div className='card bg-primary-content border border-slate-200 w-full'>
                    <img src={item?.image || defaultbg} className='h-[130px] object-cover rounded-t-2xl w-full' alt="" />
                    <div className="flex gap-1 mt-1">
                      <div className='flex-1'> <img src={item?.image || defaultbg} alt="" className='h-[100px] object-cover w-full' /></div>
                      <div className='flex-1'> <img src={item?.image || defaultbg} alt="" className='h-[100px] object-cover w-full' /></div>
                      <div className='flex-1'> <img src={item?.image || defaultbg} alt="" className='h-[100px] object-cover w-full' /></div>
                    </div>
                    <div className='pt-2 px-5 pb-4'>
                      <h1 className='text-lg text-secondary font-semibold truncate'>{item?.name}</h1>
                    </div>
                  </div>
                </Link>
              )}
            </div>
            {hasMore && !localState.loader && (
          <div className="flex justify-center items-center mt-6">
            <Button type="plain"
              handleClick={handleSeeMore}>
              <span className="cursor-pointer text-base text-primary font-semibold">
                See More
              </span>
              <span className="mx-auto block icon see-more cursor-pointer mt-[-4px]"></span>
            </Button>
          </div>
           )} 
          </div>
    </>
  );
}
