import React, { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMarketplace, postMarketplace } from "../../../utils/api";
import defaultlogo from "../../../assets/images/default-logo.png";
import "react-multi-carousel/lib/styles.css";
import BuyComponent from "../../../utils/buyNow";
import { useAccount } from "wagmi";
import { connect, useDispatch, useSelector } from "react-redux";
import Button from "../../../ui/Button";
import { setError,setToaster } from "../../../reducers/layoutReducer";
import NoDataFound from "../../../ui/noData";
import { trendingNFTSReducer, trendingNftState } from "./reducer";
import { modalActions } from "../../../ui/Modal";
import { saveFavorite } from '../../nfts.component/services'
import Spinner from "../../loaders/spinner";

function TrendingNfts(props) {
  const errorMessage = useSelector(((store: any) => store.layoutReducer.error.message))
  const rootDispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);
  const router = useNavigate();
  const { address, isConnected } = useAccount();
  const [localState, localDispatch] = useReducer(trendingNFTSReducer, trendingNftState);
  useEffect(() => {
    localDispatch({ type: 'setCurrentIndex', payload: 0 });
    getTodayTrending();
  }, [isConnected]); // eslint-disable-line react-hooks/exhaustive-deps


  const getTodayTrending = async () => {
    try {
      let customerId = user?.id;
      localDispatch({ type: 'setLoader', payload: true });
      const response = await getMarketplace(`User/todaytrending/${customerId}`);
      if (response.status === 200) {
        localDispatch({ type: 'setTodayTrending', payload: response.data });
      }
      else {
        rootDispatch(setError({ message: response }));
      }
    } catch (error) {
      rootDispatch(setError({ message: error }));
    }
    finally {
      localDispatch({ type: 'setLoader', payload: false });
    }
  };

  const handleProfileRedirect = (item: any) => {
    router(`/profile/${item.creatorWalletAddress || address}`);
    // router(`User/NFTDetails/${item?.tokenId}/${item?.collectionContractAddress}/${props.auth.user.id}`);
  };

  const handleBuyModal = (item: any) => {
    router(`/marketplace/nft/${item?.tokenId}/${item?.collectionContractAddress}/${item?.id}`);
  };
  const loadNftDetails = async (item) => {
    await getMarketplace(
      `User/NFTDetails/${item?.tokenId}/${item?.collectionContractAddress}/${props.auth.user.id}`
    )
      .then((response: any) => {
        localDispatch({ type: 'setNftDetails', payload: response.data });
      })
      .catch((error: any) => {
        rootDispatch(setError({ message: error }))
      });
  };
  const handleDeatailPage = async (item) => {
    let obj = {
      nftId: item.id,
      customerId: props.auth.user.id,
    };
    await postMarketplace(`User/SaveViewer`, obj)
      .then((response: any) => {
        router(
          `/marketplace/nft/${item.tokenId}/${item?.collectionContractAddress || item?.creatorWalletAddress
          }/${item.id}`
        );
      })
      .catch((error: any) => {
        rootDispatch(setError({ message: error }))
      });
  };

  const connectHandlePage = (item) => {
    rootDispatch(setError({ message: "Please connect your wallet!", type: 'warning' }))
  };
  const handleSlideActions = (action) => {
    if (action === 'previous') {
      const newIndex = (localState.currentIndex + 1) % localState.todaytrending?.length;
      localDispatch({ type: 'setCurrentIndex', payload: newIndex });
    }
    else {
      const newIndex = (localState.currentIndex - 1 + localState.todaytrending?.length) % localState.todaytrending?.length;
      localDispatch({ type: 'setCurrentIndex', payload: newIndex });
    }
  };
  const getNFTImageUrl = (file) => {
    const filePath = file?.replace('ipfs://', '');
    return process.env.REACT_APP_IPFS_PREFIX + `${filePath}`;
  };
  const addToFavorites = (item: any) => {
    if (isConnected) {
        saveFavoriteNft(item);
    } else {
        modalActions("connect-wallet-model-exploreNfts", "open");
    }
};
const saveFavoriteNft = async (item: any) => {
    errorMessage && rootDispatch(setError({ message: '' }))
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
        if (status) {
            rootDispatch(
                setToaster({
                    message: `NFT ${item.isFavourite ? "removed from" : "added to"
                        } Favorites!`,
                })
            );
              visibleItems?.map((_item) => {
                    if (_item?.id === item?.id) {
                        _item.isFavourite = !item?.isFavourite
                    }
                })
        }
        if (error) rootDispatch(setError({ message: error }));
    } catch (error) {
        rootDispatch(setError({ message: "Something went wrong, please try again!" }))
    } finally {
        localDispatch({
            type: "setFavoriteLoader",
            payload: { id: "", loading: false },
        });
    }
};

  const visibleItems = localState.todaytrending ? [...localState.todaytrending?.slice(localState.currentIndex), ...localState.todaytrending?.slice(0, localState.currentIndex)].slice(0, 3) : [];
  return (
    <>
      {localState.todaytrending.length > 0 && (
        <>
          <div className="container mx-auto mt-5 relative">
            <h2 className="text-center text-2xl font-semibold text-secondary mb-3">
              Today Trending <span className="text-primary">NFTs</span>
            </h2>
            {!localState.loader && (
              <div className="carousel justify-center gap-14 flex md:py-[80px]">
                {localState.todaytrending.length > 0 ? (
                  visibleItems?.map((item: any, idx: any) => (
                    <div
                      className="carousel-item w-full md:w-[340px]"
                      key={item.creatorWalletAddress}
                    >
                      <div
                        className={`card bg-primary-content border border-slate-200 w-full ${visibleItems?.length === 3 &&
                          idx === localState.previosImageChagne + 1
                          ? "trending-card centerd-card lg:scale-[1.2]"
                          : "trending-card"
                          }`}
                      >
                        <div className="p-2">

                          <div className="relative">
                            <img
                              src={item?.logo || defaultlogo}
                              alt=""
                              className={`w-full object-cover h-[400px] rounded-[16px] cursor-pointer ${item?.isUnlockPurchased &&
                                address?.toLowerCase() !==
                                item?.creatorWalletAddress.toLowerCase()
                                ? "trend-image blur-image"
                                : "trend-image"
                                }`}
                              onClick={
                                () => handleDeatailPage(item)
                              }
                            />
                            <img
                              src={item?.creatorProfilePicUrl || defaultlogo}
                              alt=""
                              className="w-[68px] h-[68px] object-cover rounded-[16px] absolute bottom-[-36px] left-3.5"
                            />
                            <div className="bg-black top-3 absolute cursor-pointer right-3 rounded-full">
                              {/* <span className="icon like-white "></span> */}
                              <Button
                                type="plain"
                                handleClick={() => addToFavorites(item)}
                                btnClassName=""
                              >
                                {localState?.favoriteLoader?.id !== item.id && (
                                  <span
                                    className={`icon like-white ${item?.isFavourite ? "active" : ""
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
                          </div>

                        </div>
                        <div className="px-5 pt-10">
                          <div
                            className=" truncate"
                            onClick={() => handleProfileRedirect(item)}
                          >
                            <label className="text-secondary text-base" title={item?.creatorName || item?.creatorWalletAddress}>
                              {item?.creatorName || item?.creatorWalletAddress}
                            </label>
                            <p className="text-lg text-secondary font-semibold truncate" title={item.nftName}>
                              {" "}
                              {item.nftName}{" "}
                            </p>
                          </div>
                          <div className="mt-4 pb-5">
                            <div className="flex justify-between items-center">
                              <label className="text-secondary text-base flex-1">
                                Price
                              </label>
                              <p className="text-base font-semibold text-secondary justify-end flex flex-1 text-right truncate" title={item?.value ? item?.value : "--"}>
                                <span className="truncate"> {item?.value ? item?.value : "--"}{" "}</span>
                                <span>{item?.value
                                  ? process.env.REACT_APP_CURRENCY_SYMBOL
                                  : ""}{" "}</span>
                              </p>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                              <label className="text-secondary text-base flex-1">
                                Highest bid
                              </label>
                              <p className="text-base font-semibold text-secondary justify-end flex flex-1 text-right truncate " title={item?.highestBid ? item?.highestBid : "--"}>
                                <span className="truncate"> {item?.highestBid ? item?.highestBid : "--"}{" "}</span>
                                <span>{item?.highestBid
                                  ? process.env.REACT_APP_CURRENCY_SYMBOL
                                  : ""}</span>
                              </p>
                            </div>
                          </div>
                          <hr />
                          <div className={`px-2.5 py-4 flex  ${item?.creatorWalletAddress !== address ? 'justify-center' : 'justify-between'}`} >
                              {(!item?.isPutOnSale && !item?.isPutOnAuction) && (item?.creatorWalletAddress === address) &&
                                <div className="px-2.5 py-4 flex justify-center">
                                  <div className="flex shop-card cursor-pointer">
                                    <span className="icon square-arrow"></span>
                                    <Button btnClassName="font-semibold !p-0 min-h-min h-auto !shadow-none !bg-transparent text-secondary ml-1 whitespace-nowrap hover:text-primary" handleClick={() => handleBuyModal(item)}
                                    >
                                      Put On Sale
                                    </Button>
                                  </div>
                                </div>}
                              {(!item?.isPutOnSale && !item?.isPutOnAuction) && (item?.creatorWalletAddress === address) && <div className="px-2.5 py-4 flex justify-center">
                                <div className="flex shop-card cursor-pointer">
                                  <span className="icon square-arrow"></span>
                                  <Button btnClassName="font-semibold !p-0 min-h-min h-auto !shadow-none !bg-transparent text-secondary ml-1 whitespace-nowrap hover:text-primary" handleClick={() => handleBuyModal(item)}
                                  >
                                    Put On Auction
                                  </Button>
                                </div>
                              </div>}
                              {/* <div className="w-px border"></div> */}
                              {(item?.isPutOnSale && (item?.creatorWalletAddress !== address)) && <div className="flex shop-card cursor-pointer">
                                <span className="icon square-arrow"></span>
                                <Button btnClassName="font-semibold !p-0 min-h-min h-auto !shadow-none !bg-transparent text-secondary ml-1 whitespace-nowrap hover:text-primary" handleClick={() => handleBuyModal(item)}>
                                  Buy Now
                                </Button>
                              </div>}
                              {(item?.isPutOnAuction && (item?.creatorWalletAddress !== address)) && <div className="flex shop-card cursor-pointer">
                                <span className="icon square-arrow"></span>
                                <Button btnClassName="font-semibold !p-0 min-h-min h-auto !shadow-none !bg-transparent text-secondary ml-1 whitespace-nowrap hover:text-primary" handleClick={() => handleBuyModal(item)}>
                                  Place a Bid
                                </Button>
                              </div>}
                            </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <NoDataFound text={''} />
                )}
              </div>
            )}
            <div className="md:flex md:absolute md:w-full justify-between md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 max-sm:mt-4">
              <span className="icon carousal-left-arrow cursor-pointer  mr-1" onClick={() => handleSlideActions("previous")} ></span>
              <span className="icon carousal-right-arrow cursor-pointer " onClick={() => handleSlideActions("next")}></span>
            </div>
          </div>
          {localState.showBuyModal && (
            <BuyComponent
              showModal={localState.showBuyModal}
              handleClose={() => localDispatch({ type: 'showBuyModal', payload: false })}
              nftDetails={localState.nftDetails}
              collectionAddress={
                localState.nftDetails?.creatorWalletAddress ||
                localState.trendingData?.collectionContractAddress
              }
            ></BuyComponent>
          )}
        </>
      )}
    </>
  );
}
const connectStateToProps = ({ auth }: any) => {
  return { auth: auth };
};
export default connect(connectStateToProps, (dispatch) => {
  return { dispatch };
})(TrendingNfts);
