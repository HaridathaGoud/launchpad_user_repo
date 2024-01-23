import React from "react";
import ProjectInformation from "./projectInformation";
import FeaturedIvos from "./featuredIvos";
import Projectscomponent from "../projects/projectsComponent";
import DashboardSteps from "./dashboardSteps";

import ApplyNow from "../applynow";
import TrendingProjects from "./trendingProjects";
export default function Dashboard() {
  return (
    <div className="">
      <div className="container mx-auto max-sm:px-3 mt-3">
        {
          <>
            <TrendingProjects />
            <ProjectInformation />
            <FeaturedIvos />
            <Projectscomponent pjctType="Ongoing" pageSize="3" />
            <Projectscomponent pjctType="Upcoming" pageSize="3" />
            <Projectscomponent pjctType="Closed" pageSize="3" />
            <DashboardSteps />
          </>
        }
      </div>
      {<ApplyNow />}
    </div>
  );
}
