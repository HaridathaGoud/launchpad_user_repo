import React from "react";
import DaoCardShimmer from "../../Dao/shimmers/daodashboard";


const DaosPageShimmer = () => {
  return (
    <div className="container mx-auto px-3 lg:px-0 mt-4">
      <div className="px-0 md:px-4 mx-auto max-w-[1012px] mt-[42px]">
      <div className="grid gap-[24px] md:grid-cols-3 lg:grid-cols-4">
        {[...Array(8)].map((_, index) => (
          <div key={index}>
            <DaoCardShimmer />
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default DaosPageShimmer;
