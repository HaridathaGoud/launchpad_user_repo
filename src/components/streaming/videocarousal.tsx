import React,{useState} from 'react';
import animal from '../../assets/images/animal-banner.png';
import salaar from '../../assets/images/salar.png';
import salaarbanner from '../../assets/images/salar-banner.png';
import animalbanner from '../../assets/images/animal-bg.png';
import captain from '../../assets/images/captain-america.svg';
import {Image} from 'react-bootstrap';
import SecondaryButtonMd from '../button/secondarybuttonmd';
import trailer from "../../assets/video/Adipurush.mp4";
import salartrailer from "../../assets/video/salaartrailer.mp4";
import { Link } from 'react-router-dom';

const Carousel = () => {
  const [activeItem, setActiveItem] = useState(0);

  const handleArrowClick = (direction) => {
    if (direction === 'prev') {
      setActiveItem((prevItem) => (prevItem === 0 ? totalItems - 1 : prevItem - 1));
    } else if (direction === 'next') {
      setActiveItem((prevItem) => (prevItem === totalItems - 1 ? 0 : prevItem + 1));
    }
  };

  const totalItems = 2; // Update this based on the total number of items in your carousel

  return (
    <div className="rounded-2xl overflow-y-hidden h-[320px]">
      <div className={`relative banner h-[320px]`}>
        <div className="carousel w-full h-[320px]">
        <div id="item1" className="carousel-item w-full block overflow-y-hidden relative">
                <div className='w-full h-[320px]'>
                    
               <Image src={salaarbanner} className={`object-cover w-full h-[320px]`} />
                </div>

                <div className="overlay w-full h-full absolute left-0 top-0 bg-black bg-opacity-50 z-[5]"></div>
                <div className={`flex max-sm:flex-col max-sm:justify-center items-center absolute z-10 top-0 md:left-[120px] lg:left-[200px] top-[20px] md:gap-[65px] `}>
                    <Image src={salaar} className={`object-contain h-[90px] md:h-[284px] w-[190px]`} />
                    <div className='max-sm:px-3 max-sm:text-center'>
                        <h1 className='font-semibold text-base-100 md:text-[32px]'><span className='uppercase'>salaar</span> Movie</h1>
                        <p className='text-lg font-medium text-base-100'>Action | Thriller Film</p>
                        <div className='lg:mt-7 flex mt-12'>
                          <Link to='/streamingdetailview'> <button className='font-semibold max-sm:text-md text-lg py-2 rounded-[30px] px-5 text-base-100 bg-primary whitespace-nowrap'><span className='video-icon icon'></span>Watch with 2Matic / $1.32</button></Link> 
                            <span className='relative ml-2 md:ml-6 cursor-pointer'>
                                <span className='icon shop-icon'></span>
                                <span className='icon shop-add absolute top-[-14px] right-0'></span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div id="item2" className="carousel-item w-full block overflow-y-hidden relative">
                <div className='w-full h-[320px]'>
                    {/* <video controls autoPlay loop className='w-full'muted >
                        <source src={salartrailer} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video> */}
               <Image src={animalbanner} className={`object-cover w-full max-md:h-[320px]`} />
                </div>

                <div className="overlay w-full h-full absolute left-0 top-0 bg-black bg-opacity-50 z-[5]"></div>
                <div className={`flex max-sm:flex-col max-sm:justify-center items-center absolute z-10 top-0 md:left-[120px] lg:left-[200px] top-[20px] md:gap-[65px] `}>
                    <Image src={animal} className={`object-contain h-[90px] md:h-[284px] w-[190px]`} />
                    <div className='max-sm:px-3 max-sm:text-center'>
                        <h1 className='font-semibold text-base-100 md:text-[32px]'><span className='uppercase'>Animal</span> Movie</h1>
                        <p className='text-lg font-medium text-base-100'>Action | Thriller Film</p>
                        <div className='lg:mt-7 flex mt-12'>
                        <Link to='/streamingdetailview'><button className='font-semibold max-sm:text-md text-lg py-2 rounded-[30px] px-5 text-base-100 bg-primary whitespace-nowrap'><span className='video-icon icon'></span>Watch with 2Matic / $1.32</button></Link>
                            <span className='relative ml-2 md:ml-6 cursor-pointer'>
                                <span className='icon shop-icon'></span>
                                <span className='icon shop-add absolute top-[-14px] right-0'></span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Arrows */}
        <div className="absolute z-[99] flex justify-between items-center top-[45%] w-full md:px-10">
          <span
            className="icon left-arrow cursor-pointer"
            onClick={() => handleArrowClick('prev')}
          ></span>
          <span
            className="icon right-arrow cursor-pointer"
            onClick={() => handleArrowClick('next')}
          ></span>
        </div>

        {/* Dots */}
        <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-[6%] left-1/2 active-dot">
          {Array.from({ length: totalItems }, (_, index) => (
            <a
              key={index}
              href={`#item${index + 1}`}
              className={`w-3 h-3 rounded-full ${
                index === activeItem ? 'bg-red-600' : 'bg-slate-400'
              }`}
            ></a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
