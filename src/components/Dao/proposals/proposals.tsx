import React, { useEffect, useMemo, useReducer, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import WalletModal from "../../../utils/walletModal";
import defaultBG from "../../../assets/images/default-bg.png";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  clearProposals,
  getProposalStatusLookup,
  getProposals,
} from "../../../reducers/proposlaReducer";
import { useAccount } from "wagmi";
import CreateFirstPraposal from "./newProposal";
import Moment from "react-moment";
import { isMobile } from "react-device-detect";
import daocardProfile from "../../../assets/images/daocard-profile.png";
import { setError } from "../../../reducers/layoutReducer";
import Button from "../../../ui/Button";
import { proposalsReducer, proposalsState } from "./reducers";
import {
  getProposalStatus,
  getProposalStatusBg,
  getVotingOptionColor,
} from "./utils";
import Spinner from "../../loaders/spinner";
import NoDataFound from "../../../ui/nodatafound";
import ProposalsShimmer from "../../loaders/proposalsShimmer";

const ProposalCards = (props: any) => {
  const proposalsRef=useRef(null)
  const { isConnected } = useAccount();
  const rootDispatch = useDispatch();
  const { proposals, user } = useSelector((state: any) => {
    return { proposals: state.proposal?.proposals, user: state.auth?.user };
  });
  const statusLookup = useSelector(
    (state: any) => state.proposal.proposalStatusLookup
  );
  const daoDetails = useSelector(
    (state: any) => state.proposal.daoDetails.data
  );
  const params = useParams();
  const [state, dispatch] = useReducer(proposalsReducer, proposalsState);
  const take = useMemo(() => {
    return props.from === "project" ? 3 : 10;
  }, [props?.from]);
  useEffect(() => {
    props.getStatusLookup();
    return () => {
      props.clearProposals();
    };
  }, []);
  useEffect(() => {
    getProposals();
  }, [state, user?.id]);
  const getProposals = (data = null, page = null) => {
    if (
      state.endDate ||
      (state.startDate && state.endDate) ||
      !state.startDate
    ) {
      let information = {
        page: page || 1,
        take: take,
        daoId: props?.pjctInfo?.daoId || params?.daoId,
        data: data,
        status: state.status?.toLowerCase() || "all",
        search: null,
        startDate: state.endDate ? state.startDate || "" : "",
        endDate: state.endDate || "",
      };
      props.getProposals(information);
    }
  };
  const setStatus = (value: any) => {
    if (!value) dispatch({ type: "setStatus", payload: "All" });
    dispatch({ type: "setStatus", payload: value });
  };
  const setDate = (value: any, type: string) => {
    if (type === "startDate") {
      if (value && state.endDate < value) {
        rootDispatch(
          setError({
            message: "Start date cannot be greater than the end date",
            type: "warning",
          })
        );
        dispatch({ type: "setStartDate", payload: null });
        return;
      }
      dispatch({ type: "setStartDate", payload: value || null });
      if ((!value && state.endDate) || state?.endDate) {
        rootDispatch(setError({ message: "" }));
      }
      if (!value && state.endDate) {
        dispatch({ type: "setEndDate", payload: null });
      }
      return;
    }
    if (type === "endDate") {
      if (value && value < state?.startDate) {
        rootDispatch(
          setError({
            message: "Start date cannot be greater than the end date.",
            type: "warning",
          })
        );
        dispatch({ type: "setEndDate", payload: null });
        return;
      }
      dispatch({ type: "setEndDate", payload: value || null });
      if (
        (state?.startDate && value && state.status) ||
        (!value && state?.startDate && state.status)
      ) {
        rootDispatch(setError({ message: "" }));
      }
    }
  };
  const handleProposalsFetch = (page: any, data: any) => {
    (props?.from==='project' && proposalsRef?.current) && proposalsRef?.current?.scrollIntoView({block: "start" })
    getProposals(data, page);
  };

  if (statusLookup?.error) rootDispatch(setError(statusLookup?.error));
  if (proposals?.error) rootDispatch(setError(proposals?.error));
  return (
    <>
    <div ></div>
      <div ref={proposalsRef}>
        <div className="flex justify-between items-center mb-3">
          <div>
            <h4 className="font-semibold text-secondary text-xl">Proposals</h4>
          </div>
        </div>
        {(proposals.loading || statusLookup.loading) && <ProposalsShimmer />}
        {!proposals.loading && !statusLookup.loading && proposals?.data && (
          <>
            <div className="grid md:grid-cols-5 gap-2">
              <select
                className="border rounded-[30px] formselect-arrow max-sm:w-full px-2.5 h-[46px] cursor-pointer"
                aria-label="Default select example"
                value={state.status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {statusLookup?.data?.map((item: any) => (
                  <option key={item?.name} value={item?.name}>
                    {item?.name}
                  </option>
                ))}
              </select>
              <div className="md:col-span-2">
                <div className="flex md:hidden mt-2 md:mt-0">
                  <label
                    htmlFor=""
                    className=" flex-1 text-secondary text-sm font-normal p-0 mb-2 label ml-4 block"
                  >
                    Start Date
                  </label>
                  <label
                    htmlFor=""
                    className="flex-1 text-secondary text-sm font-normal p-0 mb-2 label ml-4 block"
                  >
                    End Date
                  </label>
                </div>
                <div className="border flex rounded-[30px] md:w-[318px]  bg-white">
                  <div className="position-relative border-r flex-1">
                    <input
                      type="date"
                      className={`form-select text-secondary ${
                        isMobile && !state?.startDate
                          ? "mobile"
                          : isMobile && state?.startDate
                          ? "mobie-icon"
                          : ""
                      }`}
                      placeholder="Start Date"
                      value={state?.startDate || ""}
                      max="9999-12-31"
                      onChange={(e) => setDate(e.target.value, "startDate")}
                    />
                  </div>
                  <div className="position-relative flex-1">
                    <input
                      type="date"
                      disabled={!state.startDate}
                      className={`form-select text-secondary  ${
                        isMobile && !state?.endDate
                          ? "mobile"
                          : isMobile && state?.endDate
                          ? "mobie-icon"
                          : ""
                      }`}
                      placeholder="End date"
                      value={state?.endDate || ""}
                      max="9999-12-31"
                      onChange={(e) => setDate(e.target.value, "endDate")}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={`mt-4`}>
              {proposals?.data?.length > 0 && (
                <div>
                  {proposals?.data?.map((item: any) => (
                    <Link
                      className="block bg-base-300 rounded-lg bgDaocard p-4 mb-4"
                      key={item.creatorAddress || item.id}
                      to={
                        params?.daoId
                          ? `/daos/${params?.daoName}/${params?.daoId}/${params.projectId}/proposals/${item?.title}/${item?.proposalId}/${daoDetails?.membershipTokenAddress}`
                          : `/projects/${params?.projectName}/${params?.projectId}/${props?.pjctInfo?.tokenType}/proposals/${item?.title}/${item?.proposalId}/${daoDetails?.membershipTokenAddress}`
                      }
                    >
                      <div className="flex justify-between gap-4 items-center">
                        <div className="flex items-center truncate">
                          <div className="w-9 h-9 mr-2 shrink-0">
                            <img
                              src={item?.creatorImage || daocardProfile}
                              className="rounded-full object-cover w-9 h-9"
                              alt="dao profile"
                            />
                          </div>
                          <p className="truncate text-secondary">
                            {item.createdBy || item.creatorAddress || "--"}
                          </p>
                        </div>
                        <div>
                          <span
                            className={`font-semibold px-3 py-1 rounded ${
                              getProposalStatusBg[item?.status]
                            }`}
                          >
                            {item?.status}
                          </span>
                        </div>
                      </div>

                      <div className="truncate">
                        <h4
                          className={`text-secondary font-bold text-lg mb-2 mt-3 cursor-pointer text-start  ${
                            item?.title.length > 100 ? "truncate w-1/2" : ""
                          }`}
                        >
                          {item?.title}
                        </h4>
                      </div>

                      <div className="flex gap-5 flex-col lg:flex-row">
                        <div
                          className={` shrink-0 ${
                            props.from === "project"
                              ? "md:w-[150px]"
                              : "w-full lg:w-52 lg:h-32"
                          }`}
                        >
                          <img
                            src={item?.image || defaultBG}
                            className={` object-cover w-full rounded-lg ${
                              props.from === "project"
                                ? "h-[130px] md:h-[90px]"
                                : "h-[130px]"
                            }`}
                            alt={item?.title || "proposal"}
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-base-200">
                            {(item?.description &&
                              (item?.description.length > 75
                                ? item.description.slice(0, 75) + " ..."
                                : item.description)) ||
                              "--"}
                          </p>
                          <div className="flex align-items-center gap-4">
                            <p className="text-secondary mt-3 me-3">
                              Start Date:{" "}
                              {item?.startDate && (
                                <b>
                                  {" "}
                                  <Moment format={"DD/MM/YYYY HH:mm"}>
                                    {item?.startDate}
                                  </Moment>
                                  <span>{` (UTC)`}</span>
                                </b>
                              )}
                            </p>
                            <p className="text-secondary mt-3 me-3">
                              End Date:{" "}
                              {item?.endDate && (
                                <b>
                                  {" "}
                                  <Moment format={"DD/MM/YYYY HH:mm"}>
                                    {item?.endDate}
                                  </Moment>
                                  <span>{` (UTC)`}</span>
                                </b>
                              )}
                            </p>
                          </div>
                          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                            {item?.options?.map((data: any, index: number) => (
                              <div className="text-secondary" key={data?.id}>
                                <div className="flex">
                                  {
                                    <span
                                      className={`${getVotingOptionColor[index]} shrink-0 mt-1 h-4 w-4 inline-block rounded-full mr-2 align-middle`}
                                    ></span>
                                  }
                                  <p className="text-secondary">
                                    {data?.option}{" "}
                                    {`(${data?.votersCount || "0"})`}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="md:flex justify-between items-center mt-2">
                            <p className="text-base font-semibold mb-2 md:mb-0 text-secondary">
                              {getProposalStatus(
                                item?.startDate,
                                item?.endDate
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                  <div className="flex justify-center">
                    {proposals.loading && (
                      <span className="text-center">
                        <Spinner />
                      </span>
                    )}
                    {!proposals.loading &&
                      props.from !== "project" &&
                      proposals.data.length > 0 &&
                      proposals.data.length ===
                        take * (proposals?.nextPage - 1) && (
                        <Button
                          handleClick={() =>
                            handleProposalsFetch(
                              proposals?.nextpage,
                              proposals?.data
                            )
                          }
                          type="plain"
                        >
                          <p className="text-center text-primary text-base font-medium mb-0 cursor-pointer">
                            See More
                          </p>
                          <span className="icon block mx-auto see-more cursor-pointer"></span>
                        </Button>
                      )}
                    {!proposals.loading &&
                      props.from === "project" &&
                      proposals.data.length > 0 && (
                        <div className="flex justify-end gap-2">
                          <Button
                            handleClick={() =>
                              handleProposalsFetch(
                                proposals?.nextPage - 2,
                                null
                              )
                            }
                            type="primary"
                            disabled={proposals.nextPage === 2}
                          >
                            <span className="text-center text-base font-medium mb-0 cursor-pointer">
                              Prev
                            </span>
                          </Button>
                          <Button
                            handleClick={() =>
                              handleProposalsFetch(proposals?.nextPage, null)
                            }
                            type="primary"
                            disabled={proposals?.data?.length < take}
                          >
                            <span className="text-center text-base font-medium mb-0 cursor-pointer">
                              Next
                            </span>
                          </Button>
                        </div>
                      )}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
        {!proposals?.data?.length &&
          (state.startDate ||
            state.endDate ||
            (state.status !== "All" && !state.startDate && !state.endDate)) && (
            <NoDataFound text={""} />
          )}
        {!proposals.loading &&
          !proposals.data?.length &&
          state.status === "All" &&
          !state.startDate &&
          !state.endDate && (
            <CreateFirstPraposal pjctInfo={props?.pjctInfo} daoId={params.id} />
          )}
      </div>
      {!isConnected && <WalletModal />}
    </>
  );
};
const connectStateToProps = ({ oidc, proposal }: any) => {
  return { oidc: oidc, proposal: proposal };
};
const connectDispatchToProps = (dispatch: any) => {
  return {
    getProposals: (information: any) => {
      dispatch(getProposals(information));
    },
    getStatusLookup: () => {
      dispatch(getProposalStatusLookup());
    },
    clearProposals: () => {
      dispatch(clearProposals());
    },
  };
};
export default connect(
  connectStateToProps,
  connectDispatchToProps
)(ProposalCards);
