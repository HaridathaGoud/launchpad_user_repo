import React, { useEffect, useReducer, useState } from "react";
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
import useContract from "../../../hooks/useContract";
import { ethers } from "ethers";
import { setError, setToaster } from "../../../reducers/layoutReducer";
import { getProposalStatus } from "../proposals/utils";
const reducers = (state: any, action: any) => {
  switch (action.type) {
    case "copied":
      return { ...state, copied: action.payload };
    case "isNoButtonLoading":
      return { ...state, isNoButtonLoading: action.payload };
    case "isButtonLoading":
      return { ...state, isButtonLoading: action.payload };
    case "mintedMemberShipCount":
      return { ...state, mintedMemberShipCount: action.payload };
    case "errorMsg":
      return { ...state, errorMsg: action.payload };
    case "selectedOption":
      return { ...state, selectedOption: action.payload };
    case "selectedhash":
      return { ...state, selectedhash: action.payload };
  }
};
const ProposalResults = (props: any) => {
  const [saveBtn, setsaveBtn] = useState(true);
  const [editBtn, seteditBtn] = useState(false);
  const { address } = useAccount();
  const proposalDetails = useSelector(
    (state: any) => state?.vtg?.proposalDetails
  );
  const savedVoter = useSelector((state: any) => state?.vtg?.savedVoter);
  const customerVoteStatus = useSelector(
    (state: any) => state?.vtg?.isCustomerVoted
  );
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
  const customer = useSelector((state: any) => state?.auth?.user);
  const isVoted = customerVoteStatus?.data?.isVoted;
  const params = useParams();
  const { castVote, parseError } = useVotingContract();
  const [state, dispatch] = useReducer(reducers, {
    copied: false,
    isButtonLoading: false,
    isNoButtonLoading: false,
    mintedMemberShipCount: null,
    errorMsg: null,
    selectedOption: null,
    selectedhash: null,
  });
  const rootDispatch = useDispatch();
  const { getStakedAmount } = useContract();
  const [stakedAmount, setStakedAmount] = useState(0);
  const [stakeAmountLoader, setStakeAmountLoader] = useState(false);
  const getStakeAmount = async () => {
    setStakeAmountLoader(true);
    let response = await getStakedAmount();
    let _amt = response?.toString();
    if (_amt) {
      setStakedAmount(parseFloat(ethers.utils.formatEther(_amt)));
    }
    setStakeAmountLoader(false);
  };
  useEffect(() => {
    getStakeAmount();
  }, [address]);

  const handleChange = (e: any) => {
    dispatch({ type: "selectedOption", payload: e?.option });
    dispatch({ type: "selectedhash", payload: e?.optionHash });
  };
  const handleRedirectVotingScreen = () => {
    if (state?.selectedOption) {
      // modalActions('agreeModel','open')
      saveVote(true);
    } else {
      rootDispatch(setError({ message: "Please select your option" }));
    }
  };
  const getOptionHashes = () => {
    let hashes: any = [];
    let options = proposalDetails?.data?.options;
    for (let i in options) {
      let _obj = options[i];
      hashes.push(_obj?.optionHash);
    }
    return hashes;
  };

  const saveVote = async (value: any) => {
    const optionHashes = getOptionHashes();
    dispatch({ type: "isButtonLoading", payload: true });
    if (value && !state?.selectedOption) {
      rootDispatch(setError({ message: "Please select your option" }));
      dispatch({ type: "isButtonLoading", payload: false });
    } else {
      dispatch({ type: "errorMsg", payload: null });
      // dispatch({ type: 'isButtonLoading', payload: false })
      dispatch({ type: "isNoButtonLoading", payload: !value });
      let obj = {
        proposalId: params?.proposalId,
        walletAddress: address,
        Options: state?.selectedOption,
        TransactionHash: state?.selectedhash,
        Status: (value && "Voted") || "Abstain",
      };
      // let contractAddress = daoVoteName === "SEIICHI ISHII" ? votingSeicheContractAddress : votingKeijiContractAddress
      let contractAddress = proposalDetails?.data?.votingContractAddress;
      try {
        const response = await castVote(
          contractAddress,
          proposalDetails?.data?.titleHash,
          state?.selectedhash
        );
        if (response) {
          await props.saveVoting(obj);
          if (savedVoter.status === "ok") {
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
            setsaveBtn(false);
            seteditBtn(true);
          }
          if (savedVoter.error)
            rootDispatch(setError({ message: savedVoter.error }));
        } else {
          rootDispatch(setError({ message: "Something went wrong!" }));
        }
      } catch (error) {
        setsaveBtn(true);
        seteditBtn(false);
        rootDispatch(setError({ message: parseError(error) }));
      } finally {
        dispatch({ type: "isButtonLoading", payload: false });
        dispatch({ type: "isNoButtonLoading", payload: false });
      }
    }
  };
  const handleCancel = () => {
    modalActions("agreeModel", "close");
    modalActions("castYourVote", "close");
  };
  const handleAgree = () => {
    modalActions("agreeModel", "close");
    modalActions("castYourVote", "open");
  };
  const handleConfirmVote = () => {
    modalActions("castYourVote", "close");
    saveVote(true);
  };
  const handleEditVote = () => {
    modalActions("agreeModel", "open");
  };
  const handleViewVote = () => {
    seteditBtn(false);
    setsaveBtn(true);
  };
  return (
    <>
      <div>
        <h1 className="text-xl font-semibold mb-2 text-secondary mt-5">
          Current results
        </h1>
        <div className={` daorightpanel-bg rounded-[15px] py-4 px-4`}>
          <div className="flex justify-between gap-5 mb-5">
            <div className="shrink-0">
              <div className="mb-2">
                {proposalDetails?.data?.options?.map((data: any) => (
                  <div className="text-secondary" key={data?.id}>
                    <div>
                      <span
                        className={`${
                          data?.votersCount ? styles.greenDot : styles.redDot
                        } mr-2 align-middle`}
                      ></span>
                      <span className="text-secondary">
                        {data?.option} {`(${data?.votersCount || "0"})`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              {/* <p className='text-secondary truncate'>23k The Saf...</p> */}
              {editBtn && (
                <img src={votesuccess} alt="" className="mt-2 w-[90px]" />
              )}
            </div>
          </div>
          {!editBtn && !stakeAmountLoader && stakedAmount >= 1000 && (
            <div>
              <h2 className="text-base font-semibold mb-2 text-secondary">
                Cast Your Vote
              </h2>
              <div className="mb-9">
                {proposalDetails?.data?.options?.length > 0 && (
                  <div className="mt-5">
                    <div className="flex flex-wrap gap-2">
                      {proposalDetails?.data?.options?.map((item: any) => (
                        <div className="me-4 break-all" key={item.option}>
                          <input
                            type="radio"
                            name="radio-1"
                            className="radio mr-1 align-middle"
                            value={item?.option}
                            aria-label={`radio ${item?.option}`}
                            disabled={isVoted && item?.isSelect === false}
                            onClick={() => handleChange(item)}
                            checked={
                              item?.isSelect
                                ? item?.isSelect
                                : state?.selectedOption === item?.option
                            }
                          />
                          <label className="text-secondary">
                            {item?.option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          <div>
            {editBtn && (
              <p className=" text-secondary my-4 text-center">
                Your vote was cast successfully.
              </p>
            )}
          </div>
          {saveBtn &&
            !stakeAmountLoader &&
            stakedAmount >= 1000 &&
            !isVoted &&
            hideVoteButtons && (
              <div className="mb-2">
                <Button
                  handleClick={handleRedirectVotingScreen}
                  type="secondary"
                  btnClassName="w-full flex justify-center gap-2"
                >
                  <span>{state?.isButtonLoading && <Spinner />} </span>{" "}
                  {"Vote Now"}
                </Button>
              </div>
            )}
          {(editBtn || isVoted) &&
            hideVoteButtons && (
              <div>
                <div className="mb-2">
                  <Button
                    handleClick={handleEditVote}
                    type="secondary"
                    btnClassName="w-full"
                  >
                    Edit Vote
                  </Button>
                </div>
                {/* <div className='mb-2'>
                                <Button children={'View Vote'} handleClick={handleViewVote} type='secondary' btnClassName='w-full' />
                            </div> */}
              </div>
            )}
        </div>
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
                  children={"Cancel"}
                  handleClick={handleCancel}
                  type="cancel"
                />
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

      <Modal id="castYourVote" modalClass="max-w-[510px]">
        <div>
          <div>
            <div className="flex justify-between items-center  mb-5">
              <h3 className="font-semibold text-lg mb-5">Cast your vote</h3>
            </div>
            <div className="flex justify-between items-center mb-3">
              <p className={`text-sm ${styles.lightColor}`}>Choice</p>
              <p> {state?.selectedOption} </p>
            </div>
            <div className="flex justify-between items-center mb-3">
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
            </div>
          </div>
          <div
            className={`modal-action justify-center pt-6 mt-2 ${styles.borderTop}`}
          >
            <form method="dialog" className="flex items-center">
              <div className="mr-5">
                {" "}
                <Button
                  children={"Cancel"}
                  handleClick={handleCancel}
                  type="cancel"
                />
              </div>
              <Button
                children={"Confirm"}
                handleClick={handleConfirmVote}
                type="secondary"
              />
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
    saveVoting: (obj: any) => {
      dispatch(saveVoting(obj));
    },
    getCustomerVoteStatus: (proposalId: any, getCustomerData: any) => {
      dispatch(getCustomerVoteStatus(proposalId, getCustomerData));
    },
  };
};

export default connect(null, connectDispatchToProps)(ProposalResults);
