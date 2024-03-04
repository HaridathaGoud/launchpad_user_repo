import React, { useReducer } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { ethers } from "ethers/lib";
import {
  contractDetailsData,
  getProposals,
  saveProposal,
} from "../../../../reducers/proposlaReducer";
import { useSelector, connect, useDispatch } from "react-redux";
import WalletText from "../../../../utils/walletText";
import Button from "../../../../ui/Button";
import { useVotingContract } from "../../../../contracts/useContract";
import { waitForTransaction } from "wagmi/actions";
import { setError } from "../../../../reducers/layoutReducer";
import PublishProposal from "./publish";
import ThankYou from "./thankYou";
import { createProposalReducer, createProposalState } from "./reducers";
import ProposalForm from "./form";
import validateForm from "./formValidation";
import { getEpochFormat } from "./utils";

const CreateProposal = (props: any) => {
  const router = useNavigate();
  const rootDispatch = useDispatch();
  const { isConnected, address } = useAccount();
  const params = useParams();
  const { addQuestion } = useVotingContract();
  const user = useSelector((state: any) => state.auth.user);
  // const contractData = useSelector(
  //   (state: any) => state?.proposal?.contractDetails
  // );
  // const saveProposal = useSelector(
  //   (state: any) => state?.proposal?.saveProposal
  // );
  const { toasterMessage } = useSelector((store: any) => ({
    toasterMessage: store.layoutReducer.toaster.message,
  }));

  const [state, dispatch] = useReducer(
    createProposalReducer,
    createProposalState
  );

  const handleNextStep = (event) => {
    switch (state.currentStep) {
      case 1:
        validateProposal();
        break;
      case 2:
        publishProposal();
        break;
      case 3:
        router(`/dao/${params.id}`);
        break;
      default:
        break;
    }
  };
  const validateProposal = () => {
    rootDispatch(setError({ message: "" }));
    const formErrors = validateForm(state.form);
    if (Object.keys(formErrors).length > 0) {
      dispatch({ type: "setFormErrors", payload: formErrors });
    } else {
      dispatch({ type: "setCurrentStep", payload: 2 });
    }
  };
  // const getContractData = async () => {
  //   try {
  //     await props?.contractDetails(params);
  //     props?.proposal?.contractDetails?.error &&
  //       rootDispatch(
  //         setError({ message: props?.proposal?.contractDetails?.error })
  //       );
  //   } catch (error) {
  //     rootDispatch(setError({ message: error }));
  //   }
  // };
  // useEffect(() => {
  //   getContractData();
  // }, []);
  const getOptionHashes = () => {
    let options = [...state.form.options];
    const hashes: any = [];
    options?.forEach((option) => {
      hashes.push(option?.optionHash);
    });
    return hashes;
  };
  const publishProposal = async () => {
    dispatch({ type: "setIsSaving", payload: true });
    const optionHashes = getOptionHashes();
    let localStartDate = new Date(state.form?.startDate).toISOString();
    let startDate = localStartDate?.slice(0, 19);
    let localEndDate = new Date(state.form?.endDate).toISOString();
    let endDate = localEndDate?.slice(0, 19);
    const titleHash = ethers?.utils?.keccak256(
      ethers?.utils?.toUtf8Bytes(state?.form?.proposal)
    );
    const obj = {
      id: "00000000-0000-0000-0000-000000000000",
      customerId: user.id,
      daoId: props?.pjctInfo?.daoId || params.daoId,
      title: state.form?.proposal,
      description: state.form?.summary,
      titleHash: titleHash,
      startTime: startDate,
      endTime: endDate,
      proposalType: state.form?.proposalType,
      proposalOptionDetails: state.form?.options,
      creatorImage: user.profilePicUrl,
      image: state.form?.image?.url,
    };
    let contractAddress =
      params.votingAddress || props?.pjctInfo?.votingContractAddress || "";
    try {
      const response = await addQuestion(
        contractAddress,
        titleHash,
        optionHashes,
        getEpochFormat(state.form.startDate),
        getEpochFormat(state.form.endDate)
      );
      const txResponse = await waitForTransaction({ hash: response.hash });
      if (txResponse) {
        const { status, error } = await saveProposal(obj);
        if (status) dispatch({ type: "setCurrentStep", payload: 3 });
        if (error) rootDispatch(setError({ message: error }));
      } else {
        rootDispatch(setError({ message: "Transaction failed!" }));
      }
    } catch (error) {
      rootDispatch(setError({ message: error }));
    } finally {
      dispatch({ type: "setIsSaving", payload: false });
    }
  };

  const handleDrawerAction = (action) => {
    switch (state?.currentStep) {
      case 1:
        props?.close();
        break;
      case 2:
        action === "next" && dispatch({ type: "setCurrentStep", payload: 1 });
        action === "close" && props?.close();
        break;
      case 3:
        props?.close();
        props?.getProposals({
          page: 1,
          take: 10,
          daoId: props?.pjctInfo?.daoId || params?.daoId,
          data: null,
          status: "all",
          search: null,
          startDate: "",
          endDate: "",
        });
        break;
      default:
        props?.close();
        break;
    }
  };
  return (
    <>
      {isConnected ? (
        <div className="max-sm:w-full">
          <div className="flex items-center justify-between mb-7">
            <Link to={""} className="">
              {" "}
              <span className="text-xl font-semibold text-secondary">
                {state.currentStep === 1 && "Create Proposal"}
                {state.currentStep === 2 && "Review And Publish Proposal"}
                {state.currentStep === 3 && "Proposal Submitted!"}
              </span>
            </Link>
            <Button
              type="plain"
              handleClick={() => handleDrawerAction("close")}
            >
              {" "}
              <span className={`icon closeIcon`}></span>
            </Button>
          </div>
          <div className="">
            <div className="">
              {
                <form noValidate>
                  {state.currentStep === 1 && (
                    <ProposalForm
                      state={state}
                      dispatch={dispatch}
                      address={address}
                      user={user}
                    />
                  )}
                  {state?.currentStep === 2 && (
                    <PublishProposal proposalDetails={state?.form} />
                  )}
                  {state.currentStep === 3 && <ThankYou />}
                  {state?.currentStep !== 3 && (
                    <div className="flex justify-center gap-5 items-center mt-16">
                      <Button
                        handleClick={() => handleDrawerAction("next")}
                        type="cancel"
                        btnClassName="justify-center min-w-[164px]"
                      >
                        {state?.currentStep === 1 && "Cancel"}
                        {state?.currentStep === 2 && "Previous"}
                        {state?.currentStep === 3 && "Close"}
                      </Button>
                      <Button
                        type="secondary"
                        btnClassName="flex gap-2 items-center justify-center min-w-[164px]"
                        handleClick={(e) => handleNextStep(e)}
                        disabled={toasterMessage || state.isSaving}
                      >
                        {state.isSaving && (
                          <span className="loading loading-spinner loading-sm mr-1"></span>
                        )}{" "}
                        {state?.currentStep === 1 && "Next"}
                        {state?.currentStep === 2 && "Publish"}
                      </Button>
                    </div>
                  )}
                </form>
              }
            </div>
          </div>
        </div>
      ) : (
        <div className="pt-10">
          <WalletText />
        </div>
      )}
    </>
  );
};
const connectStateToProps = ({ oidc, proposal }: any) => {
  return { oidc: oidc, proposal: proposal };
};
const connectDispatchToProps = (dispatch: any) => {
  return {
    contractDetails: (params: any) => {
      dispatch(contractDetailsData(params));
    },
    getProposals: (information: any) => {
      dispatch(getProposals(information));
    },
  };
};
export default connect(
  connectStateToProps,
  connectDispatchToProps
)(CreateProposal);
