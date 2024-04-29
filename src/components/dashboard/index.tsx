import React from "react";
import ProjectInformation from "./projectInformation";
import FeaturedIvos from "./featuredIvos";
import DashboardSteps from "./dashboardSteps";
import ApplyNow from "../applynow";
import TrendingProjects from "./trendingProjects";
import ProjectCardComponent from "../projects/projectCards";
export default function Dashboard() {
  return (
    <div className="">
      <div className="container mx-auto px-3 lg:px-0 mt-3">
        {
          <>
            <TrendingProjects />
            <ProjectInformation />
            <FeaturedIvos />
            <ProjectCardComponent from={'dashBoard'}/>
            <DashboardSteps />
          </>
        }
      </div>
      {<ApplyNow />}
    </div>
  );
}
