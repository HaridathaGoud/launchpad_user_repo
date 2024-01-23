import React,{useState} from 'react';
import movies from '../../../assets/images/movies.png'
import TrendingVideos from './MovieCarousal';
import MovieVideos from './MovieCarousal';

const Movies = () => {
 
  return (
   <>
   <div className="container mx-auto">
   <div className='flex items-center gap-5 mt-6'>
    <img src={movies} alt="" />
    <div>
      <h2 className='text-secondary text-lg font-medium'>Movies</h2>
      <p className='text-scondary'>Watch the latest and greatest hits</p>
    </div>
   </div>
   <MovieVideos/>
   </div>
   </>
  );
};

export default Movies;
