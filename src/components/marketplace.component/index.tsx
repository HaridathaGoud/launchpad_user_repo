import React, { useEffect,useRef } from 'react';
// import Category from '../../components/category.component';//we are using in Feature
import HotCollections from '../marketplace.component/hotcollections.component/index';
import TopSeller from '../marketplace.component/topseller.component/index';
import TrendingNfts from '../marketplace.component/trendingnfts.component/index';
import Banner from './banner';
import BrowseByCategory from './browsebycategory.component';

export default function DashBoard() {
  const scrollableRef = useRef<any>(null);
  useEffect(()=>{
scrollableRef?.current?.scrollIntoView(0,0);
  },[])
  return (
    <>
    <div className='md:mb-[90px] px-3 lg:px-0 max-sm:mb-5'>
    <div ref={scrollableRef}></div>
      <Banner />
      <TopSeller />
      <TrendingNfts />
      <HotCollections />
      <BrowseByCategory/>
    </div>
      {/* We are using these are in Feature */}
      {/* <Category />  */} 
      {/* <Subscribe /> */}
    </>
  );
}
