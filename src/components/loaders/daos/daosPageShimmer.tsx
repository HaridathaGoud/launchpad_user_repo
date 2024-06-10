import React from "react";
import DaoCardShimmer from "../../Dao/shimmers/daodashboard";


const DaosPageShimmer = () => {
  return (
    <div className="container mx-auto px-3 lg:px-0 mt-4">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, index) => (
          <div key={index}>
            <DaoCardShimmer />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DaosPageShimmer;
