import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { convertUTCToLocalTime, get } from "../../../utils/api";
import { setError } from "../../../reducers/layoutReducer";
import ProjectdetailsView from "./projectdetailsView";
import { guid } from "../../../utils/constants";
import ProjectDetailsCard from "./projectDetailsCard";
import ApplyNow from "../../applynow";
import SwipeUp from "../../../ui/swipeUp";
import useContractMethods from "../../../hooks/useContract";

const Projectdetails = () => {
  const allocationsRef = useRef(null);
  const rootDispatch = useDispatch();
  const { projectId, projectName } = useParams();
  const {getTotalSoldTokens}=useContractMethods()
  const user = useSelector((store: any) => store.auth?.user);
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState<any>(null);
  const [status,setStatus]=useState({private:'',public:''})
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

  const proStatus = (details: any=data?.projectDetails) => {
    let privateStDate = details?.privateStartDate;
    let privateEndDate = details?.privateEndDate;
    let publicStDate = details?.publicStartDate;
    let publicEndDate = details?.publicEndDate;
    const privateEndTimeInSec=Math.floor(convertUTCToLocalTime(privateEndDate).getTime()/1000)
    const publicEndTimeInSec=Math.floor(convertUTCToLocalTime(publicEndDate).getTime()/1000)
    const privateStartTimeInSec=Math.floor(convertUTCToLocalTime(privateStDate).getTime()/1000)
    const publicStartTimeInSec=Math.floor(convertUTCToLocalTime(publicStDate).getTime()/1000)
    const timeInSec=Math.floor(new Date().getTime() / 1000);
    if(timeInSec<privateStartTimeInSec){
      setStatus({private:'Upcoming',public:'Upcoming'})
      return false
    }else if(timeInSec>=privateStartTimeInSec && timeInSec<privateEndTimeInSec){
      setStatus({private:'Ongoing',public:'Upcoming'})
      return true
    }else if(timeInSec>=privateEndTimeInSec && timeInSec<publicStartTimeInSec){
      setStatus({private:'Ended',public:'Upcoming'})
      return false
    }else if(timeInSec>=publicStartTimeInSec && timeInSec<publicEndTimeInSec){
      setStatus({private:'Ended',public:'Ongoing'})
      return true
    }else{
      setStatus({private:'Ended',public:'Ended'})
      return false
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
                status={status}
              />
              <ProjectDetailsCard
                loader={loader}
                pjctInfo={data?.projectDetails}
                currentPjct={data?.projectStatus}
                swapedPercentage={data?.swapPercentage}
                status={status}
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
