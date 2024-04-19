import React, { useEffect, useReducer } from "react";
import { ethers } from "ethers";
import useContract from "../../../hooks/useContract";
import MaticInput from "../../inputs/maticforminput";
import Button from "../../../ui/Button";
import { modalActions } from "../../../ui/Modal";
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
import { setError } from "../../../reducers/layoutReducer";
import Success from "./success";

const BuyMembership = (props: any) => {
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
    if (user?.id && props?.daoId) {
      getDetails();
    }
  }, [isConnected, address, user?.id]);

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
    localDispatch({ type: "setMintedAmount", payload: balance });
  };
  const onMintedCount = (count: any) => {
    localDispatch({ type: "setNftMintedTillNow", payload: count });
  };

  const onNativePrice = (price: any) => {
    const hex = ethers.utils.formatEther(price);
    const hexCurrencyValue = parseFloat(hex);
    const percentage = 1 / 100;
    const newCurrencyValue = hexCurrencyValue + hexCurrencyValue * percentage;
    localDispatch({ type: "setNftPrice", payload: newCurrencyValue });
  };
  const getDetails = async () => {
    await getMembershipDetails(
      { daoId: props?.daoId, userId: user?.id },
      { onSuccess: onMembershipDetails, onError: setError }
    );
    await getDetailsfromContract(
      { address: props?.contractAddress || '' },
      {
        onCount: onMintedCount,
        onBalance: onMintBalance,
        onNativePrice,
        onError: setError,
        getMintedCount,
        readMintBalance,
        getNativeTokenPriceForMint,
      }
    );
    setLoading("setIsLoading", false);
  };

  const onSuccessfulMint = () => {
    modalActions("mintSuccessModal", "open");
    setLoading("setIsMinting", false);
  };
  const onTransaction = async (txDetails: any, files: any) => {
    await updateTransactionHash(
      { data: txDetails, files: files, userId: user.id },
      { onSucess: onSuccessfulMint, onError: setError }
    );
  };
  const handleMintNfts = async (uri: any, files: any, data: any) => {
    const price=localState.inputCount*(localState.details?.prices)
    await mintNfts(
      { uri: uri, files: files, currency: "Matic", price: price, contractAddress: props?.contractAddress},
      {
        onSucess: onTransaction,
        onError: setErrorMessage,
        minMultipleNft: minMultipleNft,
        parseError: parseError,
      }
    );
  };
  const handleIpfsUploading = async (data: any) => {
    await uploadToIPFS(
      { data: data, nftPrice: localState.details?.prices },
      { onSuccess: handleMintNfts, onError: setErrorMessage }
    );
  };
  const handleMinting = async () => {
    await getMetaData(
      { count: localState.inputCount, daoId: props?.daoId },
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
      <h1 className="font-semibold mb-4 text-2xl text-secondary">
        Buy Memb<span className={`text-primary`}>ership</span>
      </h1>
      <div className="lg:px-[55px]">
        <div className="mt-7 text-center">
          <h1 className="text-lg font-semibold text-secondary">
            {localState.details?.name && `About ${localState.details?.name?.toLowerCase()} membership`} 
          </h1>
          <p className="mt-2 mb-6 text-secondary">
            {localState.details?.description}
          </p>
          <MaticInput
            value={localState.inputCount}
            setValue={(value: any) => {
              localDispatch({ type: "setInputCount", payload: Number(value) });
            }}
            maxValue={5}
            minValue={1}
          />
          <div className="text-right mt-5 max-sm:text-center">
            <Button
              type="primary"
              handleClick={() => handleMinting()}
              btnClassName=""
              disabled={localState.isMinting}
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

      <Success id={"mintSuccessModal"} address={address} />
    </div>
  );
};
const connectDispatchToProps = (dispatch: any) => {
  return {
    dispatch,
  };
};
export default connect(null, connectDispatchToProps)(BuyMembership);
