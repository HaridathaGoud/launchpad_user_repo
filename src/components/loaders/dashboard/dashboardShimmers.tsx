import React from "react";
import CarouselShimmer from "./carouselShimmer";
import ProjectInformationShimmer from "./projectInformation";
import FeaturedIvosShimmer from "./featuredIvosShimmer";

const DashboardShimmers = () => {
  return (
    <div className="container mx-auto px-3 lg:px-0 mt-3">
      <CarouselShimmer/>
      <ProjectInformationShimmer/>
      <div className="mt-8 mb-8">
      <FeaturedIvosShimmer/>
      </div>
    </div>
  );
};

export default DashboardShimmers;
