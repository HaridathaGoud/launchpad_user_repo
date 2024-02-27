import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useBalance, useAccount } from "wagmi";
import { useCollectionDeployer } from "./useCollectionDeployer";
import { get, post } from "./api";
import { Modal, modalActions } from "../ui/Modal";
import Button from "../ui/Button";
import Spinner from "../components/loaders/spinner";
import { setError, setToaster } from "../reducers/layoutReducer";
const BuyComponent = (props: any) => {
  const rootDispatch=useDispatch()
  const router = useNavigate();
  const { address } = useAccount();
  // const { data } = useBalance({ address: address });
  const { nftId } = useParams();
  const { buyAsset } = useCollectionDeployer();
  const [btnLoader, setBtnLoader] = useState(false);
  const [percentageValue, setPercentageValue] = useState(0);
  const [totalBuyValue, setTotalBuyValue] = useState(0);
  useEffect(() => {
    percentage();
  }, []);

  const percentage = () => {
    const buyValue = props.nftDetails?.price || props.nftDetails?.value;
    let percentage = (buyValue * 1) / 100;
    setPercentageValue(percentage);
    let totalValue = buyValue + percentage;
    setTotalBuyValue(totalValue);
  };

  const buyNow = async (e: any) => {
    setBtnLoader(true);
    e.preventDefault();
    const form = e.currentTarget;
    const obj = {
      nftId: nftId || props.nftDetails?.id,
      customerId: props.auth.user.id,
      value: props.nftDetails?.price,
      CollectionContractAddress: props.collectionAddress,
      crypto: "WMATIC",
      TransactionHash: "",
      TokenId: null,
    };
    if (form.checkValidity() === true) {
      try {
        const buyObj = await buyAsset(
          props.nftDetails.signature,
          props.nftDetails.collectionType,
          props.collectionAddress,
          props.nftDetails.tokenId,
          props.nftDetails.price,
          props.nftDetails.ownerAddress,
          props.nftDetails.supply
        );
        obj.TransactionHash = buyObj.hash;
        obj.TokenId = props.nftDetails.tokenId;
        let response = await get(`User/nfttype/${nftId}`);
        if (response.data.isPutOnSale) {
          let response = await post(`/User/SaveBuy`, obj);
          if (response) {
            rootDispatch(setToaster({ message: "NFT purchase successful!" ,callback:() => {
              modalActions("marketplace-buy-now", "close");
              router(`/accounts/${address}`);
            }}));
          } else {
            rootDispatch(setError({message:response}))
          }
        }
      } catch (error) {
        rootDispatch(setError({message:error}))
      } finally {
        setBtnLoader(false);
      }
    } else {
      setBtnLoader(false);
      modalActions("marketplace-buy-now", "close");
    }
  };

  return (
    <>
      <Modal id="marketplace-buy-now">
        <form onSubmit={(e) => buyNow(e)}>
          <div className="p-3 justify-content-between">
            <h2 className="text-dark text-lg font-semibold">Checkout</h2>
          </div>
          {/* <div className="text-center">{saleLoader && <Spinner></Spinner>}</div>
                    {!saleLoader && ( */}

          <div className="p-3">
            <p className="text-dark mb-3">
              NFT Marketplace is the platform where users can purchase NFT
              assets directly from creator, Users need to pay for the gas fee as
              well as platform fee before purchasing the NFT. User can purchase
              NFT also through bidding, where creator will accept a price from
              the user
            </p>

            <div className="flex justify-between items-center my-4">
              <p className="text-sm shrink-0 text-secondary opacity-50">
                Buy Price
              </p>
              <p className="truncate text-secondary text-end">
                {props.nftDetails?.price || props.nftDetails?.value}{" "}
                {props.nftDetails?.currency?.toUpperCase() ||
                  process.env.REACT_APP_CURRENCY_SYMBOL}
              </p>
            </div>
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm shrink-0 text-secondary opacity-50">
                Buyer Fee
              </p>
              <p className="truncate text-secondary text-end">
                {percentageValue}{" "}
                {props.nftDetails?.currency?.toUpperCase() ||
                  process.env.REACT_APP_CURRENCY_SYMBOL}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm shrink-0 text-secondary opacity-50">
                Total Buy Price
              </p>
              <p className="truncate text-secondary text-end">
                {totalBuyValue}{" "}
                {props.nftDetails?.currency?.toUpperCase() ||
                  process.env.REACT_APP_CURRENCY_SYMBOL}
              </p>
            </div>
          </div>
          <hr />
          <div className="flex justify-center mt-5">
            <Button
              btnClassName="flex gap-2"
              type="secondary"
              disabled={btnLoader}
              handleClick={(e: any) => buyNow(e)}
            >
              {btnLoader && (
                <span>
                  <Spinner />{" "}
                </span>
              )}{" "}
              Buy Now
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};
const connectStateToProps = ({ auth }: any) => {
  return { auth: auth };
};
export default connect(connectStateToProps, (dispatch) => {
  return { dispatch };
})(BuyComponent);
