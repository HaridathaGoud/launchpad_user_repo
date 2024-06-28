import React,{ useEffect, useReducer } from 'react';
import { getMarketplace } from '../../../utils/api';
import 'react-multi-carousel/lib/styles.css';
import { useNavigate } from 'react-router-dom';
import { hotCollectionReducer, hotcollectionState } from './reducer';
import { useDispatch } from 'react-redux';
import { setError } from "../../../reducers/layoutReducer";
import Button from "../../../ui/Button";
import NaviLink from '../../../ui/NaviLink';
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
       let response =  await getMarketplace(`User/HotCollectionsData/10/0/${null}/${null}`)
      if (response.status === 200) {
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
    router(`/marketplace/collection/${item.id}/view/${item?.collectionName}`);
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

  const visibleItems = localState.hotCollectionData ? [...localState.hotCollectionData?.slice(localState.currentIndex), ...localState.hotCollectionData?.slice(0, localState.currentIndex)].slice(0, 4) : [];
  return (
    <>
      {localState.hotCollectionData?.length > 0 && (
        <>
          <div className="container mx-auto mt-[40px]">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-secondary mb-4">Hot Collections</h2>
            <NaviLink path='/marketplace/hotcollectionsviewall' className='text-primary text-base font-medium'>View All</NaviLink>
           </div>
            {!localState.loader && (
              <div className='carousel container mx-auto gap-4 py-1'>
                {visibleItems.map((item: any) => (
                  <div className="carousel-item px-1 max-sm:w-full">

                    <div className="card bg-primary-content lg:w-[300px] cursor-pointer" onClick={() => handleHotCollectionItem(item)}>
                      <div className="">
                        <img src={item.logo} alt="" className="h-[300px] object-cover rounded-[16px] w-full" />
                      </div>
                      <div className="p-5">
                        <h4 className="font-semibold text-2xl capitalize text-secondary truncate" title={item.collectionName}>{item.collectionName}</h4>
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
                            <p className="text-secondary text-lg font-semibold flex justify-end flex-1 text-right break-all truncate" title={item.totalVolume}>
                             <span className='truncate'> {item.totalVolume}</span> <span>{process.env.REACT_APP_TOKENNAME}</span>
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
