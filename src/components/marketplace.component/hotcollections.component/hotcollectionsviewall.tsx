import React,{ useEffect, useReducer, useState } from 'react';
import { getMarketplace } from '../../../utils/api';
import 'react-multi-carousel/lib/styles.css';
import { useNavigate } from 'react-router-dom';
import { hotCollectionReducer, hotcollectionState } from './reducer';
import { useDispatch } from 'react-redux';
import { setError } from "../../../reducers/layoutReducer";
import Button from "../../../ui/Button";
import NaviLink from '../../../ui/NaviLink';
import BreadCrumb from '../../../ui/breadcrumb';
import NftCardsShimmer from './NftCardShimmer';
import NoData from '../../../ui/noData';

export default function HotCollectionsViewAll() {
  const rootDispatch = useDispatch();
  const [localState, localDispatch] = useReducer(hotCollectionReducer, hotcollectionState);
  const router = useNavigate();
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true); 
  useEffect(() => {
    localDispatch({ type: 'setCurrentIndex', payload: 0 });
    getHotCollectionsData(0);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getHotCollectionsData = async (pageNumber) => {
    try {
        localDispatch({ type: 'setLoader', payload: true });
        let response = await getMarketplace(`User/HotCollectionsData/8/${pageNumber}/${null}/${null}`);
        if (response.status === 200) {
          const newData = response.data;
          if (newData.length < 8) {
            setHasMore(false);
          }
          localDispatch({ type: 'setHotCollectionData', payload: [...localState.hotCollectionData, ...newData] });
        } else {
          rootDispatch(setError({ message: response }));
        }
    } catch (error) {
      rootDispatch(setError({ message: error }));
    }
    finally {
      localDispatch({ type: 'setLoader', payload: false });
    }
  };

  const handleHotCollectionItem = (item: any) => {
    router(`/marketplace/collection/${item.id}/view`);
  };
  const handleSlideActions = (action) => {
    if (action === 'previous') {
      const newIndex = (localState.currentIndex + 1) % localState.hotCollectionData?.length;
      localDispatch({ type: 'setCurrentIndex', payload: newIndex });
    }
    else {
      const newIndex = (localState.currentIndex - 1 + localState.hotCollectionData?.length) % localState.hotCollectionData?.length;
      localDispatch({ type: 'setCurrentIndex', payload: newIndex });
    }
  };
  const handleSeeMore = () => {
    const nextPage = page + 8;
    setPage(nextPage);
    getHotCollectionsData(nextPage);
  }
  
  return (
    <>
          <div className="container mx-auto mt-[40px]">
          <BreadCrumb/>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-secondary mb-4">Hot Collections</h2>
           </div>
              <div className='grid md:grid-cols-3 xl:grid-cols-4 gap-[16px]'>
              {localState.loader &&
                Array.from({ length: 8 }, (_, index) => (
                  <div key={index}>
                    <NftCardsShimmer />
                  </div>
                ))}
                {!localState.loader && localState.hotCollectionData?.length > 0 &&
                localState.hotCollectionData.map((item: any) => (
                  <div className="">
                    <div className="card bg-primary-content cursor-pointer" onClick={() => handleHotCollectionItem(item)}>
                      <div className="">
                        <img src={item.logo} alt="" className="h-[300px] object-cover rounded-[16px] w-full" />
                      </div>
                      <div className="p-5">
                        <h4 className="font-semibold text-xl capitalize text-secondary truncate" title={item.collectionName}>{item.collectionName}</h4>
                        <div className="">

                          <div className="flex justify-between items-center mt-[18px]">
                            <label className="text-secondary text-base">Floor</label>
                            {item.flourValue && (
                              <>
                                <p className="text-secondary text-base font-semibold flex-1 text-right break-all">
                                  <span className='truncate mr-2'>{item.flourValue}</span><span>{process.env.REACT_APP_TOKENNAME}</span> 
                                </p>
                              </>
                            )}
                            {!item.flourValue && (
                              <>
                                <p className=" text-secondary text-base font-semibold flex-1 text-right break-all">{item.flourValue || '-'}</p>
                              </>
                            )}
                          </div>
                          <div className="flex justify-between items-center mt-4">
                            <label className="text-secondary text-base flex-1">Total Valume</label>
                            <p className="text-secondary text-base font-semibold flex justify-end flex-1 text-right break-all truncate" title={item.totalVolume}>
                             <span className='truncate mr-2'> {item.totalVolume}</span> <span>{process.env.REACT_APP_TOKENNAME}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>


                  </div>))}

                  {!localState.hotCollectionData?.length && 
               <div className='md:col-span-2 xl:col-span-3'>
                 <div className='text-center'> 
                <NoData text={""} />
                </div>
                </div>}

              
         
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
