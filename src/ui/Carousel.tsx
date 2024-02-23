import React, { useRef, useState } from "react";
import Button from "./Button";
import { navigateToUniswap } from "../utils/commonNavigations";
import formatDate from "../utils/formatDate";

interface CarouselProps {
  data: any;
  indicator?: string;
  hasContent?: boolean;
  className?: string;
}
const statusColourList = {
  Ongoing: 'dot-green',
  Closed: 'dot-red',
  Upcoming: 'dot-orange',
};
const Carousel = ({
  data,
  indicator,
  hasContent,
  className,
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
                className={`carousel-item w-full block md:flex items-center md:gap-x-5 overflow-y-hidden ${hasContent ? "lg:min-h-[500px]" : ""}`}
              >
                <div className={`${hasContent ? "flex-1 lg:h-full " : "w-full"}`}>
                  <img
                    src={`${image.image}`}
                    className={`${
                      hasContent
                        ? "lg:h-full lg:w-[500px] object-cover"
                        : "carosalImage rounded-2xl w-full object-cover"
                    }`}
                    alt={image.name ? image.name : "carousel-image"}
                  />
                </div>
                {hasContent && (
                  <div className="flex-1">
                    <div className="flex-1 p-4 md:p-0">
                      <div className="flex gap-4 items-center">
                        <div className={`${statusColourList[image.type]}  px-3 py-1 rounded flex items-center`}>
                          <span className="align-middle bg-white mr-1 w-3 h-3 rounded-full inline-block mb-[2px]"></span>
                          <span className="inline-block text-base-100 text-sm">
                            {image.type}
                          </span>
                        </div>
                        <div>
                          <span className={`usdt icon scale-[1.4] mr-1`}></span>
                          <span className="font-medium text-black">{image.tokenNetwork}</span>
                        </div>
                      </div>
                      <h1 className="text-[52px] font-bold text-primary mt-3.5 capitalize">
                        {image.name.toLowerCase()}
                      </h1>
                      <h2 className="text-[32px] leading-[0.8] mb-[38px] md:text-[42px] text-black">
                        Web Series
                      </h2>
                      <div className="flex gap-x-8 md:pb-0">
                        <div>
                          <p className="text-neutral font-[500] text-base">
                            Public Opens
                          </p>
                          <p className="text-xl text-black">{`${formatDate(image.publicSaleStartDate,'DD/MM/YYYY HH:mm:ss')}`}</p>
                        </div>
                        <div>
                          <p className="text-neutral font-[500] text-base">
                            Public Closes
                          </p>
                          <p className="text-xl text-black">{`${formatDate(image.publicSaleEndDate,'DD/MM/YYYY HH:mm:ss')}`}</p>
                        </div>
                      </div>
                      <div className="mt-3.5 max-sm:mb-8 max-sm:text-center">
                        <Button
                          type="secondary"
                          handleClick={() => navigateToUniswap()}
                        >
                          Buy YBT
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div
          className={`flex justify-center w-full py-2 gap-2 absolute bottom-6 max-sm:bottom-4`}
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
