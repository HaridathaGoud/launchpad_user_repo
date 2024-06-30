import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAccount } from "wagmi";
import { useCollectionDeployer } from "./useCollectionDeployer";
import { getMarketplace, postMarketplace } from "./api";
import Button from "../ui/Button";
import Spinner from "../components/loaders/spinner";
import { setError, setToaster } from "../reducers/layoutReducer";
import defaultlogo from "../assets/images/default-bg.png";

const BuyComponent = (props: any) => {
  const rootDispatch = useDispatch();
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
  const clearState = () => {
    props.setIsOpen(false);
  };
  const buyNow = async (e: any) => {
    setBtnLoader(true);
    e.preventDefault();
    const obj = {
      nftId: nftId || props.nftDetails?.id,
      customerId: props.auth?.user?.id,
      value: props.nftDetails?.price,
      CollectionContractAddress: props.collectionAddress,
      crypto: "WMATIC",
      TransactionHash: "",
      TokenId: null,
    };
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
      let response = await getMarketplace(`User/nfttype/${nftId}`);
      if (response.data.isPutOnSale) {
        let response = await postMarketplace(`/User/SaveBuy`, obj);
        if (response.statusText?.toLowerCase() === "ok") {
          props?.setIsOpen(false);
          rootDispatch(
            setToaster({
              message: "NFT purchase successful!",
              callback: () => {
                router(`/profile/${address}`);
              },
            })
          );
          clearState();
          props?.refresh();
        } else {
          rootDispatch(setError({ message: response }));
        }
      }
    } catch (error) {
      rootDispatch(setError({ message: error, from: "contract" }));
    } finally {
      setBtnLoader(false);
    }
  };

  return (
    <form className="drawer drawer-end">
      <input
        id="buyNftDrawer"
        type="checkbox"
        className="drawer-toggle"
        checked={props.isOpen}
        onChange={() => props?.setIsOpen(false)}
        disabled={btnLoader}
      />
      <div className="drawer-side z-[999]">
        <label
          htmlFor="buyNftDrawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu p-4 md:w-80 min-h-full bg-white text-sm-content pt-6">
          <form onSubmit={(e) => buyNow(e)}>
            <div className="flex justify-between items-center">
              <h2 className="text-lg text-dark font-semibold mb-4">Buy Now</h2>
              {!btnLoader && (
                <Button
                  type="plain"
                  handleClick={() => props?.setIsOpen(false)}
                >
                  <span className="icon close cursor-pointer"></span>
                </Button>
              )}
            </div>

            <div className="flex gap-5 items-center mt-10">
              <img
                className="w-[112px] h-[112px] object-cover rounded-[15px]"
                src={props.nftDetails?.image || defaultlogo}
                alt={props?.nftDetails?.name}
              />
              <div className="">
                <p className="truncate text-[28px] text-secondary font-semibold leading-8 mb-0">
                  {props?.nftDetails?.name}
                </p>

                <p className="truncate text-secondary mt-2 opacity-60 font-semibold text-xl leading-6 mb-0">
                  Current Price
                </p>
                <p className="truncate text-secondary text-[22px] font-semibold leading-[26px] mb-0">
                  {props.nftDetails?.price || props.nftDetails?.value}{" "}
                  {props.nftDetails?.currency?.toUpperCase() ||
                    process.env.REACT_APP_CURRENCY_SYMBOL}
                </p>
              </div>
            </div>
            {/* <div className="text-center">{saleLoader && <Spinner></Spinner>}</div>
                    {!saleLoader && ( */}

            <div className="bg-base-300 px-6 py-8 rounded-[20px] my-8">
              <div className="flex justify-between items-center my-4">
                <p className="text-sm shrink-0 text-secondary">Buy Price</p>
                <p className="truncate text-secondary text-end font-semibold">
                  {props.nftDetails?.price || props.nftDetails?.value}{" "}
                  {props.nftDetails?.currency?.toUpperCase() ||
                    process.env.REACT_APP_CURRENCY_SYMBOL}
                </p>
              </div>
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm shrink-0 text-secondary">Buyer Fee</p>
                <p className="truncate text-secondary text-end font-semibold">
                  {percentageValue}{" "}
                  {props.nftDetails?.currency?.toUpperCase() ||
                    process.env.REACT_APP_CURRENCY_SYMBOL}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm shrink-0 text-secondary">
                  Total Buy Price
                </p>
                <p className="truncate text-secondary text-end font-semibold">
                  {totalBuyValue}{" "}
                  {props.nftDetails?.currency?.toUpperCase() ||
                    process.env.REACT_APP_CURRENCY_SYMBOL}
                </p>
              </div>
            </div>
            {/* <hr /> */}
            <div className="mt-20 lg:max-w-[250px] lg:mx-auto mb-5 flex flex-col gap-2">
              <Button
                btnClassName="w-full !min-h-[39px] lg:px-3"
                type="replyCancel"
                disabled={btnLoader}
                handleClick={() => props?.setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button
                btnClassName="w-full !min-h-[39px] lg:px-3"
                type="primary"
                disabled={btnLoader}
                handleClick={(e: any) => buyNow(e)}
              >
                <span>{btnLoader && <Spinner size="sm" />} </span>
                Own with {props.nftDetails?.price ||
                  props.nftDetails?.value}{" "}
                {props.nftDetails?.currency?.toUpperCase() ||
                  process.env.REACT_APP_CURRENCY_SYMBOL}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </form>
  );
};
const connectStateToProps = ({ auth }: any) => {
  return { auth: auth };
};
export default connect(connectStateToProps, (dispatch) => {
  return { dispatch };
})(BuyComponent);
