import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { store } from '../../../store';
import { get } from '../../../utils/api';
import { setError } from '../../../reducers/layoutReducer';
import ProjectdetailsView from './projectdetailsView';

const Projectdetails = () => {
  const allocationsRef = useRef(null);
  const rootDispatch = useDispatch();
  const { projectId, projectName } = useParams();
  const user = store.getState().auth;
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    if (projectId) {
      getDetails("all");
    }
  }, [user?.user?.id]);
  const getDetails = async (fetch) => {
    const userId =
      user?.user?.id && user?.user?.id != ""
        ? user?.user?.id
        : "00000000-0000-0000-0000-000000000000";
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
    <ProjectdetailsView
    loader={loader}
    data={data}
    projectId={projectId}
    projectName={projectName}
    proStatus={proStatus}
    swapProgressBarCalculation={swapProgressBarCalculation}
    allocationsRef={allocationsRef}
    getDetails={getDetails} />
  )
}
export default Projectdetails;