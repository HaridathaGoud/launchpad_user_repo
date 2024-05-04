import React from "react";
import ProjectCardShimmer from "./projectCardShimmer";

const ProjectCardsShimmers = () => {
  return (
    <div className="container mx-auto mt-24">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ProjectCardShimmer></ProjectCardShimmer>
        <ProjectCardShimmer></ProjectCardShimmer>
        <ProjectCardShimmer></ProjectCardShimmer>
        <ProjectCardShimmer></ProjectCardShimmer>
        <ProjectCardShimmer></ProjectCardShimmer>
        <ProjectCardShimmer></ProjectCardShimmer>
      </div>
    </div>
  );
};

export default ProjectCardsShimmers;
