import React,{ useEffect, useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { browserByCategoryreducer ,browserByCategoryState} from './reducer';
import { setError } from "../../../reducers/layoutReducer";
import { getMarketplace } from '../../../utils/api';

export default function BrowseByCategory() {
  const rootDispatch = useDispatch();
  const router = useNavigate();
  const { address, isConnected } = useAccount();
  const [localState, localDispatch] = useReducer(browserByCategoryreducer, browserByCategoryState);
  useEffect(() => {
    getBrowseByCategoryDetails();
  }, [isConnected]); // eslint-disable-line react-hooks/exhaustive-deps
  const getBrowseByCategoryDetails = async () => {
    debugger
    try {
      localDispatch({ type: 'setLoader', payload: true });
      const response = await getMarketplace("User/GetAllCategories/10/0");
      if (response.statusText.toLowerCase() === 'ok') {
        localDispatch({type:'setBrowseByCategoryList',payload:response.data});
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
  console.log(localState.browseByCategoryList)
  return (
    <>
    {localState.browseByCategoryList.length > 0 && (
      <>
            <div className="container mx-auto mt-[40px]">
        <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-secondary mb-4">Browse by category</h2>
        <a href="" className='text-primary text-base font-medium'>View All</a>
        </div>

        <div className="grid lg:grid-cols-4 gap-4">
          {localState.browseByCategoryList?.map((item: any, idx: any)=>
         <>
         <Link to={'/marketplace/categoryview'}>
          <div className='card bg-primary-content border border-slate-200 w-full'>
            <img src={item?.image} className='h-[130px] object-cover rounded-t-2xl w-full' alt="" />
            <div className="flex gap-1 mt-1">
             <div className='flex-1'> <img src={item?.image} alt="" className='h-[100px] object-cover w-full'/></div>
             <div className='flex-1'> <img src={item?.image}  alt="" className='h-[100px] object-cover w-full' /></div>
             <div className='flex-1'> <img src={item?.image}  alt="" className='h-[100px] object-cover w-full' /></div>
            </div>
            <div className='pt-2 px-5 pb-4'>
              <h1 className='text-lg text-secondary font-semibold truncate'>{item?.name}</h1>
            </div>
          </div></Link>
          </>
          )

}
        </div>
      </div>
      </>
    )}

    </>
  );
}
