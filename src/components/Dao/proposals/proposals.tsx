import React, { useEffect, useReducer } from "react";
import Container from "react-bootstrap/Container";
import { useNavigate, useParams } from "react-router-dom";
import WalletModal from "../../../utils/walletModal";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  clearProposals,
  getProposalStatusLookup,
  getProposals,
} from "../../../reducers/proposlaReducer";
import { useAccount } from "wagmi";
import CreateFirstPraposal from "./newProposal";
import nodata from "../../../assets/images/no-data.png";
import Moment from "react-moment";
import { isMobile } from "react-device-detect";
import daocardProfile from "../../../assets/images/daocard-profile.png";
import { setError } from "../../../reducers/layoutReducer";
import Button from "../../../ui/Button";
import { proposalsReducer, proposalsState } from "./reducers";
import { getProposalStatus } from "./utils";
import Spinner from "../../loaders/spinner";
const take = 10;

const ProposalCards = (props: any) => {
  const { isConnected } = useAccount();
  const rootDispatch = useDispatch();
  const proposals = useSelector((state: any) => state.proposal?.proposals);
  const statusLookup = useSelector(
    (state: any) => state.proposal.proposalStatusLookup
  );
  const router = useNavigate();
  const params = useParams();
  const [state, dispatch] = useReducer(proposalsReducer, proposalsState);
  useEffect(() => {
    props.getStatusLookup();
    return () => {
      props.clearProposals();
    };
  }, []);
  useEffect(() => {
    getProposals();
  }, [state]);
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
            message: "Start date cannot be greater than the end date.",
          })
        );
        return;
      }
      dispatch({ type: "setStartDate", payload: value || null });
      if ((!value && state.endDate) || state?.endDate) {
        rootDispatch(setError({ message: "" }));
      }
      return;
    }
    if (type === "endDate") {
      if (value && value < state?.startDate) {
        rootDispatch(
          setError({
            message: "Start date cannot be greater than the end date.",
          })
        );
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
  const handleVotingScreen = (id: any) => {
    if (params?.daoId) {
      router(`/dao/voting/${id}`);
    } else {
      router(
        `/projects/projectdetails/${params?.projectstatus}/${params?.pid}/voting/${id}`
      );
    }
  };

  const handleMoreProposals = () => {
    getProposals(proposals.data, proposals.nextPage);
  };

  if (statusLookup?.error) rootDispatch(setError(statusLookup?.error));
  if (proposals?.error) rootDispatch(setError(proposals?.error));
  return (
    <>
      <Container className="">
        <>
          {(proposals.loading || statusLookup.loading) && (
            <div className="animate-pulse space-x-4">
              <div className=" w-full opacity-1 border rounded-xl gap-10 flex items-center p-4 ">
                <div className="w-full md:h-[312px] rounded-md bg-slate-200  "></div>
              </div>
            </div>
          )}
          {proposals?.data && (
            <div>
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h4 className="font-semibold text-secondary text-xl">
                    Proposals
                  </h4>
                </div>
              </div>

              <div className="grid md:grid-cols-5 gap-2">
                <select
                  className="border rounded-[30px] formselect-arrow max-sm:w-full px-2.5 h-[46px]"
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

                <div className="border flex rounded-[30px] md:w-[318px] md:col-span-2 bg-white">
                  <div className="position-relative border-r">
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
                      value={state?.startDate}
                      onChange={(e) => setDate(e.target.value, "startDate")}
                    />
                  </div>
                  <div className="position-relative">
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
                      value={state?.endDate}
                      onChange={(e) => setDate(e.target.value, "endDate")}
                    />
                  </div>
                </div>
              </div>

              <div className={`mt-4`}>
                {proposals?.data?.length > 0 && (
                  <div>
                    {proposals?.data?.map((item: any) => (
                      <div
                        className="bg-base-300 rounded-lg bgDaocard py-2.5 px-4 mb-4"
                        key={item.creatorAddress || item.id}
                      >
                        <div className="flex justify-between gap-4 items-center">
                          <div className="flex items-center truncate">
                            <div className="w-9 h-9 mr-2 shrink-0">
                              <img
                                src={daocardProfile}
                                className="rounded-full object-cover w-9 h-9"
                                alt="dao profile"
                              />
                            </div>
                            <p className="truncate text-secondary">
                              {item.creatorAddress || "--"}
                            </p>
                          </div>
                          <div>
                            <span
                              className={`font-semibold px-3 py-1 rounded ${
                                item?.status === "Pending" ||
                                item?.status === "Publishing"
                                  ? "bg-[#ffdc89] text-dark"
                                  : item?.status === "Closed"
                                  ? "bg-success text-white"
                                  : ""
                              }`}
                            >
                              {item?.status}
                            </span>
                          </div>
                        </div>
                        <div className="">
                          <div className="d-flex align-items-center">
                            <Button
                              type="plain"
                              handleClick={() =>
                                handleVotingScreen(item?.proposalId)
                              }
                            >
                              <h4 className="text-secondary font-bold text-lg mb-2 mt-3 cursor-pointer">
                                {item?.title}
                              </h4>
                            </Button>
                          </div>
                        </div>
                        <div className="flex gap-5 flex-col lg:flex-row">
                          {/* <div className="w-full lg:w-52 lg:h-32 shrink-0">
                            <img/>
                              </div> */}
                          <div className="flex-1">
                            <p className="text-base-200">
                              {(item?.description &&
                                (item?.description.length > 30
                                  ? item.description.slice(0, 30) + " ..."
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
                            <div className="flex gap-4 mt-2">
                              {item?.options?.map((data: any) => (
                                <div className="text-secondary" key={data?.id}>
                                  <div>
                                    {data.votersCount ? (
                                      <span
                                        className={`bg-success h-4 w-4 inline-block rounded-full mr-2 align-middle`}
                                      ></span>
                                    ) : (
                                      <span
                                        className={`bg-primary h-4 w-4 inline-block rounded-full mr-2 align-middle`}
                                      ></span>
                                    )}
                                    <span className="text-secondary">
                                      {data?.option}{" "}
                                      {`(${data?.votersCount || "0"})`}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="md:flex justify-between items-center mt-2">
                              <p className="text-base font-semibold mb-2 md:mb-0 text-secondary">
                                {getProposalStatus(item?.endDate)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="flex justify-center">
                      {proposals.loading && (
                        <span className="text-center">
                          <Spinner />
                        </span>
                      )}
                      {!proposals.loading &&
                        proposals.data.length > 0 &&
                        proposals.data.length ===
                          take * proposals?.nextPage - 1 && (
                          <Button
                            handleClick={handleMoreProposals}
                            type="plain"
                          >
                            <p className="text-center text-primary text-base font-medium mb-0 cursor-pointer">
                              See More
                            </p>
                            <span className="icon block mx-auto see-more cursor-pointer"></span>
                          </Button>
                        )}
                    </div>
                  </div>
                )}
                {!proposals?.data?.length && (
                  <div className="text-center container">
                    <img
                      src={nodata}
                      width={95}
                      alt="NO Data"
                      className="mx-auto mb-1"
                    />
                    <h4 className="text-center text-secondary mt-2">
                      No Data Found
                    </h4>
                  </div>
                )}
              </div>
            </div>
          )}
          {!proposals.loading && !proposals.data && (
            <CreateFirstPraposal pjctInfo={props?.pjctInfo} daoId={params.id} />
          )}
        </>
      </Container>
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
