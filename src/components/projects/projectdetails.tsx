import React, { useRef, useEffect, useState } from "react";
import { get } from "../../utils/api";
import { useParams } from "react-router-dom";
import { store } from "../../store";
import { useAccount } from "wagmi";
import { connect, useDispatch } from "react-redux";
import ProjectViewTabs from "../Dao/projecttabs";
import CastAndCrewMember from "./castandcrewmember";
import FoundingMember from "./foundingmember";
import BuyMembership from "./buyMembership/index";
import ApplyNow from "../applynow";
import DetailViewShimmer from "../loaders/DetailViewShimmer";
import ProjectDetailsCard from "./projectDetailsCard";
import ProjectBanner from "./projectBanner";
import ProjectFeed from "./projectfeed";
import Allocations from "./allocations";
import Claims from "./claims";
import CommonCreateProposal from "../Dao/proposals/index";
import BreadCrumb from "../../ui/breadcrumb";
import SwipeUpComponent from "./swipeup";
import { setError } from "../../reducers/layoutReducer";

const Projectdetails = () => {
  const rootDispatch = useDispatch();
  const { projectId, projectName } = useParams();
  const user = store.getState().auth;
  const allocationRef = useRef(null);
  const buyMembershipRef = useRef(null);
  const [loader, setLoader] = useState(false);
  const [daoTab, setDaoTab] = useState(false);
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
        const founders = await get("User/stakers/" + projectId);
        const allocations = await get(
          "User/Allocations/" + projectId + "/" + userId
        );
        const claims = await get("User/Claims/" + projectId + "/" + userId);
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
        if (founders.status === 200) {
          details = { ...details, founders: founders.data };
        } else {
          rootDispatch(setError({ message: founders }));
        }
        if (allocations.status === 200) {
          details = { ...details, allocations: allocations.data };
        } else {
          rootDispatch(setError({ message: allocations }));
        }
        if (claims.status === 200) {
          details = { ...details, claims: claims.data };
        } else {
          rootDispatch(setError({ message: claims }));
        }
      } else if (fetch === "allocations") {
        const allocations = await get(
          "User/Allocations/" + projectId + "/" + userId
        );
        if (allocations.status === 200) {
          details = { ...details, allocations: allocations.data };
        } else {
          rootDispatch(setError({ message: allocations }));
        }
      } else if (fetch === "claims") {
        const claims = await get("User/Claims/" + projectId + "/" + userId);
        if (claims.status === 200) {
          details = { ...details, claims: claims.data };
        } else {
          rootDispatch(setError({ message: claims }));
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
  const scrollToBuyMembership = () => {
    const buyMembershipHeader = document.getElementById("buyMembershipHeader");
    if (buyMembershipHeader) {
      const navbarHeight = document.querySelector('header')?.clientHeight || 0;
      const height=navbarHeight+30
      const buyMembershipHeaderTop = buyMembershipHeader.getBoundingClientRect().top;
      const scrollPosition = window.scrollY;
      const scrollToPosition = scrollPosition + buyMembershipHeaderTop - height;
      const finalScrollPosition = scrollToPosition - height -25;
      window.scrollTo({ top: finalScrollPosition, behavior: "smooth" });
    }
  };
  const scrollToAllocation = () => {
    const buyMembershipHeader = document.getElementById("allocationClaimHeader");
    if (buyMembershipHeader) {
      const navbarHeight = document.querySelector('header')?.clientHeight || 0;
      const height=navbarHeight+30
      const buyMembershipHeaderTop = buyMembershipHeader.getBoundingClientRect().top;
      const scrollPosition = window.scrollY;
      const scrollToPosition = scrollPosition + buyMembershipHeaderTop - height;
      const finalScrollPosition = scrollToPosition - (height) -25;
      window.scrollTo({ top: finalScrollPosition, behavior: "smooth" });
    }
  };
  return (
    <>
      <div className="container mx-auto md:mb-[90px] px-3 lg:px-0 max-sm:mb-5">
        <div className="">
          <div className="container">
            {loader ? (
              <DetailViewShimmer />
            ) : (
              <div className="md:grid lg:grid-cols-12 mt-2 gap-7">
                <div className="lg:col-span-8">
                  <ProjectBanner bannerImage={data?.projectFeed?.bannerImage} />
                  <div className="mt-2 mb-4">
                    <BreadCrumb />
                    <div className="mb-2 sticky top-[73px] z-10">
                      <ProjectViewTabs
                        pjctInfo={data?.projectDetails}
                        setDaoTab={setDaoTab}
                        scrollToBuyMembership={scrollToBuyMembership}
                        scrollToAllocation={scrollToAllocation}
                      />
                    </div>

                    {!daoTab && (
                      <div>
                        <h4
                          className={`text-base font-semibold text-secondary mb-2 mt-8`}
                        >
                          About Project
                        </h4>
                        <ProjectFeed pjctFeed={data?.projectFeed} />
                        <h4
                          className={`text-base font-semibold text-secondary mb-2 mt-8`}
                        >
                          Founding Members
                        </h4>
                        {!loader && data?.founders && (
                          <FoundingMember
                            foundingmemsData={data?.founders}
                            projectId={projectId}
                            projectName={projectName}
                          />
                        )}
                        {loader && (
                          <div className="animate-pulse space-x-1">
                            <div className="rounded-full bg-slate-200 h-20 w-20"></div>
                            <div className="flex-1 space-y-5 py-1">
                              <div className="h-2 bg-slate-200 rounded"></div>
                              <div className="grid grid-cols-3 gap-4">
                                <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                              </div>
                            </div>
                          </div>
                        )}
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
                          <div className="animate-pulse space-x-1">
                            <div className="rounded-full bg-slate-200 h-20 w-20"></div>
                            <div className="flex-1 space-y-5 py-1">
                              <div className="h-2 bg-slate-200 rounded"></div>
                              <div className="grid grid-cols-3 gap-4">
                                <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                              </div>
                            </div>
                          </div>
                        )}
                        <hr className="my-5" />
                      </div>
                    )}
                 

                  {!daoTab && (
                    <>
                      <div
                        id="allocationClaim"
                        ref={allocationRef}
                        className="project-detail"
                      >
                        <div>
                          <Allocations
                            pjctInfo={data?.projectDetails}
                            pid={projectId}
                            data={data?.allocations}
                            getAllocations={() => getDetails("allocations")}
                            loader={loader}
                          />
                          <Claims
                            pjctInfo={data?.projectDetails}
                            pid={projectId}
                            data={data?.claims}
                            getClaims={() => getDetails("claims")}
                            loader={loader}
                          />
                        </div>
                      </div>
                      <div
                        id="buyMembership"
                        ref={buyMembershipRef}
                        className="mt-6"
                      >
                        <BuyMembership daoId={data?.projectDetails?.daoId} contractAddress={data?.projectDetails?.contractAddress}/>
                      </div>
                    </>
                  )}

                  {daoTab && (
                    <div id="dao" className="mt-6">
                      <CommonCreateProposal
                        pjctInfo={data?.projectDetails}
                        showBreadcrumb={false}
                        from="project"
                        showHeader={false}
                      />
                    </div>
                  )}
                   </div>
                </div>

                <ProjectDetailsCard
                  pjctInfo={data?.projectDetails}
                  currentPjct={data?.projectStatus}
                  swapedPercentage={data?.swapPercentage}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <ApplyNow />
    <div className="max-md:hidden">
    <SwipeUpComponent />
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
