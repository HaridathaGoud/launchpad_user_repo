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
      <div className="container mx-auto px-3 lg:px-0 mt-3">
        {
          <>
            <TrendingProjects />
            <ProjectInformation />
            <FeaturedIvos />
            {/* <LaunchpadIvos/> */}
            <Projectscomponent pjctType="Ongoing" pageSize="3" showBreadcrumb={false} />
            <Projectscomponent pjctType="Upcoming" pageSize="3" showBreadcrumb={false} />
            <Projectscomponent pjctType="Closed" pageSize="3" showBreadcrumb={false} />
            <DashboardSteps />
          </>
        }
      </div>
      {<ApplyNow />}
    </div>
  );
}
