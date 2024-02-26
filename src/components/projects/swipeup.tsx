import React, { useState, useEffect } from 'react';
import swipeup from '../../assets/images/swipeup.gif'

const SwipeUpComponent = () => {
  const [isVisible, setIsVisible] = useState(false); // Start with isVisible set to false

  useEffect(() => {
    const handleScroll = () => {
      // Check if the user has scrolled down a certain distance (e.g., 100 pixels)
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleTouchStart = (e) => {
    // Your touch start logic here
  };

  const handleTouchMove = (e) => {
    // Your touch move logic here
  };

  const handleComponentClick = () => {
    // Scroll to the top when the component is clicked
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onClick={handleComponentClick}
      className={`swipe-up-component fixed w-[100px] md:right-10 right-4 cursor-pointer bottom-12 text-center ${isVisible ? '' : 'hidden'}`}      
    >
     <img src={swipeup} alt="" width={60} className='mx-auto' />
     <p className='text-secondary'>Swipe up</p>
    </div>
  );
};

export default SwipeUpComponent;
