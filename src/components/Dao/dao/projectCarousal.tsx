// import { NextPage } from 'next';
import React, { useState } from "react";
import Image from "react-bootstrap/Image";
import aquaman from "../../../assets/images/aquaman.png";
import salarbanner from "../../../assets/images/salar-banner.png";

const ProjectCarousal = (props) => {
  return (
    <div className={`ProjectCarousal relative mx-auto container `}>
      <div
        className={`carousel w-full rounded-2xl overflow-y-hidden ${
          props.className || ""
        }`}
      >
        <div
          id="item1"
          className="carousel-item w-full block md:flex items-center md:gapx-5 lg:gapx-0"
        >
          <div className={`fullCarousal w-full max-sm:h-[380px]`}>
            <Image
              src={aquaman}
              className={`carosalImage rounded-2xl w-full	 object-cover`}
            />
          </div>
        </div>
        <div
          id="item1"
          className="carousel-item block md:flex w-full items-center md:gap-x-5 lg:gap-x-0"
        >
          <div className={`fullCarousal w-full`}>
            <Image
              src={salarbanner}
              className={`carosalImage rounded-2xl w-full	max-sm:h-[380px] object-cover`}
            />
          </div>
        </div>
        <div
          id="item1"
          className="carousel-item w-full block md:flex items-center md:gap-x-5 lg:gap-x-0"
        >
          <div className={`fullCarousal w-full`}>
            <Image
              src={aquaman}
              className={`carosalImage rounded-2xl w-full	max-sm:h-[380px] object-cover`}
            />
          </div>
        </div>
        <div
          id="item1"
          className="carousel-item w-full block md:flex items-center md:gap-x-5 lg:gap-x-0"
        >
          <div className={`fullCarousal w-full`}>
            <Image
              src={aquaman}
              className={`carosalImage rounded-2xl w-full	max-sm:h-[380px] object-cover`}
            />
          </div>
        </div>
      </div>
      <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2 active-dot">
        <a href="#item1" className="w-3 h-3 rounded-full bg-slate-400"></a>
        <a href="#item2" className="w-3 h-3 rounded-full bg-red-600"></a>
        <a href="#item3" className="w-3 h-3 rounded-full bg-slate-400"></a>
        <a href="#item4" className="w-3 h-3 rounded-full bg-slate-400"></a>
      </div>
    </div>
  );
};

export default ProjectCarousal;
