import React, { useEffect, useState, useReducer, useContext } from "react";
import user from "../../../../assets/images/praposal-user.png";
import success from "../../../../assets/images/thank-you.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  contractDetailsData,
  proposalData,
  saveProposalCall,
} from "../proposlaReducer/proposlaReducer";
import { store } from "../../../../store";
import { validateContentRule } from "../../../../utils/validation";
import { useParams } from "react-router-dom";
import { ethers } from "ethers/lib";
import error from "../../../../assets/images/error.svg";
import { useAccount } from "wagmi";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { isMobile } from "react-device-detect";
import { useSelector, connect } from "react-redux";
import { getCustomerDetails } from "../../../../reducers/authReducer";
import shimmers from "../../shimmers/shimmers";
import PlaceHolder from "../../shimmers/placeholder";
import WalletText from "../../../../utils/walletText";
import Button from "../../../../ui/Button";
import outletContext from "../../../../layout/context/outletContext";
import OutletContextModel from "../../../../layout/context/model";
import PublishProposalShimmer from "../../shimmers/publishproposalshimmer";
import Moment from "react-moment";
import { useVotingContract } from "../../../../contracts/useContract";
import { waitForTransaction } from "wagmi/actions";
import apiCalls from "../../../../utils/api";
import connectwallet from "../../../../assets/images/connect-wallet.png";

const reducers = (state: any, action: any) => {
  switch (action.type) {
    case "startingDate":
      return { ...state, startingDate: action.payload };
    case "endingDate":
      return { ...state, endingDate: action.payload };
    case "startingTime":
      return { ...state, startingTime: action.payload };
    case "endingTime":
      return { ...state, endingTime: action.payload };
    case "modalShow":
      return { ...state, modalShow: action.payload };
    case "nextStep":
      return { ...state, nextStep: action.payload };
    case "epochStartData":
      return { ...state, epochStartData: action.payload };
    case "epochEndData":
      return { ...state, epochEndData: action.payload };
    case "modalError":
      return { ...state, modalError: action.payload };
    case "isChecked":
      return { ...state, isChecked: action.payload };
    case "currentStep":
      return { ...state, currentStep: action.payload };
  }
};
function CreatePraposal(props: any) {
  const router = useNavigate();
  const { isConnected, address } = useAccount();
  const PublishShimmers = shimmers.PublishProposal(3);
  const [form, setForm] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
  const params = useParams();
  // const [errorMsg, setErrorMessage] = useState<any>(false);
  // const currentDate = new Date()?.toISOString().slice(0, 16);
  const [options, setOptions] = useState<any>([
    {
      options: null,
      Id: "00000000-0000-0000-0000-000000000000",
      optionhash: null,
    },
  ]);
  const [attributes, setAttributes] = useState([]);
  const [copied, setCopied] = useState(false);
  const [loader, setLoader] = useState(false);
  const { toasterMessage, setErrorMessage, setToaster }: OutletContextModel =
    useContext(outletContext);
  const contractData = useSelector(
    (state: any) => state?.proposal?.contractDetails
  );
  const proposalDetails = useSelector(
    (state: any) => state?.proposal?.proposalDetails
  );
  const saveProposal = useSelector(
    (state: any) => state?.proposal?.saveProposal
  );
  const [btnLoader, setBtnLoader] = useState(false);
  const [optionVotingHashs, setOptionVotingHashs] = useState([]);
  const [custmerKYC, setCustomerKYC] = useState<any>(false);
  const [daoName, setDaoName] = useState();
  const votingSeicheContractAddress: any =
    process.env.REACT_APP_VOTING_CONTRACTOR;
  const votingKeijiContractAddress: any =
    process.env.REACT_APP_VOTING_KEIJI_CONTRACTOR;
  const { addQuestion, parseError } = useVotingContract();
  const [startDateEpoch, setStartDateEpoch] = useState<any>();
  const [endDateEpoch, setEndDateEpoch] = useState<any>();
  const user = useSelector((state: any) =>
    isConnected
      ? state?.oidc?.fetchproposalviewdata
      : state?.proposal?.proViewData
  );
  const selectedDaoData = useSelector(
    (state: any) => state?.oidc?.fetchSelectingDaoData
  );
  const DaoDetail = useSelector(
    (state: any) => state?.proposal?.getWalletAddressChecking?.data
  );
  const [loading, setLoading] = useState(true);

  const [state, dispatch] = useReducer(reducers, {
    startingDate: null,
    endingDate: null,
    startingTime: null,
    endingTime: null,
    modalShow: false,
    nextStep: false,
    currentStep: 1,
    epochStartTime: null,
    epochEndData: null,
    modalError: false,
    isChecked: false,
  });
  const [daoData, setDaoData] = useState<any>(null);
  const getCustomerId = useSelector((state: any) => state?.oidc?.user?.id);
  const addOption = () => {
    const newFields = [
      ...options,
      {
        value: null,
        Id: "00000000-0000-0000-0000-000000000000",
        optionhash: null,
      },
    ];
    let optionsArray = newFields.map((item, index) => {
      return {
        options: item.options,
        Id: "00000000-0000-0000-0000-000000000000",
        optionhash: null,
        // index: index+1,
      };
    });
    setOptions(optionsArray);
  };

  // useEffect(() => {
  //   if (isConnected) {
  //     if (address) {
  //       setLoader(true)
  //       props?.customerDetails(address, (callback: any) => {
  //         if (callback?.data?.data?.kycStatus?.toLowerCase() === "completed") {
  //           setLoader(false)
  //         } else {
  //           router(`/dao/kyc`)
  //         }
  //       })
  //     }
  //   }
  // }, [address])
  const deleteOption = (index: any) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    const updatedAttributes = attributes.filter((_, i) => i !== index);
    if (updatedOptions.length === 0) {
      dispatch({
        type: "modalError",
        payload: "Please provide at least one option to continue.",
      });
    } else {
      setOptions(updatedOptions);
      setAttributes(updatedAttributes);
    }
  };

  const openModalPopUp = () => {
    dispatch({ type: "modalShow", payload: true });
    //  modalActions("modalShow","open")
    dispatch({ type: "modalError", payload: null });
  };

  const handleClose = () => {
    resetProperties();
    dispatch({ type: "modalShow", payload: false });
  };
  const handleNextStep = (event) => {
    switch (state.currentStep) {
      case 1:
        handleRedirectToPublishProposalScreen(event);
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
  const optionSave = () => {
    let isUpdate = false;
    let _properties = [...options];
    let _attribute = [];

    for (let i in _properties) {
      let _obj = _properties[i];
      if (_obj.options == "" || _obj.options == null || !_obj.options.trim()) {
        setErrorMessage?.("Options cannot be empty!");
        return;
      } else if (validateContentRule(_obj.options)) {
        setErrorMessage?.("Please provide valid content for options!");
        return;
      } else {
        const isDuplicate = _attribute.some(
          (item) =>
            item?.options?.trim().toLowerCase() ===
            _obj?.options?.trim().toLowerCase()
        );

        if (isDuplicate) {
          setErrorMessage?.("Options should be unique!");
          return;
        } else {
          setErrorMessage?.("");
          isUpdate = true;

          if (_obj.optionhash == null) {
            _obj.optionhash = ethers?.utils?.keccak256(
              ethers?.utils?.toUtf8Bytes(_obj.options)
            );
          }

          _attribute.push(_obj);
        }
      }
    }

    setAttributes(_attribute);

    if (isUpdate) {
      dispatch({ type: "modalShow", payload: false });
    }
  };

  // const checkBoxChecked = (e: any) => {
  //   if (attributes.length == 0 && !state.checked) {
  //     dispatch({ type: "isChecked", payload: e.target.checked });
  //   }
  // };

  const handleRedirectToPublishProposalScreen = (event: any) => {
    setErrorMessage?.(null);
    event.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else if (state?.startingDate && state?.endingDate < state?.startingDate) {
      setErrorMessage?.("Start date cannot be greater than the end date.");
    } else if (
      state?.startingDate == state?.endingDate &&
      state?.endingTime == state?.startingTime
    ) {
      setErrorMessage?.("Start time and end time cannot be the same.");
    } else if (!state?.isChecked || attributes.length === 0) {
      setErrorMessage?.("Please select proposal type");
    } else if (attributes.length < 2) {
      setErrorMessage?.("Please select atleast two options");
    } else {
      const startTime = convertTo24HourFormat(state?.startingTime);
      const endTime = convertTo24HourFormat(state?.endingTime);

      if (state?.startingDate == state?.endingDate && startTime > endTime) {
        setErrorMessage?.("Start time cannot be greater than the end time.");
      } else {
        // let proposalType = state?.isChecked ? "voting" : "decision";
        let proposalType = "voting";
        let formData = form;
        formData.ProposalOptionDetails = attributes;
        formData.startDate = state?.epochStartData;
        formData.endDate = state?.epochEndData;
        formData.proposalType = proposalType;
        formData.customerId = getCustomerId;
        formData.TitleHash = ethers?.utils?.keccak256(
          ethers?.utils?.toUtf8Bytes(form?.proposal)
        );
        store.dispatch(proposalData(formData));
        // router(`/dao/${params?.id}/publishproposal`)
        dispatch({ type: "currentStep", payload: 2 });
      }
    }
  };

  useEffect(() => {
    if (isConnected && Object.keys(proposalDetails).length > 0) {
      let localDate1 = new Date(proposalDetails?.startdate);
      let utcDate = localDate1?.toISOString();
      let utcDateObject = new Date(utcDate);
      let startEpochTime = utcDateObject?.getTime();
      let stEpochTime = startEpochTime / 1000;
      setStartDateEpoch(stEpochTime);

      let localDate2 = new Date(proposalDetails?.enddate);
      let utcDate2 = localDate2?.toISOString();
      let utcDateObject2 = new Date(utcDate2);
      let endEpochTime = utcDateObject2?.getTime();
      let enEpochTime = endEpochTime / 1000;
      setEndDateEpoch(enEpochTime);

      // props?.contractDetails(params);
      // setErrorMessage?.(props?.proposal?.contractDetails?.error)
      getDaoItem();
    }
  }, [proposalDetails]);

  useEffect(() => {
    if (address && isConnected) {
      setLoader(true);
      props?.customerDetails(address, (callback: any) => {
        if (callback?.data?.data?.kycStatus?.toLowerCase() === "completed") {
          setLoader(false);
          setCustomerKYC(callback?.data?.data);
        }
        // else{
        //   router(`/user/kyc`)
        // }
      });
    }
  }, [address]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const getDaoItem = () => {
    let daoData = DaoDetail?.find(
      (item) => item?.daoId == props?.pjctInfo?.daoId || params.daoId
    );
    setDaoName(daoData?.name);
    setDaoData(daoData);
  };
  const getOptionHashes = () => {
    let hashes = proposalDetails?.ProposalOptionDetails;
    for (let i in hashes) {
      let _obj = hashes[i];
      optionVotingHashs.push(_obj?.optionhash);
    }
  };
  const publishProposal = async () => {
    setBtnLoader(true);
    getOptionHashes();
    let localDate = new Date(proposalDetails?.startdate);
    let stUTC = localDate.toISOString();
    let stDateData = stUTC?.slice(0, 19);

    let localDate2 = new Date(proposalDetails?.enddate);
    let endUTC = localDate2.toISOString();
    let endDateData = endUTC?.slice(0, 19);
    const obj = {
      id: "00000000-0000-0000-0000-000000000000",
      customerId: getCustomerId || custmerKYC.id || proposalDetails.customerId,
      daoId: props?.pjctInfo?.daoId || params.daoId,
      title: proposalDetails?.proposal,
      description: proposalDetails?.summary,
      titleHash: proposalDetails.TitleHash,
      startTime: stDateData,
      endTime: endDateData,
      proposalType: proposalDetails?.proposalType,
      proposalOptionDetails: proposalDetails?.ProposalOptionDetails,
    };
    // let contractAddress = daoName == "SEIICHI ISHII" ? votingSeicheContractAddress : votingKeijiContractAddress
    let contractAddress =
      selectedDaoData?.votingContractAddress ||
      daoData?.votingContractAddress ||
      params.votingAddress ||
      props?.pjctInfo?.votingContractAddress ||
      "";
    try {
      const response = await addQuestion(
        contractAddress,
        proposalDetails.TitleHash,
        optionVotingHashs,
        startDateEpoch,
        endDateEpoch
      );
      const txResponse = await waitForTransaction({ hash: response.hash });
      if (txResponse && txResponse.status === 0) {
        setErrorMessage?.("transaction failed");
        setBtnLoader(false);
      } else {
        props?.saveProposalData(obj, (callback: any) => {
          if (callback?.data) {
            // router(`/dao/success/${params?.id}`)
            dispatch({ type: "currentStep", payload: 3 });
            setBtnLoader(false);
          } else {
            setErrorMessage?.(apiCalls.isErrorDispaly(callback));
            window.scroll(0, 0);
            setBtnLoader(false);
          }
        });
      }
    } catch (error) {
      setOptionVotingHashs([]);
      setErrorMessage?.(apiCalls.isErrorDispaly(error));
      setBtnLoader(false);
      window.scroll(0, 0);
      // dispatch({ type: 'currentStep', payload: 3 })
    }
  };
  const convertTo24HourFormat = (time) => {
    const [timeStr, amPm] = time.split(" ");
    const [hours, minutes] = timeStr.split(":");
    let hours24 = parseInt(hours, 10);

    if (amPm?.toLowerCase() === "pm" && hours24 !== 12) {
      hours24 += 12;
    } else if (amPm?.toLowerCase() === "am" && hours24 === 12) {
      hours24 = 0;
    }

    return hours24 * 60 + parseInt(minutes, 10);
  };

  const validateForm = (obj: any, isChange: any) => {
    const { proposal, summary, startdate, enddate } = isChange ? obj : form;
    const newErrors = {};
    if (!proposal || proposal === "") {
      newErrors.proposal = "Is required";
    } else if (validateContentRule("", proposal)) {
      newErrors.proposal = "Please provide valid content";
    }
    if (!summary || summary === "") {
      newErrors.summary = "Is required";
    } else if (validateContentRule("", summary)) {
      newErrors.summary = "Please provide valid content";
    }
    if (!startdate || startdate === "") {
      newErrors.startdate = "Is required";
    }
    if (!enddate || enddate === "") {
      newErrors.enddate = "Is required";
    }
    return newErrors;
  };

  const setOptionFeild = (value: any, index: any) => {
    const newFields = [...options];
    newFields[index].options = value;
    setOptions(newFields);
    optionSave();
  };
  const handleBlur = (field, value) => {
    setField(field, value.trim());
  };
  const handleCheckBoxChecked = () => {
    dispatch({ type: "isChecked", payload: !state.isChecked });
  };
  const setField = (field: any, value: any) => {
    setForm({ ...form, [field]: value });
    if (!!errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const startDate = (e: any) => {
    const selectedDate = e.currentTarget.value;
    const datetimeString = selectedDate.slice(0, 10);
    const datetime = new Date(selectedDate);
    const dateTimeUtc = new Date(selectedDate).toUTCString();
    const epochStartTime = Math.floor(new Date(dateTimeUtc).getTime() / 1000);
    const selectedTime = datetime.toLocaleTimeString();
    const d = datetimeString + " " + selectedTime;
    dispatch({ type: "epochStartData", payload: epochStartTime });
    setField("startdate", selectedDate);
    dispatch({ type: "startingDate", payload: datetimeString });
    dispatch({ type: "startingTime", payload: selectedTime });
  };

  const endDate = (e: any) => {
    const selectedDate = e.currentTarget.value;
    const datetimeString = selectedDate.slice(0, 10);
    const datetime = new Date(selectedDate);
    const dateTimeUtc = new Date(selectedDate).toUTCString();
    const epochEndTime = Math.floor(new Date(dateTimeUtc).getTime() / 1000);
    const selectedTime = datetime.toLocaleTimeString();
    const d = datetimeString + " " + selectedTime;
    dispatch({ type: "epochEndData", payload: epochEndTime });
    setField("enddate", selectedDate);
    dispatch({ type: "endingDate", payload: datetimeString });
    dispatch({ type: "endingTime", payload: selectedTime });
  };
  function resetProperties() {
    if (attributes?.length !== 0) {
      let _attributes = attributes.map((item: any) => {
        return { ...item };
      });
      let _properties = [];
      for (let i in _attributes) {
        let _obj: any = {};
        for (let key in _attributes[i]) {
          _obj[key] = _attributes[i][key];
        }
        _properties.push(_obj);
      }
      setOptions(_attributes);
    } else {
      setOptions([
        {
          value: null,
          Id: "00000000-0000-0000-0000-000000000000",
          optionhash: null,
        },
      ]);
    }
  }

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };
  const handlecloseDrawer = () => {
    props?.close();
    if (state?.currentStep == 3) {
      window.location.reload();
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
                Create Proposal
              </span>
            </Link>
            <span
              className={`icon closeIcon`}
              onClick={handlecloseDrawer}
            ></span>
          </div>
          <div className="">
            <div className="">
              {
                <form
                  noValidate
                  onSubmit={(e) => handleRedirectToPublishProposalScreen(e)}
                >
                  {state.currentStep === 1 && (
                    <>
                      <div className="mt-4 ">
                        <label className="mb-0 inline-block ml-4 mb-2">
                          Author
                        </label>
                        <div className="border-[#A5A5A5] border rounded-[28px] px-4 py-2 flex items-center truncate copy-clip justify-between h-9">
                          <div className="flex items-center">
                            <img src={user} className="mr-2 w-5 h-5"></img>
                            <span>{address}</span>
                          </div>
                          <CopyToClipboard
                            text={address}
                            options={{ format: "text/plain" }}
                            onCopy={() => handleCopy()}
                          >
                            <span
                              className={
                                !copied
                                  ? "icon md copy-icon cursor-pointer shrink-0"
                                  : "icon copy-check cursor-pointer ms-2 shrink-0"
                              }
                            />
                          </CopyToClipboard>
                        </div>
                      </div>
                      <div className="mt-4">
                        <label className="text-dark text-sm font-normal p-0 mb-2 label ml-4 star">
                          Proposal Title
                        </label>
                        <input
                          className="input input-bordered w-full rounded-[28px] border-[#A5A5A5] focus:outline-none pl-4 h-10"
                          type="text"
                          placeholder="Proposal Title"
                          name="proposal"
                          maxLength={250}
                          value={form?.proposal || ""}
                          isInvalid={!!errors.proposal}
                          onBlur={(e) =>
                            handleBlur("proposal", e.currentTarget.value)
                          }
                          onChange={(e) => {
                            setField("proposal", e.currentTarget.value);
                          }}
                        />
                        <label className="text-sm font-normal text-red-600 ml-4">
                          {errors.proposal}
                        </label>
                      </div>
                      {/* <div className="mb-3 mt-4">
                        <label className="text-dark text-sm font-normal p-0 mb-2 label ml-4 star">
                          Summary
                        </label>
                        <textarea                          
                          className="textarea textarea-bordered w-full rounded-[28px] focus:outline-none pl-5"
                          rows={3}
                          placeholder="Summary"
                          name="summary"
                          value={form?.summary || ""}
                          isInvalid={!!errors.summary}
                          onBlur={(e) =>
                            handleBlur("summary", e.currentTarget.value)
                          }
                          onChange={(e) => {
                            setField("summary", e.currentTarget.value);
                          }}
                        />
                        <label className="text-sm font-normal text-red-600 ml-4">
                          {errors.summary}
                        </label>
                      </div> */}
                      <div className="form-control mb-3 mt-4">
                        <label className="text-dark text-sm font-normal p-0 mb-2 label ml-4 star">
                          Summary
                        </label>
                        <textarea className="textarea textarea-bordered w-full resize-none leading-4 rounded-t-[28px] rounded-b-none pl-5 pt-3 focus:outline-none"
                          rows={5}
                          placeholder="Summary"
                          name="summary"
                          value={form?.summary || ""}
                          isInvalid={!!errors.summary}
                          onBlur={(e) =>
                            handleBlur("summary", e.currentTarget.value)
                          }
                          onChange={(e) => {
                            setField("summary", e.currentTarget.value);
                          }}
                        />                       
                        <label htmlFor="" className={`relative flex items-center justify-between border border-t-0 px-3.5 py-4  fileUpload`}>
                          <input accept="image/jpg, image/jpeg, image/png" type="file" className="absolute bottom-0 left-0 right-0 top-0 ml-0 w-full opacity-0 cursor-pointer" />
                          <span className='pointer-events-none relative pl-1 text-sm'>
                            <span className={`fileUploadText text-sm font-normal`}>Attach images by dragging & dropping, selecting or pasting them.</span>
                          </span>
                          <span className={`icon addtext`}></span>
                        </label>
                        <label className="text-sm font-normal text-red-600 ml-4">
                          {errors.summary}
                        </label>
                        <div className="flex justify-between items-center bg-[#A4AABB33] rounded-[28px] opacity shadow px-2.5 py-3 mt-2">
                          <div>
                          <span className="icon link mr-1"></span>
                          <span className="text-secondary font-medium truncate inline-block w-[200px] align-middle">TSC Company Banner.png.....</span>
                          </div>
                          <span className="icon close cursor-pointer scale-[0.9]"></span>
                        </div>
                      </div>
                      <p className="text-sm text-neutral mt-3"><span className="text-secondary">*Note:</span> Supported Document Formats : PNG/ JPG/ DOC/ DOCX/ PDF (File Size : Max 20 MB) </p>

                      {/* <div className='proposal-type c-pointer'>
                <span className='icon uncheck-icon-ps'></span><span className='mb-0'>Decision</span>
                </div>  */}
                      <div className="mt-4">
                        {/* <span className='icon check-icon-ps'></span> */}
                        <label className="text-dark text-sm font-normal p-0 label ml-4 mb-2 star">
                          Select Your Proposal Type
                        </label>
                        <div className="flex gap-2 items-center w-full rounded-[28px] border-[#A5A5A5] border px-4 py-2 h-10">
                          <label className="cursor-pointer relative inline-block mt-1">
                            <span>
                              <input
                                className="checkbox checkbox-error opacity-0 rounded-[28px]"
                                type="checkbox"
                                checked={state?.isChecked}
                                onChange={handleCheckBoxChecked}
                                onClick={openModalPopUp}
                              />
                              <span className=""></span>
                            </span>
                          </label>
                          <span className="text-dark text-sm font-normal p-0 label">
                            Voting
                          </span>
                        </div>
                        {/* {state?.isChecked && (<div className='c-pointer me-3 btn-primary text-center' onClick={openModalPopUp}>Add</div>)} */}
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-4 mt-8">
                          <h4 className="text-xl font-semibold text-secondary">
                            Add Your Options
                          </h4>
                          <div className="text-end">
                            <Button
                              type="primary"
                              btnClassName="text-center fill-btn"
                              handleClick={addOption}
                            >
                              <span className="icon add"></span>
                              Add new Option
                            </Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          {options.map((option: any, index: any) => (
                            <div
                              key={index}
                              className="d-flex align-items-center add-block relative"
                            >
                              <label className="text-dark text-sm font-normal p-0 mb-2 label ml-4">
                                {/* {option?.index
                                      ? option?.index && option?.index + "."
                                      :  */}
                                {`${index + 1}.`}
                              </label>
                              <input
                                type="text"
                                className="input input-bordered w-full rounded-[28px] border-[#A5A5A5] focus:outline-none pl-4 h-10 cust-delete-box pr-[36px]"
                                placeholder="Enter your option"
                                maxLength={50}
                                onChange={(e) => {
                                  setOptionFeild(e.currentTarget.value, index);
                                }}
                                value={option.options ? option.options : ""}
                              />
                              <span
                                className="icon delete-icon top-[36px] absolute right-2.5 cursor-pointer scale-75 w-7 h-7"
                                onClick={() => deleteOption(index)}
                              ></span>
                            </div>
                          ))}
                        </div>
                        {/* <div className="flex justify-center gap-5 items-center mt-16">
                            <Button type='cancel' btnClassName="text-center border-btn" handleClick={handleClose}>
                              Cancel
                            </Button>
                            <Button type="secondary" btnClassName="fill-btn m-0 submit-spinner" handleClick={optionSave}>
                              Save
                            </Button>
                          </div> */}
                      </div>
                      <div className="mt-4">
                        <div className="flex gap-3 flex-wrap">
                          {attributes?.map((item, index) => (
                            <div
                              className="px-3 rounded-xl py-1 text-secondary font-medium bg-slate-200"
                              key={item.options}
                            >
                              <span className="mb-0">
                                {item?.index || index + 1}. {item?.options}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="mt-4">
                          <label className="text-dark inline-block text-sm font-normal p-0 mb-2 label ml-4">
                            Start Date & Time{" "}
                            <span className="text-xs">(Local time zone)</span>
                          </label>
                          <input
                            type="datetime-local"
                            className={`input input-bordered w-full pl-5 rounded-[28px] focus:outline-none h-10 py-2 ${isMobile && !state?.startingDate
                                ? " "
                                : isMobile && state?.startingDate
                                  ? " "
                                  : ""
                              }`}
                            placeholder="Start Date"
                            name="startdate"
                            // min={currentDate}
                            onChange={(e) => startDate(e)}
                          />
                          <label className="text-sm font-normal text-red-600 ml-4">
                            {errors.startdate}
                          </label>
                        </div>
                        <div className="mt-4">
                          <label className="text-dark inline-block text-sm font-normal p-0 mb-2 label ml-4">
                            End Date & Time{" "}
                            <span className="text-xs">(Local time zone)</span>
                          </label>
                          <input
                            type="datetime-local"
                            className={`input input-bordered w-full pl-5 rounded-[28px] focus:outline-none h-10 py-2 ${isMobile && !state?.endingDate
                                ? " "
                                : isMobile && state?.endingDate
                                  ? " "
                                  : ""
                              }`}
                            placeholder="End Date"
                            name="enddate"
                            // min={currentDate}
                            onChange={(e) => endDate(e)}
                          />
                          <label className="text-sm font-normal text-red-600 ml-4">
                            {errors.enddate}
                          </label>
                        </div>
                      </div>
                    </>
                  )}
                  {state?.currentStep === 2 && (
                    <div className="">
                      {!contractData?.loading &&
                        Object.keys(proposalDetails).length > 0 ? (
                        <div className="">
                          <div className="">
                            <span className="mb-0 me-2 text-base font-semibold text-secondary">
                              {proposalDetails?.proposal}
                            </span>
                            <p className="mt-2">{proposalDetails?.summary}</p>
                          </div>
                          <hr className="my-3" />
                          <div className="">
                            <h1 className="mb-2 text-base font-semibold text-secondary">
                              Voting{" "}
                            </h1>
                            <div>
                              <p className="text-sm text-secondary opacity-50 mb-2">
                                Your proposal options
                              </p>
                              <div className="flex items-center flex-wrap gap-3">
                                {proposalDetails?.ProposalOptionDetails?.map(
                                  (item, index) => (
                                    <p
                                      className="px-3 rounded-xl py-1 text-secondary font-medium bg-slate-200"
                                      key={item.options}
                                    >
                                      {item?.index || index + 1}.{" "}
                                      {item?.options}
                                    </p>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                          <hr className="my-3" />
                          <div className="">
                            <h3 className="mb-3 text-base font-semibold text-secondary">
                              Duration{" "}
                            </h3>
                            <div className="flex items-center justify-between mb-4">
                              <p className="text-sm text-secondary opacity-50">
                                Start Date & Time
                              </p>
                              <p className="">
                                <Moment
                                  local={true}
                                  format={"DD/MM/YYYY HH:mm"}
                                >
                                  {proposalDetails?.startdate}
                                </Moment>
                              </p>
                            </div>
                            <div className="flex items-center justify-between mb-4">
                              <p className="text-sm text-secondary opacity-50">
                                End Date & Time
                              </p>
                              <p className="">
                                <Moment
                                  local={true}
                                  format={"DD/MM/YYYY HH:mm"}
                                >
                                  {proposalDetails?.enddate}
                                </Moment>
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <PlaceHolder contenthtml={PublishShimmers} />
                      )}
                    </div>
                  )}
                  {state.currentStep === 3 && (
                    <div className="container mx-auto pt-5">
                      {loading ? (
                        <PublishProposalShimmer />
                      ) : (
                        <>
                          {/* <h4 > <Link to={`/dao/${params.id}`} className='mb-0 back-text text-black'> Create Proposal  </Link></h4>
            <hr /> */}

                          <div className="text-center">
                            <img src={success} className="mx-auto"></img>
                            <h1 className="text-success font-bold text-lg mt-3">
                              Thank You
                            </h1>
                            <p className="mb-5 text-secondary">
                              Your proposal is submitted successfully!
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                  {state?.currentStep !== 3 && (
                    <div className="flex justify-center gap-5 items-center mt-16">
                      <Button
                        handleClick={handlecloseDrawer}
                        type="cancel"
                        btnClassName="justify-center min-w-[164px]"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="secondary"
                        btnClassName="flex gap-2 items-center justify-center min-w-[164px]"
                        handleClick={(e) => handleNextStep(e)}
                        disabled={toasterMessage || state.buttonLoader}
                      >
                        {btnLoader && (
                          <span className="loading loading-spinner loading-sm mr-1"></span>
                        )}{" "}
                        {state?.currentStep === 1 && "Next"}
                        {state?.currentStep === 2 && "Publish"}
                        {/* {state?.currentStep===3 && 'Back to proposals summary'} */}
                      </Button>
                    </div>
                  )}
                </form>
              }
            </div>
          </div>

          {/* <Modal
              show={state?.modalShow}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              className="profile-edit add-option">
              <Modal.Header>
                <Modal.Title><h4>Add Your Options</h4></Modal.Title>
                <span className="icon close c-pointer" onClick={handleClose}></span>
              </Modal.Header>
              <Modal.Body>
                {state?.modalError && (<div className='cust-error-bg'>
                  <div className='mr-4'><Image src={error} alt="" /></div>
                  <div>
                    <p className='error-title error-red'>Error</p>
                    <p className="error-desc">{state?.modalError}</p></div>
                </div>)}
                <div >
                  <Col sm={12} xs={12} md={12} lg={12} xl={12} xxl={12} className='text-end mb-4'>
                    <Button type="button" className="text-center fill-btn" onClick={addOption}>
                      <span className='icon add'></span>Add new option
                    </Button>
                  </Col>
                  <Row>

                    {options.map((option: any, index: any) => (<>
                      <Col sm={12} xs={12} md={6} lg={6} xl={6} xxl={6}>
                        <div className='d-flex align-items-center add-block' key={index}>
                          <Form.Label className="mb-0">{option?.index ? (option?.index && option?.index + ".") : "A."}</Form.Label>
                          <Form.Control
                            type="text"
                            className='border-none-modal'
                            placeholder='Enter your option'
                            maxLength={50}
                            onChange={(e) => { setOptionFeild(e.currentTarget.value, index) }}
                            value={option.options ? option.options : ""}
                          />
                          <span className='icon delete-icon' onClick={() => deleteOption(index)}></span>
                        </div>
                      </Col>
                    </>))}
                  </Row>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <div className="mt-4 text-end">
                  <Button type="button" className="text-center border-btn" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button type="submit" className="fill-btn m-0 ms-3 submit-spinner" onClick={optionSave}>
                    Save
                  </Button>
                </div>
              </Modal.Footer>
            </Modal> */}
        </div>
      ) : (
        <div className="pt-10">
          <WalletText />
        </div>
      )}
    </>
  );
}
const connectStateToProps = ({ oidc, proposal }: any) => {
  return { oidc: oidc, proposal: proposal };
};
const connectDispatchToProps = (dispatch: any) => {
  return {
    contractDetails: (params: any) => {
      dispatch(contractDetailsData(params));
    },
    saveProposalData: (obj: any, callback: any) => {
      dispatch(saveProposalCall(obj, callback));
    },
    customerDetails: (address: any, callback: any) => {
      dispatch(getCustomerDetails(address, callback));
    },
  };
};
export default connect(
  connectStateToProps,
  connectDispatchToProps
)(CreatePraposal);
