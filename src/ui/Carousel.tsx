import React, { useRef, useState } from "react";
import Button from "./Button";
import { navigateToUniswap } from "../utils/commonNavigations";
import formatDate from "../utils/formatDate";
interface CarouselProps {
  data: any;
  indicator?: string;
  hasContent?: boolean;
  className?: string;
  isWelcome?: boolean;
}
const statusColourList = {
  Ongoing: "dot-green",
  Closed: "dot-red",
  Upcoming: "dot-orange",
};
const Carousel = ({
  data,
  indicator,
  hasContent,
  className,
  isWelcome,
}: CarouselProps) => {
  const [currentImg, setCurrentImg] = useState(0);
  const carouselRef = useRef(null);
  function handleIndicatorClick(img) {
    setCurrentImg(img);
    const imgRef = (carouselRef?.current as any)?.children?.[img];
    imgRef.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  return (
    <div className="carousal-banner rounded-2xl overflow-y-hidden">
      <div className="relative banner flex flex-col">
        <div
          className={`carousel w-full carousel-end ${className || ""}`}
          ref={carouselRef}
        >
          {data?.map((image) => {
            return (
              <div
                id={image.image}
                key={image.image + image?.name}
                className={`carousel-item w-full block overflow-y-hidden ${
                  hasContent ? "md:min-h-[500px]" : ""
                }`}
              >
                <div
                  className={`${
                    hasContent ? "flex-1 lg:h-full w-full" : "w-full h-full"
                  } relative`}
                >
                  <img
                    src={`${image.image}`}
                    className={`${
                      hasContent
                        ? "lg:h-full w-full object-cover h-[500px]"
                        : "carosalImage rounded-2xl w-full object-cover h-full"
                    }`}
                    alt={image.name ? image.name : "carousel-image"}
                  />
                  {!isWelcome && <div className="absolute inset-0 bg-banner hidden md:block"></div>}
                  {hasContent && (
                    <div
                      className={`flex flex-col justify-center items-center ${isWelcome ? 'max-sm:justify-end' :'justify-center'} max-sm:items-center bg-gradient-to-l from-black to-transparent max-sm:bg-gradient-to-t absolute z-[10] top-0 right-0 w-full h-full lg:w-[50%]`}
                    >
                      <div className="p-4 md:p-0 relative">
                        {!isWelcome && (
                          <div className="flex gap-4 items-center">
                            <div
                              className={`${
                                statusColourList[image.type]
                              }  px-3 py-1 rounded flex items-center`}
                            >
                              <span className="align-middle bg-white mr-1 w-3 h-3 rounded-full inline-block mb-[2px]"></span>
                              <span className="inline-block text-base-100 text-sm">
                                {image.type}
                              </span>
                            </div>
                            <div>
                              <span
                                className={`usdt icon scale-[1.4] mr-1`}
                              ></span>
                              <span className="font-medium text-white">
                                {image.tokenNetwork}
                              </span>
                            </div>
                          </div>
                        )}
                        {!isWelcome &&<h1 className="text-[26px] md:text-[52px] font-bold text-primary mt-3.5 capitalize line-clamp-1 overflow-hidden">
                          { image.name.toLowerCase()}
                      
                        </h1>}
                        {isWelcome && (
                            <>
                              <p className="text-[42px] md:text-[52px] font-bold text-white capitalize">
                              Invest in the future  <br className="hidden md:block" />{" "}
                              of Web3
                              </p>
                            </>
                          )}
                        {!isWelcome && (
                          <h2 className="text-[26px] leading-[0.8] mb-[30px] md:text-[42px] text-white">
                            {image.category
                              ? image.category
                              : "Animation Web Series"}
                          </h2>
                        )}
                          {isWelcome &&
                           <p className="w-full text-[14px] md:text-[16px] text-white mt-3.5 text">Your gateway to innovation with IVO's Initial Video Offerings, <br /> Join us and skyrocket your vision into success!</p>}
                        {!isWelcome && (
                          <div className="flex gap-x-8 md:pb-0 mb-2">
                            <div>
                              <p className="text-white font-[500] text-base">
                                Public Opens
                              </p>
                              <p className="text-xl text-white">{`${formatDate(
                                image.publicSaleStartDate,
                                "DD/MM/YYYY HH:mm:ss"
                              )} (UTC)`}</p>
                            </div>
                            <div>
                              <p className="text-white font-[500] text-base">
                                Public Closes
                              </p>
                              <p className="text-xl text-white">{`${formatDate(
                                image.publicSaleEndDate,
                                "DD/MM/YYYY HH:mm:ss"
                              )} (UTC)`}</p>
                            </div>
                          </div>
                        )}
                        <div className="mt-8 max-sm:mb-8 max-sm:text-center">
                            <Button
                              type="primary"
                              handleClick={() => navigateToUniswap()}
                            >
                              Buy {process.env.REACT_APP_TOKEN_SYMBOL}
                            </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div
          className={`flex justify-center w-full py-2 gap-2 absolute bottom-6 max-sm:bottom-4 z-[10]`}
        >
          {data?.map((image, index) => (
            <button
              key={image.url + image?.name}
              onClick={() => handleIndicatorClick(index)}
              className={`btn btn-xs min-h-[14px] min-w-[14px] w-[14px] p-0 h-3 rounded-full border-0 ${
                currentImg === index ? "bg-red-600" : "bg-slate-400"
              }`}
            >
              {indicator || ""}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
