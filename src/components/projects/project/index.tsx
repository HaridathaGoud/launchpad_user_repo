import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { get } from "../../../utils/api";
import { setError } from "../../../reducers/layoutReducer";
import ProjectdetailsView from "./projectdetailsView";
import { guid } from "../../../utils/constants";
import ProjectDetailsCard from "./projectDetailsCard";
import ApplyNow from "../../applynow";
import SwipeUp from "../../../ui/swipeUp";

const Projectdetails = () => {
  const allocationsRef = useRef(null);
  const rootDispatch = useDispatch();
  const { projectId, projectName } = useParams();
  const user = useSelector((store: any) => store.auth?.user);
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    if (projectId) {
      getDetails("all");
    }
  }, [user?.id]);
  const getDetails = async (fetch: string) => {
    const userId = user?.id && user?.id !== "" ? user?.id : guid;
    setLoader(true);
    try {
      let details = data ? { ...data } : {};
      if (fetch === "all") {
        let projectStatus = "";
        let swapPercentage = 0;
        const projectDetails = await get(
          "User/TokenInformation/" + projectId + "/" + userId
        );
        const projectFeed = await get("User/ProjectFeed/" + projectId);
        if (projectDetails.status === 200) {
          projectStatus = proStatus(projectDetails.data);
          swapPercentage = swapProgressBarCalculation(projectDetails);
          details = {
            ...details,
            projectDetails: projectDetails.data,
            projectStatus: projectStatus,
            swapPercentage: swapPercentage,
          };
        } else {
          rootDispatch(setError({ message: projectDetails }));
        }
        if (projectFeed.status === 200) {
          details = { ...details, projectFeed: projectFeed.data };
        } else {
          rootDispatch(setError({ message: projectFeed }));
        }
      }
      setData(details);
    } catch (error) {
      rootDispatch(setError({ message: error }));
    } finally {
      setLoader(false);
    }
  };
  const swapProgressBarCalculation = (res: any) => {
    if (res.data.totalSoldTokens && res.data.totalSupply) {
      return (res.data.totalSoldTokens / res.data.totalSupply) * 100;
    }
    return 0;
  };

  const proStatus = (data: any) => {
    let privateStDate = data?.privateStartDate;
    let privateEndDate = data?.privateEndDate;
    let publicStDate = data?.publicStartDate;
    let publicEndDate = data?.publicEndDate;
    const now = new Date();
    const currentDate = now.toISOString();
    if (
      (currentDate >= privateStDate && currentDate <= publicEndDate) ||
      (currentDate >= publicStDate && currentDate <= privateEndDate)
    ) {
      return "ongoing";
    } else if (currentDate < privateStDate || currentDate < publicStDate) {
      return "upcoming";
    } else {
      return "closed";
    }
  };
  return (
    <div>
      <div className="container mx-auto md:mb-[90px] px-3 lg:px-0 max-sm:mb-5">
        <div className="">
          <div className="container">
            <div className="md:grid lg:grid-cols-12 mt-2 gap-7">
              <ProjectdetailsView
                loader={loader}
                data={data}
                projectId={projectId}
                projectName={projectName}
                proStatus={proStatus}
                swapProgressBarCalculation={swapProgressBarCalculation}
                allocationsRef={allocationsRef}
                getDetails={getDetails}
              />
              <ProjectDetailsCard
                loader={loader}
                pjctInfo={data?.projectDetails}
                currentPjct={data?.projectStatus}
                swapedPercentage={data?.swapPercentage}
              />
            </div>
          </div>
        </div>
      </div>
      <ApplyNow />
      <div className="max-md:hidden">
        <SwipeUp />
      </div>
    </div>
  );
};
export default Projectdetails;
