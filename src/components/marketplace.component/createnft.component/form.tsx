import React, { useMemo } from "react";
import Button from "../../../ui/Button";
import TextInput from "../../../ui/textInput";
import TextArea from "../../../ui/textArea";
import Select from "../../../ui/select";
import { Modal, modalActions } from "../../../ui/Modal";
import { validateForm, validateProperties } from "./validation";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../../reducers/layoutReducer";
import { Property } from "./models";
import NoData from "../../../ui/noData";
import { apiUploadPost } from "../../../utils/api";
import CreatenftShimmer from "./createnftshimmer";
import ipfsClient from "../../../utils/ipfsClient";
import CustomSelect from "./customSelect";
import NumberInput from "../../../ui/numberInput";
import Spinner from "../../loaders/spinner";
const getModalSteps = (isPutOnSale: boolean) => {
  const steps = [
    { title: "Approval", message: "Please provide approval for NFT transfer" },
    { title: "Mint", message: "Send transaction to mint NFT" },
  ];
  return isPutOnSale
    ? [
        ...steps,
        {
          title: "Signature",
          message: "Please sign to place NFT on Sale in Marketplace",
        },
      ]
    : steps;
};
const Form = ({ state, updateState, inputRef, mint }) => {
  const {
    values,
    errors: formErrors,
    propertyErrors,
    propertiesToUpdate: modalProperties,
  } = state;
  const dispatch = useDispatch();
  const { userCollections, networks } = useSelector((store: any) => {
    const detailsForForm = store.createNft;
    return detailsForForm;
  });
  const currencies = useMemo(() => {
    return values.network?.currencies || [];
  }, [values.network]);
  const handleChange = (field: string, value: any, selectedValue?: any) => {
    const valuesToUpdate = { ...values };
    if (field === "isPutOnAuction" && valuesToUpdate["isPutonSale"])
      valuesToUpdate["isPutonSale"] = false;
    if (field === "isPutonSale" && valuesToUpdate["isPutOnAuction"])
      valuesToUpdate["isPutOnAuction"] = false;
    if (field === "collection") {
      valuesToUpdate["collection"] = selectedValue;
    } else {
      valuesToUpdate[field] = value;
    }
    updateState("setValues", valuesToUpdate);
  };
  const addProperties = () => {
    dispatch(setError({ message: "" }));
    const propertyToAdd = { trait_type: "", value: "" };
    const propertiesToUpdate = modalProperties
      ? [...modalProperties, propertyToAdd]
      : [propertyToAdd];
    updateState("setPropertiesToUpdate", propertiesToUpdate);
  };
  const handlePropertiesChange = (field: string, value: any, index: number) => {
    const propertiesToUpdate = [...modalProperties];
    // const errorsToUpdate = [...propertyErrors];
    // if (errorsToUpdate?.[index]?.[field]) {
    //   errorsToUpdate[index][field] = "";
    // }
    if (propertiesToUpdate[index]) {
      propertiesToUpdate[index] = {
        ...propertiesToUpdate[index],
        [field]: value,
      };
    }
    // updateState("setPropertyErrors", errorsToUpdate);
    updateState("setPropertiesToUpdate", propertiesToUpdate);
  };
  const handleDeleteProperty = (index: number) => {
    const properties = [...modalProperties];
    const errorsToUpdate = [...propertyErrors];
    if (errorsToUpdate.length > 0) {
      errorsToUpdate.splice(index, 1);
    }
    properties.splice(index, 1);
    updateState("setPropertyErrors", errorsToUpdate || []);
    updateState(
      "setPropertiesToUpdate",
      properties?.length > 0 ? properties : null
    );
  };
  const handlePropertiesSave = () => {
    const { isValid, errors, error } = validateProperties(modalProperties);
    if (isValid) {
      const propertiesToUpdate = modalProperties ? [...modalProperties] : null;
      updateState("setValues", { ...values, properties: propertiesToUpdate });
      updateState("setPropertyErrors", []);
      modalActions("nftPropsModal", "close");
    }
    if (!isValid && errors) {
      updateState("setPropertyErrors", errors);
    }
    if (!isValid && error) {
      dispatch(setError({ message: error, type: "warning" }));
    }
  };
  const handleUpload = (event: any) => {
    if (event.target.files?.[0]) {
      const file = event.target.files[0];
      uploadToServer(file, event);
    }
  };

  const uploadToServer = async (file: any, event) => {
    const body: any = new FormData();
    updateState("setIsLoading", "uploadingImageUrl");
    let fileType = {
      "image/png": true,
      "image/jpg": true,
      "image/jpeg": true,
      "image/PNG": true,
      "image/JPG": true,
      "image/JPEG": true,
    };
    body.append("file", file);
    if (fileType[file?.type]) {
      try {
        const response = await apiUploadPost(`Upload/UploadFileNew`, body);
        if (response.statusText.toLowerCase() === "ok") {
          dispatch(setError({ message: "" }));
          const valuesToUpdate = { ...values };
          valuesToUpdate.imageUrl = response.data[0];
          const result = await ipfsClient.add(file);
          valuesToUpdate.filePath = result.path;
          updateState("setValues", valuesToUpdate);
        } else {
          dispatch(setError({ message: response }));
        }
      } catch (error) {
        dispatch(setError({ message: error }));
      } finally {
        updateState("setIsLoading", "");
      }
    } else {
      dispatch(
        setError({
          message:
            "File is not allowed. Please upload only jpg, png, jpeg files!",
          type: "warning",
        })
      );
      event.target.value = "";
      updateState("setIsLoading", "");
    }
  };
  const createNFT = async (e: any) => {
    e.preventDefault();
    updateState("setIsLoading", "saving");
    try {
      const { isValid, errors } = validateForm(values);
      if (isValid) {
        Object.keys(formErrors).length > 0 && updateState("setErrors", {});
        let obj = {
          description: values.description,
          external_url: values.externalLink,
          image: `ipfs://${values.filePath}`,
          name: values.name,
          attributes: JSON.stringify(values.properties),
        };
        let nftMetadata = JSON.stringify(obj);
        const result = await ipfsClient.add(nftMetadata);
        result.path && (await mint(result));
      } else {
        updateState("setErrors", errors);
      }
    } catch (error) {
      dispatch(setError({ message: error }));
    } finally {
      updateState("setIsLoading", "");
      updateState("setModalSteps", 0);
    }
  };
  return (
    <form className="mt-4">
      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="nftImageCreate"
            className="text-secondary text-sm font-normal p-0 mb-2 label ml-4 block"
          >
            Upload NFT Image <span className="text-[#ff0000]">*</span>
          </label>

          <div className="mb-6 flex justify-center items-center h-[300px] md:h-[500px] border-dashed border border-[#A5A5A5] relative rounded-[28px]">
            {values.imageUrl && state.isLoading !== "uploadingImageUrl" && (
              <div className="w-full h-full">
                <img
                  src={values.imageUrl}
                  alt={""}
                  className="w-full h-full object-cover rounded-[28px]"
                />
                <Button
                  type="plain"
                  btnClassName="icon camera absolute top-3 right-3 create-nft-cam c-pointer"
                >
                  <input
                    type="file"
                    name="myImage"
                    className="icon camera"
                    onChange={handleUpload}
                  />
                </Button>
              </div>
            )}
            {!values.imageUrl && state.isLoading !== "uploadingImageUrl" && (
              <div className="">
                <div className="text-center">
                  <span
                    // type="plain"
                    className="icon image-upload cursor-pointer"
                    // handleClick={() => inputRef.current?.click()}
                  ></span>
                  <p
                    // type="plain"
                    // handleClick={() => inputRef.current?.click()}
                    className="mt-5 mb-1 cursor-pointer text-base font-semibold text-secondary opacity-60"
                  >
                    PNG, GIF, WEBP, MP4 or MP3. Max 10MB.
                  </p>
                  <p className="text-sm opacity-60 mb-4">
                    <span className="font-semibold">Note: </span>For Better
                    Appearance Upload 500 * 500 Resolution
                  </p>
                  <div className="w-[140px] mx-auto relative h-12">
                    <input
                      required
                      className="opacity-0 z-10 relative w-full"
                      type="file"
                      ref={inputRef}
                      onChange={handleUpload}
                    />
                    <Button
                      btnClassName="absolute left-0 top-0 cursor-pointer"
                      type="primary"
                      //   handleClick={() => inputRef.current?.click()}
                    >
                      Choose File
                    </Button>
                  </div>
                  {formErrors["imageUrl"] && (
                    <p className="text-sm font-normal text-red-600 mt-4">
                      {formErrors["imageUrl"]}
                    </p>
                  )}
                </div>
              </div>
            )}
            {state.isLoading === "uploadingImageUrl" && (
              <CreatenftShimmer.ImageShimmer />
            )}
          </div>
        </div>
        <div>
          <div className="">
            <TextInput
              label="Name"
              value={values.name}
              onChange={handleChange}
              inputBoxClass="mb-6"
              fieldName="name"
              error={formErrors["name"]}
            />
            <TextInput
              label="External link"
              value={values.externalLink}
              onChange={handleChange}
              inputBoxClass="mb-6"
              fieldName="externalLink"
              error={formErrors["externalLink"]}
              maxLength={500}
              inputInfo="DOTT will include a link to this URL on this item's detail page,
              so that users can click to learn more about it. You are welcome to
              link to your own webpage with more details."
            />
            <TextArea
              label="Description"
              value={values.description}
              onChange={handleChange}
              inputBoxClass="mb-6"
              fieldName="description"
              error={formErrors["description"]}
              isRequired={false}
              maxLength={500}
              inputInfo=" This is the collection where your item will appear."
            />
            <Select
              inputBoxClass="mb-6 p-relative"
              value={values.collection?.["name"] || ""}
              options={userCollections.data || []}
              onChange={handleChange}
              fieldName="collection"
              error={formErrors["collection"]}
              label="Collection"
              defaultOption="Select Collection"
            />
            <div className="border border-[#A5A5A5] rounded-[28px]">
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="icon properties"></span>
                    <div className="ms-2">
                      <h6 className="text-secondary text-base font-normal">
                        Properties <span className="text-[#ff0000]">*</span>
                      </h6>
                      <p className="text-secondary text-sm font-normal">
                        Textual traits that show up as rectangles
                      </p>
                    </div>
                  </div>
                  <Button
                    type="plain"
                    btnClassName="icon add-btn cursor-pointer"
                    handleClick={() => modalActions("nftPropsModal", "open")}
                  ></Button>
                </div>
                <div className="mb-2 mt-7 grid grid-cols-3 gap-4 px-6">
                  {values?.properties?.map((property: Property, index) => (
                    <div
                      key={index}
                      className="mb-3 border border-[#939393] rounded-lg p-[14px] text-center"
                    >
                      <div className="avatar-box me-lg-2">
                        <label className="text-base text-primary font-normal break-words">
                          {property.trait_type}
                        </label>
                        <p className="text-base text-secondary font-normal break-words">
                          {property.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {formErrors?.["properties"] && (
              <p className="text-sm font-normal text-red-600 ">
                {formErrors?.["properties"]}
              </p>
            )}
            {/* <p className="text-secondary opacity-60 ">
                  The number of items that can be minted. No gas cost to you!
                </p> */}
            {/* <TextInput
              label="Supply"
              value={values.supply}
              onChange={handleChange}
              inputBoxClass="mb-6"
              fieldName="supply"
              error={""}
              maxLength={20}
            /> */}

            <div className="mb-6 mt-6 p-relative">
              <p className="text-secondary text-sm font-normal p-0 mb-2 label block">
                Network <span className="text-[#ff0000]">*</span>
              </p>
              <CustomSelect
                selectedValue={values.network || networks?.[0] || null}
                valueField={"name"}
                imageField={"icon"}
                optionKey={"name"}
                hasImage={true}
                options={networks.data || []}
                onSelect={(value: any) => handleChange("network", value)}
                placeholder={"Select Network"}
              />
              {formErrors?.["network"] && (
                <p className="text-sm font-normal text-red-600 ">
                  {formErrors?.["network"]}
                </p>
              )}
            </div>
            <NumberInput
              label="Royalties"
              value={values.royalities}
              onChange={handleChange}
              inputBoxClass="mb-6"
              fieldName="royalities"
              error={""}
              placeholder="Suggested: 10%, 20%, 30%"
            />
            <div className="mb-6 ">
              <div className="flex items-center">
                <label className="cursor-pointer relative inline-block mt-2">
                  <span className="align-middle">
                    <input
                      type="radio"
                      name="isPuton"
                      checked={values.isPutonSale}
                      onChange={(e) =>
                        handleChange("isPutonSale", e.target.checked)
                      }
                      className="checkbox checkbox-error opacity-0"
                    />

                    <span></span>
                  </span>
                </label>
                <label className="text-xl font-normal text-secondary ml-3">
                  Put on sale
                </label>
              </div>

              {values.isPutonSale && (
                <>
                  {" "}
                  <p className="text-secondary opacity-50 text-sm">
                    You'll receive bids on this item
                  </p>
                  <div className="mb-3 ">
                    <div className="flex relative puton-sale">
                      <input
                        aria-label="Username"
                        type="text"
                        className="input mt-3 input-bordered w-full rounded-[28px] border-[#A5A5A5] focus:outline-none pl-4 h-10"
                        placeholder="Enter the price"
                        onChange={(e) =>
                          handleChange("salePrice", e.target.value)
                        }
                        maxLength={13}
                        required
                      />
                      <Select
                        inputBoxClass="absolute right-0 px-3 top-5 border-l w-[130px]"
                        inputClass="border-none w-full text-secondary rounded-[28px] focus:outline-none cursor-pointer"
                        value={values.crypto || ""}
                        options={currencies || []}
                        onChange={handleChange}
                        optionText="currency"
                        optionValue="currency"
                        fieldName="crypto"
                        error={formErrors["crypto"]}
                        label=""
                        defaultOption="Currency"
                        errorClass="text-sm font-normal text-red-600 absolute bottom-[-28px]"
                      />
                    </div>
                    {formErrors["salePrice"] && (
                      <p className="text-sm font-normal text-red-600 ">
                        {formErrors["salePrice"]}
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
            <div className="mb-6 ">
              <div className="flex items-center">
                <label className="cursor-pointer relative inline-block mt-2">
                  <span className="align-middle">
                    <input
                      type="radio"
                      name="isPuton"
                      onChange={(e) =>
                        handleChange("isPutOnAuction", e.target.checked)
                      }
                      className="checkbox checkbox-error opacity-0"
                    />

                    <span></span>
                  </span>
                </label>
                <p className="text-xl font-normal text-secondary ml-3">
                  Put on auction
                </p>
              </div>

              {values.isPutOnAuction && (
                <>
                  {" "}
                  <p className="text-secondary opacity-50 text-sm">
                    You'll receive bids on this item
                  </p>
                  <div className="flex relative puton-sale">
                    <input
                      aria-label="Username"
                      type="text"
                      className="input mt-3 input-bordered w-full rounded-[28px] border-[#A5A5A5] focus:outline-none pl-4 h-10"
                      placeholder="Enter the price per one bid"
                      onChange={(e) =>
                        handleChange("auctionPrice", e.target.value)
                      }
                      maxLength={13}
                      required
                    />
                    <Select
                      inputBoxClass="absolute right-0 px-3 top-5 border-l w-[130px]"
                      inputClass="border-none w-full text-secondary rounded-[28px] focus:outline-none cursor-pointer"
                      value={values.crypto || ""}
                      options={currencies || []}
                      onChange={handleChange}
                      optionText="currency"
                      optionValue="currency"
                      fieldName="crypto"
                      error={formErrors["crypto"]}
                      label=""
                      defaultOption="Currency"
                    />
                  </div>
                  {formErrors["auctionPrice"] && (
                    <p className="cust-validmsg">
                      {formErrors["auctionPrice"]}
                    </p>
                  )}
                </>
              )}
            </div>
            <div className="mb-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="toggle"
                  onChange={(e: any) =>
                    handleChange("isUnlockPurchased", e.target.checked)
                  }
                />
                <p className="text-xl font-normal text-secondary ml-3">
                  Unlock once purchased
                </p>
              </div>
              <p className="text-secondary text-sm opacity-50 mt-3">
                Content will be unlocked after successful transaction
              </p>
              {values.isUnlockPurchased && (
                <TextArea
                  label="Unlock Description"
                  value={values.unlockDescription}
                  maxLength={1000}
                  onChange={handleChange}
                  inputBoxClass="mb-6"
                  fieldName="unlockDescription"
                  error={formErrors["unlockDescription"]}
                  isRequired={true}
                />
              )}
            </div>
            <div className="flex gap-4 items-center justify-end">
              <Button
                btnClassName="min-w-[128px] h-[48px]"
                type="cancel"
                disabled={state.isLoading === "saving"}
              >
                Cancel
              </Button>
              <Button
                btnClassName="min-w-[128px]"
                type="primary"
                handleClick={(e: any) => createNFT(e)}
                disabled={state.isLoading === "saving"}
              >
                {state.isLoading === "saving" && (
                  <span>
                    {" "}
                    <Spinner size="loading-sm" />
                  </span>
                )}
                Create
              </Button>
            </div>
            <Modal id={"nftPropsModal"}>
              <div>
                <h2 className="text-base font-semibold text-secondary mt-0 mb-0">
                  Add Properties{" "}
                </h2>
                {modalProperties?.map((property: any, index: number) => (
                  <div className="my-6 flex gap-4 items-center " key={index}>
                    <div>
                      <label className="text-secondary text-sm font-normal p-0 mb-2 label block">
                        Trait type
                      </label>
                      <input
                        type="text"
                        className="input input-bordered w-full rounded-[28px] border-[#A5A5A5] focus:outline-none pl-4 h-10"
                        placeholder="Type"
                        value={property.trait_type}
                        onChange={(event) =>
                          handlePropertiesChange(
                            "trait_type",
                            event.target.value,
                            index
                          )
                        }
                        maxLength={13}
                        required
                      />
                      {propertyErrors?.[index]?.["trait_type"] && (
                        <p className="text-sm font-normal text-red-600 ">
                          {propertyErrors?.[index]?.["trait_type"]}
                        </p>
                      )}
                    </div>
                    {"  "}
                    <div className="">
                      <label className="text-secondary text-sm font-normal p-0 mb-2 label block">
                        Value*
                      </label>

                      <input
                        type="text"
                        className="input input-bordered w-full rounded-[28px] border-[#A5A5A5] focus:outline-none pl-4 h-10"
                        placeholder="Value"
                        value={property.value}
                        onChange={(event) =>
                          handlePropertiesChange(
                            "value",
                            event.target.value,
                            index
                          )
                        }
                        maxLength={13}
                        required
                      />
                      {propertyErrors?.[index]?.["value"] && (
                        <p className="text-sm font-normal text-red-600 ">
                          {propertyErrors?.[index]?.["value"]}
                        </p>
                      )}
                    </div>
                    <div className="mt-6">
                      <span
                        className="icon delete-icon ml-2 cursor-pointer"
                        onClick={() => handleDeleteProperty(index)}
                      ></span>
                    </div>
                  </div>
                ))}
                {(!modalProperties || modalProperties?.length === 0) && (
                  <div className="my-6">
                    <NoData text={"No properties added yet!"} />
                  </div>
                )}
              </div>
              <div className="flex gap-4 items-center justify-end mt-10">
                <Button
                  handleClick={() => addProperties()}
                  btnClassName="w-[160px]"
                  type="cancel"
                >
                  {!modalProperties || modalProperties?.length === 0
                    ? "Add"
                    : "Add more"}
                </Button>
                <Button
                  type="primary"
                  handleClick={() => handlePropertiesSave()}
                  btnClassName="w-[160px] min-h-[42px]"
                >
                  Save
                </Button>
              </div>
            </Modal>
            <Modal id={"putOnSaleSteps"}>
              <ul className="steps">
                {getModalSteps(values.isPutonSale)?.map(
                  (step: any, index: number) => {
                    return (
                      <li
                        className={`step ${
                          index <= state.modalStep ? "step-primary" : ""
                        }`}
                        key={step.title}
                      >
                        <p>{step.title}</p>
                        <p>{step.message}</p>
                      </li>
                    );
                  }
                )}
              </ul>
            </Modal>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Form;
