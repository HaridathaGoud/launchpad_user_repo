import React, { useEffect, useMemo, useReducer, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import defaultBG from "../../../assets/images/default-bg.png";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  clearProposals,
  getProposalStatusLookup,
  getProposals,
} from "../../../reducers/proposlaReducer";
import CreateFirstPraposal from "./newProposal";
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
import NoDataFound from "../../../ui/noData";
import ProposalsShimmer from "../../loaders/daos/proposalsShimmer";
import ConvertLocalFormat from "../../../utils/dateFormat";
import SearchInputComponent from "../../marketplace.component/hotcollections.component/SearchComponent";
import SearchBar from "../../../ui/searchBar";
import useOutsideClick from "../../../hooks/useOutsideClick";
const getBarWidth = (votersCount: number, total: number) => {
  if (total > 0) {
    return `${Math.floor((100 * votersCount) / total)}%`;
  }
  return "0%";
};
const ProposalCards = (props: any) => {
  const proposalsRef = useRef(null);
  const rootDispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);
  const proposals = useSelector((state: any) => state.proposal?.proposals);
  const { ref: filtersRef } = useOutsideClick(() =>
    dispatch({ type: "setIsFilterOpen", payload: false })
  );
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
  const searchBarRef = useRef(null);
  useEffect(() => {
    props.getStatusLookup();
    return () => {
      props.clearProposals();
    };
  }, []);
  useEffect(() => {
    getProposals();
  }, [state.search, user?.id]);
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
        search: state.search || null,
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
    props?.from === "project" &&
      proposalsRef?.current &&
      proposalsRef?.current?.scrollIntoView({ block: "start" });
    getProposals(data, page);
  };
  const applyFilters = () => {
    getProposals();
    dispatch({ type: "setIsFilterOpen", payload: false });
  };

  if (statusLookup?.error) rootDispatch(setError(statusLookup?.error));
  if (proposals?.error) rootDispatch(setError(proposals?.error));
  return (
    <>
      <div></div>
      <div ref={proposalsRef}>
        <div className="flex justify-between items-center mb-3">
          <div>
            <h4 className="font-semibold text-secondary text-xl">Proposals</h4>
          </div>
        </div>
        {statusLookup.loading && <ProposalsShimmer />}
        {!statusLookup.loading && (
          <>
            <div className="flex gap-2">
              <div className="relative">
                <SearchBar
                  inputRef={searchBarRef}
                  onSearch={(value: string) => {
                    dispatch({ type: "setSearch", payload: value });
                  }}
                  disabled={proposals.loading}
                  placeholder="Search by proposal"
                />
                <div
                  className={`${
                    state.isFilterOpen ? "dropdown-open" : ""
                  } dropdown dao-dropdown absolute right-2.5 top-[16px] sm:top-0 border-l transition ease-out duration-100 transform opacity-100 scale-100`}
                >
                  <Button
                    type="plain"
                    handleClick={() => {
                      dispatch({
                        type: "setIsFilterOpen",
                        payload: !state.isFilterOpen,
                      });
                    }}
                    btnClassName="flex rounded-full cursor-pointer bg-transparent w-fit h-[42px]"
                  >
                    <span className="icon filter"></span>
                  </Button>
                  {state.isFilterOpen && (
                    <ul
                      ref={filtersRef}
                      className="menu dropdown-content bg-base-100 rounded-box z-[1] left-[-240px] md:left-[-247px] w-[384px] md:w-[300px] top-12 p-6 shadow"
                    >
                      <h1 className="text-center text-secondary text-lg mb-2 font-semibold">
                        Filters
                      </h1>

                      <p className="text-base text-secondary font-medium mb-2">
                        Proposal Status
                      </p>
                      {statusLookup?.data?.map((item: any) => (
                        <li className="py-2 px-2" key={item?.name}>
                          <div className="flex items-center hover:bg-transparent gap-2 p-0 h-8">
                            <label
                              htmlFor={item?.name}
                              className="font-medium text-secondary relative mt-1 flex items-center gap-2"
                            >
                              <input
                                id={item?.name}
                                type="radio"
                                name="radio-1"
                                value={item?.name}
                                onChange={(e: any) => setStatus(e.target.value)}
                                className="radio opacity-0 z-[1] relative"
                                checked={state.status === item?.name}
                                disabled={proposals.loading}
                              />
                              <span></span>
                              <span className="text-[#57606a] text-[16px] font-medium cursor-pointer dark-th-color">
                                {item?.name}
                              </span>
                            </label>{" "}
                          </div>
                        </li>
                      ))}
                      <Button
                        type="primary"
                        btnClassName="mt-5"
                        handleClick={() => applyFilters()}
                        disabled={proposals.loading}
                      >
                        <span className="text-center text-base font-medium mb-0 cursor-pointer">
                          Apply
                        </span>
                      </Button>
                    </ul>
                  )}
                </div>
              </div>
              {/* <select
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
              </select> */}
              {/* <div className="md:col-span-2">
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
              </div> */}
            </div>
            {proposals.loading && <ProposalsShimmer.Cards />}
            {!proposals.loading && proposals?.data && (
              <div className={`mt-4`}>
                {
                  <div className="lg:grid lg:grid-cols-2 gap-4">
                    {proposals?.data?.length > 0 &&
                      proposals?.data?.map((item: any) => (
                        <Link
                          className="block rounded-lg bgDaocard p-4 mt-4 lg:mt-0 cursor-pointer"
                          key={item.creatorAddress || item.id}
                          to={
                            params?.daoId
                              ? `/daos/${params?.daoName}/${params?.daoId}/${params.projectId}/proposals/${encodeURIComponent(item?.title)}/${item?.proposalId}/${daoDetails?.membershipTokenAddress}`
                              : `/projects/${params?.projectName}/${params?.projectId}/${props?.pjctInfo?.tokenType}/proposals/${encodeURIComponent(item?.title)}/${item?.proposalId}/${daoDetails?.membershipTokenAddress}`
                          }
                        >
                          <div className="flex justify-between gap-4 items-center">
                            <div className="flex gap-2 items-center truncate">
                              <div className="w-9 h-9 shrink-0">
                                <img
                                  src={item?.creatorImage || daocardProfile}
                                  className="rounded-full object-cover w-9 h-9"
                                  alt="dao profile"
                                />
                              </div>
                              <p className="truncate text-neutral font-medium text-base">
                                {item.createdBy || item.creatorAddress || "--"}
                              </p>
                            </div>
                            <div>
                              <span
                                className={`font-semibold px-3 py-1 rounded-[28px] text-[12px] ${
                                  getProposalStatusBg[item?.status]
                                }`}
                              >
                                {item?.status}
                              </span>
                            </div>
                          </div>

                          <div className="truncate">
                            <h4
                              className={`text-secondary font-bold text-[22px] mb-2 mt-3 cursor-pointer text-start truncate  ${
                                item?.title.length > 100 ? "truncate w-1/2" : ""
                              }`}
                            >
                              {item?.title}
                            </h4>
                          </div>

                          <div className="flex gap-5 flex-col lg:flex-row">
                            {/* <div
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
                          </div> */}
                            <div className="flex-1">
                              <p className="dao-para line-clamp-2 break-words text-md font-semibold text-neutral">
                                {(item?.description &&
                                  (item?.description.length > 75
                                    ? item.description.slice(0, 75) + " ..."
                                    : item.description)) ||
                                  "--"}
                              </p>
                              <div className="relative mt-5 z-[-1]">
                                <div className="overflow-hidden mb-4 text-xs flex rounded bg-[#cdcdcd] h-[6px]">
                                  {item?.options?.map(
                                    (data: any, index: number) => (
                                      <div
                                        key={data?.option}
                                        className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                                          getVotingOptionColor[index]
                                        } w-[${getBarWidth(
                                          data?.votersCount,
                                          item?.totalVotersCount
                                        )}]`}
                                      ></div>
                                    )
                                  )}
                                </div>
                              </div>
                              {/* <div className="flex align-items-center gap-4">
                              <p className="text-secondary mt-3 me-3">
                                Start Date:{" "}
                                {item?.startDate && (
                                  <b> {ConvertLocalFormat(item?.startDate)}</b>
                                )}
                              </p>
                              <p className="text-secondary mt-3 me-3">
                                End Date:{" "}
                                {item?.endDate && (
                                  <b> {ConvertLocalFormat(item?.endDate)}</b>
                                )}
                              </p>
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                              {item?.options?.map(
                                (data: any, index: number) => (
                                  <div
                                    className="text-secondary"
                                    key={data?.id}
                                  >
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
                                )
                              )}
                            </div>
                            <div className="md:flex justify-between items-center mt-2">
                              <p className="text-base font-semibold mb-2 md:mb-0 text-secondary">
                                {getProposalStatus(
                                  item?.startDate,
                                  item?.endDate
                                )}
                              </p>
                            </div> */}
                            </div>
                          </div>
                        </Link>
                      ))}
                    {props.from === "project" &&
                      !proposals.data?.length &&
                      proposals.nextPage > 2 && (
                        <div className="dao-card py-[18px] px-5 rounded-lg shadow-md text-center border-dao-emp-img col-span-2">
                        <div className="mb-4">
                          <NoDataFound text={""} />
                        </div>
                      </div>
                      )}
                    {!proposals?.data?.length &&
                      (state.startDate ||
                        state.endDate ||
                        (state.status !== "All" &&
                          !state.startDate &&
                          !state.endDate)) && <div className="col-span-2 dao-card py-[18px] px-5 rounded-lg shadow-md text-center border-dao-emp-img"><NoDataFound text={""} /></div>}
                    {!proposals.loading &&
                      ((props.from !== "project" && !proposals.data?.length) ||
                        (props.from === "project" &&
                          !proposals.data?.length &&
                          proposals.nextPage === 2)) &&
                      state.status === "All" &&
                      !state.startDate &&
                      !state.endDate && (
                        <div className="col-span-2">
                          <CreateFirstPraposal
                            pjctInfo={props?.pjctInfo}
                            daoId={params.id}
                          />
                        </div>
                      )}
                    <div className="flex justify-center">
                      {proposals.loading && (
                        <span className="text-center">
                          <Spinner />
                        </span>
                      )}
                      {!proposals.loading &&
                        props.from !== "project" &&
                        proposals.data?.length > 0 &&
                        proposals.data?.length ===
                          take * (proposals?.nextPage - 1) && (
                          <Button
                            handleClick={() =>
                              handleProposalsFetch(
                                proposals?.nextPage,
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
                        (proposals.nextPage !== 2 ||
                          (proposals.data?.length > 0 &&
                            proposals.nextPage === 2)) && (
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
                }
              </div>
            )}
          </>
        )}
      </div>
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
