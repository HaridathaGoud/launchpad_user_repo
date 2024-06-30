import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postMarketplace } from "./api";
import { useCollectionDeployer } from "./useCollectionDeployer";
import Button from "../ui/Button";
import NumberInput from "../ui/numberInput";
import { setError, setToaster } from "../reducers/layoutReducer";
import Spinner from "../components/loaders/spinner";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
export const validateForm = (form: any) => {
  const { value } = form;
  const errors: any = {};
  const validateField = (
    field: string,
    fieldName: string,
    required = true,
    validationFunc?: (value: string) => boolean,
    errorMessage?: string
  ) => {
    if (required && (!field || field === "")) {
      errors[fieldName] = "Is required";
    } else if (validationFunc?.(field)) {
      errors[fieldName] = errorMessage || `Invalid ${fieldName.toLowerCase()}`;
    }
  };
  validateField(
    value || "",
    "value",
    true,
    (value) => Number(value) < 0.0001,
    "Amount must be greater than 0"
  );
  let isValid = true;
  if (Object.keys(errors).length > 0) {
    isValid = false;
  }
  return { isValid, errors };
};

const PutOnSale = (props: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { address } = useAccount();
  const [formValues, setFormValues] = useState({
    value: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState("");
  const { getSignatureForSale, setApprovalForAll } = useCollectionDeployer();
  const handleChange = (field: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };
  const clearState = () => {
    props.setShow(false);
    setFormErrors({});
    setFormValues({
      value: "",
    });
  };
  const [currentStep, setCurrentStep] = useState(0);
  const handleGetSignature = async (response: any, type) => {
    setCurrentStep(1);
    if (response.ok) {
      let signature = await getSignatureForSale(
        props.reqFields?.collectionAddress ||
          props.nftDetails?.collectionContractAddress,
        props.nftDetails?.tokenId,
        props.nftDetails?.CollectionType
          ? props.nftDetails?.CollectionType
          : "ERC721",
        formValues.value
      );
      if (signature.status) {
        setCurrentStep(2);
        const saveObject = {
          customerId: props.reqFields.auth.user?.id,
          tokenId: props.reqFields.tokenId ? props.reqFields.tokenId : "",
          crypto: props.nftDetails?.currency
            ? props.nftDetails?.currency
            : process.env.REACT_APP_CURRENCY_SYMBOL || "Matic",
          saleType: type,
          value: formValues.value,
          signature: signature.data,
          nftId: props.nftDetails?.id,
        };
        const response = await postMarketplace(`User/SaveSale`, saveObject);
        if (response.status === 200) {
          dispatch(
            setToaster({
              message: "NFT has been successfully put on sale",
              callback: () => navigate(`/profile/${address}`),
            })
          );
          props.refresh();
          clearState();
        } else {
          throw response;
        }
      } else {
        throw signature.data;
      }
    } else {
      throw response.data;
    }
  };
  const placeONSaleorAuction = async (type: any) => {
    try {
      setIsLoading("putOnSale");
      const { isValid, errors } = validateForm(formValues);
      if (isValid) {
        Object.keys(errors).length > 0 && setFormErrors({});
        await setApprovalForAll(
          props?.reqFields?.collectionAddress,
          (response: any) => handleGetSignature(response, type)
        );
      } else {
        setFormErrors(errors);
      }
    } catch (error) {
      const from = currentStep < 2 ? "contract" : "";
      dispatch(setError({ message: error, from }));
    } finally {
      setIsLoading("");
      setCurrentStep(0);
    }
  };
  return (
    <form className="drawer drawer-end">
      <input
        id="putOnSaleNFTView"
        type="checkbox"
        className="drawer-toggle"
        checked={props.show}
        onChange={() => props.setShow(false)}
        disabled={isLoading !== ""}
      />
      <div className="drawer-side z-[999]">
        <label
          htmlFor="putOnSaleNFTView"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu p-4 md:w-80 min-h-full bg-white text-sm-content pt-6">
          <div className="flex items-center justify-between">
            <p className="text-xl text-secondary font-semibold">Put on sale</p>
            {isLoading === "" && (
              <Button type="plain" handleClick={() => props.setShow(false)}>
                <span className="icon close cursor-pointer"></span>
              </Button>
            )}
          </div>
          <div>
            <div>
              <div className="py-4">
                <div className="bg-base-300 px-6 py-8 rounded-[20px] my-8">
                  {/* <div className="flex justify-between mb-4 ">
                <div>
                  <label className="">Put on sale</label>
                  <p>you'll receive bids on this item</p>
                </div>
                <label className="cursor-pointer relative inline-block mt-2">
                  <span>
                    <input
                      type="checkbox"
                      id="custom-switch"
                      className="checkbox checkbox-error opacity-0"
                      onChange={}
                    />

                    <span></span>
                  </span>
                </label>
                <Form.Check type="switch" id="custom-switch"  />
              </div> */}

                  <div className="my-4">
                    <div className="flex relative">
                      <NumberInput
                        labelClass="text-secondary text-sm font-normal p-0 mb-2 label block ml-2.5"
                        label="Sale price"
                        fieldName="value"
                        error={formErrors["value"]}
                        value={""}
                        allowDecimals={4}
                        onChange={handleChange}
                        inputBoxClass=" w-full rounded-[28px] border-[#A5A5A5]"
                        placeholder="Enter the sale price"
                        inputClass="w-full input input-bordered outline-none focus:outline-none pl-4 pr-32 h-10 rounded-[28px]"
                        errorClass="text-sm font-normal text-red-600 ml-2.5"
                      />
                      <div
                        id="basic-addon3"
                        className="absolute right-5 top-[38px] border-l pl-4"
                      >
                        {props.nftDetails?.currency
                          ? props.nftDetails?.currency
                          : process.env.REACT_APP_CURRENCY_SYMBOL}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 lg:w-[350px] lg:mx-auto mb-5">
            <Button
              btnClassName="w-full mb-4 !min-h-[39px]"
              type="replyCancel"
              handleClick={() => props.setShow(false)}
              disabled={isLoading !== ""}
            >
              Cancel
            </Button>

            <Button
              btnClassName="w-full !h-[32px] !min-h-[39px] lg:px-3"
              type="primary"
              handleClick={() => placeONSaleorAuction("Sale")}
              disabled={isLoading !== ""}
            >
              <span>{isLoading !== "" && <Spinner size="loading-sm" />} </span>{" "}
              Put on sale
            </Button>
          </div>
          <div className="p-absolute toaster-center"></div>
        </div>
      </div>
    </form>
  );
};
{
  /* <div className="flex justify-between">
                <div>
                  <label className="">Instant sale price</label>
                  <p>Enter the price for which the item will be instantly sold</p>
                </div>
                <label className="cursor-pointer relative inline-block mt-2">
                  <span>
                    <input
                      type="checkbox"
                      id="custom-switch"
                      className="checkbox checkbox-error opacity-0"
                    />

                    <span></span>
                  </span>
                </label>
                <Form.Check type="switch" id="custom-switch" disabled/> 
              </div> */
  // <div className="flex justify-between">
  //         <div>
  //           <label className="">Unlock once purchased</label>
  //           <p>
  //             Content will be unlocked after successful transaction
  //           </p>
  //         </div>
  //         <label className="cursor-pointer relative inline-block mt-2">
  //           <span>
  //             <input
  //               type="checkbox"
  //               id="custom-switch"
  //               className="checkbox checkbox-error opacity-0"
  //             />
  //             <span></span>
  //           </span>
  //         </label>
  //       </div>
}
export default PutOnSale;
