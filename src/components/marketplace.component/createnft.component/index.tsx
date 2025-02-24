import React, { useEffect, useReducer, useRef } from "react";
import { connect, useSelector } from "react-redux";
import BreadCrumb from "../../../ui/breadcrumb";
import {
  addressType,
  useCollectionDeployer,
} from "../../../utils/useCollectionDeployer";
import Form from "./form";
import { formReducer, formState } from "./reducer";
import { store } from "../../../store";
import {
  clearNetworks,
  clearUserCollections,
  createNft,
  getNetworks,
  getUserCollections,
} from "../../../reducers/marketPlaceReducer";
import { modalActions } from "../../../ui/Modal";
import { setToaster } from "../../../reducers/layoutReducer";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import CreatenftShimmer from "./createnftshimmer";
function CreateNft() {
  const navigate = useNavigate();
  const { address } = useAccount();
  const [localState, localDispatch] = useReducer(formReducer, formState);
  const { setApprovalForAll, getSignatureForSale, mintTo721 } =
    useCollectionDeployer();
  const scrollableRef = useRef<any>(null);
  const user = useSelector((store: any) => store.auth.user);
  useEffect(() => {
    if (user?.id) {
      store.dispatch(
        getUserCollections({ customerId: user.id, collectionType: "ERC-721" })
      );
    }
  }, [user?.id]);
  useEffect(() => {
    store.dispatch(getNetworks());
    return () => {
      store.dispatch(clearUserCollections());
      store.dispatch(clearNetworks());
    };
  }, []);
  const saveDetails = async (path, responseAfterMint: any) => {
    const { ok, data } = responseAfterMint;
    if (ok) {
      const tokenId = parseInt(data.logs[0].topics[3]);
      const {
        collection,
        network,
        properties,
        salePrice,
        auctionPrice,
        ...updatedValues
      } = localState.values;
      let signature = "";
      const sale = updatedValues.isPutonSale ? "Sale" : null;
      const auction = updatedValues.isPutOnAuction ? "Auction" : null;
      if (updatedValues.isPutonSale) {
        updateState("setModalStep", 2);
        const { status, data } = await getSignatureForSale(
          collection.contractAddress,
          tokenId,
          "ERC721",
          salePrice
        );
        if (status === true) signature = data;
        else throw data;
      }
      updateState("setModalStep", updatedValues.isPutonSale ? 3 : 2);
      let obj = {
        ...updatedValues,
        customerId: user.id,
        imageUrl: `${localState.image.imageUrl}`,
        tokenId: tokenId,
        collectionId: collection.id,
        properties: JSON.stringify(properties),
        salePrice: salePrice || auctionPrice || 0,
        saleToken: "WMATIC",
        saleType: sale || auction,
        collectionType: "ERC-721",
        metadataUri: `${path}`,
        contractAttachment: null,
        contractCoverProfile: null,
        contractName: null,
        contractSymbol: null,
        contractDescription: null,
        contractAddress: collection?.contractAddress,
        isCreateOwn: true,
        signature,
      };
      const { status, error } = await createNft({ requestObject: obj });
      if (status) {
        store.dispatch(
          setToaster({
            message: "NFT creation successful!",
            callback: () => {
              navigate(`/profile/${address}`);
              updateState('setIsLoading','')
            },
            callbackTimeout: 2000,
          })
        );
      } else {
        throw error;
      }
    } else {
      throw data;
    }
  };
  const mintNFT = async (path, approvalResponse: any) => {
    const { ok, data } = approvalResponse;
    const { values } = localState;
    try {
      if (ok) {
        updateState("setModalStep", 1);
        await mintTo721(
          values.collection?.contractAddress,
          process.env.REACT_APP_IPFS_PREFIX + `/${path}`,
          Number(values.royalities),
          async (response: any) => await saveDetails(path, response)
        );
      } else {
        throw data;
      }
    } catch (error) {
      throw error;
    }
  };
  async function mint({ path }: any) {
    const { values } = localState;
    const contractAddress: addressType = values.collection?.contractAddress;
    modalActions("putOnSaleSteps", "open");
    try {
      await setApprovalForAll(contractAddress, async (response: any) => {
        await mintNFT(path, response);
      });
    } catch (error) {
      throw error;
    }
  }
  const inputRef = useRef<HTMLInputElement>(null);

  const updateState = (type: string, payload: any) => {
    localDispatch({ type, payload });
  };
  return (
    <>
      <div ref={scrollableRef}></div>
      {localState.isLoading==='redirecting' && <CreatenftShimmer/>}
      {localState.isLoading!=='redirecting' &&<div className="container mx-auto mt-4 px-3 lg:px-0">
        <BreadCrumb />{" "}
        <Form
          state={{ ...localState }}
          updateState={updateState}
          inputRef={inputRef}
          mint={mint}
        />
      </div>}
    </>
  );
}
const connectStateToProps = ({ auth }) => {
  return { auth: auth };
};
export default connect(connectStateToProps, (dispatch) => {
  return { dispatch };
})(CreateNft);
