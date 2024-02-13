import React, { useRef, useEffect, useState, useContext } from "react";
import { get } from "../../utils/api";
import { useParams } from "react-router-dom";
// import { isErrorDispaly } from '../../utils/errorHandling';
import useContract from "../../hooks/useContract";
import { store } from "../../store";
import { useAccount } from "wagmi";
import { connect } from "react-redux";
import { ethers } from "ethers";
// import error from '../../assets/images/error.svg';
import ProjectViewTabs from "../Dao/dao/projecttabs";
import CastAndCrewMember from "./castandcrewmember";
import FoundingMember from "./foundingmember";
import BuyMembership from "./buymembership";
import ApplyNow from "../applynow";
import DetailViewShimmer from "../loaders/DetailViewShimmer";
import ProjectDetailsCard from "./projectDetailsCard";
import ProjectBanner from "./projectBanner";
import ProjectFeed from "./projectfeed";
import Allocations from "./allocations";
import Claims from "./claims";
import outletContext from "../../layout/context/outletContext";
import OutletContextModel from "../../layout/context/model";
import CommonCreateProposal from '../Dao/./proposal/createproposal/praposalScreen';

function Projectdetails(props: any) {
  const [pjctInfo, setPjctInfo] = useState<{ [key: string]: any }>({});
  const [pjctFeed, setPjctFeed] = useState<{ [key: string]: any }>({});
  // const [errorMsg, setErrorMsg] = useState(null);
  const [loader, setLoader] = useState(false);
  const { address } = useAccount();
  const { pid, projectstatus } = useParams();
  const { getStakedAmount } = useContract();
  const [swapedPercentage, setSwapedPercentage] = useState();
  const [stakedAmount, setStakedAmount] = useState<any>(null);
  const user = store.getState().auth;
  const [currentProject, setCurrentProject] = useState('');
  const projectFeedRef = useRef(null);
  const allocationRef = useRef(null);
  const dao = useRef(null);
  const buyMembershipRef = useRef(null);
  const [foundingmems, setFoundingMems] = useState([]);
  const [foundingmemLoader, setfoundingMemsLoader] = useState(false);
  const shouldLog = useRef(true);
  const { setErrorMessage }: OutletContextModel = useContext(outletContext);
  const [daotab,setdaotab]=useState(false)
  useEffect(() => {
    window.scroll(0, 0);
    if (pid) {
      if (shouldLog.current) {
        shouldLog.current = false;
        getPjctDetails();
        stakeAmountData();
        getFoundingMembers();
      }
    }
  }, [pid, projectstatus, address, user]);// eslint-disable-line react-hooks/exhaustive-deps
  const stakeAmountData = () => {
    getStakedAmount().then((res: any) => {
      let _amt = res.toString();
      if (_amt) {
        setStakedAmount(parseFloat(ethers.utils.formatEther(_amt)));
      }
    });
  };

  const getPjctDetails = async () => {
    setLoader(true);
    const userId =
      user?.user?.id && user?.user?.id != ""
        ? user?.user?.id
        : "00000000-0000-0000-0000-000000000000";
    const res = await get("User/TokenInformation/" + pid + "/" + userId)
      .then((res: any) => {
        setPjctInfo(res.data);
        proStatus(res.data);
        getPjctFeed();
        swapProgressBarCalculation(res);
      })
      .catch((error: any) => {
        setErrorMessage?.(error);
        setLoader(false);
      });
  };
  const getFoundingMembers = async () => {
    setfoundingMemsLoader(true);
    const res = await get("User/stakers/" + pid)
      .then((res: any) => {
        setFoundingMems(res.data);
        setfoundingMemsLoader(false);
      })
      .catch((error: any) => {
        setErrorMessage?.(error);
        setfoundingMemsLoader(false);
      });
  };
  const swapProgressBarCalculation = (res: any) => {
    let swapedData: any =
      (res.data.totalSoldTokens / res.data.totalSupply) * 100;
    setSwapedPercentage(swapedData);
  };

  const getPjctFeed = async () => {
    const res = await get("User/ProjectFeed/" + pid);
    if (res) {
      setPjctFeed(res.data);
      setLoader(false);
    } else {
      setErrorMessage?.(res);
      setLoader(false);
    }
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
      setCurrentProject("ongoing");
    } else if (currentDate < privateStDate || currentDate < publicStDate) {
      setCurrentProject("upcoming");
    } else {
      setCurrentProject("closed");
    }
  };

  return (
    <>
      <div className="container mx-auto md:mb-[90px] max-md:px-3 max-sm:mb-5">
        <div className="">
          <div className="container">
            {/* {errorMsg && (
              <div className="cust-error-bg my-4">
                <img src={error} alt="" width={32} height={32} className="me-2" />
                <div>
                  <p className="error-title error-red">Error</p>
                  <p className="error-desc">{errorMsg}</p>
                </div>
              </div>
            )} */}

            {loader ? (
              <DetailViewShimmer />
            ) : (
              <div className="md:grid md:grid-cols-12 mt-5 gap-7">
                <div className="md:col-span-8">
                  {/* <BannerCarousel images={projectCarousel} className='h-[380px]' /> */}
                  <ProjectBanner bannerImage={pjctFeed.bannerImage} />
                  <div className="mt-5 mb-4">
                    {/* <BreadCrumb /> */}
                    <div className="mb-2 mt-4">
                      <ProjectViewTabs
                        projectFeedRef={projectFeedRef}
                        allocationRef={allocationRef}
                        buyMembershipRef={buyMembershipRef}
                        pjctInfo={pjctInfo}
                        dao={'dao'}
                        setdaotab={setdaotab}
                      />
                    </div>

                      {!daotab && <div>
                        <ProjectFeed pjctFeed={pjctFeed} />
                        <h4
                          className={`text-base font-semibold text-secondary mb-2 mt-8`}
                        >
                          Founding Members
                        </h4>
                        {!foundingmemLoader && foundingmems && (
                          <FoundingMember
                            foundingmemsData={foundingmems}
                            pjctId={pid}
                          />
                        )}
                        {foundingmemLoader && (
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
                            castCrewsData={pjctInfo.cast_Crews}
                            pjctId={pid}
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
                      </div>}

                    </div>

                    {!daotab && <>
                      <div
                        id="allocationClaim"
                        ref={allocationRef}
                        className="project-detail"
                      >
                        <div>
                          <Allocations pjctInfo={pjctInfo} pid={pid} />
                          <Claims pjctInfo={pjctInfo} pid={pid} />
                        </div>
                      </div>
                      <div
                        id="buyMembership"
                        ref={buyMembershipRef}
                        className="mt-6"
                      >
                        <BuyMembership />
                      </div>
                    </>}

                  {daotab && 
                  <div
                    id="dao"
                    // ref={dao}
                    className="mt-6"
                  >
                    <CommonCreateProposal pjctInfo={pjctInfo} />
                  </div> }

                  </div>
        
                <ProjectDetailsCard
                  pjctInfo={pjctInfo}
                  currentPjct={currentProject}
                  swapedPercentage={swapedPercentage}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <ApplyNow />
    </>
  );
}

const connectStateToProps = ({ auth }) => {
  return { auth: auth };
};
export default connect(connectStateToProps, (dispatch) => {
  return { dispatch };
})(Projectdetails);
