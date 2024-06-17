import React,{ useEffect, useReducer, useState } from 'react';
import { getMarketplace } from '../../../utils/api';
import 'react-multi-carousel/lib/styles.css';
import { useNavigate } from 'react-router-dom';
import Placeholder from 'react-bootstrap/Placeholder';
import { hotCollectionReducer, hotcollectionState } from './reducer';
import { useDispatch } from 'react-redux';
import { setError } from "../../../reducers/layoutReducer";
import Button from "../../../ui/Button";
export default function HotCollections() {
  const rootDispatch = useDispatch();
  const [localState, localDispatch] = useReducer(hotCollectionReducer, hotcollectionState);
  const router = useNavigate();
  useEffect(() => {
    localDispatch({ type: 'setCurrentIndex', payload: 0 });
    getHotCollectionsData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getHotCollectionsData = async () => {
    try {
      localDispatch({ type: 'setLoader', payload: true });
      //  let response =  await getMarketplace(`User/HotCollectionsData/10/0/${null}/${null}`)
      let response = await getMarketplace("User/todaytrending");
      if (response.statusText.toLowerCase() === 'ok') {
        localDispatch({ type: 'setHotCollectionData', payload: response.data });
      }
      else {
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
    router(`/marketplace/collection/view`);
  };
  const handleSlideActions = (action) => {
    if (action === 'next') {
      const newIndex = (localState.currentIndex + 1) % localState.hotCollectionData?.length;
      localDispatch({ type: 'setCurrentIndex', payload: newIndex });
    }
    else {
      const newIndex = (localState.currentIndex - 1 + localState.hotCollectionData?.length) % localState.hotCollectionData?.length;
      localDispatch({ type: 'setCurrentIndex', payload: newIndex });
    }
  };

  const visibleItems = localState.hotCollectionData ? [...localState.hotCollectionData?.slice(localState.currentIndex), ...localState.hotCollectionData?.slice(0, localState.currentIndex)].slice(0, 3) : [];
  return (
    <>
      {localState.hotCollectionData?.length > 0 && (
        <>
          <div className="container mx-auto mt-[40px]">
            <h2 className="text-2xl font-semibold text-secondary mb-4">Hot Collections</h2>
            <div className="text-center">{localState.loader && <div className='trending-card hot-collection-shimmer'>
              <Placeholder animation="glow" >
                <Placeholder xs={2} className='trending-img' />
              </Placeholder>

              <Placeholder animation="glow" className='p-3'>
                <Placeholder xs={12} className="w-75 " />
                <Placeholder animation="wave" className='px-3'>
                  <Placeholder xs={6} className="w-25 " />
                  <Placeholder xs={6} className="w-25 ms-5" />
                </Placeholder>
              </Placeholder>

            </div>}</div>
            {!localState.loader && (
              <div className='carousel container mx-auto gap-4 py-1'>
                {visibleItems.map((item: any) => (
                  <div className="carousel-item px-1">

                    <div className="card bg-primary-content lg:w-[300px] " onClick={() => handleHotCollectionItem(item)}>
                      <div className="">
                        <img src={item.logo} alt="" className="h-[300px] object-cover rounded-[16px]" />
                      </div>
                      <div className="p-5">
                        <h4 className="font-semibold text-2xl capitalize text-secondary">{item.collectionName}</h4>
                        <div className="">

                          <div className="flex justify-between items-center mt-[18px]">
                            <label className="text-secondary text-base">Floor</label>
                            {item.flourValue && (
                              <>
                                <p className="text-secondary text-lg font-semibold flex-1 text-right break-all">
                                  {item.flourValue} {process.env.REACT_APP_TOKENNAME}
                                </p>
                              </>
                            )}
                            {!item.flourValue && (
                              <>
                                <p className=" text-secondary text-lg font-semibold flex-1 text-right break-all">{item.flourValue || '-'}</p>
                              </>
                            )}
                          </div>
                          <div className="flex justify-between items-center mt-4">
                            <label className="text-secondary text-base flex-1">Total Valume</label>
                            <p className="text-secondary text-lg font-semibold flex-1 text-right break-all">
                              {item.totalVolume} {process.env.REACT_APP_TOKENNAME}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>


                  </div>))}
              </div>

            )}
            <div className="mt-5">
              {(
                <Button handleClick={() => handleSlideActions("previous")} btnClassName="!p-0 !shadow-none !bg-transparent">
                  {" "}
                  <span className="icon carousal-left-arrow cursor-pointer mr-1"></span>
                </Button>
              )}
              {(
                <Button handleClick={() => handleSlideActions("next")} btnClassName="!p-0 !shadow-none !bg-transparent">
                  {" "}
                  <span className="icon carousal-right-arrow cursor-pointer"></span>
                </Button>
              )}
            </div>

          </div>
        </>
      )}
    </>
  );
}
