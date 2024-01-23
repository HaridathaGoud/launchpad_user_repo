import React,{useState} from 'react';
import trending from '../../../assets/images/trending.png'
import TrendingVideos from './TrendingCarousal';
import TopChannels from '../Dashboard/TopChannels';

const Channels = () => {
 
  return (
   <>
   <div className="container mx-auto">
   <div className="mt-4">
   <TopChannels/>
   <hr className='my-4' />
   </div>
   <div className="mt-4">
   <TopChannels/>
   <hr className='my-4' />
   </div>
   </div>
   </>
  );
};

export default Channels;
