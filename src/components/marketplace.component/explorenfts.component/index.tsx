import React, { useEffect, useRef, useContext, useReducer } from "react";
import { connect, useSelector } from "react-redux";
import nodata from "../../../assets/images/no-data.png";
import defaultlogo from "../../../assets/images/default-logo.png";
import { useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";
import WalletConnect from "../../shared/connect.wallet";
import { clearNfts, fetchNfts } from "../../../reducers/marketPlaceReducer";
import { store } from "../../../store";
import outletContext from "../../../layout/context/outletContext";
import OutletContextModel from "../../../layout/context/model";
import { saveFavorite, saveViews } from "./services";
import Button from "../../../ui/Button";
import { nftsReducer, nftsState } from "./reducers";
import Spinner from "../../loaders/spinner";
import FoundingMemberSimmer from "../../loaders/foundingmembersshimmer";
const pageSize = 10;
const search = null;
function ExploreNfts(props: any) {
  const [modalShow, setModalShow] = React.useState(false);
  const { address, isConnected } = useAccount();
  const [localState, localDispatch] = useReducer(nftsReducer, nftsState);
  const navigate = useNavigate();

  const scrollableRef = useRef<any>(null);
  const { loader, error, data, pageNo } = useSelector(
    (store: any) => store.exploreNfts
  );
  const { setErrorMessage, setToaster }: OutletContextModel =
    useContext(outletContext);
  useEffect(() => {
    store.dispatch(fetchNfts(data, 1, "all", search, props.auth.user?.id));
    scrollableRef?.current?.scrollIntoView(0, 0);
    if (error) setErrorMessage?.(error);

    return () => {
      store.dispatch(clearNfts());
    };
  }, [props.auth.user?.id]); // eslint-disable-line react-hooks/exhaustive-deps
  const loadmore = () => {
    store.dispatch(fetchNfts(data, pageNo, "all", search, props.auth.user?.id));
  };
  const addToFavorites = (item: any) => {
    if (isConnected) {
      saveFavoriteNft(item);
    } else {
      setModalShow(true);
    }
  };
  const saveFavoriteNft = async (item: any) => {
    setErrorMessage?.(null);
    setModalShow(false);
    localDispatch({
      type: "setFavoriteLoader",
      payload: { id: item.id, loading: true },
    });
    try {
      let obj = {
        nftId: item.id,
        customerId: props.auth.user?.id,
        isFavourite: !item.isFavourite,
      };
      const { status, error } = await saveFavorite(obj);
      if (status) setToaster?.("Nft added to Favorites!");
      if (error) setErrorMessage?.(error);
    } catch (error) {
      setErrorMessage?.("Something went wrong, please try again!");
    } finally {
      localDispatch({
        type: "setFavoriteLoader",
        payload: { id: "", loading: false },
      });
    }
  };

  const navigateToAsset = (item) => {
    navigate(
      `/marketplace/assets/${item.tokenId}/${item.collectionContractAddress}/${item.id}`
    );
  };
  const saveView = async (item) => {
    localDispatch({
      type: "setLoader",
      payload: true,
    });
    try {
      let obj = {
        nftId: item.id,
        customerId: props.auth.user?.id,
      };
      const { status, error } = await saveViews(obj);
      if (status) navigateToAsset(item);
      if (error) setErrorMessage?.(error);
    } catch (_) {
      setErrorMessage?.("Something went wrong, please try again!");
    } finally {
      localDispatch({
        type: "setLoader",
        payload: false,
      });
    }
  };
  return (
    <>
      <div ref={scrollableRef}></div>
      <div className="container mx-auto pt-5 px-3 lg:px-0">
        <h2 className="text-[24px] text-secondary font-semibold">
          Explore NFTs
        </h2>
        <WalletConnect
          showWalletModal={modalShow}
          onWalletConect={(addr) => {}}
          onWalletClose={() => setModalShow(false)}
        />
        <div className="grid gap-4 lg:grid-cols-5 md:grid-cols-3">
          {data && !localState?.loader && 
            data?.map((item: any) => (
              <div
                className="mt-3 shadow-md cursor-pointer bg-primary-content rounded-lg relative min-h-[420px] transform transition-transform duration-500 hover:scale-[1.03]"
                key={item.id}
              >
                <div className="cursor-pointer">
                  <Button
                    handleClick={
                      isConnected
                        ? () => saveView?.(item)
                        : () => navigateToAsset(item)
                    }
                    type="plain"
                  >
                    <div className="">
                      {" "}
                      <img
                        src={
                          item?.image && !item?.image?.includes("null")
                            ? item.image.replace(
                                "ipfs://",
                                "https://ipfs.io/ipfs/"
                              )
                            : defaultlogo
                        }
                        alt=""
                        className={`h-[255px] w-full object-cover rounded-tl-lg rounded-tr-lg  ${
                          item?.isUnlockPurchased &&
                          address !== item?.walletAddress
                            ? "blur-image"
                            : ""
                        }`}
                      />
                    </div>
                  </Button>
                  <div className="bg-black top-3 absolute cursor-pointer right-3 rounded-full">
                    <Button
                      type="plain"
                      handleClick={() => addToFavorites(item)}
                      btnClassName="p-2"
                    >
                      {localState?.favoriteLoader?.id !== item.id && (
                        <span
                          className={`icon like-white ${
                            !item?.isFavourite ? "active" : ""
                          }`}
                        ></span>
                      )}
                      {localState?.favoriteLoader?.id === item.id &&
                        localState?.favoriteLoader?.loading && (
                          <span>
                            <Spinner />
                          </span>
                        )}
                    </Button>
                  </div>
                  <Button
                    handleClick={
                      isConnected
                        ? () => saveView(item)
                        : () => navigateToAsset(item)
                    }
                    type="plain"
                    btnClassName="w-[100%]"
                  >
                    <div className="px-2 py-2.5">
                      <p className="text-xs text-secondary truncate">
                        {item.creator}
                      </p>
                      <h1 className="mb-2.5 text-base font-semibold truncate text-secondary">
                        {" "}
                        {item.name}{" "}
                      </h1>

                      <div className="flex justify-between truncate mb-3 gap-2">
                        <p className="opacity-60 truncate text-secondary">
                          Price
                        </p>
                        <p className="font-semibold text-secondary flex-1 truncate text-right">
                          {item.price ? item.price : "--"}{" "}
                          {item.currency && item.price
                            ? item.currency.toUpperCase()
                            : " "}
                        </p>
                      </div>
                      <div className="flex justify-between gap-2">
                        <p className="opacity-60 truncate text-secondary">
                          Highest bid
                        </p>
                        <p className="font-semibold text-secondary flex-1 truncate text-right">
                          {item.highestBid ? item.highestBid : "--"}{" "}
                          {item.currency && item.highestBid
                            ? item.currency.toUpperCase()
                            : " "}
                        </p>
                      </div>
                    </div>
                  </Button>
                  <hr />
                  <div className="px-2.5 py-4 flex justify-between">
                    <div className="flex add-cart cursor-pointer">
                      <span className="icon card-cart"></span>
                      <span className="font-semibold text-secondary ml-1 whitespace-nowrap hover:text-primary">
                        Add to Cart
                      </span>
                    </div>
                    <div className="w-px border"></div>
                    <div className="flex shop-card cursor-pointer">
                      <span className="icon card-shop"></span>
                      <span className="font-semibold text-secondary ml-1 whitespace-nowrap hover:text-primary">
                        Buy Now
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          {(loader || localState?.loader) &&
            Array.from({ length: pageSize }, (_, index) => (
              <div key={index}>
                <FoundingMemberSimmer />
              </div>
            ))}
          {data?.length === 0 && !loader && (
            <div className="">
              <img src={nodata} alt="" className="mx-auto w-[80px]" />
              <h3 className="text-center">No data found</h3>
            </div>
          )}
        </div>
        {data?.length === (pageNo - 1) * pageSize && (
          <div className="category-more">
            <div className="text-center mt-5">
              <span
                onClick={loadmore}
                className="cursor-pointer text-base text-primary font-semibold"
              >
                See More
              </span>
              <i
                className="icon block mx-auto see-more cursor-pointer"
                onClick={loadmore}
              ></i>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
const connectStateToProps = ({ auth }: any) => {
  return { auth: auth };
};
export default connect(connectStateToProps, (dispatch) => {
  return { dispatch };
})(ExploreNfts);
