import React from 'react';
import VideoCarousal from '../videocarousal';
import MoviesCard from './MoviesCard';
import GenresCardSlider from './GenresCardSlider';
import WebSeriesCard from './WebSeriesCard';
import WebSeriesComponent from './WebSeries';
import TopChannels from './TopChannels';
import NaviLink from '../../../ui/NaviLink';
import StreamingBannerShimmer from '../Loaders/StreamingDashboard';
import MovieShimmer from '../Loaders/MoviecardShimmer';


export default function StreamingDashboard() {


  return (
    <>
            <div className="mx-auto max-sm:px-3 md:mt-3 container">       
        <VideoCarousal/>
        <div className="grid md:grid-cols-3 gap-4 my-4">
        <NaviLink path='/streamingdetailview'><MoviesCard badge='true' /></NaviLink>
        <MoviesCard/>
        <MovieShimmer/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
        </div>
        <div className='my-10'>
        <GenresCardSlider/>
        </div>
        <hr className='mb-[30px] mt-[40px]' />
        <div>
          <TopChannels/>
        </div>
        <div className='my-10'>
        <WebSeriesComponent/>
        </div>
        </div>
    </>
  );
}
