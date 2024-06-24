import React, { useState } from "react";
import NumberInput from "../../../ui/numberInput";
import Button from "../../../ui/Button";
import { postMarketplace } from "../../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { useCollectionDeployer } from "../../../utils/useCollectionDeployer";
import { setError, setToaster } from "../../../reducers/layoutReducer";
import Spinner from "../../loaders/spinner";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
const getModalSteps = () => {
  return [
    {
      title: "Place a bid confirmation",
      message: "Please confirm the transaction",
    },
    {
      title: "Signature",
      message: "Please sign to place your bid for this NFT",
    },
  ];
};
const PlaceBid = ({
  nftDetails,
  data,
  percentageValue,
  totalBuyValue,
  nftId,
  collectionAddress,
  tokenId,
  show,
  setShow,
  refresh
}) => {
  const user = useSelector((store: any) => store.auth.user);
  const rootDispatch = useDispatch();
  const {address}=useAccount()
  const navigate=useNavigate()
  const { getBidConfirmation, getSignatureForBid } = useCollectionDeployer();
  const [values, setValues] = useState({ bidAmount: "" });
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(-1);
  const [loading, setIsLoading] = useState("");
  const clearState = () => {
    setShow(false);
    setErrors({});
    setValues({
      bidAmount: "",
    });
  };
  const placeBid = async (e: any) => {
    e.preventDefault();
    setIsLoading("placingBid");
    try {
      const obj = {
        nftId: nftId,
        customerId: user.id,
        value: parseFloat(values.bidAmount),
        crypto: "WMATIC",
        signature: "",
      };
      setCurrentStep(0);
      await getBidConfirmation(obj.value);
      setCurrentStep(1);
      const signature = await getSignatureForBid(
        collectionAddress,
        tokenId,
        obj.value,
        nftDetails.supply
      );
      obj.signature = signature;
      setCurrentStep(2);
      let response = await postMarketplace(`User/SaveNftBid`, obj);
      if (
        response.status === 200 ||
        response.statusText.toLowerCase() === "ok"
      ) {
        rootDispatch(
          setToaster({ message: "Bid has been placed successfully"})
        );
        clearState();
        refresh()
      } else {
        rootDispatch(setError({ message: response }));
      }
    } catch (error) {
      const from = currentStep < 2 ? "contract" : "";
      rootDispatch(setError({ message: error, from }));
    } finally {
      setCurrentStep(-1);
      setIsLoading("");
    }
  };
  return (
    <form className="drawer drawer-end">
      <input
        id="placebid"
        type="checkbox"
        className="drawer-toggle"
        checked={show}
        disabled={loading === "placingBid"}
        onChange={() => setShow(false)}
      />
      <div className="drawer-side z-[999]">
        <label
          htmlFor="placebid"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu p-4 md:w-80 min-h-full bg-white text-sm-content pt-6">
          <div className="flex justify-between items-center my-2">
            <h2 className="text-lg text-dark font-semibold mb-0">
              Place a Bid
            </h2>
            <Button
              type="plain"
              handleClick={() => setShow(false)}
              disabled={loading === "placingBid"}
            >
              <span className="icon close cursor-pointer"></span>
            </Button>
          </div>
          <form>
            <div className="">
              <div className="flex gap-5 items-center mt-10 mb-12">
                <img
                  className="w-[112px] h-[112px] object-cover rounded-[15px]"
                  src={nftDetails.image}
                  alt={nftDetails.name}
                />
                <div className="">
                  <p className="truncate text-[28px] text-secondary font-semibold leading-8 mb-0">
                    {nftDetails.name}
                  </p>

                  <p className="truncate text-secondary mt-2 opacity-60 font-semibold text-xl leading-6 mb-0">
                    Current Price
                  </p>
                  <p className="truncate text-secondary text-[22px] font-semibold leading-[26px] mb-0">
                    <span className=""> { Number(nftDetails?.price || 0)?.toFixed(4) || "--"}</span>{" "}
                    <span className="">{nftDetails?.currency || "--"}</span>
                  </p>
                </div>
              </div>
              <div className="bg-base-300 px-6 py-8 rounded-[20px] my-8">
                {/* <div className="mb-4 flex items-center justify-between px-4">
                  <p className="text-sm shrink-0 text-secondary ">Price</p>
                  <p className="truncate text-secondary font-semibold">
                    {nftDetails?.price || "--"}{" "}
                    <span>{nftDetails?.currency || "--"}</span>
                  </p>
                </div>
                <div className="mb-4 flex items-center justify-between px-4">
                  <p className="text-sm shrink-0 text-secondary ">Buyer Fee</p>
                  <p className="truncate text-secondary font-semibold">
                    {percentageValue || "--"}{" "}
                    <span>{nftDetails?.currency || "--"}</span>
                  </p>
                </div>
                <div className="mb-4 flex items-center justify-between px-4">
                  <p className="text-sm shrink-0 text-secondary ">
                    Total Price
                  </p>
                  <p className="truncate text-secondary font-semibold">
                    {totalBuyValue} <span>{nftDetails?.currency}</span>
                  </p>
                </div> */}
                <div className="mb-4">
                  <NumberInput
                    label="Your Bid"
                    value={values.bidAmount}
                    onChange={(field: string, value: any) =>
                      setValues((prev) => ({ ...prev, [field]: value }))
                    }
                    inputBoxClass="mb-6"
                    fieldName="bidAmount"
                    error={errors["bidAmount"]}
                    isInteger={false}
                    allowDecimals={4}
                    placeholder="Bidding amount"
                    disabled={loading !== ""}
                  />
                </div>
                <div className="px-4">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm shrink-0 text-secondary ">
                      Your balance
                    </p>
                    <p className="truncate text-secondary font-semibold">
                      <span className=""> { Number(data?.formatted || 0)?.toFixed(4)}</span>{" "}
                      <span className="">{nftDetails?.currency}</span>
                    </p>
                  </div>
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm shrink-0 text-secondary ">
                      Your bidding amount
                    </p>
                    <p className="truncate text-secondary font-semibold">
                      {values.bidAmount || 0} {nftDetails?.currency}
                    </p>
                  </div>
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm shrink-0 text-secondary ">
                      Service fee
                    </p>
                    <p className="text-end truncate text-secondary font-semibold">
                    {percentageValue} <span>{nftDetails?.currency}</span>
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm shrink-0 text-secondary ">
                      Total bid amount
                    </p>
                    <p className="text-end truncate text-secondary font-semibold">
                      {Number(percentageValue) + Number(Number(data?.formatted || 0)?.toFixed(4))} {nftDetails?.currency}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {currentStep >= 0 && (
              <div className="flex flex-col justify-center items-center">
                <ul className="steps">
                  {getModalSteps().map((step: any, index: number) => {
                    return (
                      <li
                        className={`step ${
                          index <= currentStep ? "step-primary" : ""
                        }`}
                        key={step.title}
                      >
                        <p className="font-medium">{step.title}</p>
                        <p>{step.message}</p>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-6 flex justify-center gap-2">
                  {currentStep === 0 && (
                    <p className="text-primary font-medium">
                      Waiting for confirmation...
                    </p>
                  )}
                  {currentStep === 1 && (
                    <p className="text-primary font-medium">
                      Getting signature for bid...
                    </p>
                  )}
                  <span className="text-base">
                    <Spinner />
                  </span>
                </div>
              </div>
            )}
            <div className="mt-16 lg:max-w-[250px] lg:mx-auto mb-5">
              <Button
                btnClassName="w-full mb-4 !min-h-[39px]"
                type="replyCancel"
                handleClick={() => setShow(false)}
                disabled={loading !== ""}
              >
                Cancel
              </Button>
              <Button
                btnClassName="w-full !h-[32px] !min-h-[39px] lg:px-3"
                type="primary"
                handleClick={(e) => placeBid(e)}
                disabled={loading !== ""}
              >
                <span>{loading !== "" && <Spinner size="sm" />} </span>
                Place a bid
              </Button>
            </div>
          </form>
        </div>
      </div>
    </form>
  );
};

export default PlaceBid;
