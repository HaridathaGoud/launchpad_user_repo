import React, { useEffect, useRef, useState } from "react";
import { get } from "../../utils/api";
import { useParams } from "react-router-dom";
import { store } from "../../store";
import { connect, useDispatch } from "react-redux";
import ProjectDetailTabs from "./projectDetailTabs";
import CastAndCrewMember from "./castAndCrew/index";
import FoundingMember from "../projects/founders/index";
import BuyMembership from "./buyMembership/index";
import ApplyNow from "../applynow";
import ProjectDetailsCard from "./project/projectDetailsCard";
import ProjectBanner from "./projectBanner";
import ProjectFeed from "./projectfeed";
import Allocations from './allocations/index';
import Claims from "./claims/index";
import CommonCreateProposal from "../Dao/proposals/index";
import BreadCrumb from "../../ui/breadcrumb";
import SwipeUp from "../../ui/swipeUp";
import { setError } from "../../reducers/layoutReducer";
import { ProjectDetailTabsShimmer } from "../loaders/projectDetailTabsShimmer";
import { ProjectFeedShimmer } from "../loaders/projectFeedShimmer";
import { ProjectViewCastCrewShimmer } from "../loaders/projectViewCastCrewShimmer";
import { ProjectViewAllocationClaimShimmer } from "../loaders/projectViewAllocationClaimShimmer";
import { ProjectViewTokendetailsCardShimmer } from "../loaders/projectViewTokendetailsCardShimmer";
import { ProjectViewBannerShimmer } from "../loaders/projectViewBannerShimmer";

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
  }, [user?.user?.id]); // eslint-disable-line react-hooks/exhaustive-deps
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
    <>
      <div className="container mx-auto md:mb-[90px] px-3 lg:px-0 max-sm:mb-5">
        <div className="">
          <div className="container">
            <div className="md:grid lg:grid-cols-12 mt-2 gap-7">
              <div className="lg:col-span-8">
                {loader && (
                  <ProjectViewBannerShimmer/>
                )}
                {!loader && (
                  <ProjectBanner bannerImage={data?.projectFeed?.bannerImage} />
                )}
                <div className="mt-2 mb-4">
                  <BreadCrumb />
                  {loader && (
                    <ProjectDetailTabsShimmer/>
                  )}
                  {!loader && (
                    <div className="sticky top-[73px] z-10">
                      <ProjectDetailTabs pjctInfo={data?.projectDetails} />
                    </div>
                  )}
                  <div>
                    <div id="projectFeed">
                      <h4
                        className={`text-base font-semibold text-secondary mt-4`}
                      >
                        About Project
                      </h4>
                      {!loader && <ProjectFeed pjctFeed={data?.projectFeed} />}
                      {loader && (
                        <ProjectFeedShimmer/>
                      )}
                    </div>
                    <h4
                      className={`text-base font-semibold text-secondary mb-2 mt-8`}
                    >
                      Founding Members
                    </h4>
                    <FoundingMember
                      projectId={projectId}
                      projectName={projectName}
                      proStatus={proStatus}
                      swapProgressBarCalculation={swapProgressBarCalculation}
                    />
                    <h4
                      className={`text-base font-semibold text-secondary mb-2 mt-8`}
                    >
                      Cast & Crew
                    </h4>
                    {!loader && (
                      <CastAndCrewMember
                        castCrewsData={data?.projectDetails?.cast_Crews}
                        projectId={projectId}
                        projectName={projectName}
                      />
                    )}
                    {loader && (
                      <ProjectViewCastCrewShimmer/>
                    )}
                    <hr className="my-5" />
                  </div>
                  <div id="allocationClaim" ref={allocationsRef}>
                    {loader && (
                      <ProjectViewAllocationClaimShimmer/>
                    )}
                    {!loader &&
                      data?.projectDetails?.tokenType === "ERC-20" && (
                        <div className="project-detail">
                          <div>
                            <Allocations
                              pjctInfo={data?.projectDetails}
                              pid={projectId}
                              getDetails={() => getDetails("all")}
                            />
                            <Claims
                              pjctInfo={data?.projectDetails}
                              pid={projectId}
                              getDetails={() => getDetails("all")}
                            />
                          </div>
                        </div>
                      )}
                  </div>
                  <div id="buyMembership">
                    {!loader &&
                      data?.projectDetails?.tokenType === "ERC-721" && (
                        <div>
                          <BuyMembership
                            daoId={data?.projectDetails?.daoId}
                            contractAddress={
                              data?.projectDetails?.contractAddress
                            }
                          />
                        </div>
                      )}
                  </div>
                  <hr className="my-5" />
                  <div id="dao">
                    <h2 className="text-2xl font-medium">
                      <span className="text-secondary">D</span>
                      <span className="text-primary">ao</span>
                    </h2>
                    {data?.projectDetails?.daoId && (
                      <CommonCreateProposal
                        pjctInfo={data?.projectDetails}
                        showBreadcrumb={false}
                        from="project"
                        showHeader={false}
                      />
                    )}
                  </div>
                </div>
              </div>

              {!loader && (
                <ProjectDetailsCard
                  pjctInfo={data?.projectDetails}
                  currentPjct={data?.projectStatus}
                  swapedPercentage={data?.swapPercentage}
                />
              )}
              {loader && (
                <ProjectViewTokendetailsCardShimmer/>
              )}
            </div>
          </div>
        </div>
      </div>
      <ApplyNow />
      <div className="max-md:hidden">
        <SwipeUp />
      </div>
    </>
  );
};

const connectStateToProps = ({ auth }) => {
  return { auth: auth };
};
export default connect(connectStateToProps, (dispatch) => {
  return { dispatch };
})(Projectdetails);
