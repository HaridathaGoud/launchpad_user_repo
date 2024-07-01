import React from "react";
import BuyMembership from "../buyMembership/index";
import { ProjectViewBannerShimmer } from "../../loaders/projects/projectViewBannerShimmer";
import ProjectBanner from "../projectBanner";
import BreadCrumb from "../../../ui/breadcrumb";
import { ProjectDetailTabsShimmer } from "../../loaders/projects/projectDetailTabsShimmer";
import ProjectDetailTabs from "../projectDetailTabs";
import ProjectFeed from "./projectfeed";
import { ProjectFeedShimmer } from "../../loaders/projects/projectFeedShimmer";
import FoundingMember from "../founders";
import CastAndCrewMember from "../castAndCrew";
import { ProjectViewCastCrewShimmer } from "../../loaders/projects/projectViewCastCrewShimmer";
import { ProjectViewAllocationClaimShimmer } from "../../loaders/projects/projectViewAllocationClaimShimmer";
import Allocations from "../allocations";
import Claims from "../claims";
import CommonCreateProposal from "../../Dao/proposals/index";
import JoinProject from "../../shared/joinProject";

const ProjectdetailsView = (props: any) => {
  return (
    <div className="lg:col-span-8">
      {props.loader && <ProjectViewBannerShimmer />}
      {!props.loader && (
        <ProjectBanner bannerImage={props.data?.projectFeed?.bannerImage} />
      )}
      <div className="mt-2 mb-4">
        <BreadCrumb />
        {props.loader && <ProjectDetailTabsShimmer />}
        {!props.loader && (
          <div
            id={"scrollTabs"}
            className="sticky top-[65px] z-10 flex items-center flex-col justify-center gap-3 pt-2 pb-2 md:flex-row md:justify-between bg-success-content"
          >
            <ProjectDetailTabs pjctInfo={props.data?.projectDetails} />
            {props?.status["private"] !== "Ended" &&
              props?.status["public"] !== "Ended" && (
                <JoinProject
                  projectDetails={props.data?.projectDetails}
                  buttonClass={"min-w-[150px] tab !py-2 !px-3.5"}
                  statusClass={
                    "bg-[#13B166] font-semibold  text-[#fff] min-w-[100px] text-center rounded-lg h-[35px] flex items-center justify-center"
                  }
                  buttonType={"secondary"}
                  projectStatus={
                    props?.status["private"] !== "Ended"
                      ? props?.status["private"]
                      : props?.status["public"]
                  }
                />
              )}
          </div>
        )}
        <div>
          <div id="projectFeed">
            <h4 className={`text-base font-semibold text-secondary mt-4`}>
              About Project
            </h4>
            {!props.loader && (
              <ProjectFeed pjctFeed={props.data?.projectFeed} />
            )}
            {props.loader && <ProjectFeedShimmer />}
          </div>
          <h4 className={`text-base font-semibold text-secondary mb-2 mt-8`}>
            Investors
          </h4>
          <FoundingMember
            projectId={props.projectId}
            projectName={props.projectName}
            proStatus={props.proStatus}
            swapProgressBarCalculation={props.swapProgressBarCalculation}
          />
          <h4 className={`text-base font-semibold text-secondary mb-2 mt-8`}>
            Cast & Crew
          </h4>
          {!props.loader && (
            <CastAndCrewMember
              castCrewsData={props.data?.projectDetails?.cast_Crews}
              projectId={props.projectId}
              projectName={props.projectName}
            />
          )}
          {props.loader && <ProjectViewCastCrewShimmer />}
          <hr className="my-5" />
        </div>
        <div id="allocationClaim" ref={props.allocationsRef}>
          {props.loader && <ProjectViewAllocationClaimShimmer />}
          {!props.loader &&
            props.data?.projectDetails?.tokenType === "ERC-20" && (
              <div className="project-detail">
                <div>
                  <Allocations
                    pjctInfo={props.data?.projectDetails}
                    pid={props.projectId}
                    getDetails={() => props.getDetails("all")}
                    proStatus={props?.proStatus}
                  />
                  <Claims
                    pjctInfo={props.data?.projectDetails}
                    pid={props.projectId}
                    getDetails={() => props.getDetails("all")}
                  />
                </div>
              </div>
            )}
        </div>
        <div id="buyMembership">
          {!props.loader &&
            props.data?.projectDetails?.tokenType === "ERC-721" && (
              <div>
                <BuyMembership
                  projectDetails={props.data?.projectDetails}
                  proStatus={props?.proStatus}
                  isAllowed={props?.isAllowed}
                  getDetails={() => props.getDetails("all")}
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
          {props.data?.projectDetails?.daoId && (
            <CommonCreateProposal
              pjctInfo={props.data?.projectDetails}
              showBreadcrumb={false}
              from="project"
              showHeader={false}
            />
          )}
        </div>
        <hr className="my-5 lg:hidden" />
      </div>
    </div>
  );
};
export default ProjectdetailsView;
