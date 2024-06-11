import React, { useEffect, useReducer } from "react";
import styles from "../dao.module.css";
import { useAccount } from "wagmi";
import { connect, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Button from "../../../ui/Button";
import { Modal, modalActions } from "../../../ui/Modal";
import votesuccess from "../../../assets/images/vote-success.gif";
import { useVotingContract } from "../../../contracts/useContract";
import {
  saveVoting,
  getProposalDetails,
  getVoters,
  getCustomerVoteStatus,
} from "../../../reducers/votingReducer";
import Spinner from "../../loaders/spinner";
import { setError, setToaster } from "../../../reducers/layoutReducer";
import {
  getProposalStatus,
  getRewardBalance,
  getVotingOptionColor,
} from "../proposals/utils";
import { resultsReducer, resultsState } from "./reducers";
import useContract from "../../../hooks/useContract";
import DaoResultsShimmer from "../../loaders/DaoResultsShimmer";
const ProposalResults = (props: any) => {
  const { address, isConnected } = useAccount();
  const params = useParams();
  const { castVote, parseError } = useVotingContract();
  const [state, dispatch] = useReducer(resultsReducer, resultsState);
  const rootDispatch = useDispatch();
  const proposalDetails = useSelector(
    (state: any) => state?.vtg?.proposalDetails
  );
  const customerVoteStatus = useSelector(
    (state: any) => state?.vtg?.isCustomerVoted
  );
  const customer = useSelector((state: any) => state?.auth?.user);
  const { readRewardBalance } = useContract();
  useEffect(() => {
    if (isConnected && address) {
      setBalance();
    }
  }, [isConnected, address]);
  const setBalance = async () => {
    const { amount, error } = await getRewardBalance(
      readRewardBalance,
      params.projectToken
    );
    if (amount) {
      dispatch({ type: "setUserBalance", payload: amount });
    } else {
      rootDispatch(setError({ message: error, from: "contract" }));
    }
  };
  const hideVoteButtons =
    getProposalStatus(
      proposalDetails?.data?.startDate,
      proposalDetails?.data?.endDate
    )
      .toLowerCase()
      .includes("starts") ||
    getProposalStatus(
      proposalDetails?.data?.startDate,
      proposalDetails?.data?.endDate
    )
      .toLowerCase()
      .includes("ended");

  const isVoted = customerVoteStatus?.data?.isVoted;
  const handleChange = (selectedOption: any) => {
    dispatch({ type: "setSelectedOption", payload: selectedOption });
  };
  const handleVoting = (action: string) => {
    if (!state?.selectedOption && !isVoted) {
      rootDispatch(
        setError({ message: "Please select one option!", type: "warning" })
      );
      return;
    }
    if (isVoted && (state?.selectedOption?.isSelect || !state.selectedOption)) {
      rootDispatch(
        setError({
          message:
            "Please choose a different option. You've already voted for this one.",
          type: "warning",
        })
      );
      return;
    }
    switch (action) {
      case "new":
        saveVote(true, "new");
        break;
      case "edit":
        modalActions("editVoting", "open");
        break;
      default:
        break;
    }
  };

  const saveVote = async (value: any, mode: string) => {
    dispatch({ type: "setIsSaving", payload: true });
    let obj = {
      proposalId: params?.proposalId,
      walletAddress: address,
      Options: state?.selectedOption?.option,
      TransactionHash: state?.selectedOption?.optionHash,
      Status: (value && "Voted") || "Abstain",
    };
    let contractAddress = proposalDetails?.data?.votingContractAddress;
    try {
      const response = await castVote(
        contractAddress,
        proposalDetails?.data?.titleHash,
        state?.selectedOption?.optionHash
      );
      if (response) {
        const { status, error } = await saveVoting(obj);
        if (status === "ok") {
          await props?.getCustomerVoteStatus(params?.proposalId, customer?.id);
          await props.getProposalDetails(params?.proposalId, customer?.id);
          await props.getVoters({
            page: 1,
            take: 10,
            id: params?.proposalId,
            data: null,
          });
          rootDispatch(
            setToaster({ message: "Your vote was cast successfully." })
          );
          mode === "edit" && modalActions("editVoting", "close");
        }
        if (error) rootDispatch(setError({ message: error }));
      } else {
        rootDispatch(setError({ message: "Something went wrong!" }));
      }
    } catch (error) {
      rootDispatch(setError({ message: parseError(error) }));
    } finally {
      dispatch({ type: "setIsSaving", payload: false });
    }
  };
  const handleCloseModal = (id: any) => {
    modalActions(id, "close");
  };
  const handleAgree = () => {
    modalActions("agreeModel", "close");
    modalActions("castYourVote", "open");
  };
  return (
    <>
      <div>
        <h1 className="text-xl font-semibold mb-2 text-secondary mt-5">
          Current results
        </h1>
        {proposalDetails?.loading && (
          <DaoResultsShimmer/>
        )}
        {!proposalDetails?.loading && (
          <div className={` daorightpanel-bg rounded-[15px] py-4 px-4`}>
            <div className="flex justify-between gap-5 mb-5">
              <div className="">
                <div className="mb-2">
                  {proposalDetails?.data?.options?.map(
                    (data: any, index: number) => (
                      <div className="text-secondary mb-2" key={data?.id}>
                        <div className="flex">
                          <span
                            className={`${getVotingOptionColor[index]} shrink-0 mt-1 mr-2 align-middle  h-4 w-4 inline-block rounded-full`}
                          ></span>
                          <p className="text-secondary break-all">
                            {data?.option} {`(${data?.votersCount || "0"})`}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="shrink-0">
                {/* <p className='text-secondary truncate'>23k The Saf...</p> */}
                {isVoted && (
                  <img src={votesuccess} alt="" className="mt-2 w-[90px]" />
                )}
              </div>
            </div>
            {!state?.isLoading &&
              isConnected &&
              address &&
              proposalDetails?.data?.votingContractAddress &&
              !hideVoteButtons &&
              state.userBalance &&
              proposalDetails.data.status==='Pending' &&
              state.userBalance > Number(proposalDetails?.data?.votingBalance) && (
                <div>
                  <h2 className="text-base font-semibold mb-2 text-secondary">
                    {`${isVoted ? "Edit " : "Cast "}`}Your Vote
                  </h2>
                  <div className="mb-9">
                    {proposalDetails?.data?.options?.length > 0 && (
                      <div className="mt-5">
                        <div className="flex flex-wrap gap-2">
                          {proposalDetails?.data?.options?.map((item: any) => (
                            <div
                              className="me-4 break-all flex items-center"
                              key={item.option}
                            >
                              <input
                                type="radio"
                                name="radio-1"
                                className="radio mr-1 align-middle"
                                value={item?.option}
                                aria-label={`radio ${item?.option}`}
                                disabled={hideVoteButtons}
                                onClick={() => handleChange(item)}
                                defaultChecked={
                                  isVoted
                                    ? item?.isSelect
                                    : state?.selectedOption?.option ===
                                      item?.option
                                }
                              />
                              <p className="text-secondary">{item?.option}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                )}
            <div>
              {isVoted && (
                <p className=" text-secondary my-4 text-center">
                  Your vote was cast successfully.
                </p>
              )}
            </div>
            {!state?.isLoading &&
              isConnected &&
              address &&
              proposalDetails?.data?.votingContractAddress &&
              !hideVoteButtons &&
              state.userBalance &&
              proposalDetails.data.status==='Pending' &&
              state.userBalance > Number(proposalDetails?.data?.votingBalance) &&
              !hideVoteButtons&& ( 
                // {!state?.isLoading && !hideVoteButtons && (
              <div className="mb-2">
                <Button
                  handleClick={
                    !isVoted
                      ? () => handleVoting("new")
                      : () => handleVoting("edit")
                  }
                  type="secondary"
                  btnClassName={`w-full ${
                    !isVoted ? "flex justify-center gap-2" : ""
                  } `}
                  disabled={state?.isSaving}
                >
                  <span>{!isVoted && state?.isSaving && <Spinner />} </span>{" "}
                  {!isVoted && "Vote Now"}
                  {isVoted && "Edit Vote"}
                </Button>
              </div>
            // )}
          )}
            {/* {(state?.showEditButton || isVoted) && !hideVoteButtons && (
            <div>
              <div className="mb-2">
                <Button
                  handleClick={() => handleVoting("edit")}
                  type="secondary"
                  btnClassName="w-full"
                >
                  Edit Vote
                </Button>
              </div>
              <div className='mb-2'>
                                <Button children={'View Vote'} handleClick={handleViewVote} type='secondary' btnClassName='w-full' />
                            </div>
            </div>
          )} */}
          </div>
        )}
      </div>

      <Modal id="agreeModel" modalClass="max-w-[510px]">
        <div>
          <div className="">
            <div className="flex justify-between items-center  mb-5">
              <h3 className="font-semibold text-lg">Terms Of Service</h3>
            </div>
            <div className={`py-4 px-3 flex gap-3 ${styles.popBg}`}>
              <div>
                <span className={`icon ${styles.info}`}></span>
              </div>
              <div>
                <p>
                  Oops, it seems you don’t have any voting power at block
                  31,272,274.{" "}
                  <span className="font-semibold text-base cursor-pointer">
                    Learn more
                  </span>
                  <span
                    className={`icon cursor-pointer ${styles.squareArrow}`}
                  ></span>
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center mt-7 px-10">
              <p className="text-center font-semibold truncate">
                docs.safran.store/library/terms-a...
              </p>
              <span
                className={`icon cursor-pointer shrink-0 ${styles.squareArrow}`}
              ></span>
            </div>
          </div>
          <div
            className={`modal-action justify-center pt-4 ${styles.borderTop}`}
          >
            <form method="dialog" className="flex items-center">
              <div className="mr-5">
                {" "}
                <Button
                  handleClick={() => handleCloseModal("agreeModal")}
                  type="cancel"
                >
                  Cancel
                </Button>
              </div>
              <Button
                children={"I agree"}
                handleClick={handleAgree}
                type="secondary"
              />
            </form>
          </div>
        </div>
      </Modal>

      <Modal id="editVoting" modalClass="max-w-[510px]">
        <div>
          <div>
            <div className="flex justify-between items-center  mb-5">
              <h3 className="font-semibold text-lg mb-5">
                Are you sure you want to edit your vote?
              </h3>
            </div>
            <div className="flex justify-between items-center mb-3">
              <p className={`text-sm ${styles.lightColor}`}>Current Choice</p>
              <p> {state?.selectedOption?.option} </p>
            </div>
            {/* <div className="flex justify-between items-center mb-3">
              <p className={`text-sm ${styles.lightColor}`}>DOTT</p>
              <p>
                31,272,274{" "}
                <span className={`icon ${styles.squareArrow}`}></span>
              </p>
            </div>
            <div className="flex justify-between items-center mb-3">
              <p className={`text-sm ${styles.lightColor}`}>
                Your voting power
              </p>
              <p>0 Safran</p>
            </div>
            <div className={`py-4 px-3 flex gap-3 mb-4 ${styles.popBg}`}>
              <div>
                <span className={`icon ${styles.info}`}></span>
              </div>
              <div>
                <p>
                  Oops, it seems you don’t have any voting power at block
                  31,272,274.{" "}
                  <span className="font-semibold text-base cursor-pointer">
                    Learn more
                  </span>
                  <span
                    className={`icon cursor-pointer ${styles.squareArrow}`}
                  ></span>
                </p>
              </div>
            </div> */}
          </div>
          <div
            className={`modal-action justify-center pt-6 mt-2 ${styles.borderTop}`}
          >
            <form method="dialog" className="flex items-center">
              <div className="mr-5">
                {" "}
                <Button
                  children={"Cancel"}
                  handleClick={() => handleCloseModal("editVoting")}
                  type="cancel"
                  disabled={state?.isSaving}
                />
              </div>
              <Button
                handleClick={() => saveVote(true, "edit")}
                type="secondary"
                btnClassName="flex justify-center gap-2"
                disabled={state?.isSaving}
              >
                <span>{isVoted && state?.isSaving && <Spinner />} </span>{" "}
                <span>Confirm</span>
              </Button>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};
const connectDispatchToProps = (dispatch: any) => {
  return {
    getProposalDetails: (sub: any, custId: any) => {
      dispatch(getProposalDetails(sub, custId));
    },
    getVoters: (information: any) => {
      dispatch(getVoters(information));
    },
    getCustomerVoteStatus: (proposalId: any, getCustomerData: any) => {
      dispatch(getCustomerVoteStatus(proposalId, getCustomerData));
    },
  };
};

export default connect(null, connectDispatchToProps)(ProposalResults);
