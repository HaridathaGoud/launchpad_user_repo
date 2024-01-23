import React, { useRef, useState } from "react";

const BannerCarousel = ({ images, indicator,content,className }) => {
  const [currentImg, setcurrentImg] = useState(0);
  const carouselRef = useRef(null);
  function handleIndicatorClick(img) {
    setcurrentImg(img);
    const imgRef = carouselRef?.current.children[img];
    imgRef.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  return (
    <div className="relative banner flex flex-col">
      <div className={`carousel w-full carousel-end rounded-2xl overflow-y-hidden ${className}`} ref={carouselRef} > 
        {images.map((image, index) => {
          return (
            <div id={index} key={index} className="carousel-item w-full block md:flex items-center md:gap-x-5 overflow-y-hidden">
             <div className="w-full">
             <img
                src={`${image.url}`}
                className="carosalImage rounded-2xl w-full object-cover"
                alt={image.alt ? image.alt : "carousel-item"}
              />
             </div>              
            </div>
          );
        })}
      </div>
      <div className={`flex justify-center w-full py-2 gap-2 absolute bottom-4`}>
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => handleIndicatorClick(index)}
            className={`btn btn-xs min-h-[14px] min-w-[14px] w-[14px] p-0 h-3 rounded-full border-0 ${
              currentImg === index ? "bg-red-600" : "bg-slate-400"
            }`}
          >
            {indicator ? indicator : ""}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;
