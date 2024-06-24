import React, { useEffect, useMemo } from "react";
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
import { useNavigate } from "react-router-dom";
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
    image,
    values,
    errors: formErrors,
    propertyErrors,
    propertiesToUpdate: modalProperties,
  } = state;
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const { userCollections, networks } = useSelector((store: any) => {
    const detailsForForm = store.createNft;
    return detailsForForm;
  });
  useEffect(()=>{
    if(networks.data){
      updateState('setValues',{...values,network:networks.data?.[0]})
    }
  },[networks.data])
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
          const result = await ipfsClient.add(file);
          updateState("setImage", {
            imageUrl: response.data[0],
            filePath: result.path,
          });
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
  const clearErrors = () => {
    updateState("setErrors", {});
    dispatch(setError({ message: "" }));
  };
  const createNFT = async (e: any) => {
    e.preventDefault();
    updateState("setIsLoading", "saving");
    try {
      const { isValid, errors } = validateForm({...values,imageUrl:image.imageUrl});
      if (isValid) {
        Object.keys(formErrors).length > 0 && clearErrors();
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
        updateState("setIsLoading", "redirecting");
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        updateState("setErrors", errors);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // dispatch(
        //   setError({
        //     message:
        //       "Validation errors occurred. Please check the fields and try again!",
        //   })
        // );
        updateState("setIsLoading", "");
      }
    } catch (error) {
      const putOnSaleFrom = state.modalStep <= 2 ? "contract" : "";
      const otherFrom = state.modalStep <= 1 ? "contract" : "";
      const from = values.isPutonSale ? putOnSaleFrom : otherFrom;
      dispatch(setError({ message: error, from }));
      updateState("setIsLoading", "");
    } finally {
      updateState("setModalStep", 0);
      modalActions("putOnSaleSteps", "close");
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
            {image.imageUrl && state.isLoading !== "uploadingImageUrl" && (
              <div className="w-full h-full">
                <img
                  src={image.imageUrl}
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
            {!image.imageUrl && state.isLoading !== "uploadingImageUrl" && (
              <div className="">
                <div className="text-center">
                  <span className="icon image-upload cursor-pointer"></span>
                  <p className="mt-5 mb-1 cursor-pointer text-base font-semibold text-secondary opacity-60">
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
              disabled={state.isLoading==='saving'}
            />
            <TextInput
              label="External link"
              value={values.externalLink}
              onChange={handleChange}
              isRequired={false}
              inputBoxClass="mb-6"
              fieldName="externalLink"
              disabled={state.isLoading==='saving'}
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
              disabled={state.isLoading==='saving'}
              fieldName="description"
              error={formErrors["description"]}
              isRequired={true}
              maxLength={500}
            />
            <Select
              inputBoxClass="mb-6 p-relative"
              value={values.collection?.["name"] || ""}
              options={userCollections.data || []}
              onChange={handleChange}
              disabled={state.isLoading==='saving' || userCollections.loading}
              fieldName="collection"
              error={formErrors["collection"]}
              label="Collection"
              defaultOption={userCollections.loading ? "Please wait..." : "Select Collection"}
              inputInfo=" This is the collection where your item will appear."
            />
            <div className="border border-[#A5A5A5] rounded-[28px]">
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="icon properties"></span>
                    <div className="ms-2">
                      <h6 className="text-secondary text-base font-normal">
                        Properties
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
                    disabled={state.isLoading==='saving'}
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
                selectedValue={values.network || null}
                valueField={"name"}
                imageField={"icon"}
                optionKey={"name"}
                hasImage={true}
                options={networks.data || []}
                onSelect={(value: any) => handleChange("network", value)}
                placeholder={networks.loading ? "Please wait...":"Select Network..."}
                loading={networks.loading}
                disabled={state.isLoading==='saving' || networks.loading}
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
              error={formErrors["royalities"]}
              isInteger={true}
              placeholder="Suggested: 10%, 20%, 30%"
              disabled={state.isLoading==='saving'}
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
                      disabled={state.isLoading==='saving'}
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
                      <NumberInput
                        label=""
                        isRequired={true}
                        fieldName="salePrice"
                        error={formErrors["salePrice"]}
                        value={""}
                        allowDecimals={4}
                        onChange={handleChange}
                        inputBoxClass=" w-full rounded-[28px] border-[#A5A5A5]"
                        placeholder="Enter the sale price"
                        inputClass="input mt-3 input-bordered w-full rounded-[28px] border-[#A5A5A5] focus:outline-none pl-4 h-10"
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
                        disabled={state.isLoading==='saving'}
                        defaultOption="Currency"
                        errorClass="text-sm font-normal text-red-600 absolute bottom-[-28px]"
                      />
                    </div>
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
                      disabled={state.isLoading==='saving'}
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
                     <NumberInput
                        label=""
                        isRequired={true}
                        fieldName="auctionPrice"
                        error={formErrors["auctionPrice"]}
                        value={""}
                        allowDecimals={4}
                        onChange={handleChange}
                        inputBoxClass=" w-full rounded-[28px] border-[#A5A5A5]"
                        placeholder="Enter the price per one bid"
                        inputClass="input mt-3 input-bordered w-full rounded-[28px] border-[#A5A5A5] focus:outline-none pl-4 h-10"
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
                      disabled={state.isLoading==='saving'}
                      defaultOption="Currency"
                    />
                  </div>
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
                  disabled={state.isLoading==='saving'}
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
                  disabled={state.isLoading==='saving'}
                />
              )}
            </div>
            <div className="flex gap-4 items-center justify-end">
              <Button
                btnClassName="min-w-[128px] h-[48px]"
                type="cancel"
                disabled={state.isLoading === "saving"}
                handleClick={()=>navigate(-1)}
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
                      <Button
                        type="plain"
                        handleClick={() => handleDeleteProperty(index)}
                      >
                        <span className="icon delete-icon ml-2 cursor-pointer"></span>
                      </Button>
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
            <Modal id={"putOnSaleSteps"} showClose={false}>
              <div className="flex flex-col justify-center items-center">
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
                          <p className="font-medium">{step.title}</p>
                          <p>{step.message}</p>
                        </li>
                      );
                    }
                  )}
                </ul>
                <div className="mt-6 flex justify-center gap-2">
                  {state.modalStep === 0 && (
                    <p className="text-primary font-medium">
                      Waiting for Approval...
                    </p>
                  )}
                  {state.modalStep === 1 && (
                    <p className="text-primary font-medium">Minting NFT...</p>
                  )}
                  {state.modalStep === 2 && values.isPutonSale && (
                    <p className="text-primary font-medium">
                      Getting signature for sale...
                    </p>
                  )}
                  <span className="text-base">
                    <Spinner />
                  </span>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Form;
