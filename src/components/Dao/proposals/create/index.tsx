import React, { useEffect, useState, useReducer, useRef } from "react";
import success from "../../../../assets/images/thank-you.svg";
import defaultAvatar from "../../../../assets/images/default-avatar.jpg";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  contractDetailsData,
  proposalData,
  saveProposalCall,
} from "../../../../reducers/proposlaReducer";
import { store } from "../../../../store";
import { validateContentRule } from "../../../../utils/validation";
import { ethers } from "ethers/lib";
import { useAccount } from "wagmi";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { isMobile } from "react-device-detect";
import { useSelector, connect, useDispatch } from "react-redux";
import { getCustomerDetails } from "../../../../reducers/authReducer";
import shimmers from "../../shimmers/shimmers";
import PlaceHolder from "../../shimmers/placeholder";
import WalletText from "../../../../utils/walletText";
import Button from "../../../../ui/Button";
import PublishProposalShimmer from "../../shimmers/publishproposalshimmer";
import Moment from "react-moment";
import { useVotingContract } from "../../../../contracts/useContract";
import { waitForTransaction } from "wagmi/actions";
import { setError } from "../../../../reducers/layoutReducer";
import FileUploader from "../../../../ui/fileUploader";

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
const CreatePraposal = (props: any) => {
  const router = useNavigate();
  const rootDispatch = useDispatch();
  const proposalImageRef = useRef(null);
  const { isConnected, address } = useAccount();
  const PublishShimmers = shimmers.PublishProposal(3);
  const [form, setForm] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
  const params = useParams();
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
  const { toasterMessage } = useSelector((store: any) => ({
    toasterMessage: store.layoutReducer.toaster.message,
  }));
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
  const { addQuestion } = useVotingContract();
  const [startDateEpoch, setStartDateEpoch] = useState<any>();
  const [endDateEpoch, setEndDateEpoch] = useState<any>();
  const user = useSelector((state: any) => state.auth.user);
  const selectedDaoData = useSelector(
    (state: any) => state?.oidc?.fetchSelectingDaoData
  );
  const DaoDetail = useSelector((state: any) => state?.proposal?.daos?.data);
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
  const [file, setFile] = useState(null);
  const handleClearImage = () => {
    setFile(null);
    if (proposalImageRef && proposalImageRef.current) proposalImageRef.current.value = null;
  };
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

  const handleClose = () => {
    resetProperties();
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
        rootDispatch(setError({ message: "Options cannot be empty!" }));
        return;
      } else if (validateContentRule(_obj.options)) {
        rootDispatch(
          setError({ message: "Please provide valid content for options!" })
        );
        return;
      } else {
        const isDuplicate = _attribute.some(
          (item: any) =>
            item?.options?.trim().toLowerCase() ===
            _obj?.options?.trim().toLowerCase()
        );

        if (isDuplicate) {
          rootDispatch(setError({ message: "Options should be unique!" }));
          return;
        } else {
          rootDispatch(setError({ message: "" }));
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
  };

  // const checkBoxChecked = (e: any) => {
  //   if (attributes.length == 0 && !state.checked) {
  //     dispatch({ type: "isChecked", payload: e.target.checked });
  //   }
  // };

  const handleRedirectToPublishProposalScreen = (event: any) => {
    rootDispatch(setError({ message: "" }));
    event.preventDefault();
    const formErrors = validateForm();
    console.log(file);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else if (state?.startingDate && state?.endingDate < state?.startingDate) {
      rootDispatch(
        setError({ message: "Start date cannot be greater than the end date." })
      );
    } else if (
      state?.startingDate == state?.endingDate &&
      state?.endingTime == state?.startingTime
    ) {
      rootDispatch(
        setError({ message: "Start time and end time cannot be the same." })
      );
    } else if (!state?.isChecked || attributes.length === 0) {
      rootDispatch(setError({ message: "Please select proposal type" }));
    } else if (attributes.length < 2) {
      rootDispatch(setError({ message: "Please select atleast two options" }));
    } else {
      const startTime = convertTo24HourFormat(state?.startingTime);
      const endTime = convertTo24HourFormat(state?.endingTime);

      if (state?.startingDate == state?.endingDate && startTime > endTime) {
        rootDispatch(
          setError({
            message: "Start time cannot be greater than the end time.",
          })
        );
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
  // const getContractData = async () => {
  //   try {
  //     console.log(params)
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
      if (txResponse) {
        props?.saveProposalData(obj, (callback: any) => {
          if (callback?.data) {
            dispatch({ type: "currentStep", payload: 3 });
            setBtnLoader(false);
          } else {
            rootDispatch(setError({ message: callback }));
            setBtnLoader(false);
          }
        });
      } else {
        rootDispatch(setError({ message: "Transaction failed!" }));
        setBtnLoader(false);
      }
    } catch (error) {
      setOptionVotingHashs([]);
      rootDispatch(setError({ message: error }));
      setBtnLoader(false);
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
    const newErrors: any = {};
    if (!proposal || proposal === "") {
      newErrors.proposal = "Is required";
    } else if (validateContentRule(proposal)) {
      newErrors.proposal = "Please provide valid content";
    }
    if (!summary || summary === "") {
      newErrors.summary = "Is required";
    } else if (validateContentRule(summary)) {
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
            <Button type="plain" handleClick={handlecloseDrawer}>
              {" "}
              <span className={`icon closeIcon`}></span>
            </Button>
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
                        <h4 className="mb-0 inline-block ml-4 mb-2">Author</h4>
                        <div className="border-[#A5A5A5] border rounded-[28px] px-4 py-2 flex items-center truncate copy-clip justify-between h-9">
                          <div className="flex items-center">
                            <img
                              src={user?.profilePicUrl || defaultAvatar}
                              className="mr-2 w-5 h-5 rounded-full"
                              alt="user"
                            />
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
                        <label
                          htmlFor="proposalTitle"
                          className="text-dark text-sm font-normal p-0 mb-2 label ml-4 star"
                        >
                          Proposal Title
                        </label>
                        <input
                          id="proposalTitle"
                          className="input input-bordered w-full rounded-[28px] border-[#A5A5A5] focus:outline-none pl-4 h-10"
                          type="text"
                          placeholder="Proposal Title"
                          name="proposal"
                          maxLength={250}
                          value={form?.proposal || ""}
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
                      <div className="form-control mb-3 mt-4">
                        <label
                          htmlFor="proposalSummary"
                          className="text-dark text-sm font-normal p-0 mb-2 label ml-4 star"
                        >
                          Summary
                        </label>
                        <textarea
                          id="proposalSummary"
                          className="textarea textarea-bordered w-full resize-none leading-4 rounded-[28px] pl-5 pt-3 focus:outline-none"
                          rows={5}
                          placeholder="Summary"
                          name="summary"
                          value={form?.summary || ""}
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
                        <div className="mt-[18px]">
                        <FileUploader
                          accept={"images"}
                          canDragAndDrop={true}
                          canCopyAndPaste={true}
                          setFile={(payload) => setFile(payload)}
                          inputRef={proposalImageRef}
                          size={2}
                          uploaderClass="relative flex items-center justify-between border px-3.5 py-4 rounded-[28px] fileupload"
                          inputClass="absolute bottom-0 left-0 right-0 top-0 ml-0 w-full opacity-0 cursor-pointer"
                        />
                        </div>
                        <div className="flex justify-between items-center bg-[#A4AABB33] rounded-[28px] opacity shadow px-3 py-3 mt-[18px]">
                          {file && (
                            <>
                              <div>
                                <span className="icon link mr-1"></span>
                                <span className="text-secondary font-medium truncate inline-block w-[200px] align-middle">
                                  {file?.name}
                                </span>
                              </div>
                              <Button
                                type="plain"
                                handleClick={handleClearImage}
                              >
                                <span className="icon close cursor-pointer scale-[0.9]"></span>
                              </Button>
                            </>
                          )}
                          {!file && (
                            <p className="text-secondary font-medium text-center grow">
                              {"Please upload image!"}
                            </p>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-neutral pl-4">
                        <span className="text-secondary">*Note:</span> Supported
                        Document Formats : PNG/ JPG/ JPEG (File Size : Max 2MB){" "}
                      </p>
                      {/* <div className='proposal-type c-pointer'>
                <span className='icon uncheck-icon-ps'></span><span className='mb-0'>Decision</span>
                </div>  */}
                      <div className="mt-4">
                        <h4 className="text-dark text-sm font-normal p-0 label ml-4 mb-2 star">
                          Select Your Proposal Type
                        </h4>
                        <div className="flex gap-2 items-center w-full rounded-[28px] border-[#A5A5A5] border px-4 py-2 h-10">
                          <label
                            htmlFor="votingBox"
                            className="cursor-pointer relative inline-block mt-1"
                          >
                            <span>
                              <input
                                id="votingBox"
                                className="checkbox checkbox-error opacity-0 rounded-[28px]"
                                type="checkbox"
                                checked={state?.isChecked}
                                onChange={handleCheckBoxChecked}
                              />
                              <span className=""></span>
                            </span>
                          </label>
                          <span className="text-dark text-sm font-normal p-0 label">
                            Voting
                          </span>
                        </div>
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
                              <span>Add new Option</span>
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
                              <Button
                                type="plain"
                                handleClick={() => deleteOption(index)}
                              >
                                {" "}
                                <span className="icon delete-icon top-[36px] absolute right-2.5 cursor-pointer scale-75 w-7 h-7"></span>
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex gap-3 flex-wrap">
                          {attributes?.map((item: any, index) => (
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
                          <label className="text-dark inline-block text-xs font-normal p-0 mb-2 label ml-4 star">
                            Start Date & Time{" "}
                            <span className="text-xs">(Local time zone)</span>
                          </label>
                          <input
                            type="datetime-local"
                            className={`input input-bordered w-full pl-5 rounded-[28px] focus:outline-none h-10 py-2 ${
                              isMobile && !state?.startingDate
                                ? " "
                                : isMobile && state?.startingDate
                                ? " "
                                : ""
                            }`}
                            placeholder="Start Date"
                            name="startdate"
                            onChange={(e) => startDate(e)}
                          />
                          <label className="text-sm font-normal text-red-600 ml-4">
                            {errors.startdate}
                          </label>
                        </div>
                        <div className="mt-4">
                          <label className="text-dark inline-block text-xs font-normal p-0 mb-2 label ml-4 star">
                            End Date & Time{" "}
                            <span className="text-xs">(Local time zone)</span>
                          </label>
                          <input
                            type="datetime-local"
                            className={`input input-bordered w-full pl-5 rounded-[28px] focus:outline-none h-10 py-2 ${
                              isMobile && !state?.endingDate
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
                        <div className="text-center">
                          <img
                            src={success}
                            className="mx-auto"
                            alt="Successful!"
                          />
                          <h1 className="text-success font-bold text-lg mt-3">
                            Thank You
                          </h1>
                          <p className="mb-5 text-secondary">
                            Your proposal is submitted successfully!
                          </p>
                        </div>
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