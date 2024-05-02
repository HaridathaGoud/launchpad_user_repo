import React from "react";
import ProjectCardShimmer from "./projectCardShimmer";

const ProjectCardsShimmers = () => {
  return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 container">
        <ProjectCardShimmer></ProjectCardShimmer>
        <ProjectCardShimmer></ProjectCardShimmer>
        <ProjectCardShimmer></ProjectCardShimmer>
        <ProjectCardShimmer></ProjectCardShimmer>
        <ProjectCardShimmer></ProjectCardShimmer>
        <ProjectCardShimmer></ProjectCardShimmer>
      </div>
  );
};

export default ProjectCardsShimmers;
