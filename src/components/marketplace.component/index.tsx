import React, { useEffect,useRef } from 'react';
// import Category from '../../components/category.component';//we are using in Feature
import HotCollections from '../marketplace.component/hotcollections.component/index';
import TopSeller from '../marketplace.component/topseller.component/index';
import TrendingNfts from '../marketplace.component/trendingnfts.component/index';
import Banner from './banner';

export default function DashBoard() {
  const scrollableRef = useRef<any>(null);
  useEffect(()=>{
scrollableRef?.current?.scrollIntoView(0,0);
  },[])
  return (
    <>
     <div ref={scrollableRef}></div>
      <Banner />
      <TopSeller />
      <TrendingNfts />
      <HotCollections />
      {/* We are using these are in Feature */}
      {/* <Category />  */} 
      {/* <Subscribe /> */}
    </>
  );
}
