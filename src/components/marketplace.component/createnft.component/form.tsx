import React from "react";
import Button from "../../../ui/Button";
import TextInput from "../../../ui/textInput";
import TextArea from "../../../ui/textArea";
import Select from "../../../ui/select";
import matic from "../../../assets/images/matic-img.svg";
import { Modal } from "../../../ui/Modal";

const Form = ({
  profile,
  inputRef,
  deleteImage,
  handlePicChange,
  collectionsLu,
  handleShowModel,
  attributes,
}) => {
  const handleChange = (field, value) => {};
  const createNFT = (e) => {};
  return (
    <form className="mt-4" onSubmit={(e) => createNFT(e)}>
      <div className="grid lg:grid-cols-2 gap-6">
        <>
          <div>
            <label className="text-dark text-sm font-normal p-0 mb-2 label ml-4 block">
              Upload file <span className="text-[#ff0000]">*</span>
            </label>

            <div className="mb-6 flex justify-center items-center h-[300px] md:h-[500px] border-dashed border border-[#A5A5A5] relative rounded-[28px]">
              {profile.logo && (
                <div>
                  <img
                    src={profile.logo}
                    width="250"
                    height="250"
                    alt=""
                    className="w-full h-full object-cover rounded-[28px]"
                  />
                  <span
                    className="icon camera create-nft-cam c-pointer"
                    onClick={(e) => deleteImage(e)}
                  ></span>
                </div>
              )}
              {!profile.logo && (
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
                      {"" && (
                        <p className="text-sm font-normal text-red-600 mt-4">
                          Please provide a valid NFT image.
                        </p>
                      )}
                    </div>
                  </div>
                </>
              )}
              {/* dont remove this camera icon
              <div className="text-lg-center profile-icons cust-pf-icons">
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
                value={profile.name}
                onChange={handleChange}
                inputBoxClass="mb-6"
                fieldName="name"
                error={""}
              />
              <TextInput
                label="External link"
                value={profile.externalLink}
                onChange={handleChange}
                inputBoxClass="mb-6"
                fieldName="externalLink"
                error={""}
                maxLength={500}
              />

              {/* <p className="text-secondary opacity-60 ">
                  DOTT will include a link to this URL on this item's detail
                  page, so that users can click to learn more about it. You are
                  welcome to link to your own webpage with more details.
                </p> */}
              <TextArea
                label="Description"
                value={profile.description}
                onChange={handleChange}
                inputBoxClass="mb-6"
                fieldName="description"
                error={""}
                isRequired={false}
              />
              {/* <p className="text-secondary opacity-60 mb-2">
                  This is the collection where your item will appear.
                </p> */}
              <Select
                inputBoxClass="mb-6 p-relative"
                value={profile.collection}
                options={collectionsLu || []}
                onChange={handleChange}
                fieldName="collection"
                error={""}
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
                      onClick={handleShowModel}
                    ></span>
                  </div>
                  <div className="mb-2 mt-7 grid grid-cols-3 gap-4 px-6">
                    {attributes.map((field, index) => (
                      <div
                        key={index}
                        className="mb-3 border border-[#939393] rounded-lg p-[14px] text-center"
                      >
                        <div className="avatar-box me-lg-2">
                          <label className="text-base text-primary font-normal break-words">
                            {field.trait_type}
                          </label>
                          <p className="text-base text-secondary font-normal break-words">
                            {field.value}
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
                value={profile.supply}
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
                value={profile.royalities}
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

                {profile.putOnSale && (
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
                          {profile.network || "MATIC"}
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

                {profile.putOnAuction && (
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
                        {profile.network || "MATIC"}
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
              <Modal id={"addproperty"}>
                <div>
                  <h2 className="text-base font-semibold text-secondary mt-0 mb-0">
                    Add Properties{" "}
                  </h2>
                  <span
                    className="icon md close-icon c-pointer"
                    // onClick={handleClose}
                  ></span>
                  {/* {modalErrorMsg && (
                    <>
                      <div variant="danger">
                        <img className="validation-error" src={validError} />
                        <span>{modalErrorMsg}</span>
                      </div>
                      <div className="cust-error-bg">
                        <div className="cust-crd-mr">
                          <Image src={error} alt="" />
                        </div>
                        <div>
                          <p className="error-title error-red">Error</p>
                          <p className="error-desc">{modalErrorMsg}</p>
                        </div>
                      </div>
                    </>
                  )} */}

                  {/* {propertiesFields?.map((field, index) => (
                    <div className="my-6 flex gap-4 items-center ">
                      <div>
                        <label className="text-dark text-sm font-normal p-0 mb-2 label block">
                          Key*
                        </label>
                        <input
                          aria-label="Username"
                          type="text"
                          className="input input-bordered w-full rounded-[28px] border-[#A5A5A5] focus:outline-none pl-4 h-10"
                          placeholder="Key"
                          value={field.trait_type}
                          onChange={(event) =>
                            handleFieldChange(index, event, "avathar")
                          }
                          maxLength={13}
                          required
                          isInvalid={!!ketError}
                          feedback={ketError}
                        />
                        <p
                          className="text-sm font-normal text-red-600 "
                          type="invalid"
                        >{`${
                          indexposition == index && ketError
                            ? "Please provide valid content"
                            : " "
                        }`}</p>
                      </div>
                      {"  "}
                      <div className="">
                        <label className="text-dark text-sm font-normal p-0 mb-2 label block">
                          Value*
                        </label>

                        <input
                          aria-label="Username"
                          type="text"
                          className="input input-bordered w-full rounded-[28px] border-[#A5A5A5] focus:outline-none pl-4 h-10"
                          placeholder="Value"
                          value={field.value}
                          onChange={(event) =>
                            handleFieldChange(index, event, "avatharValue")
                          }
                          maxLength={13}
                          required
                          isInvalid={!!valueError}
                          feedback={valueError}
                        />
                        <p
                          className="text-sm font-normal text-red-600 "
                          type="invalid"
                        >{`${
                          valueIndexposition == index && valueError
                            ? "Please provide valid content"
                            : " "
                        }`}</p>
                      </div>
                      <div className="mt-6">
                        <span
                          className="icon delete-icon ml-2 cursor-pointer"
                          onClick={() => handleRemoveFields(index)}
                        ></span>
                      </div>
                    </div>
                  ))} */}
                </div>
                <div className="flex gap-4 items-center justify-end mt-10">
                  <Button
                    // handleClick={handleAddField}
                    btnClassName="w-[160px]"
                    type="cancel"
                  >
                    Add more
                  </Button>
                  <Button
                    type="primary"
                    // handleClick={handleSaveAddField}
                    btnClassName="w-[160px] min-h-[42px]"
                  >
                    Save
                  </Button>
                </div>
              </Modal>

              {/* <Modal
            show={show}
            onHide={handleClose}
            className="wallet-popup checkout-modal properties-modal add-properties"
            centered

          >
            <Modal.Header className="bglight">
            <h2 className="section-title mt-0 mb-0">Add Properties </h2>
              <span className="icon md close-icon c-pointer" onClick={handleClose}></span>
            </Modal.Header>
            <Modal.Body>
            
              <div>
                {modalErrorMsg && (
                  // <Alert variant="danger">

                  //   <Image className='validation-error' src={validError} />
                  //   <span>{modalErrorMsg}</span>
                  // </Alert>
                  <div className='cust-error-bg'>
                  <div className='cust-crd-mr'><Image src={error} alt="" /></div>
                  <div>
                    <p className='error-title error-red'>Error</p>
                    <p className="error-desc">{modalErrorMsg}</p></div>
                </div>
                )}

                {propertiesFields?.map((field, index) => (
                  <Form.Group key={index} className="d-flex mb-6">
                    <div className="me-lg-2 me-2">
                      <Form.Label className="input-label">Key*</Form.Label>
                      <Form.Control
                        aria-label="Username"
                        type="text"
                        className="input-style flex-1"
                        placeholder="Key"
                        value={field.trait_type}
                        onChange={(event) => handleFieldChange(index, event, 'avathar')}
                        maxLength={13}
                        required
                        isInvalid={!!ketError}
                        feedback={ketError}
                        
                      />
                      <Form.Control.Feedback type="invalid">{`${indexposition==index && ketError ? "Please provide valid content" : " " }`}</Form.Control.Feedback>
                    </div>
                    {'  '}
                    <div className="">
                      <Form.Label className="input-label">Value*</Form.Label>

                      <Form.Control
                        aria-label="Username"
                        type="text"
                        className="input-style"
                        placeholder="Value"
                        value={field.value}
                        onChange={(event) => handleFieldChange(index, event, 'avatharValue')}
                        maxLength={13}
                        required
                        isInvalid={!!valueError}
                        feedback={valueError}
                      />
                       <Form.Control.Feedback type="invalid">{`${valueIndexposition==index && valueError ? "Please provide valid content" : " " }`}</Form.Control.Feedback>
                    </div>
                    <div className="pop-delete-mt">
                      <span
                        className="icon delete ms-2 c-pointer"
                        onClick={() => handleRemoveFields(index)}
                      ></span>
                    </div>
                  </Form.Group>
                ))}
              </div>
              <div className="nft-props justify-content-end d-flex">
                <Button onClick={handleAddField} className="custom-btn  me-lg-2">
                  Add more
                </Button>
                <Button type='button' onClick={handleSaveAddField} className="custom-btn ms-2">
                  Save
                </Button>
              </div>
            </Modal.Body>
          </Modal> */}
              {/* <Confirmations {...confirmations} /> */}
            </div>
          </div>
        </>
      </div>
    </form>
  );
};

export default Form;
