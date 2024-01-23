import React,{useState} from 'react';
import trending from '../../../assets/images/trending.png'
import TrendingVideos from './TrendingCarousal';

const Trending = () => {
 
  return (
   <>
   <div className="container mx-auto">
   <div className='flex items-center gap-5 mt-6'>
    <img src={trending} alt="" />
    <div>
      <h2 className='text-secondary text-lg font-medium'>Trending</h2>
      <p className='text-scondary'>Watch the latest and greatest hits</p>
    </div>
   </div>
   <TrendingVideos/>
   </div>
   </>
  );
};

export default Trending;
