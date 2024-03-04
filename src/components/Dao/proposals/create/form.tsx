import React, { useRef } from "react";
import defaultAvatar from "../../../../assets/images/default-avatar.jpg";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { isMobile } from "react-device-detect";
import { ethers } from "ethers/lib";
import FileUploader from "../../../../ui/fileUploader";
import Button from "../../../../ui/Button";
const ProposalForm = ({ state, address, user, dispatch }) => {
  const proposalImageRef = useRef(null);
  const handleCopy = () => {
    dispatch({ type: "setIsCopied", payload: true });
    setTimeout(() => dispatch({ type: "setIsCopied", payload: false }), 1000);
  };
  const handleBlur = (field: string, value: any) => {
    setField(field, value.trim().replace(/\s+/g, " "));
  };
  const handleClearImage = () => {
    setField("image", null);
    if (proposalImageRef && proposalImageRef.current)
      proposalImageRef.current.value = null;
  };
  const optionsAction = (
    action: string,
    optionIndex: number | undefined = undefined,
    value: any = ""
  ) => {
    let updatedOptions = state?.form?.options ? [...state.form.options] : [];
    if (action === "add") {
      const newOption = {
        options: null,
        id: "00000000-0000-0000-0000-000000000000",
        optionHash: null,
      };
      updatedOptions = [...updatedOptions, newOption];
    }
    if (action === "delete") {
      updatedOptions = updatedOptions.filter(
        (_, index) => index !== optionIndex
      );
    }
    if (action === "changeOption" && optionIndex !== undefined) {
      const optionData = { ...updatedOptions[optionIndex] };
      optionData.options = value;
      if (value) {
        optionData.optionHash = ethers?.utils?.keccak256(
          ethers?.utils?.toUtf8Bytes(optionData.options)
        );
      }
      updatedOptions[optionIndex] = optionData;
    }
    setField("options", updatedOptions);
  };
  const setField = (field: string, value: any) => {
    dispatch({ type: "setForm", payload: { ...state.form, [field]: value } });
    if (state?.formErrors[field]) {
      dispatch({
        type: "setFormErrors",
        payload: { ...state?.formErrors, [field]: "" },
      });
    }
  };
  return (
    <div className="">
      <div className="mt-4 ">
        <h4 className="inline-block ml-4 mb-2">Author</h4>
        <div className="border-[#A5A5A5] border rounded-[28px] px-4 py-2 flex items-center truncate copy-clip justify-between h-9">
          <div className="flex items-center truncate">
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
                !state.isCopied
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
          value={state?.form?.proposal || ""}
          onBlur={(e) => handleBlur("proposal", e.currentTarget.value)}
          onChange={(e) => {
            setField("proposal", e.currentTarget.value);
          }}
        />
        <label className="text-sm font-normal text-red-600 ml-4">
          {state?.formErrors.proposal}
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
          value={state?.form?.summary || ""}
          onBlur={(e) => handleBlur("summary", e.currentTarget.value)}
          onChange={(e) => {
            setField("summary", e.currentTarget.value);
          }}
        />
        <label className="text-sm font-normal text-red-600 ml-4">
          {state?.formErrors.summary}
        </label>
        <div className="mt-[18px]">
        <FileUploader
          accept={"images"}
          canDragAndDrop={true}
          canCopyAndPaste={true}
          setFile={(payload: any) => setField("image", payload)}
          inputRef={proposalImageRef}
          size={2}
          uploaderClass="relative flex items-center justify-between border px-3.5 py-4 rounded-[28px] fileupload"
          inputClass="absolute bottom-0 left-0 right-0 top-0 ml-0 w-full opacity-0 cursor-pointer"
        />
        </div>       
        <div className="flex justify-between items-center bg-[#A4AABB33] rounded-[28px] opacity shadow px-3 py-3 mt-[18px]">
          {state?.form?.image && (
            <>
              <div>
                <span className="icon link mr-1"></span>
                <span className="text-secondary font-medium truncate inline-block w-[200px] align-middle">
                  {state?.form?.image?.name}
                </span>
              </div>
              <Button type="plain" handleClick={handleClearImage}>
                <span className="icon close cursor-pointer scale-[0.9]"></span>
              </Button>
            </>
          )}
          {!state?.form?.image && (
            <p className="text-secondary font-medium m-auto">
              <span className="label star">{"Please upload image for proposal!"}</span>
            </p>
          )}
        </div>
        <label className="text-sm font-normal text-red-600 ml-4">
          {state?.formErrors.image}
        </label>
      </div>
      <p className="text-sm text-neutral mt-3">
        <span className="text-secondary">Note:</span> Supported Document Formats
        : PNG/ JPG/ JPEG (File Size : Max 2MB){" "}
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
                checked={state?.form.proposalType==='voting'}
                onChange={(e) => setField("proposalType", e.target.checked ? "voting" : '')}
              />
              <span className=""></span>
            </span>
          </label>
          <span className="text-dark text-sm font-normal p-0 label">
            Voting
          </span>
        </div>
        <label className="text-sm font-normal text-red-600 ml-4">
          {state?.formErrors.proposalType}
        </label>
      </div>
      <div>
        <div className="md:flex justify-between items-center mb-4 mt-8">
          <h4 className="text-xl font-semibold text-secondary block label star">
            Add Your Options
          </h4>
          <div className="text-end">
            <Button
              type="primary"
              btnClassName="text-center fill-btn"
              handleClick={() => optionsAction("add")}
            >
              <span className="icon add"></span>
              <span>Add new Option</span>
            </Button>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {state?.form?.options.map((option: any, index: any) => (
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
                value={option.options ? option.options : ""}
                onChange={(e) => {
                  optionsAction("changeOption", index, e.target.value);
                }}
              />
              <Button
                type="plain"
                handleClick={() => optionsAction("delete", index)}
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
          {state?.form?.options?.map(
            (item: any, index:number) =>
              item?.options && (
                <div
                  className="px-3 rounded-xl py-1 text-secondary font-medium bg-slate-200"
                  key={index}
                >
                  <span className="mb-0">
                    {item?.index || index + 1}. {item?.options}
                  </span>
                </div>
              )
          )}
        </div>
        <label className="text-sm font-normal text-red-600">
          {state?.formErrors.options}
        </label>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="mt-4">
          <label className="text-dark inline-block text-xs font-normal p-0 mb-2 label ml-4 star">
            Start Date & Time <span className="text-xs">(Local time zone)</span>
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
            value={state?.form?.startDate || ""}
            onChange={(e) => setField("startDate", e.target.value)}
          />
          <label className="text-sm font-normal text-red-600 ml-4">
            {state?.formErrors.startDate}
          </label>
        </div>
        <div className="mt-4">
          <label className="text-dark inline-block text-xs font-normal p-0 mb-2 label ml-4 star">
            End Date & Time <span className="text-xs">(Local time zone)</span>
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
            value={state?.form?.endDate || ""}
            onChange={(e) => setField("endDate", e.target.value)}
          />
          <label className="text-sm font-normal text-red-600 ml-4">
            {state?.formErrors.endDate}
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProposalForm;
