import React, { useState } from "react";
import Button from "../../../ui/Button";
import Spinner from "../../loaders/spinner";
import { useCollectionDeployer } from "../../../utils/useCollectionDeployer";
import { useDispatch, useSelector } from "react-redux";
import NumberInput from "../../../ui/numberInput";
import { setError, setToaster } from "../../../reducers/layoutReducer";
import { postMarketplace } from "../../../utils/api";
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
const PutOnAuction = ({
  show,
  setShow,
  collectionAddress,
  nftDetails,
  tokenId,
  refresh,
}) => {
  const user = useSelector((store: any) => store.auth.user);
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    value: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState("");
  const { setApprovalForAll } = useCollectionDeployer();
  const handleChange = (field: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };
  const clearState = () => {
    setShow(false);
    setFormErrors({});
    setFormValues({
      value: "",
    });
  };
  const [currentStep, setCurrentStep] = useState(0);
  const saveDetails = async (response: any, type) => {
    setCurrentStep(1);
    if (response.ok) {
      setCurrentStep(1);
      const saveObject = {
        customerId: user?.id,
        tokenId: tokenId ? tokenId : "",
        crypto: nftDetails?.currency
          ? nftDetails?.currency
          : process.env.REACT_APP_CURRENCY_SYMBOL || "WMATIC",
        saleType: type,
        value: Number(formValues.value),
        nftId: nftDetails?.id,
      };
      const response = await postMarketplace(`User/SaveSale`, saveObject);
      if (response.status === 200) {
        dispatch(
          setToaster({ message: "NFT has been successfully put on sale" })
        );
        refresh();
        clearState();
      } else {
        throw response;
      }
    } else {
      throw response.data;
    }
  };
  const placeONSaleorAuction = async (type: any) => {
    try {
      setIsLoading("putOnAuction");
      const { isValid, errors } = validateForm(formValues);
      if (isValid) {
        Object.keys(errors).length > 0 && setFormErrors({});
        await setApprovalForAll(collectionAddress, (response: any) =>
          saveDetails(response, type)
        );
      } else {
        setFormErrors(errors);
      }
    } catch (error) {
      const from = currentStep < 1 ? "contract" : "";
      dispatch(setError({ message: error, from }));
    } finally {
      setIsLoading("");
      setCurrentStep(0);
    }
  };
  return (
    <form className="drawer drawer-end">
      <input
        id="putOnAuctionNftView"
        type="checkbox"
        className="drawer-toggle"
        checked={show}
        onChange={() => setShow(false)}
        disabled={isLoading !== ""}
      />
      <div className="drawer-side z-[999]">
        <label
          htmlFor="putOnAuctionNftView"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu p-4 md:w-80 min-h-full bg-white text-sm-content pt-6">
          <div className="flex items-center justify-between">
            <p className="text-xl text-secondary font-semibold">
              Put on auction
            </p>
            <Button
              type="plain"
              handleClick={() => setShow(false)}
              disabled={isLoading !== ""}
            >
              <span className="icon close cursor-pointer"></span>
            </Button>
          </div>
          <div className="p-4 pb-2">
            {/* <p className="text-dark mt-5">
                                  NFT Marketplace is the platform where users
                                  can purchase NFT assets directly from creator,
                                  Users need to pay for the gas fee as well as
                                  platform fee before purchasing the NFT. User
                                  can purchase NFT also through bidding, where
                                  creator will accept a price from the user
                                </p>  */}

            <div className="bg-base-300 px-6 py-8 rounded-[20px] my-8">
              {/* <div className="mb-4 flex items-center justify-between">
                                    <p className="text-sm shrink-0 text-secondary ">
                                      Service fee
                                    </p>
                                    <p className="text-end truncate text-secondary font-semibold">
                                      0.0000 ETH
                                    </p>
                                  </div> */}
              <NumberInput
                label="Auction Price"
                fieldName="value"
                error={formErrors["value"]}
                value={""}
                allowDecimals={4}
                onChange={handleChange}
                inputBoxClass=""
                disabled={isLoading !== ""}
                placeholder="Ex: 0.0001 WMATIC"
                inputClass="input input-bordered w-full rounded-[28px] border-[#A5A5A5] focus:outline-none pl-4 h-10"
              />
            </div>
          </div>
          <div className="mt-40 lg:max-w-[300px] lg:mx-auto mb-5">
            <Button
              btnClassName="w-full mb-4 !min-h-[39px]"
              type="replyCancel"
              handleClick={() => setShow(false)}
              disabled={isLoading !== ""}
            >
              Cancel
            </Button>
            <Button
              btnClassName="w-full !min-h-[39px] lg:px-3"
              type="primary"
              disabled={isLoading !== ""}
              handleClick={() => placeONSaleorAuction("Auction")}
            >
              {isLoading !== "" && <Spinner size="loading-sm" />}
              Put on Auction
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PutOnAuction;
