import React from 'react'
import SwipeUp from '../../../ui/swipeUp'
import ApplyNow from '../../applynow'
import { ProjectViewTokendetailsCardShimmer } from '../../loaders/projectViewTokendetailsCardShimmer'
import ProjectDetailsCard from './projectDetailsCard'
import BuyMembership from '../buyMembership/index'
import { ProjectViewBannerShimmer } from '../../loaders/projectViewBannerShimmer'
import ProjectBanner from '../projectBanner'
import BreadCrumb from '../../../ui/breadcrumb'
import { ProjectDetailTabsShimmer } from '../../loaders/projectDetailTabsShimmer'
import ProjectDetailTabs from '../projectDetailTabs'
import ProjectFeed from '../projectfeed'
import { ProjectFeedShimmer } from '../../loaders/projectFeedShimmer'
import FoundingMember from '../founders'
import CastAndCrewMember from '../castAndCrew'
import { ProjectViewCastCrewShimmer } from '../../loaders/projectViewCastCrewShimmer'
import { ProjectViewAllocationClaimShimmer } from '../../loaders/projectViewAllocationClaimShimmer'
import Allocations from '../allocations'
import Claims from '../claims'
import CommonCreateProposal from '../../Dao/proposals/index';

const ProjectdetailsView = (props:any) => {
  return (
    <>
      <div className="container mx-auto md:mb-[90px] px-3 lg:px-0 max-sm:mb-5">
        <div className="">
          <div className="container">
            <div className="md:grid lg:grid-cols-12 mt-2 gap-7">
              <div className="lg:col-span-8">
                {props.loader && (
                  <ProjectViewBannerShimmer/>
                )}
                {!props.loader && (
                  <ProjectBanner bannerImage={props.data?.projectFeed?.bannerImage} />
                )}
                <div className="mt-2 mb-4">
                  <BreadCrumb />
                  {props.loader && (
                    <ProjectDetailTabsShimmer/>
                  )}
                  {!props.loader && (
                    <div className="sticky top-[73px] z-10">
                      <ProjectDetailTabs pjctInfo={props.data?.projectDetails} />
                    </div>
                  )}
                  <div>
                    <div id="projectFeed">
                      <h4
                        className={`text-base font-semibold text-secondary mt-4`}
                      >
                        About Project
                      </h4>
                      {!props.loader && <ProjectFeed pjctFeed={props.data?.projectFeed} />}
                      {props.loader && (
                        <ProjectFeedShimmer/>
                      )}
                    </div>
                    <h4
                      className={`text-base font-semibold text-secondary mb-2 mt-8`}
                    >
                      Founding Members
                    </h4>
                    <FoundingMember
                      projectId={props.projectId}
                      projectName={props.projectName}
                      proStatus={props.proStatus}
                      swapProgressBarCalculation={props.swapProgressBarCalculation}
                    />
                    <h4
                      className={`text-base font-semibold text-secondary mb-2 mt-8`}
                    >
                      Cast & Crew
                    </h4>
                    {!props.loader && (
                      <CastAndCrewMember
                        castCrewsData={props.data?.projectDetails?.cast_Crews}
                        projectId={props.projectId}
                        projectName={props.projectName}
                      />
                    )}
                    {props.loader && (
                      <ProjectViewCastCrewShimmer/>
                    )}
                    <hr className="my-5" />
                  </div>
                  <div id="allocationClaim" ref={props.allocationsRef}>
                    {props.loader && (
                      <ProjectViewAllocationClaimShimmer/>
                    )}
                    {!props.loader &&
                      props.data?.projectDetails?.tokenType === "ERC-20" && (
                        <div className="project-detail">
                          <div>
                            <Allocations
                              pjctInfo={props.data?.projectDetails}
                              pid={props.projectId}
                              getDetails={() => props.getDetails("all")}
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
                            daoId={props.data?.projectDetails?.daoId}
                            contractAddress={
                                props.data?.projectDetails?.contractAddress
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
                    {props.data?.projectDetails?.daoId && (
                      <CommonCreateProposal
                        pjctInfo={props.data?.projectDetails}
                        showBreadcrumb={false}
                        from="project"
                        showHeader={false}
                      />
                    )}
                  </div>
                </div>
              </div>

              {!props.loader && (
                <ProjectDetailsCard
                  pjctInfo={props.data?.projectDetails}
                  currentPjct={props.data?.projectStatus}
                  swapedPercentage={props.data?.swapPercentage}
                />
              )}
              {props.loader && (
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
  )
}
export default ProjectdetailsView