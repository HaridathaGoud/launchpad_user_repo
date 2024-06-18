import React from "react";
import Button from "../../../ui/Button";
import TextInput from "../../../ui/textInput";
import TextArea from "../../../ui/textArea";
import Select from "../../../ui/select";
import matic from "../../../assets/images/matic-img.svg";
import { Modal, modalActions } from "../../../ui/Modal";
import { validateProperties } from "./validation";
import { useDispatch } from "react-redux";
import { setError } from "../../../reducers/layoutReducer";
import { Property } from "./models";
import NoData from "../../../ui/noData";
import { apiUploadPost } from "../../../utils/api";

const Form = ({
  state,
  updateState,
  inputRef,
  deleteImage,
  handlePicChange,
  collectionsLu,
}) => {
  const {
    values,
    errors,
    propertyErrors,
    propertiesToUpdate: modalProperties,
  } = state;
  const dispatch = useDispatch();
  const handleChange = (field: string, value: any) => {
    const valuesToUpdate = { ...values };
    valuesToUpdate[field] = value;
    updateState("setValues", valuesToUpdate);
  };
  const addProperties = () => {
    const propertyToAdd = { type: "", value: "" };
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
      modalActions("nftPropsModal", "close");
    }
    if (!isValid && errors) {
      updateState("setPropertyErrors", errors);
    }
    if (!isValid && error) {
      dispatch(setError({ message: error, type: "warning" }));
    }
  };
  const handleUpload = (event: any, type: any) => {
    if (event.target.files?.[0]) {
      const file = event.target.files[0];
      uploadToServer(file,event);
    }
  };

  const uploadToServer = async (
    file: any,
    event
  ) => {
    const body: any = new FormData();
    updateState("setIsLoading","uploadingImageUrl")
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
        const response = await apiUploadPost(
          `Upload/UploadFileNew`,
          body
        );
        if (response.statusText.toLowerCase() === "ok") {
          dispatch(setError({message:""}))
          const valuesToUpdate={...values}
          valuesToUpdate.imageUrl = response.data[0];
          updateState('setValues',valuesToUpdate);
        } else {
          dispatch(setError({message:response}))
        }
      } catch (error) {
        dispatch(setError({message:error}))
      } finally {
        updateState("setIsLoading","")
      }
    } else {
      dispatch(setError({message:"File is not allowed. Please upload only jpg, png, jpeg files!",type:'warning'}))
      event.target.value='';
      updateState("setIsLoading","")
    }
  };
  const createNFT = (e) => {};
  return (
    <form className="mt-4">
      <div className="grid lg:grid-cols-2 gap-6">
        <>
          <div>
            <label className="text-dark text-sm font-normal p-0 mb-2 label ml-4 block">
              Upload file <span className="text-[#ff0000]">*</span>
            </label>

            <div className="mb-6 flex justify-center items-center h-[300px] md:h-[500px] border-dashed border border-[#A5A5A5] relative rounded-[28px]">
              {values.imageUrl && (
                <div>
                  <img
                    src={values.imageUrl}
                    width="250"
                    height="250"
                    alt={""}
                    className="w-full h-full object-cover rounded-[28px]"
                  />
                  <span
                    className="icon camera create-nft-cam c-pointer"
                    onClick={(e) => deleteImage(e)}
                  ></span>
                </div>
              )}
              {!values.imageUrl && (
                <>
                  <div className="">
                    <div className="text-center">
                      <span
                        className="icon image-upload cursor-pointer"
                        onClick={() => inputRef.current?.click()}
                      ></span>
                      <p
                        onClick={() => inputRef.current?.click()}
                        className="my-5 cursor-pointer text-base font-semibold text-secondary opacity-60"
                      >
                        PNG, GIF, WEBP, MP4 or MP3. Max 10MB.
                      </p>
                      <div className="w-[140px] mx-auto relative h-12">
                        <input
                          required
                          className="opacity-0 z-10 relative w-full"
                          type="file"
                          ref={inputRef}
                          onChange={handlePicChange}
                        />
                        <Button
                          btnClassName="absolute left-0 top-0 cursor-pointer"
                          type="primary"
                          //   handleClick={() => inputRef.current?.click()}
                        >
                          Choose File
                        </Button>
                      </div>
                      {errors["imageUrl"] && (
                        <p className="text-sm font-normal text-red-600 mt-4">
                          {errors["imageUrl"]}
                        </p>
                      )}
                    </div>
                  </div>
                </>
              )}
              {/* dont remove this camera icon
              <div className="text-lg-center values-icons cust-pf-icons">
                <input
                  type="file"
                  name="myImage"
                  className="icon camera"
                  onChange={(e) => handlePicChange(e, 'bannar')}
                />
              </div> */}
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
                error={errors["name"]}
              />
              <TextInput
                label="External link"
                value={values.externalLink}
                onChange={handleChange}
                inputBoxClass="mb-6"
                fieldName="externalLink"
                error={errors["externalLink"]}
                maxLength={500}
              />

              {/* <p className="text-secondary opacity-60 ">
                  DOTT will include a link to this URL on this item's detail
                  page, so that users can click to learn more about it. You are
                  welcome to link to your own webpage with more details.
                </p> */}
              <TextArea
                label="Description"
                value={values.description}
                onChange={handleChange}
                inputBoxClass="mb-6"
                fieldName="description"
                error={errors["description"]}
                isRequired={false}
              />
              {/* <p className="text-secondary opacity-60 mb-2">
                  This is the collection where your item will appear.
                </p> */}
              <Select
                inputBoxClass="mb-6 p-relative"
                value={values.collection}
                options={collectionsLu || []}
                onChange={handleChange}
                fieldName="collection"
                error={errors["collection"]}
                label="Collection"
                defaultOption="Select Collection"
              />
              <div className="border border-[#A5A5A5] rounded-[28px] mb-6">
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
                    <span
                      className="icon add-btn cursor-pointer"
                      onClick={() => modalActions("nftPropsModal", "open")}
                    ></span>
                  </div>
                  <div className="mb-2 mt-7 grid grid-cols-3 gap-4 px-6">
                    {values?.properties?.map((property: Property, index) => (
                      <div
                        key={index}
                        className="mb-3 border border-[#939393] rounded-lg p-[14px] text-center"
                      >
                        <div className="avatar-box me-lg-2">
                          <label className="text-base text-primary font-normal break-words">
                            {property.type}
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
              {/* <p className="text-secondary opacity-60 ">
                  The number of items that can be minted. No gas cost to you!
                </p> */}
              <TextInput
                label="Supply"
                value={values.supply}
                onChange={handleChange}
                inputBoxClass="mb-6"
                fieldName="supply"
                error={""}
                maxLength={20}
              />

              <div className="mb-6 p-relative">
                <label className="text-dark text-sm font-normal p-0 mb-2 label block">
                  Network
                </label>
                <div className="dropdown dropdown-end w-full nft-dropdown">
                  <div
                    role="button"
                    className="btn m-1 justify-start input input-bordered w-full rounded-[28px] bg-transparent hover:bg-transparent border-[#A5A5A5] focus:outline-none pl-4 h-10 cursor-pointer"
                  >
                    <img className="scale-[0.8]" src={matic} alt="matic" />{" "}
                    Matic
                  </div>
                  <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full">
                    <li className="flex flex-row items-center gap-2">
                      {" "}
                      <img
                        className="p-0 hover:bg-transparent scale-[0.8]"
                        src={matic}
                        alt="matic"
                      ></img>
                      <a className="hover:bg-transparent p-0">Matic</a>
                    </li>
                  </ul>
                </div>
                {/* <select  
                  className="input input-bordered w-full rounded-[28px] border-[#A5A5A5] focus:outline-none pl-4 h-10 cursor-pointer"
                >
                  <option value=""> <img src={matic}></img>  Matic</option>                       
                </select> */}
              </div>
              <TextInput
                label="Royalties"
                value={values.royalities}
                onChange={handleChange}
                inputBoxClass="mb-6"
                fieldName="royalities"
                error={""}
                maxLength={20}
                placeholder="Suggested: 10%, 20%, 30%"
              />
              <div className="mb-6 ">
                <div className="flex items-center">
                  <label className="cursor-pointer relative inline-block mt-2">
                    <span className="align-middle">
                      <input
                        type="checkbox"
                        id="custom-switch"
                        // onClick={(e) => handleToggle(e, "isPutonSale")}
                        // disabled={showAuctionFields && true}
                        className="checkbox checkbox-error opacity-0"
                      />

                      <span></span>
                    </span>
                  </label>
                  <label className="text-xl font-normal text-secondary ml-3">
                    Put on sale
                  </label>
                </div>

                {values.putOnSale && (
                  <>
                    {" "}
                    <p className="text-secondary opacity-50 text-sm">
                      You'll receive bids on this item
                    </p>
                    <div className="mb-3 ">
                      <div className="flex relative">
                        <input
                          aria-label="Username"
                          type="text"
                          className="input mt-3 input-bordered w-full rounded-[28px] border-[#A5A5A5] focus:outline-none pl-4 h-10"
                          placeholder="Enter the price"
                          onChange={(e) => handleChange(e, "salePrice")}
                          maxLength={13}
                          required
                        />
                        <span
                          id="basic-addon3"
                          className=" absolute right-0 px-3 top-5 border-l "
                        >
                          {values.network || "MATIC"}
                        </span>
                      </div>
                      {"" && (
                        <p className="text-sm font-normal text-red-600 ">
                          Please provide valid Sale Price.
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
                        type="checkbox"
                        id="custom-switch"
                        // onClick={(e) => handleToggle(e, "isPutonAuction")}
                        // disabled={showSaleFields && true}
                        className="checkbox checkbox-error opacity-0"
                      />

                      <span></span>
                    </span>
                  </label>
                  <label className="text-xl font-normal text-secondary ml-3">
                    Put on auction
                  </label>
                </div>

                {values.putOnAuction && (
                  <>
                    {" "}
                    <p className="text-secondary opacity-50 text-sm">
                      You'll receive bids on this item
                    </p>
                    <div className="flex relative">
                      <input
                        aria-label="Username"
                        type="text"
                        className="input mt-3 input-bordered w-full rounded-[28px] border-[#A5A5A5] focus:outline-none pl-4 h-10"
                        placeholder="Enter the price per one bid"
                        onChange={(e) => handleChange(e, "auctionPrice")}
                        maxLength={13}
                        required
                      />
                      <span
                        id="basic-addon3"
                        className=" absolute right-0 px-3 top-5 border-l "
                      >
                        {values.network || "MATIC"}
                      </span>
                    </div>
                    {"" && (
                      <p className="cust-validmsg">
                        Please provide valid Sale Price.
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
                    // onClick={(e) => handleToggle(e, "isUnlockPurchased")}
                  />
                  <label className="text-xl font-normal text-secondary ml-3">
                    Unlock once purchased
                  </label>
                </div>
                <p className="text-secondary text-sm opacity-50 mt-3">
                  Content will be unlocked after successful transaction
                </p>
                <input
                  aria-label="Username"
                  type="text"
                  className="input mt-3 input-bordered w-full rounded-[28px] border-[#A5A5A5] focus:outline-none pl-4 h-10"
                  placeholder="Enter Unlock Description"
                  required
                />
              </div>
              <div className="flex gap-4 items-center justify-end">
                <Button
                  btnClassName="min-w-[128px] h-[48px]"
                  type="cancel"
                  //   disabled={loader}
                >
                  {/* <span>{loader && <Spinner size="sm" />} </span> */}
                  Cancel
                </Button>
                <Button
                  btnClassName="min-w-[128px]"
                  type="primary"
                  //   disabled={loader}
                >
                  {/* <span>{loader && <Spinner size="sm" />} </span>. */}
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
                        <label className="text-dark text-sm font-normal p-0 mb-2 label block">
                          Type
                        </label>
                        <input
                          type="text"
                          className="input input-bordered w-full rounded-[28px] border-[#A5A5A5] focus:outline-none pl-4 h-10"
                          placeholder="Type"
                          value={property.type}
                          onChange={(event) =>
                            handlePropertiesChange(
                              "type",
                              event.target.value,
                              index
                            )
                          }
                          maxLength={13}
                          required
                        />
                        {propertyErrors?.[index]?.["type"] && (
                          <p className="text-sm font-normal text-red-600 ">
                            {propertyErrors?.[index]?.["type"]}
                          </p>
                        )}
                      </div>
                      {"  "}
                      <div className="">
                        <label className="text-dark text-sm font-normal p-0 mb-2 label block">
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
            </div>
          </div>
        </>
      </div>
    </form>
  );
};

export default Form;
