import React, { useEffect, useReducer } from "react";
import { ethers } from "ethers";
import useContract from "../../../hooks/useContract";
import MaticInput from "../../inputs/maticforminput";
import Button from "../../../ui/Button";
import { useAccount } from "wagmi";
import { connect, useDispatch, useSelector } from "react-redux";
import Spinner from "../../loaders/spinner";
import {
  getDetailsfromContract,
  getMembershipDetails,
  getMetaData,
  mintNfts,
  updateTransactionHash,
  uploadToIPFS,
} from "./services";
import { buyMembershipReducer, buyMembershipState } from "./reducer";
import { setError, setToaster } from "../../../reducers/layoutReducer";
import BuyMembershipShimmers from "../../loaders/projects/buyMembershipShimmer";
import { shortTheNumber } from "../../../ui/formatNumber";

const BuyMembership = (props: any) => {
  const { daoId, contractAddress, totalSoldTokens, totalSupply } =
    props.projectDetails;
  const rootDispatch = useDispatch();
  const [localState, localDispatch] = useReducer(
    buyMembershipReducer,
    buyMembershipState
  );
  const { isConnected, address } = useAccount();
  const {
    minMultipleNft,
    parseError,
    readMintBalance,
    getNativeTokenPriceForMint,
    getMintedCount,
  } = useContract();
  const user = useSelector((state: any) => state.auth.user);
  useEffect(() => {
    if (isConnected && user?.id && daoId) {
      getDetails();
    }
  }, [isConnected, address, user?.id, daoId]);

  const setLoading = (type: string, payload: boolean) => {
    localDispatch({ type, payload });
  };
  const setErrorMessage = (message: string, type: string = "error") => {
    rootDispatch(setError({ message, type }));
    setLoading("setIsLoading", false);
    setLoading("setIsMinting", false);
  };
  const onMembershipDetails = (data: any) => {
    localDispatch({ type: "setDetails", payload: data?.[0] });
  };
  const onMintBalance = (balance: any) => {
    localDispatch({ type: "setCurrUserMintedCount", payload: balance });
  };
  const onMintedCount = (count: any) => {
    localDispatch({ type: "setTotalNftsMinted", payload: count });
  };

  const onNativePrice = (price: any) => {
    const hex = ethers.utils.formatEther(price);
    const hexCurrencyValue = parseFloat(hex);
    const percentage = 1 / 100;
    const newCurrencyValue = hexCurrencyValue + hexCurrencyValue * percentage;
    localDispatch({ type: "setNftPrice", payload: newCurrencyValue });
  };
  const getDetails = async () => {
    setLoading("setIsLoading", true);
    try {
      await getMembershipDetails(
        { daoId: daoId, userId: user?.id },
        { onSuccess: onMembershipDetails, onError: setErrorMessage }
      );
      await getDetailsfromContract(
        { address: contractAddress || "" },
        {
          onCount: onMintedCount,
          onBalance: onMintBalance,
          onNativePrice,
          onError: setErrorMessage,
          getMintedCount,
          readMintBalance,
          getNativeTokenPriceForMint,
        }
      );
    } catch (err) {
      setErrorMessage(err.message || err);
    } finally {
      setLoading("setIsLoading", false);
    }
  };

  const onSuccessfulMint = () => {
    rootDispatch(setToaster({ message: "Membership purchase successful!" }));
    // modalActions("mintSuccessModal", "open");
    props.getDetails?.();
    getDetails();
    setLoading("setIsMinting", false);
  };
  const onTransaction = async (txDetails: any, files: any) => {
    await updateTransactionHash(
      { data: txDetails, files: files, userId: user.id, daoId: daoId },
      { onSuccess: onSuccessfulMint, onError: setErrorMessage }
    );
  };
  const handleMintNfts = async (uri: any, files: any, data: any) => {
    const { crypto } = localState.details?.prices?.[0] || {};
    const price = localState.inputCount * localState.nftPrice;
    await mintNfts(
      {
        uri: uri,
        files: files,
        currency: crypto,
        price: price,
        contractAddress: contractAddress,
      },
      {
        onSuccess: onTransaction,
        onError: setErrorMessage,
        minMultipleNft: minMultipleNft,
        parseError: parseError,
      }
    );
  };
  const handleIpfsUploading = async (data: any) => {
    const { crypto } = localState.details?.prices?.[0] || {};
    await uploadToIPFS(
      { data: data, nftPrice: localState.nftPrice.toFixed(8), crypto: crypto },
      { onSuccess: handleMintNfts, onError: setErrorMessage }
    );
  };
  const handleMinting = async () => {
    if (!props?.proStatus()) {
      rootDispatch(setError({ message: "No active rounds at the moment." }));
      return;
    }
    await getMetaData(
      {
        count: localState.inputCount,
        daoId: daoId,
        totalSupply,
        getMintedCount,
        contractAddress,
        getDetails: props?.getDetails,
      },
      {
        onSuccess: handleIpfsUploading,
        onError: setErrorMessage,
        setLoading: setLoading,
        loaderType: "setIsMinting",
      }
    );
  };
  return (
    <div className="container mx-auto" id="buyMembershipHeader">
      <div className="md:flex justify-between flex-wrap items-center mb-4">
        <h4 className="font-semibold text-2xl text-secondary">
          Buy Membership
        </h4>
        {user?.id && (
          <p className="mt-4 md:mt-0 lg:pr-[55px] font-semibold text-secondary h-full flex gap-2 items-center">
            Current Balance :{" "}
            {localState.isLoading ? (
              <Spinner size="loading-sm" />
            ) : (
              <span className="text-primary">
                {shortTheNumber(localState.currUserMintedCount)}
              </span>
            )}{" "}
            memberships
          </p>
        )}
      </div>
      {localState.isLoading && <BuyMembershipShimmers />}
      {!localState.isLoading && (
        <div className="lg:pr-[55px]">
          <div className="mt-7 text-center">
            <MaticInput
              price={localState.inputCount * localState.nftPrice}
              value={isConnected && address ? localState.inputCount : 0}
              setValue={(value: any) => {
                localDispatch({
                  type: "setInputCount",
                  payload: Number(value),
                });
              }}
              maxValue={5}
              minValue={1}
            />
            <div className="text-right mt-5 max-sm:text-center">
              <Button
                type="primary"
                handleClick={() => handleMinting()}
                btnClassName=""
                disabled={
                  !isConnected ||
                  !user?.id ||
                  localState.isMinting ||
                  totalSoldTokens >= totalSupply
                }
              >
                {localState.isMinting && (
                  <span>
                    <Spinner />
                  </span>
                )}
                MINT For Membership Pass
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* 
      <Success id={"mintSuccessModal"} address={address} /> */}
    </div>
  );
};
const connectDispatchToProps = (dispatch: any) => {
  return {
    dispatch,
  };
};
export default connect(null, connectDispatchToProps)(BuyMembership);
