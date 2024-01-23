import React from "react";
import loadimg from "../../src/assets/images/loader.svg";

const Loader = () => {
  return (
    <div>
      <div className="flex justify-center">
        <div className="loading-overlay">
          <div className="text-center image-container">
            <img className="" src={loadimg} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
