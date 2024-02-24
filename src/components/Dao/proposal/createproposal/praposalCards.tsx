import React, { useState, useEffect, useReducer, useContext } from "react";
import Container from "react-bootstrap/Container";

import { useNavigate } from "react-router-dom";
import WalletModal from "../../../../utils/walletModal";
import { useParams } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import {
  getCardsProposalList,
  getLookUp,
} from "../proposlaReducer/proposlaReducer";
import { useAccount } from "wagmi";
import CreateFirstPraposal from "../praposal/createpraposal";
import nodata from "../../../../assets/images/no-data.png";
import Moment from "react-moment";
import { readContract } from "wagmi/actions";
import MintContract from "../../../../contracts/seichi.json";
import { isMobile } from "react-device-detect";
import { Spinner } from "react-bootstrap";
import daocardProfile from "../../../../assets/images/daocard-profile.png";
import OutletContextModel from "../../../../layout/context/model";
import outletContext from "../../../../layout/context/outletContext";
const reducers = (state: any, action: any) => {
  switch (action.type) {
    case "modalShow":
      return { ...state, modalShow: action.payload };
    case "date":
      return { ...state, date: action.payload };
    case "statusLu":
      return { ...state, statusLu: action.payload };
    case "status":
      return { ...state, status: action.payload };
    case "dateStatus":
      return { ...state, dateStatus: action.payload };
  }
};
function ProposalCards(props: any) {
  const { isConnected, address } = useAccount();
  const [search, setSearch] = useState(null);
  const proposalData = useSelector(
    (state: any) => state.proposal?.proposalDetailsList
  );
  const {setErrorMessage}:OutletContextModel=useContext(outletContext)
  const loadData = useSelector((state: any) => state.proposal?.isCheckSeeMore);
  const [status, setStatus] = useState("all");
  const pageSize = 10;
  const [pageNo, setPageNo] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [lookUpError, setLookUpError] = useState(false);
  const router = useNavigate();
  const params = useParams();
  const [loadMore, setLoadMore] = useState<any>(false);
  const [hide, setHide] = useState<any>(false);
  const [loading, setLodaing] = useState(false);
  const [mintedMemberShipCount, setMintedMemberShipCount] = useState<any>();
  const DaoDetail = useSelector(
    (state: any) => state?.proposal?.getWalletAddressChecking?.data
  );
  const [state, dispatch] = useReducer(reducers, {
    modalShow: false,
    status: "all",
    statusLu: [],
    date: null,
    dateStatus: false,
  });
  const mintingContractAddress: any = process.env.REACT_APP_MINTING_CONTRACTOR;
  const [shimmerLoading, setShimmerLoading] = useState(true);
  useEffect(() => {
    getDaoItem();
    getApprovedProposalData(state?.status);
    setLodaing(true);
    props.lookUp((callback: any) => {
      dispatch({ type: "statusLu", payload: callback });
      setLodaing(false);
      setShimmerLoading(false);
    });
  }, []);

  const getDaoItem = () => {
    // let daoData = DaoDetail?.find((item) => item?.daoId == params?.daoId);
    getBalanceCount(address);
  };
  async function getBalanceCount(address) {
    let contractAddress = mintingContractAddress;
    let balance: any = await readContract({
      address: contractAddress,
      abi: MintContract.abi,
      functionName: "balanceOf",
      args: [address],
    });
    balance = Number(balance);
    setMintedMemberShipCount(balance);
  }

  useEffect(() => {
    if (address) {
      getDaoItem();
      getApprovedProposalData(state?.status);
    }
  }, [address]);

  const getApprovedProposalData = (e: any) => {
    setShimmerLoading(true);
    let data;
    if (e == "all") {
      data = e;
    } else {
      data = e?.target?.value;
      setStatus(data);
      setPageNo(2);
    }
    dispatch({ type: "status", payload: data });
    if (lookUpError) {
      setErrorMessage?.("Start date cannot be greater than the end date.");
      setShimmerLoading(false);
    } else if (data) {
      if (!state?.dateStatus && data != "all") {
        let pageNo = 1;
        props.proposalDetailsList(
          pageNo,
          pageSize,
          props?.pjctInfo?.daoId || params?.daoId,
          data.toLowerCase(),
          search,
          startDate,
          endDate,
          (callback) => {
            if (callback) {
              setShimmerLoading(false);
            }
          }
        );
      } else if (data && state?.dateStatus) {
        let pageNo = 1;
        props.proposalDetailsList(
          pageNo,
          pageSize,
          props?.pjctInfo?.daoId || params?.daoId,
          data.toLowerCase(),
          search,
          state?.date,
          state?.dateStatus,
          (callback) => {
            if (callback) {
              setShimmerLoading(false);
            }
          }
        );
      } else {
        props.proposalDetailsList(
          pageNo,
          pageSize,
          props?.pjctInfo?.daoId || params?.daoId,
          data.toLowerCase(),
          search,
          startDate,
          endDate,
          (callback) => {
            let _pageNo = pageNo + 1;
            setPageNo(_pageNo);
            if (callback) {
              setShimmerLoading(false);
            }
          }
        );
      }
    }
  };
  const getStartDateProposalData = (e: any) => {
    setLookUpError(false);
    let stData = e.target.value;
    dispatch({ type: "date", payload: stData });
    if (stData && state.dateStatus < stData) {
      setErrorMessage?.("Start date cannot be greater than the end date.");
      setLookUpError(true);

      setShimmerLoading(false);
    } else if (state?.dateStatus) {
      setShimmerLoading(true);
      setErrorMessage?.('');
      setPageNo(2);
      props.proposalDetailsList(
        1,
        pageSize,
        props?.pjctInfo?.daoId || params?.daoId,
        status,
        search,
        stData,
        state.dateStatus,
        (callback) => {
          if (callback) {
            setShimmerLoading(false);
          }
        }
      );
    } else if (!stData && state.dateStatus) {
      setShimmerLoading(true);
      setErrorMessage?.('');
      setPageNo(2);
      props.proposalDetailsList(
        1,
        pageSize,
        props?.pjctInfo?.daoId || params?.daoId,
        status,
        search,
        stData,
        state.dateStatus,
        (callback) => {
          if (callback) {
            setShimmerLoading(false);
          }
        }
      );
    }
  };

  const getEndDateProposalData = (e: any) => {
    setShimmerLoading(true);
    setLookUpError(false);
    let endData = e.target.value;
    dispatch({ type: "dateStatus", payload: endData });
    if (endData && endData < state?.date) {
      setErrorMessage?.("Start date cannot be greater than the end date.");
      setLookUpError(true);

      setShimmerLoading(false);
    } else if (state?.date && endData && status) {
      setErrorMessage?.('');
      setPageNo(2);
      props.proposalDetailsList(
        1,
        pageSize,
        props?.pjctInfo?.daoId || params?.daoId,
        status,
        search,
        state?.date,
        endData,
        (callback) => {
          if (callback) {
            setShimmerLoading(false);
          }
        }
      );
      if (proposalData) {
        dispatch({ type: "dateStatus", payload: endData });
      }
    } else if (!endData && state?.date && status) {
      setErrorMessage?.('');
      setPageNo(2);
      props.proposalDetailsList(
        1,
        pageSize,
        props?.pjctInfo?.daoId || params?.daoId,
        status,
        search,
        state?.date,
        endData,
        (callback) => {
          if (callback) {
            setShimmerLoading(false);
          }
        }
      );
      if (proposalData) {
        dispatch({ type: "dateStatus", payload: endData });
      }
    }
  };
  const handleClose = (childData) => {
    dispatch({ type: "modalShow", payload: childData });
  };
  const handleRedirectCreatepraposalScreen = () => {
    if (isConnected) {
      router(`/dao/${params?.id}/createpraposal`);
    } else {
      dispatch({ type: "modalShow", payload: true });
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
  const handledashboard = () => {
    // router('/dao')
  };

  const addProposalList = () => {
    setShimmerLoading(true);
    setLoadMore(true);
    setHide(true);
    if (state?.date && state?.dateStatus) {
      let _pageNo = pageNo + 1;
      setPageNo(_pageNo);
      props.proposalDetailsList(
        pageNo,
        pageSize,
        props?.pjctInfo?.daoId || params?.daoId,
        status.toLowerCase(),
        search,
        state?.date,
        state?.dateStatus,
        (callback) => {
          if (callback) {
            setLoadMore(false);
            setHide(false);
            setShimmerLoading(false);
            setLodaing(false);
          }
        }
      );
    } else {
      let _pageNo = pageNo + 1;
      setPageNo(_pageNo);
      props.proposalDetailsList(
        pageNo,
        pageSize,
        props?.pjctInfo?.daoId || params?.daoId,
        status.toLowerCase(),
        search,
        startDate,
        endDate,
        (callback) => {
          if (callback) {
            setLoadMore(false);
            setHide(false);
            setShimmerLoading(false);
          }
        }
      );
    }
  };
  const getRecorderValue = (recorder) => {
    const recorderValues = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ];
    return recorderValues[recorder - 1];
  };
  function calculateTimeDifference(endingDate) {
    const startTime = new Date().getTime();
    const endTime = new Date(endingDate).getTime();

    if (startTime > endTime) {
      return "Ended";
    }

    const difference = endTime - startTime;
    let timeDifference = "Ends in";

    if (difference === 0) {
      timeDifference = "Ended";
    } else {
      const timeUnits = [
        { unit: "week", divisor: 1000 * 60 * 60 * 24 * 7 },
        { unit: "day", divisor: 1000 * 60 * 60 * 24 },
        { unit: "hour", divisor: 1000 * 60 * 60 },
        { unit: "minute", divisor: 1000 * 60 },
      ];

      for (const { unit, divisor } of timeUnits) {
        const unitDifference = Math.floor(difference / divisor);
        if (unitDifference > 0) {
          timeDifference +=
            " " + unitDifference + " " + unit + (unitDifference > 1 ? "s" : "");
          break;
        }
      }
    }
    return timeDifference;
  }

  return (
    <>
      <Container className="">
        <>
          {(proposalData != "" &&
            state?.status?.toLocaleLowerCase() == "all") ||
          state?.status?.toLocaleLowerCase() == "approved" ||
          state?.status?.toLocaleLowerCase() == "declined" ||
          state?.status?.toLocaleLowerCase() == "pending" ||
          state?.status?.toLocaleLowerCase() == "closed" ||
          state?.dateStatus ? (
            <div>
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h4
                    className="font-semibold text-secondary text-xl"
                    onClick={handledashboard}
                  >
                    Proposals
                  </h4>
                </div>
                {/* {(isConnected && mintedMemberShipCount >= 2)     && (<div className='sm-align-right'>
                                            <Button className='custom-btn-primary cardbtnright-mt' onClick={handleRedirectCreatepraposalScreen}>Create Proposal</Button></div>)} */}
              </div>

              <div className="grid md:grid-cols-5 gap-2">
                <select
                  className="border rounded-[30px] formselect-arrow max-sm:w-full px-2.5 h-[46px]"
                  aria-label="Default select example"
                  onChange={(e) => getApprovedProposalData(e)}
                >
                  {state?.statusLu?.map((item: any) => (
                    <option value={item?.name}>{item?.name}</option>
                  ))}
                </select>
                {/* <Form.Select className='border rounded-[30px] formselect-arrow max-sm:w-full' aria-label="Default select example" onChange={(e) => getApprovedProposalData(e)}>
                                    {state?.statusLu?.map((item: any) => (
                                        <option value={item?.name} >{item?.name}</option>
                                    ))}
                                </Form.Select> */}

                <div className="border flex rounded-[30px] md:w-[318px] md:col-span-2 bg-white">
                  <div className="position-relative border-r">
                    <input
                      type="date"
                      className={`form-select text-secondary ${
                        isMobile && !state?.date
                          ? "mobile"
                          : isMobile && state?.date
                          ? "mobie-icon"
                          : ""
                      }`}
                      placeholder="Start Date"
                      onChange={(e) => getStartDateProposalData(e)}
                    />
                  </div>
                  <div className="position-relative">
                    <input
                      type="date"
                      disabled={!state.date}
                      className={`form-select text-secondary  ${
                        isMobile && !state?.dateStatus
                          ? "mobile"
                          : isMobile && state?.dateStatus
                          ? "mobie-icon"
                          : ""
                      }`}
                      placeholder="End date"
                      onChange={(e) => getEndDateProposalData(e)}
                    />
                  </div>
                </div>
              </div>

              <div className={`mt-4`}>
                {shimmerLoading ? (
                  <div className="animate-pulse space-x-4">
                    <div className=" w-full opacity-1 border rounded-xl gap-10 flex items-center p-4 ">
                      <div className="w-full md:h-[312px] rounded-md bg-slate-200  "></div>
                    </div>
                  </div>
                ) : (
                  <>
                    {proposalData != "" ? (
                      <>
                        {proposalData?.map((item) => (
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
                                <h4
                                  className="text-secondary font-bold text-lg mb-2 mt-3 cursor-pointer"
                                  onClick={() =>
                                    handleVotingScreen(item?.proposalId)
                                  }
                                >
                                  {item?.title}
                                </h4>
                              </div>
                              {/* <div className='d-flex align-items-center mobile-mt'>
                                                                    <span className={item?.status === "Approved" ? ("icon success-icon") :
                                                                        ((item?.status === "Pending" || item?.status === "Publishing") ? ("icon pending-icon") : ("icon failed-close"))}></span>
                                                                    <h4 className={`mb-0 ms-2 proposal-text ${(item?.status ===  "Pending" || item?.status === "Publishing") ? ("pending-text") :
                                                                    (item?.status === "Closed" ? ("close-text") : ("")) }`}>{item?.status}</h4>
                                                                </div> */}
                            </div>
                            <div className="flex gap-5 flex-col lg:flex-row">
                              {/* <div className="w-full lg:w-52 lg:h-32 shrink-0">

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
                                    <b>
                                      {" "}
                                      <Moment format={"DD/MM/YYYY HH:mm"}>
                                        {item?.startDate}
                                      </Moment>
                                    </b>
                                  </p>
                                  <p className="text-secondary mt-3 me-3">
                                    End Date:{" "}
                                    <b>
                                      {" "}
                                      <Moment format={"DD/MM/YYYY HH:mm"}>
                                        {item?.endDate}
                                      </Moment>
                                    </b>
                                  </p>
                                </div>
                                  {item?.options?.map((data: any) => (
                                    <div
                                      className="text-secondary flex gap-1 mt-2 items-center"
                                      key={data?.id}
                                    >
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
                                        {/* {getRecorderValue(data?.recorder)}.{" "} */}
                                        {data?.option}{" "}
                                        {`(${data?.votersCount || "0"})`}
                                      </span>
                                    </div>
                                  ))}
                                <div className="md:flex justify-between items-center mt-2">
                                  <p className="text-base font-semibold mb-2 md:mb-0 text-secondary">
                                    {calculateTimeDifference(item?.endDate)}
                                  </p>
                                  <div className="flex gap-5">
                                    <div>
                                      {/* <span
                                        className={`bg-success h-4 w-4 inline-block rounded-full mr-2 align-middle`}
                                      ></span>
                                      <span className="text-base text-secondary">
                                        Yes - 100%
                                      </span> */}
                                      {/* {user?.data?.options?.map((data:any) => (<div className='text-secondary'>
                                                                                    <div key={data?.id}>
                                                                                        <p className='text-secondary'>{getRecorderValue(data?.recorder)}. {data?.option} {`(${data?.votersCount || "0"})`}
                                                                                        </p>
                                                                                    </div>
                                                                                </div>))} */}
                                    </div>
                                    {/* <div>
                                      <span
                                        className={`bg-primary h-4 w-4 inline-block rounded-full mr-2 align-middle`}
                                      ></span>
                                      <span className="text-base text-secondary">
                                        No - 0%
                                      </span>
                                    </div> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        {loadData && (
                          <>
                            <span className="text-center">
                              {loadMore && (
                                <Spinner size="sm" className="text-dark" />
                              )}{" "}
                            </span>
                            <div
                              className="addmore-title"
                              onClick={addProposalList}
                            >
                              {!hide && (
                                <>
                                  <p className="text-center text-primary text-base font-medium mb-0 cursor-pointer">
                                    See More
                                  </p>
                                  <span className="icon block mx-auto see-more cursor-pointer"></span>
                                </>
                              )}
                            </div>
                          </>
                        )}
                      </>
                    ) : (
                      <div className="text-center container">
                        <img src={nodata} width={60} alt="NO Data" />
                        <h4 className="text-center no-data-text">
                          No Data Found
                        </h4>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ) : (
            <CreateFirstPraposal
              pjctInfo={props?.pjctInfo}
              daoId={params.id}
              memberShipCount={mintedMemberShipCount}
            />
          )}
        </>
      </Container>
      {state?.modalShow && (
        <WalletModal
          modalShow={state?.modalShow}
          metaMaskModalClose={handleClose}
          screen={"proposal"}
        />
      )}
    </>
  );
}
const connectStateToProps = ({ oidc, proposal }: any) => {
  return { oidc: oidc, proposal: proposal };
};
const connectDispatchToProps = (dispatch: any) => {
  return {
    proposalDetailsList: (
      pageSize: any,
      pageNo: any,
      params: any,
      status: any,
      search: any,
      startDate: any,
      endDate: any,
      callback: any
    ) => {
      dispatch(
        getCardsProposalList(
          pageSize,
          pageNo,
          params,
          status,
          search,
          startDate,
          endDate,
          callback
        )
      );
    },
    lookUp: (callback: any) => {
      dispatch(getLookUp(callback));
    },
  };
};
export default connect(
  connectStateToProps,
  connectDispatchToProps
)(ProposalCards);
